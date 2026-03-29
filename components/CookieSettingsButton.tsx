"use client";

import { useCookieConsent } from "./CookieConsent";

/** Lien / bouton pour rouvrir la bannière de cookies (à placer dans le footer). */
export default function CookieSettingsButton() {
  const { reopenPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={reopenPreferences}
      className="font-mono text-[11px] text-dim hover:text-snow transition-colors duration-200 underline-offset-2 hover:underline"
    >
      Cookie settings
    </button>
  );
}
