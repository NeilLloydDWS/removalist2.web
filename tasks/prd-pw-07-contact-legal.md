# PRD PW-07: Contact & Legal Pages

## Introduction

Build the contact page, demo request flow, and all required legal pages for the VanMan public website. The contact page provides a direct channel for sales enquiries and support. Legal pages (Terms of Service, Privacy Policy, Cookie Policy) are required for compliance — particularly across the NZ, AU, UK, and US markets — and for establishing trust with prospective customers evaluating the platform.

## Goals

- Provide a contact form for sales enquiries and general questions
- Offer a "Request a Demo" option for companies that want a guided walkthrough
- Publish Terms of Service, Privacy Policy, and Cookie Policy
- Implement a cookie consent banner compliant with GDPR (UK), Australian Privacy Principles, and NZ Privacy Act
- Ensure all legal pages are accessible from every page via the footer

## User Stories

### US-001: Contact page
**Description:** As a visitor, I want to contact VanMan so that I can ask questions or request more information.

**Acceptance Criteria:**
- [ ] Page at `/contact`
- [ ] Contact form fields:
  - Name (required)
  - Email (required, validated)
  - Company name (optional)
  - Country/Region selector (NZ, AU, UK, US, Other)
  - Enquiry type: General Question, Sales Enquiry, Partnership, Support, Other
  - Message (required, textarea)
- [ ] Cloudflare Turnstile bot protection on form submit
- [ ] Rate limiting: max 3 submissions per email per hour
- [ ] On success: confirmation message ("Thanks! We'll get back to you within 1 business day.")
- [ ] Form submissions sent to a configured email address (via SendGrid) and stored in database
- [ ] Company contact info displayed alongside the form:
  - Email address
  - Phone number
  - Physical address (for NZ-based trust)
  - Business hours
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Demo request flow
**Description:** As a prospective customer, I want to request a personalised demo so that I can see VanMan in action for my specific business.

**Acceptance Criteria:**
- [ ] "Request a Demo" CTA accessible from pricing page and feature pages
- [ ] Demo request form (separate from general contact, or as a specific enquiry type):
  - Name (required)
  - Email (required)
  - Company name (required)
  - Number of trucks (optional — helps prepare the demo)
  - Country/Region (required)
  - Preferred date/time for demo (optional)
  - "Tell us about your business" (optional textarea)
- [ ] On submit: sends structured notification email to the sales team
- [ ] On submit: sends confirmation email to the requester ("We'll be in touch to schedule your demo")
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Terms of Service page
**Description:** As a visitor or customer, I want to read the Terms of Service so that I understand the legal agreement for using VanMan.

**Acceptance Criteria:**
- [ ] Page at `/legal/terms`
- [ ] Professionally written Terms of Service covering:
  - Service description and eligibility
  - Account creation and responsibilities
  - Acceptable use policy
  - Intellectual property rights
  - Payment terms (subscription, billing, refunds)
  - Free trial terms
  - Data ownership (customer owns their data)
  - Service availability and SLA
  - Limitation of liability
  - Termination and account deletion
  - Governing law (New Zealand, with provisions for international users)
  - Dispute resolution
  - Changes to terms (notification policy)
- [ ] Last updated date displayed at top
- [ ] Table of contents with anchor links to each section
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Privacy Policy page
**Description:** As a visitor or customer, I want to read the Privacy Policy so that I understand how VanMan handles my data.

**Acceptance Criteria:**
- [ ] Page at `/legal/privacy`
- [ ] Privacy Policy covering:
  - Information collected (personal data, usage data, cookies)
  - How information is used
  - Data sharing and third parties (Clerk, Supabase, Stripe, Twilio, SendGrid, Xero, Google Maps, Sentry, Vercel)
  - Data storage and security (encryption, tenant isolation)
  - Data retention and deletion
  - User rights (access, correction, deletion, portability)
  - Cross-border data transfers
  - Children's privacy
  - Cookie policy reference
  - Regional compliance: NZ Privacy Act 2020, Australian Privacy Principles, UK GDPR, US state privacy laws
  - Contact information for privacy enquiries
