# PRD PW-05: Blog & Content Management

## Introduction

Build a blog for the VanMan public website to drive organic search traffic, establish thought leadership in the removalist/moving industry, and provide valuable content that attracts prospective customers. The blog targets moving company owners and operators searching for business advice, industry tips, and software solutions across NZ, AU, UK, and US markets.

## Goals

- Launch a blog with SEO-optimized content targeting removalist/moving industry keywords
- Provide a simple content authoring workflow using MDX files (no external CMS dependency)
- Drive organic traffic that converts to free trial signups
- Support region-relevant content (NZ/AU/UK/US terminology and market context)
- Establish VanMan as a trusted voice in the moving industry

## User Stories

### US-001: Blog listing page
**Description:** As a visitor, I want to browse blog posts so that I can find articles relevant to my moving business.

**Acceptance Criteria:**
- [ ] Page at `/blog`
- [ ] Grid of blog post cards (2-col desktop, 1-col mobile):
  - Featured image/thumbnail
  - Title
  - Publication date
  - Category tag
  - 1-2 line excerpt
  - Read time estimate
- [ ] Posts ordered by publication date (newest first)
- [ ] Pagination or "Load more" (10 posts per page)
- [ ] Featured/pinned post at top (larger card, hero-style)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-002: Blog category filtering
**Description:** As a visitor, I want to filter blog posts by category so that I can find content on a specific topic.

**Acceptance Criteria:**
- [ ] Category filter bar at top of blog listing:
  - All
  - Business Tips
  - Industry News
  - Product Updates
  - Guides & How-tos
  - Customer Stories
- [ ] Clicking a category filters the post list (client-side or SSG per category)
- [ ] URL updates to `/blog/category/[slug]` for shareability
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Individual blog post page
**Description:** As a visitor, I want to read a full blog post so that I can learn from VanMan's content.

**Acceptance Criteria:**
- [ ] Page at `/blog/[slug]`
- [ ] Post layout:
  - Title (h1)
  - Publication date + author name + read time
  - Category tag (linked to category filter)
  - Featured image (full-width or hero)
  - Article body with rich formatting (headings, lists, images, code blocks, blockquotes, tables)
  - Author bio card at bottom
- [ ] Table of contents sidebar for long posts (auto-generated from headings, sticky on desktop)
- [ ] "Share" buttons: copy link, X/Twitter, LinkedIn, Facebook
- [ ] CTA banner within or after the post: "Try VanMan free for 14 days"
- [ ] "Related posts" section (3 posts from the same category)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: MDX content authoring
**Description:** As a content author, I want to write blog posts in Markdown so that I don't need a CMS or developer to publish.

**Acceptance Criteria:**
- [ ] Blog posts stored as `.mdx` files in `content/blog/[slug].mdx`
- [ ] Frontmatter schema:
  ```yaml
  title: "Post Title"
  date: "2026-02-19"
  author: "Author Name"
  category: "Business Tips"
  excerpt: "Short description for cards and SEO"
  featuredImage: "/blog/images/post-slug.webp"
  tags: ["scheduling", "efficiency", "tips"]
  ```
- [ ] MDX supports custom components: `<Callout>`, `<ImageWithCaption>`, `<VideoEmbed>`, `<CTABanner>`
- [ ] New posts go live on next build/deploy (no manual step beyond merging the MDX file)
- [ ] Typecheck passes

### US-005: Blog SEO optimization
**Description:** As the marketing team, I want each blog post to be SEO-optimized so that posts rank well in search engines.

**Acceptance Criteria:**
- [ ] Each post generates: `<title>`, `<meta description>`, canonical URL
- [ ] Open Graph tags: `og:title`, `og:description`, `og:image`, `og:type=article`
- [ ] Twitter Card tags: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Structured data: `Article` schema (JSON-LD) with headline, datePublished, author, image
- [ ] Auto-generated sitemap includes all blog posts with `lastmod` dates
- [ ] Typecheck passes

### US-006: RSS feed
**Description:** As a subscriber, I want an RSS feed so that I can follow VanMan's blog in my feed reader.

**Acceptance Criteria:**
- [ ] RSS feed at `/blog/rss.xml` (generated at build time)
- [ ] Feed includes: title, description, link, publication date, author for each post
- [ ] RSS autodiscovery link in `<head>` of blog pages
- [ ] Typecheck passes

## Functional Requirements

- FR-1: Blog posts are statically generated from MDX files at build time
- FR-2: Blog listing supports pagination (SSG pages for `/blog`, `/blog/page/2`, etc.)
- FR-3: Category pages statically generated for each category
- FR-4: Images in blog posts use Next.js `<Image>` with lazy loading and size optimization
- FR-5: Read time calculated from word count (~200 words per minute)
- FR-6: Related posts determined by matching category and tags
- FR-7: Blog search (basic): client-side search across titles and excerpts using a pre-built index

## Non-Goals

- No external CMS integration (Contentful, Sanity, etc.) — MDX files are sufficient for launch
- No comments system on blog posts
- No newsletter subscription (can be added later)
- No multi-language content (English only, but with region-aware terminology)
- No author login or editorial workflow (posts managed via Git)

## Design Considerations

- Blog design should match the overall marketing site aesthetic (clean, professional)
- Featured images: 16:9 aspect ratio, optimized WebP
- Post body: comfortable reading width (max-w-prose), generous line height, clear heading hierarchy
- Mobile: single-column, table of contents collapsed into a dropdown

## Technical Considerations

- Use `@next/mdx` or `contentlayer` / `velite` for MDX processing
- MDX components defined in `components/mdx/` — reusable across blog and help docs (PRD-PW-06)
- Blog post index built at compile time and exported as static JSON for client-side search
- Consider `next-sitemap` package for automated sitemap generation
- Featured images stored in `public/blog/images/`

## Success Metrics

- Blog drives 30%+ of organic search traffic to the site within 6 months
- Average blog session duration over 2 minutes
- Blog-to-signup conversion rate over 2%
- At least 1 blog post ranking on page 1 for a target keyword within 3 months

## Open Questions

- How frequently will new posts be published? (weekly, biweekly, monthly?)
- Who will write the content? (internal team, freelancers, AI-assisted?)
- Should we plan content around regional keywords (e.g., "removalist tips NZ" vs. "moving company tips US")?
- Do we want to support guest posts from customers (customer stories)?
