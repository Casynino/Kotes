import { NextResponse } from "next/server";

import { clientIdentifier, hit } from "./rate-limit";

/**
 * Bearer-token guard for the admin inquiry endpoints.
 *
 * Returns a response to send when the request is not authorised, or `null`
 * when it is. Kept out of the route files because Next.js only permits
 * route-handler exports there.
 */
export function authoriseAdmin(request: Request): NextResponse | null {
  const expected = process.env.ADMIN_API_TOKEN;

  // No token configured (or one too weak to be meaningful): behave as if the
  // route does not exist, so an unconfigured deployment exposes nothing.
  if (!expected || expected.length < 24) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  // Blunt token guessing.
  const limit = hit(`admin:${clientIdentifier(request.headers)}`, 30, 60_000);
  if (!limit.success) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const header = request.headers.get("authorization") ?? "";
  const supplied = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!timingSafeEqual(supplied, expected)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return null;
}

/** Constant-time comparison so response timing does not leak the token. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
