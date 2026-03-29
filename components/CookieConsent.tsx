"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookies";

export const CONSENT_COOKIE_NAME = "bredly_consent";
const CONSENT_MAX_AGE_SEC = 365 * 24 * 60 * 60;

export type ConsentLevel = "all" | "essential";

export interface ConsentState {
  level: ConsentLevel;
  updatedAt: number;
}

interface CookieConsentContextValue {
  consent: ConsentState | null;
  /** `true` si l’utilisateur a accepté les cookies non essentiels (analytics, etc.). */
  analyticsAllowed: boolean;
  setConsent: (level: ConsentLevel) => void;
  /** Supprime le cookie de choix et réaffiche la bannière. */
  reopenPreferences: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
);

function parseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const d = JSON.parse(raw) as Partial<ConsentState>;
    if (d.level === "all" || d.level === "essential") {
      return {
        level: d.level,
        updatedAt: typeof d.updatedAt === "number" ? d.updatedAt : Date.now(),
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsentState] = useState<ConsentState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsentState(parseConsent(getCookie(CONSENT_COOKIE_NAME)));
    setReady(true);
  }, []);

  const setConsent = useCallback((level: ConsentLevel) => {
    const next: ConsentState = { level, updatedAt: Date.now() };
    setCookie(CONSENT_COOKIE_NAME, JSON.stringify(next), {
      maxAge: CONSENT_MAX_AGE_SEC,
      sameSite: "Lax",
    });
    setConsentState(next);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("bredly-consent-updated", { detail: next })
      );
    }
  }, []);

  const reopenPreferences = useCallback(() => {
    deleteCookie(CONSENT_COOKIE_NAME);
    setConsentState(null);
  }, []);

  useEffect(() => {
    const onOpen = () => reopenPreferences();
    window.addEventListener("bredly-open-cookie-preferences", onOpen);
    return () =>
      window.removeEventListener("bredly-open-cookie-preferences", onOpen);
  }, [reopenPreferences]);

  const analyticsAllowed = consent?.level === "all";

  const value = useMemo(
    () => ({
      consent,
      analyticsAllowed,
      setConsent,
      reopenPreferences,
    }),
    [consent, analyticsAllowed, setConsent, reopenPreferences]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {ready && consent === null && (
        <CookieBanner
          onAcceptAll={() => setConsent("all")}
          onEssentialOnly={() => setConsent("essential")}
        />
      )}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider"
    );
  }
  return ctx;
}

function CookieBanner({
  onAcceptAll,
  onEssentialOnly,
}: {
  onAcceptAll: () => void;
  onEssentialOnly: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 left-0 right-0 z-[10000] p-4 md:p-6 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto pointer-events-auto border border-edge bg-surface/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex-1 min-w-0">
          <p
            id="cookie-consent-title"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2"
          >
            Cookies
          </p>
          <p
            id="cookie-consent-desc"
            className="font-sans text-sm text-muted leading-relaxed"
          >
            We use cookies to remember your preferences and, if you allow, to
            measure traffic and improve the site. Essential cookies are always
            active. You can accept all cookies or only essential ones.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onEssentialOnly}
            className="font-sans text-sm font-medium px-5 py-2.5 rounded-xl border border-edge text-muted hover:text-snow hover:border-accent/40 transition-colors duration-200"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="font-sans text-sm font-semibold px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent-glow transition-colors duration-200"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
