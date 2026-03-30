import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-cookie-name";
import { verifyAdminSession } from "@/lib/admin-session";
import { listContactSubmissions } from "@/lib/contacts";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function AdminContactsPage() {
  const token = cookies().get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (!verifyAdminSession(token)) {
    redirect("/admin/login");
  }

  let rows;
  try {
    rows = await listContactSubmissions();
  } catch {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-muted font-sans text-sm">
          Impossible de charger les messages. Vérifiez la configuration Supabase
          (variables d&apos;environnement et table{" "}
          <code className="text-accent">contact_submissions</code>).
        </p>
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 mt-6 text-accent text-sm hover:text-snow"
        >
          <ArrowLeft size={14} /> Retour
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
            Admin
          </p>
          <h1 className="font-serif text-3xl font-bold text-snow tracking-tight">
            Messages contact
          </h1>
          <p className="mt-1 font-sans text-sm text-muted">
            {rows.length} message{rows.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-sm text-muted hover:text-snow transition-colors"
          >
            <ArrowLeft size={14} />
            Site
          </Link>
          <LogoutButton />
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-edge bg-surface/50 p-12 text-center">
          <Mail className="mx-auto text-dim mb-4" size={32} />
          <p className="font-sans text-muted text-sm">
            Aucun message pour le moment.
          </p>
        </div>
      ) : (
        <ul className="space-y-6" role="list">
          {rows.map((row) => (
            <li
              key={row.id}
              className="rounded-2xl border border-edge bg-surface p-6 md:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-serif text-lg font-semibold text-snow">
                    {row.name}
                  </span>
                  <a
                    href={`mailto:${encodeURIComponent(row.email)}`}
                    className="font-sans text-sm text-accent hover:text-snow break-all"
                  >
                    {row.email}
                  </a>
                </div>
                <time
                  className="font-mono text-[10px] text-dim shrink-0"
                  dateTime={row.created_at}
                >
                  {formatDate(row.created_at)}
                </time>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {row.company ? (
                  <span className="font-mono text-[9px] uppercase tracking-wider text-dim border border-edge px-2 py-1 rounded">
                    {row.company}
                  </span>
                ) : null}
                {row.project_type ? (
                  <span className="font-mono text-[9px] uppercase tracking-wider text-accent/80 border border-accent/25 px-2 py-1 rounded">
                    {row.project_type}
                  </span>
                ) : null}
              </div>
              <p className="font-sans text-sm text-muted leading-relaxed whitespace-pre-wrap">
                {row.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
