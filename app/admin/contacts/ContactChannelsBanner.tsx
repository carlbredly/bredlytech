import { getEmailNotificationStatus } from "@/lib/contact-channels-status";

export default function ContactChannelsBanner() {
  const { enabled, recipientsMasked } = getEmailNotificationStatus();

  if (enabled) {
    return (
      <div className="mb-10 rounded-2xl border border-accent/25 bg-accent/5 px-5 py-4">
        <p className="font-sans text-sm text-snow mb-1">
          <strong className="text-accent">E-mail</strong> — Chaque nouveau
          message est enregistré ici <strong>et</strong> envoyé à&nbsp;:
        </p>
        <ul className="font-mono text-[11px] text-muted list-disc list-inside space-y-0.5">
          {recipientsMasked.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <p className="mt-2 font-mono text-[9px] text-dim">
          Tableau de bord = cette page · E-mail = Resend (
          <code className="text-dim">CONTACT_NOTIFY_EMAIL</code>)
        </p>
      </div>
    );
  }

  return (
    <div className="mb-10 rounded-2xl border border-amber-500/30 bg-amber-500/5 px-5 py-4">
      <p className="font-sans text-sm text-snow mb-2">
        <strong className="text-amber-400/90">E-mail non configuré</strong> — Les
        messages sont bien listés ici (Supabase), mais aucune notification
        Resend ne part tant que{" "}
        <code className="text-[11px] text-dim">RESEND_API_KEY</code> et{" "}
        <code className="text-[11px] text-dim">CONTACT_NOTIFY_EMAIL</code> ne
        sont pas définis (local + hébergeur).
      </p>
    </div>
  );
}
