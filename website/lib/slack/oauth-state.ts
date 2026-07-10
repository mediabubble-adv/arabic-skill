import { createHmac, randomBytes } from "crypto";

const STATE_MAX_AGE_MS = 30 * 60 * 1000;

const ALLOWED_REDIRECT_HOSTS = new Set([
  "arabic-skill.vercel.app",
  "localhost",
  "127.0.0.1",
]);

function stateSecret(): string {
  const secret =
    process.env.OAUTH_STATE_SECRET ||
    process.env.SLACK_SIGNING_SECRET ||
    process.env.CRON_SECRET;
  if (!secret) {
    throw new Error("Missing OAUTH_STATE_SECRET or SLACK_SIGNING_SECRET");
  }
  return secret;
}

export function isAllowedRedirectUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_REDIRECT_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
}

export function createOAuthState(redirectUrl: string): string {
  if (!isAllowedRedirectUrl(redirectUrl)) {
    throw new Error("redirect_uri is not allowed");
  }

  const payload = Buffer.from(
    JSON.stringify({
      redirect: redirectUrl,
      ts: Date.now(),
      nonce: randomBytes(8).toString("hex"),
    })
  ).toString("base64url");

  const signature = createHmac("sha256", stateSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function validateOAuthState(
  state: string
): { redirect: string } | null {
  const [payload, signature] = state.split(".");
  if (!payload || !signature) return null;

  const expected = createHmac("sha256", stateSecret())
    .update(payload)
    .digest("base64url");

  if (signature !== expected) return null;

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { redirect?: string; ts?: number };

    if (!data.redirect || typeof data.ts !== "number") return null;
    if (Date.now() - data.ts > STATE_MAX_AGE_MS) return null;
    if (!isAllowedRedirectUrl(data.redirect)) return null;

    return { redirect: data.redirect };
  } catch {
    return null;
  }
}
