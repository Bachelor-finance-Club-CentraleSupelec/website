// Simple in-memory, fixed-window rate limiter.
// Good enough for a single-instance deployment (e.g. one Vercel region) to blunt
// abuse. For multi-instance scale, swap this for a shared store (Upstash Redis).

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  bucket.count += 1;
  const allowed = bucket.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
  };
}

// Prevent unbounded growth of the map over long-lived processes.
const CLEANUP_INTERVAL = 5 * 60_000;
if (typeof setInterval !== 'undefined') {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (now > bucket.resetAt) buckets.delete(key);
    }
  }, CLEANUP_INTERVAL);
  // Don't keep the event loop alive just for cleanup.
  if (typeof timer.unref === 'function') timer.unref();
}
