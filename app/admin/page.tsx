import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-cookie-name";
import { verifyAdminSession } from "@/lib/admin-session";

export default function AdminIndexPage() {
  const token = cookies().get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (verifyAdminSession(token)) {
    redirect("/admin/contacts");
  }
  redirect("/admin/login");
}
