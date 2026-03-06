# PRD: Blog Posts Batch 2 — 5 SEO-Driven Articles

## Introduction

Add 5 new SEO-driven blog posts to the VanMan blog, targeting high-volume search queries from moving company owners in Australia and New Zealand. These posts are practical and actionable in tone, lightly reference VanMan features where natural, and span the "Guides & How-tos" and "Business Tips" categories to maximise organic search coverage.

The existing blog has 2 posts:
- "Getting Started with VanMan: Your First Week" (Product Updates)
- "5 Tips to Run a More Profitable Moving Company" (Business Tips)

## Goals

- Attract moving company owners via organic search for high-intent keywords
- Cover the 3 unused categories (Guides & How-tos, Industry News) plus expand Business Tips
- Provide genuinely useful content that positions VanMan as a trusted industry resource
- Each post should be 800–1200 words, matching the existing post depth and style
- Lightly mention VanMan features where natural using `<Callout>` blocks (1–2 per post)
- End each post with a `<CTABanner>` component

## User Stories

### US-001: Create "How to Price Moving Jobs" blog post
**Description:** As a content creator, I want to publish an SEO-optimised guide on pricing moving jobs so that removalists searching for quoting advice discover VanMan.

**Acceptance Criteria:**
- [ ] File created at `content/blog/how-to-price-moving-jobs.mdx`
- [ ] Frontmatter follows existing schema: title, date (`2026-02-20`), author (`Neill Lloyd`), category (`Guides & How-tos`), excerpt, featuredImage, tags, featured (false)
- [ ] Content covers: hourly vs fixed-rate models, accounting for stairs/access/travel time, seasonal pricing (AU/NZ peak Dec–Feb), binding vs non-binding estimates, common underquoting mistakes, worked example of pricing a 3-bedroom house move
- [ ] Uses 1–2 `<Callout>` blocks referencing VanMan's quoting/job costing features
- [ ] Ends with `<CTABanner>` component
- [ ] Post renders correctly at `/blog/how-to-price-moving-jobs`
- [ ] Featured image SVG created at `public/blog/images/pricing-guide.svg`

### US-002: Create "How to Start a Removalist Business in Australia" blog post
**Description:** As a content creator, I want to publish a comprehensive startup guide so that aspiring removalist business owners find VanMan early in their journey.

**Acceptance Criteria:**
- [ ] File created at `content/blog/how-to-start-a-removalist-business.mdx`
- [ ] Frontmatter follows existing schema: title, date (`2026-02-18`), author (`Neill Lloyd`), category (`Guides & How-tos`), excerpt, featuredImage, tags, featured (false)
- [ ] Content covers: ABN registration, insurance requirements (public liability, goods in transit, workers comp), licensing by state, purchasing/leasing trucks, building a team, setting pricing, getting first customers, choosing software
- [ ] Uses 1–2 `<Callout>` blocks referencing VanMan as the software choice for new operators
- [ ] Ends with `<CTABanner>` component
- [ ] Post renders correctly at `/blog/how-to-start-a-removalist-business`
- [ ] Featured image SVG created at `public/blog/images/start-business.svg`

### US-003: Create "Local SEO for Removalists" blog post
**Description:** As a content creator, I want to publish a practical local SEO guide so that removalist owners searching for marketing help discover VanMan.

**Acceptance Criteria:**
- [ ] File created at `content/blog/local-seo-for-removalists.mdx`
- [ ] Frontmatter follows existing schema: title, date (`2026-02-15`), author (`Neill Lloyd`), category (`Business Tips`), excerpt, featuredImage, tags, featured (false)
- [ ] Content covers: Google Business Profile setup/optimisation, getting and responding to reviews, location-specific landing pages, building local citations (Yellow Pages, Oneflare, Hipages, TrueLocal), mobile site speed, Google Maps pack
- [ ] Uses 1–2 `<Callout>` blocks referencing VanMan's online booking and customer review features
- [ ] Ends with `<CTABanner>` component
- [ ] Post renders correctly at `/blog/local-seo-for-removalists`
- [ ] Featured image SVG created at `public/blog/images/local-seo.svg`

### US-004: Create "Hiring and Keeping Good Movers" blog post
**Description:** As a content creator, I want to publish a crew management guide so that removalist owners struggling with staffing find VanMan.

