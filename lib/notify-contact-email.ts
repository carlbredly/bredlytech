import "server-only";
import { Resend } from "resend";
import { parseNotifyEmails } from "@/lib/contact-channels-status";
import {
  buildContactNotificationHtml,
  buildContactNotificationText,
} from "@/lib/email-templates/contact-notification";

export interface ContactEmailPayload {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

export type SendContactEmailResult =
  | { outcome: "skipped"; reason: "no_api_key" | "no_recipients" }
  | { outcome: "sent" }
  | { outcome: "failed"; message: string };

/**
 * Envoie une notification Resend après enregistrement en base.
 * Si RESEND_API_KEY ou CONTACT_NOTIFY_EMAIL manquent, ne fait rien (pas d’erreur utilisateur).
 */
export async function sendContactNotificationEmail(
  payload: ContactEmailPayload
): Promise<SendContactEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toList = parseNotifyEmails(process.env.CONTACT_NOTIFY_EMAIL);
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Bredly <onboarding@resend.dev>";

  if (!apiKey || toList.length === 0) {
    if (!apiKey) {
      console.warn("[resend] RESEND_API_KEY absent — e-mail non envoyé.");
      return { outcome: "skipped", reason: "no_api_key" };
    }
    console.warn(
      "[resend] CONTACT_NOTIFY_EMAIL absent ou invalide — e-mail non envoyé."
    );
    return { outcome: "skipped", reason: "no_recipients" };
  }

  const resend = new Resend(apiKey);
  const subject = `Nouveau message — ${payload.name}`;

  const text = buildContactNotificationText(payload);
  const html = buildContactNotificationHtml(payload);

  const { data, error } = await resend.emails.send({
    from,
    to: toList,
    replyTo: payload.email,
    subject,
    text,
    html,
  });

  if (error) {
    const detail =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as { message: unknown }).message)
        : JSON.stringify(error);
    console.error("[resend] envoi échoué:", detail, { to: toList, from });
    return { outcome: "failed", message: detail };
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[resend] envoyé", { id: data?.id, to: toList });
  }

  return { outcome: "sent" };
}
