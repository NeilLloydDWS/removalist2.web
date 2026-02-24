import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieConsentProvider } from "@/lib/cookie-consent";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { ConsentScripts } from "@/components/consent-scripts";
import { RegionProvider } from "@/lib/region-provider";
import { AnalyticsInit } from "@/components/analytics-init";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://vanman.app";

export const metadata: Metadata = {
  title: {
    default: "VanMan — Moving Company Software",
    template: "%s | VanMan — Moving Company Software",
  },
  description:
    "Run your moving company from one place. Scheduling, job management, invoicing, and more for removalist businesses across NZ, AU, UK & US.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "VanMan",
    locale: "en_NZ",
    images: [{ url: `${SITE_URL}/og-default.svg` }],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    languages: {
      "en-NZ": SITE_URL,
      "en-AU": SITE_URL,
      "en-GB": SITE_URL,
      "en-US": SITE_URL,
      "x-default": SITE_URL,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "VanMan",
            url: SITE_URL,
            logo: `${SITE_URL}/logo.svg`,
            sameAs: [
              "https://linkedin.com/company/vanman",
              "https://facebook.com/vanman",
              "https://x.com/vanman",
            ],
            contactPoint: {
              "@type": "ContactPoint",
              email: "hello@vanman.app",
              contactType: "customer support",
            },
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CookieConsentProvider>
            <RegionProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <CookieConsentBanner />
              <ConsentScripts />
              <AnalyticsInit />
              <Analytics />
            </RegionProvider>
          </CookieConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
