"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      className="inline-flex items-center gap-2 font-sans text-sm text-muted hover:text-snow border border-edge hover:border-dim rounded-lg px-3 py-2 transition-colors"
    >
      <LogOut size={14} />
      Déconnexion
    </button>
  );
}
