"use client";

import Script from "next/script";
import { useCookieConsent } from "@/lib/cookie-consent";

export function ConsentScripts() {
  const { consent } = useCookieConsent();

  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {/* Analytics scripts — only load when analytics consent is given */}
      {consent?.analytics && (
        <>
          {/* Plausible */}
          {provider === "plausible" && analyticsId && (
            <Script
              src="https://plausible.io/js/script.js"
              data-domain={analyticsId}
              strategy="afterInteractive"
            />
          )}

          {/* Fathom */}
          {provider === "fathom" && analyticsId && (
            <Script
              src="https://cdn.usefathom.com/script.js"
              data-site={analyticsId}
              strategy="afterInteractive"
            />
          )}

          {/* GA4 via env var */}
          {(provider === "ga4" || gaId) && (gaId || analyticsId) && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId || analyticsId}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId || analyticsId}');
                `}
              </Script>
            </>
          )}
        </>
      )}

      {/* Marketing scripts — only load when marketing consent is given */}
      {consent?.marketing && (
        <>
          {/* Marketing pixel placeholder — add when needed */}
        </>
      )}

      {/* Turnstile script — essential, loads regardless of consent */}
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
