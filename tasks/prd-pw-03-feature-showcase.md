# PRD PW-03: Feature Showcase Pages

## Introduction

Build individual feature detail pages that give prospective customers a deep understanding of each VanMan capability. These pages serve visitors who clicked "Learn more" from the homepage or feature overview, and are key for SEO — each page targets search queries like "moving company scheduling software" or "removalist invoicing Xero integration". There is one page per major feature area, following a consistent template.

## Goals

- Create detailed, SEO-optimized pages for each of VanMan's 8 major feature areas
- Provide enough detail for a business owner to understand the value without a demo
- Drive visitors toward signup or related feature pages
- Rank for feature-specific search queries across NZ, AU, UK, and US markets

## User Stories

### US-001: Feature page template
**Description:** As a developer, I need a reusable feature page template so that all feature pages have consistent structure and can be built quickly.

**Acceptance Criteria:**
- [ ] Reusable `FeaturePage` component/layout accepting structured data
- [ ] Template sections:
  1. Hero: Feature name, tagline, 1-paragraph description, hero screenshot
  2. Key benefits: 3-4 benefit cards with icons
  3. Feature details: alternating left/right sections with screenshot + description
  4. Integration callout: how this feature connects to other VanMan features
  5. CTA: "Start Free Trial" + "See all features" link
- [ ] Breadcrumb: Home > Features > [Feature Name]
- [ ] "Next feature" / "Previous feature" navigation at bottom
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Job Calendar & Scheduling page
**Description:** As a moving company owner, I want to understand VanMan's calendar so that I can see if it handles my scheduling needs.

**Acceptance Criteria:**
- [ ] Page at `/features/calendar-scheduling`
- [ ] Highlights: weekly time-grid view, drag-and-drop rescheduling, truck color-coding, real-time multi-user updates, mobile day view
- [ ] Screenshots: calendar with color-coded jobs, drag interaction, mobile view
- [ ] Benefits: "See your whole week at a glance", "Reschedule in seconds", "Multiple operators, one calendar"
- [ ] SEO title: "Moving Company Scheduling Software | VanMan"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Job Management page
**Description:** As a moving company owner, I want to understand job tracking so that I know VanMan can handle my job lifecycle.

**Acceptance Criteria:**
- [ ] Page at `/features/job-management`
- [ ] Highlights: full job lifecycle, location mapping with Google Maps, cost tracking, activity timeline, job search, job duplication
- [ ] Screenshots: job detail page, locations tab with map, search results
- [ ] Benefits: "Track every job from quote to completion", "See routes and driving times", "Full audit trail"
- [ ] SEO title: "Moving Job Management Software | VanMan"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Fleet & Truck Management page
**Description:** As a moving company owner, I want to understand fleet management so that I can manage my trucks within VanMan.

**Acceptance Criteria:**
- [ ] Page at `/features/fleet-management`
- [ ] Highlights: truck profiles with capacity, color-coded calendar integration, team leader assignment, availability tracking
- [ ] Screenshots: truck list, truck on calendar, availability dashboard widget
- [ ] Benefits: "Know which trucks are free", "Color-code your fleet", "Track capacity"
- [ ] SEO title: "Moving Company Fleet Management | VanMan"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Online Booking Requests page
**Description:** As a moving company owner, I want to understand the booking system so that I can capture leads from my website.

**Acceptance Criteria:**
- [ ] Page at `/features/online-bookings`
- [ ] Highlights: embeddable multi-step form, Google Places address lookup, bot protection, booking-to-job conversion, status tracking pipeline
- [ ] Screenshots: public booking form steps, operator booking management page, conversion flow
- [ ] Benefits: "Capture enquiries 24/7", "Convert bookings to jobs in one click", "Never lose a lead"
- [ ] SEO title: "Online Booking Form for Moving Companies | VanMan"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Customer Communications page
**Description:** As a moving company owner, I want to understand the messaging features so that I know I can communicate with customers from VanMan.

**Acceptance Criteria:**
- [ ] Page at `/features/customer-communications`
- [ ] Highlights: SMS and email from within VanMan, customizable templates with variables, delivery tracking, incoming SMS, per-job message history
- [ ] Screenshots: message template editor, messaging panel on job, delivery status indicators
- [ ] Benefits: "Send booking confirmations in seconds", "Track every message", "Templates save hours"
- [ ] SEO title: "SMS & Email for Moving Companies | VanMan"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Invoicing & Xero Integration page
**Description:** As a moving company owner, I want to understand invoicing so that I know VanMan handles my accounting needs.