**Acceptance Criteria:**
- [ ] File created at `content/blog/hiring-and-keeping-good-movers.mdx`
- [ ] Frontmatter follows existing schema: title, date (`2026-02-12`), author (`Neill Lloyd`), category (`Business Tips`), excerpt, featuredImage, tags, featured (false)
- [ ] Content covers: where to find reliable crew (job boards, word of mouth, trade schools), interview tips, structured training programs (lifting techniques, truck loading, customer communication), retention strategies (career paths, recognition, fair scheduling), cost of turnover, mentorship/buddy system approach
- [ ] Uses 1–2 `<Callout>` blocks referencing VanMan's team management and driver app
- [ ] Ends with `<CTABanner>` component
- [ ] Post renders correctly at `/blog/hiring-and-keeping-good-movers`
- [ ] Featured image SVG created at `public/blog/images/crew-management.svg`

### US-005: Create "Moving Company Marketing on a Budget" blog post
**Description:** As a content creator, I want to publish a budget marketing guide so that removalist owners looking for affordable growth strategies discover VanMan.

**Acceptance Criteria:**
- [ ] File created at `content/blog/moving-company-marketing-on-a-budget.mdx`
- [ ] Frontmatter follows existing schema: title, date (`2026-02-08`), author (`Neill Lloyd`), category (`Business Tips`), excerpt, featuredImage, tags, featured (false)
- [ ] Content covers: Google Business Profile (free), asking for reviews systematically, Facebook marketing, referral programs with real estate agents/property managers, vehicle signage/branding, Oneflare/Hipages/Airtasker profiles, basic Google Ads setup, approximate costs and expected ROI per channel
- [ ] Uses 1–2 `<Callout>` blocks referencing VanMan's customer communication and online booking features
- [ ] Ends with `<CTABanner>` component
- [ ] Post renders correctly at `/blog/moving-company-marketing-on-a-budget`
- [ ] Featured image SVG created at `public/blog/images/marketing-budget.svg`

### US-006: Verify all posts appear on blog listing
**Description:** As a developer, I want to verify all 7 blog posts (2 existing + 5 new) render correctly on the blog listing page.

**Acceptance Criteria:**
- [ ] All 7 posts appear on `/blog` sorted by date (newest first)
- [ ] Category filter works for "Guides & How-tos" and "Business Tips"
- [ ] Blog search finds new posts by title, excerpt, and tags
- [ ] RSS feed at `/blog/rss.xml` includes all 7 posts
- [ ] No TypeScript or build errors

## Functional Requirements

- FR-1: Each post must be an `.mdx` file in `content/blog/` with valid YAML frontmatter matching the existing schema
- FR-2: Each post must have a unique slug derived from the filename
- FR-3: Each post must have an SVG featured image in `public/blog/images/`
- FR-4: Posts must use existing MDX components (`<Callout>`, `<CTABanner>`) — no new components required
- FR-5: Post dates should be staggered between the two existing post dates (Feb 5–10) and spread across Feb 8–20 to create a natural publishing cadence
- FR-6: All posts must have `featured: false` (the existing "Getting Started" post is the featured post)
- FR-7: Tags should be relevant SEO keywords, 3–5 per post, no duplicates of existing post tags where possible
- FR-8: Content should be written in Australian English (favour "organise" over "organize", "labour" over "labor", etc.)

## Non-Goals

- No changes to blog infrastructure, components, or layout
- No new MDX components
- No changes to existing blog posts
- No Customer Stories category posts (these should come from real user interviews)
- No Product Updates category posts (these serve existing users, not SEO)

## Design Considerations

- Follow the exact same content structure and tone as the existing "5 Tips" post
- Use `##` headings for major sections (these populate the table of contents)
- Use `<Callout variant="tip">` or `<Callout variant="info">` for VanMan mentions
- Use `<CTABanner>` at the end of each post with a relevant heading/text
- Bold key terms and use bullet lists for scannability
- Keep paragraphs short (2–4 sentences max)

## Technical Considerations

- No code changes required — only new `.mdx` content files and `.svg` image files
- SVG featured images should follow the same style/dimensions as existing ones (`getting-started.svg`, `business-tips.svg`)
- Posts are statically generated at build time via `getAllBlogPosts()` in `src/lib/blog.ts`

## Success Metrics

- All 5 posts render correctly with table of contents, share buttons, and related posts
- Blog listing shows 7 total posts with working category filters
- No build errors or TypeScript warnings
- Posts are discoverable via blog search

## Open Questions

- Should any of the new posts be marked as `featured` instead of the "Getting Started" post?
- Should post dates be set in the past (as specified) or set to today's date?
