# PRD PW-06: Help Center & FAQ

## Introduction

Build a self-service help center and FAQ section for the VanMan public website. This serves two audiences: prospective customers evaluating VanMan (pre-sale FAQ) and existing customers needing guidance (product documentation). A well-structured help center reduces support burden, improves customer onboarding, and builds confidence in the product for prospects still deciding.

## Goals

- Provide self-service product documentation organized by feature area
- Answer common pre-sale questions to remove signup friction
- Reduce support tickets by enabling customers to find answers themselves
- Create getting-started guides that complement the onboarding wizard (PRD-PW-04)
- Make all help content searchable

## User Stories

### US-001: Help center landing page
**Description:** As a visitor or customer, I want a help center homepage so that I can quickly find the help I need.

**Acceptance Criteria:**
- [ ] Page at `/help`
- [ ] Search bar prominently positioned at the top ("Search help articles...")
- [ ] Category grid below search (card per category):
  - Getting Started
  - Calendar & Scheduling
  - Job Management
  - Fleet & Trucks
  - Booking Requests
  - Customer Communications
  - Invoicing & Xero
  - Mobile App
  - Team Chat
  - Account & Billing
- [ ] Each category card: icon, title, article count, brief description
- [ ] "Popular articles" section showing top 5 most-visited articles
- [ ] "Contact Support" link for issues not covered
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Help category page
**Description:** As a visitor, I want to browse articles within a category so that I can find the specific help article I need.

**Acceptance Criteria:**
- [ ] Page at `/help/[category-slug]`
- [ ] Category heading with description
- [ ] List of articles within the category, ordered by importance (manual sort order)
- [ ] Each article: title, 1-line description, estimated read time
- [ ] Breadcrumb: Help > [Category Name]
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Individual help article page
**Description:** As a visitor, I want to read a help article so that I can learn how to use a specific feature.

**Acceptance Criteria:**
- [ ] Page at `/help/[category-slug]/[article-slug]`
- [ ] Article layout:
  - Title (h1)
  - Last updated date
  - Article body with rich formatting (headings, lists, images, callouts, step-by-step instructions)
  - Table of contents (auto-generated from headings, sidebar on desktop)
- [ ] "Was this helpful?" feedback widget at the bottom (Yes/No — stores analytics event)
- [ ] "Related articles" section (3 articles from the same category)
- [ ] Breadcrumb: Help > [Category] > [Article Title]
- [ ] "Still need help? Contact support" link at bottom
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Help center search
**Description:** As a visitor, I want to search across all help articles so that I can find answers quickly.

**Acceptance Criteria:**
- [ ] Search bar on help center landing page and in the header of all help pages
- [ ] Instant search results as user types (client-side search against pre-built index)
- [ ] Results show: article title, category, excerpt with highlighted matching text
- [ ] "No results" state with suggestion to contact support
- [ ] Search query tracked in analytics (to identify content gaps)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Getting started guides
**Description:** As a new customer, I want step-by-step getting started guides so that I can set up VanMan for my business.

**Acceptance Criteria:**
- [ ] "Getting Started" category with ordered guides:
  1. "Setting up your account" — company details, timezone, GST
  2. "Adding your trucks" — creating trucks with colors and capacity
  3. "Creating your first job" — walkthrough of job creation
  4. "Setting up your booking form" — embedding the public booking form
  5. "Connecting Xero" — OAuth setup and account/item sync
  6. "Inviting your team" — adding operators and drivers
  7. "Setting up the mobile app" — downloading, logging in, role overview
  8. "Sending your first SMS" — configuring Twilio and creating templates
- [ ] Each guide: numbered steps with screenshots, callout boxes for tips/warnings
- [ ] Checklist progress (optional — "Mark as complete" per guide)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: FAQ page
**Description:** As a prospective customer, I want a FAQ page so that I can get quick answers to common questions before signing up.

