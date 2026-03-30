"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

interface Props {
  id: string;
}

export default function DeleteContactButton({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (
      !confirm(
        "Supprimer ce message définitivement ? Cette action est irréversible."
      )
    ) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/contacts/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        alert(
          data.error === "delete_failed"
            ? "Suppression impossible. Réessayez."
            : "Suppression impossible."
        );
        return;
      }
      router.refresh();
    } catch {
      alert("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleDelete()}
      disabled={loading}
      className="inline-flex items-center gap-1.5 font-sans text-xs text-red-400/90 hover:text-red-300 border border-red-500/25 hover:border-red-400/40 rounded-lg px-2.5 py-1.5 transition-colors disabled:opacity-50"
      aria-label="Supprimer ce message"
    >
      {loading ? (
        <Loader2 size={13} className="animate-spin shrink-0" />
      ) : (
        <Trash2 size={13} className="shrink-0" />
      )}
      Supprimer
    </button>
  );
}
