import "server-only";

function maskEmail(email: string): string {
  const at = email.indexOf("@");
  if (at < 1) return "***";
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length <= 2) return `**@${domain}`;
  return `${local.slice(0, 2)}•••@${domain}`;
}

/** Parse CONTACT_NOTIFY_EMAIL : plusieurs adresses séparées par virgule ou point-virgule. */
export function parseNotifyEmails(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter((s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s));
}

export function getEmailNotificationStatus(): {
  enabled: boolean;
  recipientsMasked: string[];
} {
  const key = process.env.RESEND_API_KEY?.trim();
  const raw = process.env.CONTACT_NOTIFY_EMAIL;
  const recipients = parseNotifyEmails(raw);
  if (!key || recipients.length === 0) {
    return { enabled: false, recipientsMasked: [] };
  }
  return {
    enabled: true,
    recipientsMasked: recipients.map(maskEmail),
  };
}