- [ ] Last updated date displayed at top
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Cookie Policy page
**Description:** As a visitor, I want to understand what cookies VanMan uses so that I can make informed consent decisions.

**Acceptance Criteria:**
- [ ] Page at `/legal/cookies`
- [ ] Cookie Policy covering:
  - What cookies are (brief explanation)
  - Categories of cookies used:
    - Essential (authentication, security, session)
    - Functional (preferences, theme, region)
    - Analytics (page views, conversion tracking)
    - Marketing (if applicable — ad tracking)
  - Table listing each cookie: name, purpose, provider, expiry
  - How to manage/disable cookies (browser settings)
  - Third-party cookies (analytics, Clerk, Stripe)
- [ ] Last updated date
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Cookie consent banner
**Description:** As a visitor, I want to control which cookies are used so that my privacy preferences are respected.

**Acceptance Criteria:**
- [ ] Cookie consent banner appears on first visit (bottom of screen)
- [ ] Banner text: brief explanation + link to Cookie Policy
- [ ] Options:
  - "Accept All" — enables all cookie categories
  - "Reject Non-Essential" — only essential cookies
  - "Manage Preferences" — opens modal with category toggles
- [ ] Preferences stored in a cookie (ironic but standard) — `vanman_cookie_consent`
- [ ] Analytics scripts only load after consent is given (conditional script injection)
- [ ] Banner does not re-appear after choice is made (unless consent cookie expires — 12 months)
- [ ] Compliant with UK GDPR (opt-in for non-essential) and generally acceptable for NZ/AU/US
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

## Functional Requirements

- FR-1: Contact form submissions sent via SendGrid API to a configured recipient email
- FR-2: Contact form submissions stored in a database table for CRM/follow-up (optional: integrate with a CRM later)
- FR-3: Turnstile token validated server-side before processing form submission
- FR-4: Rate limiting on contact and demo forms to prevent abuse
- FR-5: Legal pages rendered from MDX files (easy to update without code changes)
- FR-6: Cookie consent state checked before loading analytics/marketing scripts
- FR-7: All legal pages accessible from the global footer on every page
- FR-8: Legal pages included in sitemap

## Non-Goals

- No live chat widget (can be added later)
- No CRM integration in this PRD (form data stored, but no Salesforce/HubSpot sync)
- No automated legal document generation — content written by a human (with legal review)
- No GDPR data subject request automation (manual process initially)
- No appointment scheduling integration (Calendly, etc.) for demo bookings

## Design Considerations

- Contact page: form on the left, contact details on the right (desktop). Full-width stacked on mobile.
- Legal pages: clean typography, generous spacing, numbered sections for easy reference
- Cookie banner: minimal, non-intrusive, but clearly visible — dark overlay bar at bottom
- Cookie preferences modal: clean toggle switches per category with descriptions

## Technical Considerations

- Legal pages stored as MDX files in `content/legal/` — easy for non-developers to update via Git
- Cookie consent: consider using a lightweight library (e.g., `cookie-consent-banner`) or build a simple custom component
- Analytics conditional loading: use `next/script` with `strategy="afterInteractive"` gated by consent state
- Contact form: Next.js Server Action or API route → SendGrid API
- Consider storing legal page versions for compliance (track when terms were updated and which version a user agreed to)

## Success Metrics

- Contact form submission rate over 1% of visitors to the contact page
- Demo request form completion rate over 50% of visitors who start the form
- Response time to contact form submissions under 1 business day
- Cookie consent banner interaction rate over 70% (not just ignored)
- Zero legal compliance issues flagged by customers or regulators

## Open Questions

- Should legal documents be written in-house or by a lawyer? (Recommended: lawyer-reviewed)
- Do we need separate Terms for NZ, AU, UK, and US, or one global document with regional provisions?
- Should demo requests integrate with a calendar tool (Calendly) for self-service booking?
- Do we need a Data Processing Agreement (DPA) for enterprise customers?
- What email address receives contact form submissions? (e.g., hello@vanman.app, sales@vanman.app)