**Acceptance Criteria:**
- [ ] Page at `/features/invoicing-xero`
- [ ] Highlights: one-click invoice generation from job costs, Xero sync, automatic account/item code validation, self-healing error resolution, PDF download
- [ ] Screenshots: invoice preview dialog, Xero connection settings, error resolution flow
- [ ] Benefits: "Invoice in one click", "Syncs straight to Xero", "No more code errors"
- [ ] Xero logo/badge for credibility
- [ ] SEO title: "Moving Company Invoicing & Xero Integration | VanMan"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-008: Dashboard & Analytics page
**Description:** As a moving company owner, I want to understand the dashboard so that I can see how VanMan helps me monitor my business.

**Acceptance Criteria:**
- [ ] Page at `/features/dashboard-analytics`
- [ ] Highlights: KPI cards with trends, revenue and job volume charts, truck availability, booking conversion funnel, quick actions
- [ ] Screenshots: full dashboard view, charts, KPI cards
- [ ] Benefits: "Know your numbers at a glance", "Track revenue trends", "See booking conversion rates"
- [ ] SEO title: "Moving Company Dashboard & Analytics | VanMan"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: Mobile App page (iOS & Android)
**Description:** As a moving company owner, I want to understand the mobile app so that I know my entire team can use VanMan in the field — not just drivers.

**Acceptance Criteria:**
- [ ] Page at `/features/mobile-app`
- [ ] Highlights:
  - Native iOS & Android app (available on App Store and Google Play)
  - **For Drivers:** Today's assigned jobs, tap-to-call customers, tap-to-navigate to pickup/dropoff via Google Maps, start/finish delivery time tracking with background timer, add delivery notes
  - **For Operators:** Create and edit jobs on the go (3-step wizard: General → Delivery → Tally), process payments (cash, POS, credit), send invoices via SMS/email, view full job calendar with filters
  - **For Admins:** Full access to all mobile features plus staff management
  - Role-based views — drivers see a simplified interface, operators see full controls
  - Works offline — cached data available when signal drops, syncs when reconnected
  - Multi-tenant support — switch between business accounts
- [ ] Screenshots: driver job list, operator job creation wizard, time tracking screen, Google Maps navigation, tally/invoicing screen
- [ ] Benefits: "Your whole team in one app", "Drivers track time, operators manage jobs — all from their phone", "Works even with patchy signal"
- [ ] App Store / Google Play badge graphics
- [ ] SEO title: "Mobile App for Moving Companies — iOS & Android | VanMan"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-010: Team Chat page
**Description:** As a moving company owner, I want to understand the team chat feature so that I know my staff can communicate in real-time within VanMan.

**Acceptance Criteria:**
- [ ] Page at `/features/team-chat`
- [ ] Highlights:
  - Real-time messaging between all staff members (drivers, operators, admins)
  - Direct messages and group conversations
  - Share photos and media (e.g., photos of items, access issues, parking)
  - Staff contact directory with quick-dial
  - Message history persisted and searchable
  - Push notifications for new messages
  - Available on both mobile app and web
- [ ] Screenshots: chat list, conversation thread, media sharing, staff directory
- [ ] Benefits: "Keep your team connected on every job", "Share photos from the field instantly", "No more missed messages or phone tag"
- [ ] SEO title: "Team Chat for Moving Companies | VanMan"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

## Functional Requirements

- FR-1: All feature pages generated from structured data files (one config per feature) using the shared template
- FR-2: Each page has unique SEO metadata: title, description, Open Graph image
- FR-3: Feature page slugs match the pattern `/features/[slug]`
- FR-4: "Related features" section at the bottom of each page links to 2-3 other feature pages
- FR-5: All pages statically generated at build time
- FR-6: Screenshots use responsive image component with lightbox on click (view full-size)

## Non-Goals

- No interactive product demos or sandbox environments
- No video walkthroughs in this PRD (can be added later)
- No comparison tables against competitors
- No pricing information on feature pages (that's the pricing page)

## Design Considerations

- Alternating layout: text-left/image-right, then text-right/image-left for visual variety
- Screenshots should show realistic data (not lorem ipsum) — use the VanMan NZ demo data
- Feature icons from a consistent icon set (Lucide, which shadcn/ui uses)
- Mobile: screenshots stack below text, full-width

## Technical Considerations

- Feature data config: `features/[slug].ts` files exporting structured content (title, tagline, benefits, detail sections, screenshots, related features, SEO metadata)
- Screenshots stored in `public/features/` as optimized WebP
- Consider generating Open Graph images automatically using `@vercel/og` or static per-feature images
- Breadcrumbs use a shared component from PRD-PW-01

## Success Metrics

- Each feature page ranks in top 20 for its target keyword within 6 months
- Average time on feature pages over 60 seconds
- Feature pages contribute to at least 30% of signup conversions (via UTM tracking)
- Bounce rate under 50% on feature pages

## Open Questions

- Should we include a "Request a demo" CTA alongside "Start Free Trial" on feature pages?
- Do we have product screenshots ready, or do we need to create demo data and capture them?
- Should feature pages include a short video/GIF showing the feature in action?
