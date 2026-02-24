# PRD PW-08: SEO, Localization & Analytics

## Introduction

Implement cross-cutting concerns that span the entire public website: search engine optimization, multi-region localization for the global English-speaking market (NZ, AU, UK, US), and analytics/conversion tracking. These capabilities are foundational for the website's commercial success — ensuring it ranks well, speaks the visitor's language, and provides data to optimize the conversion funnel.

## Goals

- Optimize all pages for search engines with metadata, structured data, and technical SEO best practices
- Localize content, terminology, and pricing for NZ, AU, UK, and US markets
- Implement analytics to track visitor behaviour, conversion funnels, and content performance
- Set up conversion tracking for key actions (signup, demo request, contact form)
- Provide an A/B testing foundation for future optimization experiments

## User Stories

### US-001: Global SEO metadata
**Description:** As the marketing team, I want every page to have proper SEO metadata so that search engines index and rank our pages correctly.

**Acceptance Criteria:**
- [ ] Every page has unique: `<title>`, `<meta name="description">`, canonical URL
- [ ] Title format: "[Page-specific title] | VanMan — Moving Company Software"
- [ ] Descriptions: compelling, under 160 characters, include target keyword
- [ ] Open Graph tags on all pages: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] Twitter Card tags on all pages: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Default OG image for pages without a specific image (branded template)
- [ ] SEO metadata defined per-page via a centralized config or page-level exports
- [ ] Typecheck passes

### US-002: Technical SEO
**Description:** As the marketing team, I want technical SEO fundamentals in place so that search engines can crawl and index the site efficiently.

**Acceptance Criteria:**
- [ ] `sitemap.xml` auto-generated at build time, including all pages, blog posts, help articles, and feature pages
- [ ] `robots.txt` configured: allow all public pages, disallow `/onboarding`, `/api/`
- [ ] Proper heading hierarchy on all pages (single h1, logical h2/h3/h4 nesting)
- [ ] All images have descriptive `alt` text
- [ ] Internal linking strategy: feature pages link to related features, blog posts link to relevant features
- [ ] 404 page with search functionality and links to popular pages
- [ ] Page load speed optimized (target: all pages under 3s LCP)
- [ ] No broken links (validated at build time or via CI check)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Structured data (JSON-LD)
**Description:** As the marketing team, I want structured data on key pages so that we qualify for Google rich results.

**Acceptance Criteria:**
- [ ] Homepage: `Organization` schema (name, logo, URL, social profiles, contact info)
- [ ] Homepage: `SoftwareApplication` schema (name, category, operatingSystem, offers)
- [ ] Feature pages: `Product` schema (name, description, offers)
- [ ] Blog posts: `Article` schema (headline, datePublished, author, image)
- [ ] FAQ page: `FAQPage` schema (questions and answers)
- [ ] Help articles: `HowTo` schema (for step-by-step guides)
- [ ] Pricing page: `Offer` schema (price, currency, availability)
- [ ] Structured data validated with Google Rich Results Test (no errors)
- [ ] Typecheck passes

### US-004: Multi-region localization
**Description:** As a visitor from any supported region, I want the website to use terminology and currency relevant to my country so that it feels tailored to me.

