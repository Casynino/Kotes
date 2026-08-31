/**
 * Fixed-window in-memory rate limiter.
 *
 * Sufficient for a single-instance deployment (a VPS, a single container, or a
 * low-traffic serverless app). For multi-instance deployments where instances
 * do not share memory, swap the body of `hit()` for a Redis / Upstash backed
 * implementation — the signature is designed to stay identical.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Prevents unbounded growth in a long-running process. */
const MAX_BUCKETS = 10_000;

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
};

export function hit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    if (buckets.size > MAX_BUCKETS) sweep(now);
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, limit, remaining: limit - 1, retryAfter: Math.ceil(windowMs / 1000) };
  }

  existing.count += 1;
  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  return {
    success: existing.count <= limit,
    limit,
    remaining: Math.max(0, limit - existing.count),
    retryAfter,
  };
}

function sweep(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * Best-effort client identifier. `x-forwarded-for` is trusted because the app
 * is expected to sit behind a proxy that sets it (Vercel, Nginx, Cloudflare).
 * Used only for rate limiting — never persisted with the inquiry.
 */
export function clientIdentifier(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") || headers.get("cf-connecting-ip") || "unknown";
}
