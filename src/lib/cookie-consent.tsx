"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export interface CookieConsent {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentContextValue {
  consent: CookieConsent | null;
  hasConsented: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  updateConsent: (consent: CookieConsent) => void;
}

const COOKIE_NAME = "vanman_cookie_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 12 months in seconds

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null
);

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [hasConsented, setHasConsented] = useState(true); // default true to avoid flash

  useEffect(() => {
    const stored = getCookie(COOKIE_NAME);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CookieConsent;
        setConsent(parsed);
        setHasConsented(true);
      } catch {
        setHasConsented(false);
      }
    } else {
      setHasConsented(false);
    }
  }, []);

  const persistConsent = useCallback((newConsent: CookieConsent) => {
    setConsent(newConsent);
    setHasConsented(true);
    setCookie(COOKIE_NAME, JSON.stringify(newConsent), COOKIE_MAX_AGE);
  }, []);

  const acceptAll = useCallback(() => {
    persistConsent({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  }, [persistConsent]);

  const rejectNonEssential = useCallback(() => {
    persistConsent({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  }, [persistConsent]);

  const updateConsent = useCallback(
    (newConsent: CookieConsent) => {
      persistConsent({ ...newConsent, essential: true });
    },
    [persistConsent]
  );

  return (
    <CookieConsentContext.Provider
      value={{ consent, hasConsented, acceptAll, rejectNonEssential, updateConsent }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
}
