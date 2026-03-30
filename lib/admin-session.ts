import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-cookie-name";

export function getAdminSessionCookieName(): string {
  return ADMIN_SESSION_COOKIE_NAME;
}

function getSecretOrThrow(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET doit être défini (min. 16 caractères aléatoires)."
    );
  }
  return s;
}

export function signAdminSession(): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }),
    "utf8"
  ).toString("base64url");
  const sig = createHmac("sha256", getSecretOrThrow())
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyAdminSession(token: string | undefined): boolean {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) return false;
  if (!token || !token.includes(".")) return false;
  const dot = token.indexOf(".");
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!payload || !sig) return false;
  const expected = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  try {
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}
