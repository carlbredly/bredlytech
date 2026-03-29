/**
 * Helpers cookies (navigateur). Pour le consentement et les préférences utilisateur.
 */

export type CookieSameSite = "Strict" | "Lax" | "None";

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${escaped}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function setCookie(
  name: string,
  value: string,
  options: {
    maxAge?: number;
    path?: string;
    sameSite?: CookieSameSite;
    secure?: boolean;
  } = {}
): void {
  if (typeof document === "undefined") return;
  const path = options.path ?? "/";
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  cookie += `; path=${path}`;
  if (options.maxAge != null) cookie += `; max-age=${options.maxAge}`;
  cookie += `; SameSite=${options.sameSite ?? "Lax"}`;
  const secure =
    options.secure ??
    (typeof window !== "undefined" && window.location.protocol === "https:");
  if (secure) cookie += "; Secure";
  document.cookie = cookie;
}

export function deleteCookie(name: string, path = "/"): void {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(name)}=; path=${path}; max-age=0`;
}
