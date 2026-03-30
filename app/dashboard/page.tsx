import { redirect } from "next/navigation";

/** Raccourci vers le tableau de bord des messages (/admin). */
export default function DashboardRedirectPage() {
  redirect("/admin");
}