**Acceptance Criteria:**
- [ ] Page at `/faq`
- [ ] FAQ sections:
  - **General:** What is VanMan? Who is it for? What countries do you support?
  - **Pricing & Billing:** How much does it cost? Is there a free trial? Can I cancel anytime? What payment methods do you accept?
  - **Features:** Does VanMan have a mobile app? Can I send SMS to customers? Does it integrate with Xero? Can my drivers use it?
  - **Setup & Migration:** How long does setup take? Can I import data from my old system? Do you offer migration help?
  - **Security & Privacy:** Where is my data stored? Is it secure? Is my data backed up? Do you comply with NZ Privacy Act?
  - **Support:** How do I get help? What are your support hours? Do you offer training?
- [ ] Accordion UI (click to expand/collapse answers)
- [ ] Anchor links for each section (shareable direct links)
- [ ] CTA at bottom: "Still have questions? Contact us" + "Start Free Trial"
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: MDX content authoring for help articles
**Description:** As a content author, I want to write help articles in Markdown so that documentation is easy to maintain.

**Acceptance Criteria:**
- [ ] Help articles stored as `.mdx` files in `content/help/[category]/[article-slug].mdx`
- [ ] Frontmatter schema:
  ```yaml
  title: "Article Title"
  description: "Short description for category listing and SEO"
  category: "getting-started"
  sortOrder: 1
  lastUpdated: "2026-02-19"
  tags: ["setup", "onboarding"]
  ```
- [ ] Shared MDX components with the blog: `<Callout>`, `<StepByStep>`, `<ImageWithCaption>`, `<VideoEmbed>`
- [ ] Additional help-specific components: `<KeyboardShortcut>`, `<UIPath>` (e.g., "Settings → Integrations → Xero")
- [ ] Typecheck passes

## Functional Requirements

- FR-1: All help articles statically generated from MDX at build time
- FR-2: Search index built at compile time from article titles, descriptions, headings, and body text
- FR-3: Client-side search using a lightweight library (e.g., Fuse.js or FlexSearch)
- FR-4: Each article has SEO metadata: title, description, canonical URL, JSON-LD (HowTo or FAQPage schema)
- FR-5: FAQ page uses FAQPage structured data for Google rich results
- FR-6: Help articles included in the sitemap
- FR-7: "Was this helpful?" feedback tracked as analytics events (PRD-PW-08)

## Non-Goals

- No user-submitted questions or community forum
- No ticketing system or live chat (support handled via email/phone separately)
- No versioned documentation (no "v1 docs" vs. "v2 docs")
- No video production (embed placeholders for future videos)
- No AI-powered chatbot for help queries

## Design Considerations

- Clean, documentation-style layout with generous whitespace
- Sidebar navigation on desktop showing category tree + current article highlighted
- Mobile: collapsed sidebar as hamburger/dropdown
- Screenshots annotated with numbered callouts pointing to UI elements
- Callout box variants: Info (blue), Tip (green), Warning (yellow), Important (red)

## Technical Considerations

- MDX processing shared with the blog (PRD-PW-05) — same `@next/mdx` or `contentlayer` setup
- Search index: generate a JSON file at build time, load it client-side with FlexSearch or Fuse.js
- Article images stored in `public/help/images/[category]/`
- Help content should be crawlable and indexable (no client-side-only rendering)
- Consider structured data for FAQ and HowTo pages to enable Google rich snippets

## Success Metrics

- Help center resolves 70%+ of common questions without a support ticket
- Average session duration on help pages over 2 minutes
- "Was this helpful?" positive rate over 80%
- Help center search returns relevant results for 90%+ of queries
- FAQ page ranks for "VanMan" + common question keywords

## Open Questions

- Should help articles be publicly accessible (good for SEO) or behind authentication (only for customers)?
- Do we need a changelog or "What's new" section to announce product updates?
- Should we integrate with a support tool (Intercom, Zendesk) for the "Contact Support" flow?
- What is the initial set of help articles needed for launch? (Getting started guides are the minimum)
