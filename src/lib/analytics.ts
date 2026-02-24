/**
 * Analytics event tracking utility.
 *
 * Naming convention: category_action
 *   e.g. cta_click_start_trial, blog_read_complete, help_feedback_yes
 *
 * Abstracts over the configured analytics provider (Plausible, Fathom, GA4).
 * No-ops when analytics consent is not given.
 */

// ---- Funnel event constants (US-010) ----
export const FUNNEL_LANDING_PAGE_VISIT = "funnel_landing_page_visit";
export const FUNNEL_FEATURE_PAGE_VISIT = "funnel_feature_page_visit";
export const FUNNEL_PRICING_PAGE_VISIT = "funnel_pricing_page_visit";
export const FUNNEL_SIGNUP_PAGE_VISIT = "funnel_signup_page_visit";
export const FUNNEL_SIGNUP_FORM_STARTED = "funnel_signup_form_started";
export const FUNNEL_SIGNUP_FORM_COMPLETED = "funnel_signup_form_completed";
export const FUNNEL_ONBOARDING_STARTED = "funnel_onboarding_started";
export const FUNNEL_ONBOARDING_COMPLETED = "funnel_onboarding_completed";

// ---- Cookie helpers ----
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? decodeURIComponent(match[2]) : null;
}

function hasAnalyticsConsent(): boolean {
  const raw = getCookie("vanman_cookie_consent");
  if (!raw) return false;
  try {
    const consent = JSON.parse(raw) as { analytics?: boolean };
    return consent.analytics === true;
  } catch {
    return false;
  }
}

// ---- UTM capture (US-010) ----
export function captureUTM(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];
  const utm: Record<string, string> = {};

  for (const key of utmKeys) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }

  if (Object.keys(utm).length > 0) {
    document.cookie = `vanman_utm=${encodeURIComponent(JSON.stringify(utm))};path=/;max-age=${60 * 60 * 24 * 30};SameSite=Lax`;
  }
}

export function getUTM(): Record<string, string> {
  const raw = getCookie("vanman_utm");
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

export function getAttribution(): string {
  const utm = getUTM();
  if (utm.utm_source) return utm.utm_medium === "cpc" ? "paid" : "referral";
  if (typeof document !== "undefined" && document.referrer) {
    try {
      const ref = new URL(document.referrer);
      if (ref.hostname !== window.location.hostname) return "organic";
    } catch {
      // invalid referrer
    }
  }
  return "direct";
}

// ---- AB test variant getter ----
function getAbVariants(): Record<string, string> {
  const raw = getCookie("vanman_ab");
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

// ---- Core tracking function ----
export function trackEvent(
  category: string,
  action: string,
  label?: string,
  properties?: Record<string, string>
): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  const eventName = label
    ? `${category}_${action}_${label}`
    : `${category}_${action}`;

  const allProps: Record<string, string> = {
    ...properties,
    ...getAbVariants(),
  };

  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;

  if (provider === "plausible") {
    const w = window as unknown as Record<string, unknown>;
    if (typeof w.plausible === "function") {
      (w.plausible as (name: string, opts?: { props: Record<string, string> }) => void)(
        eventName,
        { props: allProps }
      );
    }
  } else if (provider === "fathom") {
    const w = window as unknown as Record<string, unknown>;
    const fathom = w.fathom as
      | { trackEvent: (name: string, opts?: { _value?: number }) => void }
      | undefined;
    if (fathom?.trackEvent) {
      fathom.trackEvent(eventName);
    }
  } else {
    // GA4 / gtag fallback
    const w = window as unknown as Record<string, unknown>;
    if (typeof w.gtag === "function") {
      (w.gtag as (...args: unknown[]) => void)(
        "event",
        eventName,
        allProps
      );
    }
  }
}

// ---- Convenience for funnel events ----
export function trackFunnelEvent(
  event: string,
  extra?: Record<string, string>
): void {
  const utm = getUTM();
  const attribution = getAttribution();
  trackEvent("funnel", event, undefined, {
    ...utm,
    attribution,
    ...extra,
  });
}
