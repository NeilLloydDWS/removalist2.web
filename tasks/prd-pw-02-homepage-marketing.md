# PRD PW-02: Homepage & Marketing Pages

## Introduction

Build the homepage (landing page) and core marketing pages — About and a Feature Overview. The homepage is the primary entry point for all visitors and must clearly communicate what VanMan is, who it's for, and why they should sign up. These pages drive the majority of conversions from organic search, paid ads, and referrals.

## Goals

- Create a high-converting homepage that communicates VanMan's value proposition in under 5 seconds
- Build an About page that establishes trust and credibility
- Showcase VanMan's key capabilities in a scannable, visual format
- Drive visitors toward the free trial signup or feature detail pages
- Optimize for global English-speaking removalist/moving companies (NZ, AU, UK, US)

## User Stories

### US-001: Homepage hero section
**Description:** As a visitor, I want to immediately understand what VanMan does so that I can decide if it's relevant to my moving business.

**Acceptance Criteria:**
- [ ] Hero section with:
  - Headline: Clear value proposition (e.g., "Run your moving company from one place")
  - Subheadline: One sentence elaborating the benefit
  - Primary CTA: "Start Free Trial" button
  - Secondary CTA: "See How It Works" (scrolls to demo/feature section)
  - Hero visual: product screenshot or animated preview showing the calendar/dashboard
- [ ] Hero optimized for above-the-fold on desktop and mobile
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Social proof section
**Description:** As a visitor, I want to see that other moving companies trust VanMan so that I feel confident signing up.

**Acceptance Criteria:**
- [ ] "Trusted by moving companies across NZ, Australia, UK & US" banner
- [ ] Customer logos row (placeholder logos initially, replaced with real ones)
- [ ] Stats bar: e.g., "X,000+ jobs managed", "Y companies", "Z countries"
- [ ] 2-3 customer testimonial cards with name, company, photo, and quote
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Feature highlights grid
**Description:** As a visitor, I want a quick overview of VanMan's features so that I understand the breadth of the platform.

**Acceptance Criteria:**
- [ ] Section heading: "Everything you need to run your moving business"
- [ ] 6-8 feature cards in a responsive grid (3-col desktop, 2-col tablet, 1-col mobile):
  - Job Calendar & Scheduling
  - Job Management & Tracking
  - Fleet & Truck Management
  - Online Booking Requests
  - Customer SMS & Email
  - Invoicing & Xero Integration
  - Dashboard & Analytics
  - Mobile App (iOS & Android for drivers, operators, and admins)
  - Team Chat (real-time staff-to-staff messaging)
- [ ] Each card: icon, title, 1-2 sentence description, "Learn more →" link to feature detail page
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: How it works section
**Description:** As a visitor, I want to understand the workflow so that I can see how VanMan fits into my daily operations.

**Acceptance Criteria:**
- [ ] 3-4 step visual flow:
  1. "Receive bookings" — online form captures enquiries
  2. "Schedule & dispatch" — drag jobs onto the calendar, assign trucks
  3. "Track & communicate" — SMS customers, drivers update in the field
  4. "Invoice & get paid" — generate invoices, sync to Xero
- [ ] Each step: number, icon/illustration, title, short description
- [ ] Visual connector between steps (timeline or arrow)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: CTA section
**Description:** As a visitor who has scrolled through the page, I want a clear call to action so that I can sign up.

**Acceptance Criteria:**
- [ ] Full-width CTA section near bottom of page
- [ ] Heading: "Ready to simplify your moving business?"
- [ ] "Start Free Trial" primary button + "Talk to Sales" secondary link
- [ ] No credit card messaging: "No credit card required. Free for 14 days."
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: About page
**Description:** As a visitor who wants to learn more about the company, I want an About page so that I can understand who's behind VanMan.

**Acceptance Criteria:**
- [ ] Page at `/about`
- [ ] Company story section: origin story (built by a real removalist company — VanMan NZ)
- [ ] Mission statement: "We're building the tools we wished we had when running our own moving company"
- [ ] "Built by movers, for movers" messaging — authenticity and domain expertise
- [ ] Team section (optional — can be placeholder)
- [ ] CTA at bottom to start free trial
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Feature overview page
**Description:** As a visitor who wants a comprehensive view, I want a single page listing all features so that I can evaluate VanMan's full capability.

**Acceptance Criteria:**
- [ ] Page at `/features`
- [ ] Feature categories with anchor links (jump to section):
  - Scheduling & Calendar
  - Job Management
  - Fleet Management
  - Booking & Lead Capture
  - Communications
  - Invoicing & Accounting
  - Analytics & Reporting
  - Mobile App (iOS & Android)
  - Team Chat
- [ ] Each category: heading, 3-4 bullet points, screenshot/illustration, link to detailed feature page
- [ ] Sticky sidebar or top nav for jumping between categories (desktop)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

## Functional Requirements

- FR-1: All pages statically generated (SSG) for maximum performance
- FR-2: All images lazy-loaded below the fold, eager-loaded above the fold
- FR-3: Hero section must render meaningfully without JavaScript (SSR fallback)
- FR-4: Testimonials data stored as static JSON/MDX (no database dependency)
- FR-5: Feature card data driven from a shared `features.ts` config file (reused across homepage grid and feature overview page)
- FR-6: All CTA buttons link to `/signup` (implemented in PRD-PW-04)

## Non-Goals

- No individual feature detail pages in this PRD (that's PRD-PW-03)
- No blog or content management (that's PRD-PW-05)
- No interactive product demos or embedded app previews
- No video production (placeholder for future video content)
- No A/B testing of hero variants (that's PRD-PW-08)

## Design Considerations

- Homepage should feel premium but approachable — not overly corporate
- Use product screenshots prominently (the calendar view is the hero visual)
- Alternate section backgrounds (white/light gray/brand gradient) for visual rhythm
- Mobile: all content readable, CTAs thumb-friendly, no horizontal scroll
- Consider subtle scroll animations (fade-in on scroll) but keep them minimal and accessible (respect `prefers-reduced-motion`)

## Technical Considerations

- Product screenshots: use optimized WebP/AVIF via Next.js `<Image>`
- Consider using Framer Motion for scroll-triggered animations (lightweight, tree-shakeable)
- Feature data config: single source of truth for feature names, descriptions, icons, and slugs
- Social proof stats could later be dynamic (fetched from API) but start as static

## Success Metrics

- Homepage bounce rate under 40%
- Average time on homepage over 45 seconds
- CTA click-through rate over 5%
- Homepage loads in under 2 seconds (LCP)

## Open Questions

- Do we have real customer testimonials to use, or should we start with placeholder/anonymized ones?
- Should the hero visual be a static screenshot, an animated GIF, or an interactive demo?
- What specific stats can we use in the social proof section? (real numbers vs. aspirational)
