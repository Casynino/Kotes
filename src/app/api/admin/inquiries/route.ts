import { NextResponse } from "next/server";

import { authoriseAdmin } from "@/lib/admin-auth";
import { isInquiryStatus, store } from "@/lib/inquiries";

/**
 * Admin: list inquiries.
 *
 *   GET /api/admin/inquiries?status=new
 *   Authorization: Bearer <ADMIN_API_TOKEN>
 *
 * This is a headless endpoint intended for an internal dashboard or an
 * integration. It is deliberately not linked from the public site and returns
 * 404 when no token is configured, so an unconfigured deployment exposes
 * nothing at all.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = authoriseAdmin(request);
  if (denied) return denied;

  const requested = new URL(request.url).searchParams.get("status");

  if (requested !== null && !isInquiryStatus(requested)) {
    return NextResponse.json({ ok: false, message: "Unknown status filter." }, { status: 400 });
  }

  try {
    const inquiries = await store.list(requested ? { status: requested } : undefined);
    return NextResponse.json(
      { ok: true, count: inquiries.length, inquiries },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[admin/inquiries] List failed:", error);
    return NextResponse.json({ ok: false, message: "Could not load inquiries." }, { status: 500 });
  }
}
