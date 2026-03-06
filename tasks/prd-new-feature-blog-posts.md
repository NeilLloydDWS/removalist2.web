# PRD: Blog Posts for New Features

## Introduction

Write blog posts to announce and explain the new features added to VanMan. One "What's New" overview post covers all 7 features at a high level. Three deep-dive posts cover the biggest features in detail: Workflow Automation, Email Integration (Gmail + Outlook), and Day Plan with Live Tracking.

## Goals

- Publish 1 "What's New in VanMan" overview blog post covering all 7 new features
- Publish 3 deep-dive blog posts: Workflow Automation, Email Integration, Day Plan & Live Tracking
- All posts written in the same practical, conversational tone as existing VanMan blog posts
- Posts target both existing customers (product updates) and potential customers (SEO)
- Light VanMan feature mentions via `<Callout>` blocks, ending with `<CTABanner>`

## User Stories

### US-001: Create "What's New in VanMan" overview blog post
**Description:** As a content creator, I want to publish a product update post announcing all 7 new features so that existing and prospective customers know what's new.

**Acceptance Criteria:**
- [ ] File created at `content/blog/whats-new-in-vanman-march-2026.mdx`
- [ ] Frontmatter: title "What's New in VanMan: 7 Features to Run Your Moving Company Smarter", date "2026-03-06", author "Neill Lloyd", category "Product Updates", excerpt summarising the 7 new features, featuredImage "/blog/images/whats-new-march.svg", tags ["product-updates", "new-features", "vanman", "2026"], featured true
- [ ] Read existing posts in content/blog/ first and match tone, structure (800–1200 words)
- [ ] Content covers all 7 new features with a ## heading for each: Workflow Automation, Gmail & Outlook Email Integration, Day Plan, Calendar Events, Live Truck Tracking, Materials & Costing — with 2–3 sentences explaining each and why it matters
- [ ] Include 1–2 `<Callout>` blocks
- [ ] End with `<CTABanner>` component
- [ ] Written in Australian English
- [ ] Create SVG at `public/blog/images/whats-new-march.svg` matching existing SVG style
- [ ] Update `getting-started-with-vanman.mdx` to set `featured: false` since this new post will be featured
- [ ] Typecheck passes

### US-002: Create "Workflow Automation" deep-dive blog post
**Description:** As a content creator, I want to publish a deep-dive post on workflow automation so that moving company owners searching for business automation discover VanMan.

**Acceptance Criteria:**
- [ ] File created at `content/blog/automate-your-moving-business-with-workflows.mdx`
- [ ] Frontmatter: title "Automate Your Moving Business: A Guide to VanMan's Workflow Builder", date "2026-03-04", author "Neill Lloyd", category "Product Updates", excerpt about automating repetitive tasks with visual workflows, featuredImage "/blog/images/workflow-automation.svg", tags ["automation", "workflows", "productivity", "product-updates"], featured false
- [ ] Read existing posts first and match tone and depth (800–1200 words)
- [ ] Content covers: what workflow automation is and why it matters for removalists, the visual drag-and-drop builder, trigger types (job created, status changed, booking received), action types (send SMS, send email, create invoice, call webhook), conditional logic and delay nodes, human approval workflows, pre-built templates, real examples (e.g. auto-send confirmation SMS when job is confirmed, auto-create Xero invoice when job is completed)
- [ ] Include 1–2 `<Callout>` blocks
- [ ] End with `<CTABanner>` component
- [ ] Written in Australian English
- [ ] Create SVG at `public/blog/images/workflow-automation.svg` matching existing style
- [ ] Typecheck passes

### US-003: Create "Email Integration" deep-dive blog post
**Description:** As a content creator, I want to publish a deep-dive post on Gmail and Outlook integration so that moving company owners searching for email management discover VanMan.

