import { getEmailNotificationStatus } from "@/lib/contact-channels-status";

export default function ContactChannelsBanner() {
  const { enabled, recipientsMasked } = getEmailNotificationStatus();

  if (enabled) {
    return (
      <div className="mb-10 rounded-2xl border border-accent/25 bg-accent/5 px-5 py-4 space-y-3">
        <div>
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
            Dashboard = Supabase · E-mail = Resend (
            <code className="text-dim">CONTACT_NOTIFY_EMAIL</code>)
          </p>
        </div>
        <div className="border-t border-edge pt-3">
          <p className="font-mono text-[9px] uppercase tracking-wider text-dim mb-1.5">
            Tu vois les messages ici mais pas dans ta boîte ?
          </p>
          <ul className="font-sans text-[12px] text-muted space-y-1.5 list-disc list-inside leading-relaxed">
            <li>
              Vérifie les <strong className="text-snow/90">courriers indésirables / Promotions</strong> (Gmail).
            </li>
            <li>
              Sur Vercel, il faut aussi{" "}
              <code className="text-[11px] text-dim">RESEND_API_KEY</code> et{" "}
              <code className="text-[11px] text-dim">CONTACT_NOTIFY_EMAIL</code>{" "}
              (pas seulement dans <code className="text-dim">.env.local</code>
              ).
            </li>
            <li>
              <strong className="text-snow/90">Mode test Resend</strong> (
              <code className="text-[11px] text-dim">onboarding@resend.dev</code>
              ) : tu ne peux envoyer{" "}
              <strong className="text-snow/90">qu’à l’e-mail du compte Resend</strong>{" "}
              (celui affiché dans l’erreur API, ex. ton Gmail). Mets dans{" "}
              <code className="text-[11px] text-dim">CONTACT_NOTIFY_EMAIL</code>{" "}
              <strong>exactement</strong> cette adresse — pas une autre boîte.
            </li>
            <li>
              Pour notifier une <strong className="text-snow/90">autre</strong>{" "}
              adresse : vérifier un domaine sur{" "}
              <span className="text-accent">resend.com/domains</span>, puis{" "}
              <code className="text-[11px] text-dim">RESEND_FROM_EMAIL=nom@tondomaine.com</code>{" "}
              (expéditeur sur ce domaine).
            </li>
            <li>
              Onglet <strong className="text-snow/90">Logs</strong> sur{" "}
              <span className="text-accent">resend.com</span> pour voir refus /
              erreurs d’envoi.
            </li>
          </ul>
        </div>
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