**Acceptance Criteria:**
- [ ] Region selector in footer and header (flag + country code: NZ, AU, UK, US)
- [ ] Region auto-detected on first visit via IP geolocation (Vercel's `x-vercel-ip-country` header)
- [ ] Region stored in cookie and URL prefix: `/nz/`, `/au/`, `/uk/`, `/us/` (or query param)
- [ ] Terminology localization map:
  | NZ/AU | UK | US |
  |-------|----|----|
  | Removalist | Removal company | Moving company |
  | Truck | Van / Lorry | Truck |
  | Booking | Enquiry | Booking |
  | GST | VAT | Sales tax |
  | Mobile | Mobile | Cell phone |
- [ ] Pricing display in local currency (NZD, AUD, GBP, USD) — same plan, different currency
- [ ] Testimonials/case studies shown preferentially for the visitor's region (when available)
- [ ] SEO: `hreflang` tags on all pages pointing to regional variants
- [ ] Default region: NZ (if geolocation unavailable)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Analytics setup
**Description:** As the marketing team, I want website analytics so that I can understand traffic, behaviour, and conversion rates.

**Acceptance Criteria:**
- [ ] Analytics provider integrated (Google Analytics 4 or privacy-friendly alternative like Plausible/Fathom)
- [ ] Page view tracking on all pages
- [ ] Event tracking for key interactions:
  - CTA button clicks ("Start Free Trial", "Request Demo", "Contact Us")
  - Feature page visits (which features are most viewed)
  - Blog post reads (scroll depth)
  - Help article views and "Was this helpful?" feedback
  - Pricing page visits and billing toggle interactions
  - Signup form started / completed
  - Onboarding wizard step completions
- [ ] UTM parameter tracking preserved through the signup flow
- [ ] Analytics script loaded conditionally based on cookie consent (PRD-PW-07)
- [ ] Typecheck passes

### US-006: Conversion funnel tracking
**Description:** As the marketing team, I want to track the full conversion funnel so that I can identify drop-off points and optimize.

**Acceptance Criteria:**
- [ ] Funnel stages defined and tracked:
  1. Landing page visit
  2. Feature/pricing page visit
  3. Signup page visit
  4. Signup form started (first field interaction)
  5. Signup form completed
  6. Onboarding wizard started
  7. Onboarding wizard completed
  8. First job created
- [ ] Funnel visualization available in analytics dashboard
- [ ] Drop-off alerts: notification if any funnel step drops below threshold
- [ ] Source attribution: track which channel (organic, paid, referral, direct) drives each conversion
- [ ] Typecheck passes

### US-007: A/B testing foundation
**Description:** As the marketing team, I want the ability to run A/B tests so that we can optimize conversion rates over time.

**Acceptance Criteria:**
- [ ] A/B testing framework integrated (e.g., Vercel Edge Config + middleware, or a lightweight tool like GrowthBook)
- [ ] Ability to create experiments: define variants, traffic split, and conversion goal
- [ ] Variant assignment stable per visitor (cookie or fingerprint-based)
- [ ] Initial experiment: homepage hero headline variant test (placeholder — not launched yet)
- [ ] A/B test data flows into analytics for conversion comparison
- [ ] Typecheck passes

### US-008: Performance monitoring
**Description:** As a developer, I want to monitor real-world performance so that we catch regressions before they impact SEO and user experience.

**Acceptance Criteria:**
- [ ] Core Web Vitals monitoring (LCP, FID/INP, CLS) via Vercel Analytics or web-vitals library
- [ ] Performance budget alerts: warn if any page exceeds LCP 2.5s, CLS 0.1, or INP 200ms
- [ ] Lighthouse CI integration: run Lighthouse on each PR and block merge if score drops below threshold (90 performance, 90 accessibility)
- [ ] Real User Monitoring (RUM) data visible in a dashboard
- [ ] Typecheck passes

## Functional Requirements

- FR-1: All SEO metadata generated at build time (no client-side-only meta tags)
- FR-2: Sitemap regenerated on every build, includes `<lastmod>` for all entries
- FR-3: Region detection happens at the edge (middleware) for fast response, falls back to default NZ
- FR-4: Localization is content-level only (not a full i18n framework) — same components, different text strings
- FR-5: Analytics events use a consistent naming convention: `category_action` (e.g., `cta_click_start_trial`, `blog_read_complete`)
- FR-6: All analytics data is anonymized (no PII in event properties)
- FR-7: A/B test variants must not affect SEO (no cloaking — Googlebot sees the control variant)
- FR-8: `hreflang` tags correctly reference all regional variants on every page

## Non-Goals

- No full i18n/translation framework (content is English only, just terminology adjustments)
- No server-side analytics (all client-side via analytics provider)
- No CDP (Customer Data Platform) or marketing automation integration
- No paid advertising campaign setup (just tracking pixels/UTM support)
- No multi-language support (no French, Spanish, etc.)

## Design Considerations

- Region selector: subtle flag icons in footer, not intrusive. Auto-detection makes this rarely needed.
- 404 page: friendly, on-brand, with search bar and popular page links
- Analytics: prefer a privacy-friendly provider (Plausible or Fathom) to avoid GDPR complexity with Google Analytics

## Technical Considerations

- Region detection: use Next.js middleware reading `x-vercel-ip-country` header, set a cookie, and optionally rewrite to regional URL prefix
- Terminology: create a `localization.ts` config mapping region → term replacements. Use a React context or utility function to resolve terms at render time
- Structured data: create reusable `<JsonLd>` component that accepts typed schema objects
- Sitemap: use `next-sitemap` package or custom generation in `app/sitemap.ts`
- OG images: generate dynamically using `@vercel/og` (edge function) or pre-generate static images per page
- A/B testing: Vercel Edge Middleware can assign variants before the page renders (no layout shift)
- Analytics: use `next/script` with `strategy="afterInteractive"` for analytics scripts

## Success Metrics

- Organic search traffic grows 20% month-over-month for the first 6 months
- Core Web Vitals: all pages pass Google's "Good" threshold
- Homepage appears in Google search results for "removalist software" (NZ/AU), "moving company software" (UK/US) within 6 months
- Signup conversion rate tracked and reported weekly
- Region detection accuracy over 95% (correct currency/terminology shown)
- A/B test framework allows launching an experiment within 1 day of deciding to test

## Open Questions

- Google Analytics 4 vs. Plausible vs. Fathom? (GA4 is free but has GDPR complexity; Plausible/Fathom are paid but privacy-friendly)
- Should regional URLs be prefixed (`/nz/pricing`) or use subdomains (`nz.vanman.app`)?
- Do we need separate Google Search Console properties per region?
- Should we invest in generating unique OG images per page, or use a branded template?
- What is the pricing in each currency? (NZD, AUD, GBP, USD — needs business decision)
