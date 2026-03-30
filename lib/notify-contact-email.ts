import "server-only";
import { Resend } from "resend";
import { parseNotifyEmails } from "@/lib/contact-channels-status";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface ContactEmailPayload {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

/**
 * Envoie une notification Resend après enregistrement en base.
 * Si RESEND_API_KEY ou CONTACT_NOTIFY_EMAIL manquent, ne fait rien (pas d’erreur).
 * En cas d’échec Resend, log uniquement — le message reste enregistré.
 */
export async function sendContactNotificationEmail(
  payload: ContactEmailPayload
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toList = parseNotifyEmails(process.env.CONTACT_NOTIFY_EMAIL);
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Bredly <onboarding@resend.dev>";

  if (!apiKey || toList.length === 0) {
    if (!apiKey) {
      console.warn("[resend] RESEND_API_KEY absent — e-mail non envoyé.");
    } else if (toList.length === 0) {
      console.warn(
        "[resend] CONTACT_NOTIFY_EMAIL absent ou invalide — e-mail non envoyé."
      );
    }
    return;
  }

  const resend = new Resend(apiKey);
  const subject = `[Contact] ${payload.name}`;

  const lines = [
    `Nouveau message depuis le site bredly`,
    ``,
    `Nom : ${payload.name}`,
    `E-mail : ${payload.email}`,
    payload.company ? `Société : ${payload.company}` : null,
    payload.projectType ? `Type de projet : ${payload.projectType}` : null,
    ``,
    `Message :`,
    payload.message,
  ].filter((x): x is string => x !== null);

  const text = lines.join("\n");

  const html = `
    <p><strong>Nouveau message</strong> (formulaire contact)</p>
    <ul>
      <li><strong>Nom :</strong> ${escapeHtml(payload.name)}</li>
      <li><strong>E-mail :</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></li>
      ${payload.company ? `<li><strong>Société :</strong> ${escapeHtml(payload.company)}</li>` : ""}
      ${payload.projectType ? `<li><strong>Type :</strong> ${escapeHtml(payload.projectType)}</li>` : ""}
    </ul>
    <p><strong>Message</strong></p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;">${escapeHtml(payload.message)}</pre>
  `.trim();

  const { error } = await resend.emails.send({
    from,
    to: toList,
    replyTo: payload.email,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("[resend] envoi échoué:", error.message);
  }
}
