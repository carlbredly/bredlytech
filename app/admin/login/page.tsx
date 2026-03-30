import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-cookie-name";
import { verifyAdminSession } from "@/lib/admin-session";
import AdminLoginForm from "./AdminLoginForm";

export default function AdminLoginPage() {
  const token = cookies().get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (verifyAdminSession(token)) {
    redirect("/admin/contacts");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-24">
      <AdminLoginForm />
    </div>
  );
}
