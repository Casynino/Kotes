import { NextResponse } from "next/server";

import { store, fallbackStore } from "@/lib/inquiries";
import { isMailConfigured, sendInquiryNotification, sendVisitorAcknowledgement } from "@/lib/mailer";
import { clientIdentifier, hit } from "@/lib/rate-limit";
import { stripControlChars, stripControlCharsKeepNewlines, truncate } from "@/lib/sanitize";
import { contactFormSchema, toFieldErrors } from "@/lib/validation";
import { serviceOptions } from "@/content/services";
import { budgetRanges } from "@/lib/validation";

/**
 * Contact form endpoint.
 *
 * Defence in depth, in order:
 *   1. Content-Type and body-size checks    — reject malformed/oversized posts
 *   2. Rate limiting per IP                  — blunt automated abuse
 *   3. Honeypot field                        — catch naive bots silently
 *   4. Time-to-submit check                  — catch bots that fill instantly
 *   5. Zod schema validation                 — same rules as the client
 *   6. Allow-list checks on select fields    — no arbitrary values persisted
 *   7. Control-character stripping           — block email header injection
 *   8. Store, then email                     — a mail failure never loses the lead
 *
 * Responses never expose internal errors, stack traces or record internals.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Max submissions per IP per window. */
const RATE_LIMIT = Number(process.env.CONTACT_RATE_LIMIT || 5);
const RATE_WINDOW_MS = Number(process.env.CONTACT_RATE_WINDOW_MS || 10 * 60 * 1000);
/** Reject bodies larger than this before parsing. */
const MAX_BODY_BYTES = 32 * 1024;
/** A human cannot complete this form faster than this. */
const MIN_FILL_MS = 2500;

const GENERIC_ERROR =
  "We could not send your message right now. Please try again, or email us directly.";

export async function POST(request: Request) {
  // 1. Content type
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 413 });
  }

  // 2. Rate limit
  const identifier = clientIdentifier(request.headers);
  const limit = hit(`contact:${identifier}`, RATE_LIMIT, RATE_WINDOW_MS);

  if (!limit.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "You have sent several messages already. Please wait a few minutes and try again.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  // Parse body
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;

  // 3. Honeypot — respond as success so bots do not learn they were caught.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true, message: successMessage() }, { status: 200 });
  }

  // 4. Time-to-submit
  const startedAt = Number(payload.startedAt);
  if (Number.isFinite(startedAt) && startedAt > 0) {
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_FILL_MS) {
      return NextResponse.json({ ok: true, message: successMessage() }, { status: 200 });
    }
  }

  // 5. Schema validation
  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        errors: toFieldErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // 6. Allow-list select fields so only known values are ever stored or emailed.
  const serviceOfInterest = serviceOptions.includes(data.serviceOfInterest)
    ? data.serviceOfInterest
    : "General enquiry";

  const budgetRange =
    data.budgetRange && (budgetRanges as readonly string[]).includes(data.budgetRange)
      ? data.budgetRange
      : undefined;

  // 7. Sanitise everything that will be persisted or embedded in an email.
  const clean = {
    fullName: truncate(stripControlChars(data.fullName), 100),
    companyName: data.companyName ? truncate(stripControlChars(data.companyName), 120) : undefined,
    email: stripControlChars(data.email).toLowerCase(),
    phone: stripControlChars(data.phone),
    serviceOfInterest,
    subject: truncate(stripControlChars(data.subject), 150),
    message: truncate(stripControlCharsKeepNewlines(data.message), 5000),
    budgetRange,
    meta: {
      userAgent: truncate(stripControlChars(request.headers.get("user-agent") ?? ""), 250) || undefined,
      referer: truncate(stripControlChars(request.headers.get("referer") ?? ""), 250) || undefined,
    },
  };

  // 8. Persist first — an email outage must never lose a lead.
  let inquiry;
  try {
    inquiry = await store.create(clean);
  } catch (error) {
    console.error("[contact] Primary inquiry store failed:", error);
    try {
      inquiry = await fallbackStore.create(clean);
      console.warn("[contact] Inquiry captured in memory only; configure a persistent store.");
    } catch (fallbackError) {
      console.error("[contact] Fallback inquiry store failed:", fallbackError);
      return NextResponse.json({ ok: false, message: GENERIC_ERROR }, { status: 500 });
    }
  }

  if (!isMailConfigured()) {
    // Not an error for the visitor — the enquiry is recorded. Loud in the logs
    // so an administrator notices the missing SMTP configuration.
    console.error(
      `[contact] SMTP not configured — inquiry ${inquiry.id} stored but NOT emailed. ` +
        "Set SMTP_HOST, SMTP_USER and SMTP_PASSWORD.",
    );
    await store.markEmailError(inquiry.id, "SMTP not configured").catch(() => undefined);
    return NextResponse.json({ ok: true, message: successMessage(), reference: inquiry.id });
  }

  const notification = await sendInquiryNotification(inquiry);

  if (!notification.sent) {
    console.error(`[contact] Notification email failed for ${inquiry.id}: ${notification.reason}`);
    await store.markEmailError(inquiry.id, notification.reason).catch(() => undefined);
    // The visitor still sees success: their enquiry is safely stored and will be
    // picked up from the admin list.
    return NextResponse.json({ ok: true, message: successMessage(), reference: inquiry.id });
  }

  // Acknowledgement is best-effort and never blocks the response outcome.
  const ack = await sendVisitorAcknowledgement(inquiry);
  if (!ack.sent && ack.reason !== "Acknowledgement disabled.") {
    console.warn(`[contact] Acknowledgement email skipped for ${inquiry.id}: ${ack.reason}`);
  }

  return NextResponse.json({ ok: true, message: successMessage(), reference: inquiry.id });
}

function successMessage(): string {
  return "Thank you — your enquiry has been received. A member of our team will respond within one business day.";
}

/** Explicitly reject other verbs rather than falling through to a 404. */
export async function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 });
}
