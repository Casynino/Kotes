import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import type { Inquiry, InquiryStatus } from "@/content/types";

/**
 * Inquiry persistence.
 *
 * The default adapter writes newline-delimited JSON to `data/inquiries.json`,
 * which works on any host with a writable disk and needs no extra services.
 *
 * To move to a real database (Postgres, MySQL, MongoDB, Prisma, Supabase),
 * implement `InquiryStore` against it and change the `store` export at the
 * bottom of this file. Nothing else in the app touches the storage layer.
 *
 * Note for serverless hosts (Vercel, Netlify): the filesystem is ephemeral and
 * per-instance, so records written here do not persist between deployments.
 * Set up a database adapter before relying on stored inquiries in production.
 */

export interface InquiryStore {
  create(input: NewInquiry): Promise<Inquiry>;
  list(filter?: { status?: InquiryStatus }): Promise<Inquiry[]>;
  get(id: string): Promise<Inquiry | null>;
  updateStatus(id: string, status: InquiryStatus): Promise<Inquiry | null>;
  markEmailError(id: string, reason: string): Promise<void>;
}

export type NewInquiry = Omit<Inquiry, "id" | "createdAt" | "updatedAt" | "status">;

export const INQUIRY_STATUSES: InquiryStatus[] = ["new", "in_progress", "contacted", "closed"];

export function isInquiryStatus(value: unknown): value is InquiryStatus {
  return typeof value === "string" && (INQUIRY_STATUSES as string[]).includes(value);
}

/* ------------------------------------------------------- JSON file adapter */

const DATA_DIR = process.env.INQUIRY_DATA_DIR || path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "inquiries.json");

/** Serialises writes so concurrent submissions cannot interleave. */
let writeQueue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(task, task);
  writeQueue = run.catch(() => undefined);
  return run;
}

async function readAll(): Promise<Inquiry[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function writeAll(records: Inquiry[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  // Write to a temp file then rename, so a crash mid-write cannot truncate the store.
  const tmp = `${DATA_FILE}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(records, null, 2), { encoding: "utf8", mode: 0o600 });
  await rename(tmp, DATA_FILE);
}

const jsonFileStore: InquiryStore = {
  async create(input) {
    return enqueue(async () => {
      const now = new Date().toISOString();
      const inquiry: Inquiry = {
        ...input,
        id: `INQ-${now.slice(0, 10).replace(/-/g, "")}-${randomUUID().slice(0, 8).toUpperCase()}`,
        createdAt: now,
        updatedAt: now,
        status: "new",
      };
      const all = await readAll();
      all.unshift(inquiry);
      await writeAll(all);
      return inquiry;
    });
  },

  async list(filter) {
    const all = await readAll();
    return filter?.status ? all.filter((i) => i.status === filter.status) : all;
  },

  async get(id) {
    const all = await readAll();
    return all.find((i) => i.id === id) ?? null;
  },

  async updateStatus(id, status) {
    return enqueue(async () => {
      const all = await readAll();
      const index = all.findIndex((i) => i.id === id);
      if (index === -1) return null;
      const updated: Inquiry = { ...all[index]!, status, updatedAt: new Date().toISOString() };
      all[index] = updated;
      await writeAll(all);
      return updated;
    });
  },

  async markEmailError(id, reason) {
    await enqueue(async () => {
      const all = await readAll();
      const index = all.findIndex((i) => i.id === id);
      if (index === -1) return;
      all[index] = { ...all[index]!, emailError: reason, updatedAt: new Date().toISOString() };
      await writeAll(all);
    });
  },
};

/**
 * Fallback used when the filesystem is not writable (read-only serverless
 * runtimes). Keeps the request path working — the notification email is still
 * the primary delivery channel — while logging that nothing was persisted.
 */
const memoryStore: InquiryStore = (() => {
  const records: Inquiry[] = [];
  return {
    async create(input) {
      const now = new Date().toISOString();
      const inquiry: Inquiry = {
        ...input,
        id: `INQ-${now.slice(0, 10).replace(/-/g, "")}-${randomUUID().slice(0, 8).toUpperCase()}`,
        createdAt: now,
        updatedAt: now,
        status: "new",
      };
      records.unshift(inquiry);
      return inquiry;
    },
    async list(filter) {
      return filter?.status ? records.filter((i) => i.status === filter.status) : [...records];
    },
    async get(id) {
      return records.find((i) => i.id === id) ?? null;
    },
    async updateStatus(id, status) {
      const record = records.find((i) => i.id === id);
      if (!record) return null;
      record.status = status;
      record.updatedAt = new Date().toISOString();
      return record;
    },
    async markEmailError(id, reason) {
      const record = records.find((i) => i.id === id);
      if (record) record.emailError = reason;
    },
  };
})();

/**
 * Active store. Swap this line to point at a database adapter.
 * Set INQUIRY_STORE=memory to disable disk persistence explicitly.
 */
export const store: InquiryStore =
  process.env.INQUIRY_STORE === "memory" ? memoryStore : jsonFileStore;

/** Used by the API route to fall back if the disk write fails at runtime. */
export const fallbackStore = memoryStore;
