import { NextResponse } from "next/server";

import { authoriseAdmin } from "@/lib/admin-auth";
import { INQUIRY_STATUSES, isInquiryStatus, store } from "@/lib/inquiries";

/**
 * Admin: read or update a single inquiry's status.
 *
 *   GET   /api/admin/inquiries/INQ-...
 *   PATCH /api/admin/inquiries/INQ-...   { "status": "in_progress" }
 *   Authorization: Bearer <ADMIN_API_TOKEN>
 *
 * Valid statuses: new | in_progress | contacted | closed
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { id: string };

export async function GET(request: Request, { params }: { params: Promise<Params> }) {
  const denied = authoriseAdmin(request);
  if (denied) return denied;

  const { id } = await params;
  const inquiry = await store.get(id);

  if (!inquiry) {
    return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, inquiry }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request: Request, { params }: { params: Promise<Params> }) {
  const denied = authoriseAdmin(request);
  if (denied) return denied;

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const status = (body as { status?: unknown })?.status;

  if (!isInquiryStatus(status)) {
    return NextResponse.json(
      { ok: false, message: `status must be one of: ${INQUIRY_STATUSES.join(", ")}` },
      { status: 400 },
    );
  }

  try {
    const updated = await store.updateStatus(id, status);
    if (!updated) {
      return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, inquiry: updated }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[admin/inquiries] Update failed:", error);
    return NextResponse.json({ ok: false, message: "Could not update inquiry." }, { status: 500 });
  }
}
