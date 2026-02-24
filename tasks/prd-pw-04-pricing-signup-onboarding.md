# PRD PW-04: Pricing, Signup & Self-Service Onboarding

## Introduction

Build the pricing page, self-service signup flow, and post-signup onboarding wizard. This is the conversion engine of the public website — where visitors become paying customers. VanMan uses a simple flat monthly pricing model with a free trial period, making self-service signup frictionless. After signup, an onboarding wizard guides new customers through essential setup so they can start using VanMan immediately.

## Goals

- Present VanMan's simple flat-rate pricing clearly and compellingly
- Enable self-service signup with free trial (no credit card required upfront)
- Integrate with Clerk for authentication and tenant/organization creation
- Integrate with Stripe for subscription billing
- Guide new customers through essential setup via an onboarding wizard
- Support multi-region pricing display (NZD, AUD, GBP, USD)

## User Stories

### US-001: Pricing page
**Description:** As a visitor, I want to see VanMan's pricing so that I can evaluate the cost for my business.

**Acceptance Criteria:**
- [ ] Page at `/pricing`
- [ ] Single plan displayed prominently (no confusing tier comparison)
- [ ] Plan card shows:
  - Plan name (e.g., "VanMan Pro" or simply "VanMan")
  - Monthly price with currency based on detected/selected region
  - "per month" label
  - Annual pricing option with discount (e.g., "Save 20% with annual billing")
  - Monthly/Annual toggle switch
- [ ] Feature inclusion list: checkmarks for all features included
  - Unlimited jobs
  - Unlimited contacts
  - Unlimited users
  - All features included (calendar, booking, SMS, invoicing, etc.)
  - Xero integration
  - iOS & Android mobile app (drivers, operators, admins)
  - Team chat (real-time staff messaging)
  - Email & SMS customer communications
- [ ] "Start Free Trial" CTA button (prominent)
- [ ] "14-day free trial. No credit card required." messaging
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Pricing FAQ section
**Description:** As a visitor, I want answers to common pricing questions so that I can make a confident decision.

**Acceptance Criteria:**
- [ ] FAQ accordion below the pricing card:
  - "What happens after the free trial?"
  - "Can I cancel anytime?"
  - "Do I need a credit card to start?"
  - "Is there a setup fee?"
  - "What payment methods do you accept?"
  - "Do you offer discounts for annual billing?"
  - "Can I change my plan later?"
  - "What's included in the free trial?"
- [ ] Expandable/collapsible answers
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Signup page
**Description:** As a visitor, I want to create an account so that I can start my free trial.

**Acceptance Criteria:**
- [ ] Page at `/signup`
- [ ] Signup form fields:
  - Full name
  - Email address
  - Password (with strength indicator)
  - Company name
  - Country/Region selector (NZ, AU, UK, US, Other)
- [ ] "Or sign up with Google" OAuth option
- [ ] Terms of Service and Privacy Policy checkbox with links
- [ ] On submit: creates Clerk user + Clerk organization (tenant)
- [ ] Redirects to onboarding wizard on success
- [ ] "Already have an account? Log in" link
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Free trial activation
**Description:** As a new user, I want my free trial to start automatically so that I can use VanMan immediately without payment.

**Acceptance Criteria:**
- [ ] On successful signup: 14-day free trial starts automatically
- [ ] Stripe customer and subscription created in "trialing" state (no payment method required)
- [ ] Trial end date stored and visible in account settings
- [ ] No feature restrictions during trial (full access to everything)
- [ ] Typecheck passes

### US-005: Onboarding wizard — Company setup
**Description:** As a new user, I want to set up my company details so that VanMan is configured for my business.

**Acceptance Criteria:**
- [ ] Onboarding wizard at `/onboarding` (multi-step flow)
- [ ] Step 1 — Company Details:
  - Company name (pre-filled from signup)
  - Phone number
  - Email address
  - Physical address (Google Places autocomplete)
  - Timezone (auto-detected, editable)
  - GST/Tax number (optional)
  - Logo upload (optional)
- [ ] Progress indicator showing current step
- [ ] "Skip" option available (can complete later in settings)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Onboarding wizard — First truck
**Description:** As a new user, I want to add my first truck so that I can start scheduling jobs.

**Acceptance Criteria:**
- [ ] Step 2 — Add Your First Truck:
  - Truck name (e.g., "Van 1", "Big Truck")
  - Color picker (for calendar identification)
  - Capacity in cubic meters (optional)
  - Registration plate (optional)
- [ ] "Add another truck" option to add multiple
- [ ] "Skip" option (can add later)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Onboarding wizard — Invite team
**Description:** As a new user, I want to invite my team so that my operators and drivers can access VanMan.

**Acceptance Criteria:**
- [ ] Step 3 — Invite Your Team:
  - Email input with role selector (Admin, Operator, Driver)
  - "Add another" to invite multiple people
  - Sends Clerk invitation emails on submit
