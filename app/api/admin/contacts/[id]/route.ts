import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-cookie-name";
import { verifyAdminSession } from "@/lib/admin-session";
import { deleteContactSubmission } from "@/lib/contacts";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const token = cookies().get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (!verifyAdminSession(token)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const result = await deleteContactSubmission(params.id);
  if (!result.ok) {
    if (result.error === "invalid_id") {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    if (result.error === "server_config") {
      return NextResponse.json({ error: result.error }, { status: 503 });
    }
    return NextResponse.json({ error: result.error }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