**Acceptance Criteria:**
- [ ] File created at `content/blog/gmail-outlook-integration-for-moving-companies.mdx`
- [ ] Frontmatter: title "Gmail & Outlook Integration: Every Email Linked to the Right Job", date "2026-03-02", author "Neill Lloyd", category "Product Updates", excerpt about connecting Gmail or Outlook to automatically capture emails against jobs, featuredImage "/blog/images/email-integration.svg", tags ["email", "gmail", "outlook", "integrations", "product-updates"], featured false
- [ ] Read existing posts first and match tone and depth (800–1200 words)
- [ ] Content covers: the problem (emails about jobs scattered across inboxes, context lost), how it works (connect Gmail or Outlook with one click, VanMan watches for emails mentioning job numbers), automatic job matching, email threading and conversation view, replying from inside VanMan, attachment capture, real-time webhooks for instant updates
- [ ] Include 1–2 `<Callout>` blocks
- [ ] End with `<CTABanner>` component
- [ ] Written in Australian English
- [ ] Create SVG at `public/blog/images/email-integration.svg` matching existing style
- [ ] Typecheck passes

### US-004: Create "Day Plan & Live Tracking" deep-dive blog post
**Description:** As a content creator, I want to publish a deep-dive post on the Day Plan and live truck tracking so that moving company owners searching for fleet visibility discover VanMan.

**Acceptance Criteria:**
- [ ] File created at `content/blog/day-plan-and-live-truck-tracking.mdx`
- [ ] Frontmatter: title "Day Plan & Live Tracking: See Your Entire Operation in Real Time", date "2026-02-28", author "Neill Lloyd", category "Product Updates", excerpt about the Day Plan dashboard combining calendar and map for real-time operations visibility, featuredImage "/blog/images/day-plan-tracking.svg", tags ["day-plan", "live-tracking", "fleet", "operations", "product-updates"], featured false
- [ ] Read existing posts first and match tone and depth (800–1200 words)
- [ ] Content covers: the Day Plan dashboard (calendar timeline + Google Maps side by side), colour-coded truck routes and markers, cross-highlighting between calendar and map, live truck GPS tracking via mobile app, InfoWindow popups with job details, how it helps operations managers coordinate on busy days
- [ ] Include 1–2 `<Callout>` blocks
- [ ] End with `<CTABanner>` component
- [ ] Written in Australian English
- [ ] Create SVG at `public/blog/images/day-plan-tracking.svg` matching existing style
- [ ] Typecheck passes

### US-005: Verify all blog posts render correctly
**Description:** As a developer, I want to verify all 11 blog posts (7 existing + 4 new) render correctly.

**Acceptance Criteria:**
- [ ] Run the build and confirm no TypeScript or build errors
- [ ] All 11 posts appear on `/blog` sorted by date (newest first)
- [ ] The "What's New" post shows as featured (and the old Getting Started post is no longer featured)
- [ ] Category filter works for "Product Updates" showing all product update posts
- [ ] RSS feed at `/blog/rss.xml` includes all 11 posts
- [ ] Typecheck passes

## Functional Requirements

- FR-1: Each post must be an `.mdx` file in `content/blog/` with valid YAML frontmatter
- FR-2: Each post must have a unique slug derived from the filename
- FR-3: Each post must have an SVG featured image in `public/blog/images/`
- FR-4: Posts must use existing MDX components (`<Callout>`, `<CTABanner>`) — no new components
- FR-5: The "What's New" post must be set as `featured: true` and the existing "Getting Started" post updated to `featured: false`
- FR-6: Post dates should be staggered: Mar 6, Mar 4, Mar 2, Feb 28
- FR-7: All posts in Australian English
- FR-8: Blog categories used: "Product Updates" for all 4 posts

## Non-Goals

- No changes to blog infrastructure, components, or layout
- No new MDX components
- No changes to existing blog posts (except toggling `featured` on Getting Started)
- No changes to existing SEO-driven blog posts

## Technical Considerations

- Posts are `.mdx` files processed by `gray-matter` and `next-mdx-remote`
- Featured post logic is driven by the `featured: true` frontmatter field — only one post should be featured at a time
- SVG images follow the pattern: 1200x675, coloured background with white text

## Success Metrics

- All 4 new posts render correctly with table of contents, share buttons, and related posts
- Blog listing shows 11 total posts with correct featured post
- No build errors or TypeScript warnings

## Open Questions

- Should the "What's New" post link to the individual deep-dive posts?
- Should we add a "Product Updates" category filter link to the blog navigation if it's not already there?