- [ ] "Skip" option (can invite later)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-008: Onboarding wizard — Connect Xero (optional)
**Description:** As a new user, I want the option to connect Xero during setup so that invoicing works from the start.

**Acceptance Criteria:**
- [ ] Step 4 — Connect Your Accounting:
  - "Connect Xero" button initiating OAuth flow
  - Brief explanation of what connecting Xero enables
  - "I'll do this later" skip option (prominent — this is optional)
- [ ] If connected: shows success confirmation with Xero org name
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: Onboarding wizard — Download mobile app
**Description:** As a new user, I want to download the mobile app during onboarding so that my drivers and field staff can get started.

**Acceptance Criteria:**
- [ ] Step 5 — Get the Mobile App:
  - App Store and Google Play download badges/links
  - QR code that opens the app store listing on the user's phone
  - Brief overview: "Your drivers see their assigned jobs, track delivery times, chat with the team, and navigate to addresses — all from their phone"
  - "Send download link to my team" option (sends SMS/email with app store links to invited team members)
- [ ] "Skip" option (can download later)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-010: Onboarding wizard — Completion
**Description:** As a new user, I want to finish onboarding and reach the app so that I can start using VanMan.

**Acceptance Criteria:**
- [ ] Step 6 — You're All Set:
  - Summary of what was configured
  - "Go to Dashboard" primary CTA
  - Quick links: "Create your first job", "Explore settings", "Read getting started guide"
  - Confetti animation or celebratory visual (subtle)
- [ ] Marks onboarding as complete in user metadata (won't show again)
- [ ] Redirects to main app dashboard (`/dashboard`)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-011: Stripe billing portal
**Description:** As a customer, I want to manage my subscription so that I can add a payment method, view invoices, and cancel if needed.

**Acceptance Criteria:**
- [ ] "Manage Billing" link in the main app's settings page
- [ ] Opens Stripe Customer Portal (hosted by Stripe)
- [ ] Portal allows: update payment method, view invoices, cancel subscription, switch billing period
- [ ] Webhook handler for Stripe events: `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
- [ ] On trial expiry without payment method: account moves to "expired" state with grace period messaging
- [ ] Typecheck passes

## Functional Requirements

- FR-1: Pricing displayed in visitor's regional currency (NZD, AUD, GBP, USD) based on region selector or geo-detection
- FR-2: Signup creates both a Clerk user and a Clerk organization in a single atomic flow
- FR-3: Stripe subscription created via server-side API on signup (not client-side)
- FR-4: Free trial is 14 days with full feature access
- FR-5: Onboarding wizard state persisted (if user closes browser mid-wizard, they resume where they left off)
- FR-6: Onboarding data writes to the main app's database (Supabase) via API or server actions
- FR-7: All Stripe webhook events verified using webhook signature
- FR-8: Login page at `/login` redirects authenticated users to the main app

## Non-Goals

- No multiple pricing tiers or feature gating (single flat plan)
- No annual contracts or enterprise custom pricing
- No in-app upgrade/downgrade flows (single plan means no plan changes)
- No affiliate or referral program
- No coupon/promo code system (can be added later via Stripe)
- No usage-based billing or per-truck pricing

## Design Considerations

- Pricing page: single prominent card, not a comparison table (there's only one plan)
- Signup: minimal fields — get them in fast, collect details in onboarding
- Onboarding wizard: friendly, encouraging tone — "Let's get you set up" not "Configure your system"
- Progress bar shows steps completed, allows clicking back to previous steps
- Mobile: wizard works fully on mobile (single-column layout)

## Technical Considerations

- Clerk signup: use Clerk's `<SignUp>` component customized with additional fields, or build custom form with Clerk SDK `createUser` + `createOrganization`
- Stripe: use `stripe` Node.js SDK server-side. Create customer + subscription on signup webhook or server action
- Stripe Customer Portal: configure via Stripe dashboard (branding, allowed actions)
- Stripe webhooks: `/api/webhooks/stripe` endpoint with signature verification
- Onboarding wizard state: store in database (`onboarding_progress` table or user metadata in Clerk)
- Regional currency: use `Intl.NumberFormat` for display, store prices in cents per currency in a config
- This PRD has a dependency on the main app's database for onboarding data writes — needs an API contract or shared database access

## Success Metrics

- Signup completion rate over 60% (visitors who start signup finish it)
- Onboarding wizard completion rate over 70%
- Time from signup to first job created under 10 minutes
- Free trial to paid conversion rate over 15%
- Churn rate under 5% monthly

## Open Questions

- What is the monthly price point? (needs business decision — e.g., $99 NZD/month?)
- What is the annual discount percentage? (e.g., 2 months free = ~17% discount)
- Should we require email verification before the trial starts?
- How long is the grace period after trial expiry before restricting access?
- Should the onboarding wizard be part of the public website project or the main app project? (It writes to the main app's database, so it may make more sense in the main app with a redirect from signup)
