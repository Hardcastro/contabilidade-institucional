const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

// In-memory store: resets whenever the server process restarts and is not
// shared across serverless instances. A real deployment with multiple
// concurrent instances would back this with a shared store (Redis, Upstash,
// etc.) so every instance sees the same counters.
const submissionsByIp = new Map<string, number[]>();

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds?: number;
};

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    submissionsByIp.set(ip, recent);
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  recent.push(now);
  submissionsByIp.set(ip, recent);
  return { allowed: true };
}

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
