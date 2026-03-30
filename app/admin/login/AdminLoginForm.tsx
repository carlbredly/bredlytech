"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Mot de passe incorrect.");
        setPassword("");
        return;
      }
      router.push("/admin/contacts");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm space-y-6 rounded-2xl border border-edge bg-surface p-8 shadow-xl"
    >
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
          Admin
        </p>
        <h1 className="font-serif text-2xl font-bold text-snow tracking-tight">
          Connexion
        </h1>
        <p className="mt-2 font-sans text-sm text-muted">
          Accès aux messages du formulaire contact.
        </p>
      </div>
      <div className="input-field">
        <label htmlFor="admin-password">Mot de passe</label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full"
        />
      </div>
      {error && (
        <p className="font-mono text-[11px] text-red-400" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading || !password}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-sans font-semibold text-sm rounded-xl hover:bg-accent-glow disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Connexion…
          </>
        ) : (
          "Se connecter"
        )}
      </button>
    </form>
  );
}
