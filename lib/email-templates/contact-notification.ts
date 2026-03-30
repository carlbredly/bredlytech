import "server-only";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface ContactNotificationFields {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

/** Version texte brut (clients sans HTML). */
export function buildContactNotificationText(f: ContactNotificationFields): string {
  const lines = [
    `${SITE_NAME} — Nouveau message via le formulaire de contact`,
    ``,
    `Nom : ${f.name}`,
    `E-mail : ${f.email}`,
    f.company ? `Société : ${f.company}` : null,
    f.projectType ? `Type de projet : ${f.projectType}` : null,
    ``,
    `Message :`,
    f.message,
    ``,
    `—`,
    `Répondre : ${f.email}`,
    `Site : ${SITE_URL.replace(/\/$/, "")}`,
  ].filter((x): x is string => x !== null);
  return lines.join("\n");
}

/**
 * HTML transactionnel entreprise (tables + styles inline, largeur ~600px).
 */
export function buildContactNotificationHtml(f: ContactNotificationFields): string {
  const safe = {
    name: escapeHtml(f.name),
    email: escapeHtml(f.email),
    company: escapeHtml(f.company),
    projectType: escapeHtml(f.projectType),
    message: escapeHtml(f.message).replace(/\r\n/g, "\n").replace(/\n/g, "<br/>"),
  };
  const baseUrl = SITE_URL.replace(/\/$/, "");
  const year = new Date().getFullYear();

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #e8ecf1;">
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">${label}</p>
        <p style="margin:6px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.5;color:#0f172a;">${value}</p>
      </td>
    </tr>`;

  const optionalCompany =
    f.company.trim() !== ""
      ? row("Société", safe.company)
      : "";
  const optionalType =
    f.projectType.trim() !== ""
      ? row("Type de projet", safe.projectType)
      : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Nouveau message </title>
</head>
<body style="margin:0;padding:0;background-color:#e8edf3;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#e8edf3;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;border-collapse:collapse;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a0e1a 0%,#121a2e 50%,#0f172a 100%);border-radius:12px 12px 0 0;padding:0;overflow:hidden;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="height:4px;background:linear-gradient(90deg,#2563eb 0%,#3b82f6 50%,#1d4ed8 100%);font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:28px 28px 24px;">
                    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#f8fafc;">${escapeHtml(SITE_NAME)}</p>
                    <p style="margin:8px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#94a3b8;">Notification — Formulaire contact</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Intro -->
          <tr>
            <td style="background:#ffffff;padding:24px 28px 8px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:16px;line-height:1.55;color:#0f172a;">Vous avez reçu un <strong style="color:#1e40af;">nouveau message</strong> depuis le site web.</p>
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background:#ffffff;padding:0 20px 24px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background:#fafbfc;">
                ${row("Nom complet", safe.name)}
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #e8ecf1;">
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">Adresse e-mail</p>
                    <p style="margin:6px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.5;">
                      <a href="mailto:${safe.email}" style="color:#2563eb;text-decoration:none;font-weight:500;">${safe.email}</a>
                    </p>
                  </td>
                </tr>
                ${optionalCompany}
                ${optionalType}
                <tr>
                  <td style="padding:20px;border-bottom:none;">
                    <p style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">Message</p>
                    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;line-height:1.65;color:#334155;background:#ffffff;border:1px solid #e2e8f0;border-left:3px solid #2563eb;border-radius:0 8px 8px 0;padding:16px 18px;">${safe.message}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="background:#ffffff;padding:0 28px 28px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-radius:0 0 12px 12px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td align="center" style="padding:8px 0 0;">
                    <a href="mailto:${safe.email}" style="display:inline-block;padding:12px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;background:linear-gradient(180deg,#2563eb 0%,#1d4ed8 100%);border-radius:8px;box-shadow:0 2px 8px rgba(37,99,235,0.35);">Répondre au contact</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 8px 8px;text-align:center;">
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:11px;line-height:1.6;color:#64748b;">
                E-mail généré automatiquement — ne pas répondre à cette adresse d’expédition.<br/>
                <a href="${escapeHtml(baseUrl)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(baseUrl.replace(/^https?:\/\//, ""))}</a>
                &nbsp;·&nbsp;© ${year}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
