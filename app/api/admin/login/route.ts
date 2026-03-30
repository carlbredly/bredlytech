import { NextResponse } from "next/server";
import {
  getAdminSessionCookieName,
  signAdminSession,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.length < 8) {
    console.error("ADMIN_PASSWORD manquant ou trop court.");
    return NextResponse.json({ error: "server_config" }, { status: 503 });
  }

  if (body.password !== expected) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const token = signAdminSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(getAdminSessionCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
