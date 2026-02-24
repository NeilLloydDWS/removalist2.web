# PRD PW-01: Project Foundation & Brand Design System

## Introduction

Set up the public-facing SaaS marketing website as a standalone Next.js project within the monorepo. This establishes the technical foundation, brand design system, shared layout components, and deployment pipeline. The website sells VanMan — a SaaS operations platform for removalist and moving companies — to a global English-speaking market (NZ, AU, UK, US).

## Goals

- Stand up a new Next.js project in `/publicweb` with TypeScript strict mode
- Define the brand design system: colors, typography, spacing, imagery direction
- Build reusable layout components: header, footer, page wrapper, section containers
- Achieve Lighthouse performance score of 95+ across all pages
- Deploy to Vercel with preview environments
- Support dark/light mode from day one

## User Stories

### US-001: Next.js project scaffold
**Description:** As a developer, I need a working Next.js project so that all subsequent pages have a foundation to build on.

**Acceptance Criteria:**
- [ ] Next.js 15+ with App Router, TypeScript strict mode
- [ ] Tailwind CSS v4 configured with custom theme tokens
- [ ] shadcn/ui installed and configured (consistent with the main app's component library)
- [ ] ESLint + Prettier configured
- [ ] `publicweb/` folder is self-contained — its own `package.json`, `tsconfig.json`, `next.config.ts`
- [ ] `npm run dev` starts the dev server on a different port than the main app
- [ ] Typecheck passes

### US-002: Brand design tokens and theme
**Description:** As a designer/developer, I want a defined set of brand tokens so that every page has a consistent, professional look.

**Acceptance Criteria:**
- [ ] Color palette defined in Tailwind config: primary (brand blue), secondary (accent), neutral grays, success/warning/error semantic colors
- [ ] Typography scale: heading sizes (h1–h4), body, small, caption — using a clean sans-serif (e.g., Inter or Geist)
- [ ] Spacing scale consistent with Tailwind defaults
- [ ] Border radius, shadow, and transition tokens defined
- [ ] Dark mode variant for all color tokens (via CSS variables + `next-themes`)
- [ ] A `/style-guide` dev-only page showing all tokens rendered (colors, type scale, buttons, cards)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Shared layout — Header with navigation
**Description:** As a visitor, I want a clear navigation header so that I can find any page on the site.

**Acceptance Criteria:**
- [ ] Sticky header with logo (left), nav links (center), and CTA button (right)
- [ ] Nav links: Features, Pricing, Blog, Help, Contact
- [ ] "Start Free Trial" primary CTA button in header
- [ ] Mobile: hamburger menu with slide-out drawer containing all nav links + CTA
- [ ] Active link highlighting based on current route
- [ ] Header becomes slightly opaque/blurred on scroll (glassmorphism effect)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Shared layout — Footer
**Description:** As a visitor, I want a footer with links and company info so that I can navigate to secondary pages and find contact details.

**Acceptance Criteria:**
- [ ] Multi-column footer layout:
  - Column 1: Logo + tagline + social links (LinkedIn, Facebook, X)
  - Column 2: Product (Features, Pricing, Changelog)
  - Column 3: Resources (Blog, Help Center, FAQ, API Docs)
  - Column 4: Company (About, Contact, Careers)
  - Column 5: Legal (Terms of Service, Privacy Policy, Cookie Policy)
- [ ] Bottom bar: copyright notice, region selector (NZ/AU/UK/US)
- [ ] Responsive: stacks to 2-column on tablet, single column on mobile
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Page wrapper and section components
**Description:** As a developer, I need reusable page and section components so that all marketing pages have consistent spacing and structure.

**Acceptance Criteria:**
- [ ] `<PageWrapper>` component: sets max-width, horizontal padding, vertical spacing between sections
- [ ] `<Section>` component: accepts `variant` prop (default, alternate-bg, dark, gradient) for visual rhythm
- [ ] `<SectionHeader>` component: eyebrow text, heading, subheading — centered or left-aligned
- [ ] `<Container>` component: constrains content width (max-w-7xl)
- [ ] `<Grid>` component: responsive grid with 2/3/4 column options
- [ ] All components responsive across mobile/tablet/desktop breakpoints
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Vercel deployment pipeline
**Description:** As a developer, I want the public website to deploy automatically so that changes are live without manual steps.

**Acceptance Criteria:**
- [ ] Vercel project configured for the `/publicweb` directory (monorepo root directory override)
- [ ] Production deploys on push to `main` branch
- [ ] Preview deploys on pull requests
- [ ] Environment variables configured (analytics keys, API URLs, etc.)
- [ ] Custom domain support ready (e.g., vanman.app or similar)
- [ ] Build succeeds with no warnings

## Functional Requirements

- FR-1: The public website is a completely separate Next.js application — no shared runtime with the main app
- FR-2: All pages must achieve Lighthouse performance score of 95+ and accessibility score of 90+
- FR-3: Dark/light mode toggle persisted in localStorage via `next-themes`
- FR-4: All images use Next.js `<Image>` component with proper sizing and lazy loading
- FR-5: Font files self-hosted (no external Google Fonts requests) for performance and privacy
- FR-6: The site must be fully functional with JavaScript disabled (SSG/SSR for all content pages)

## Non-Goals

- No connection to the main app's database or API (completely standalone)
- No user authentication on the marketing site (that's PRD-PW-04's signup flow)
- No CMS integration in this PRD (that's PRD-PW-05 for the blog)
- No analytics setup in this PRD (that's PRD-PW-08)

## Design Considerations

- Visual style: clean, modern, professional — think Linear, Vercel, or Stripe marketing sites
- Generous whitespace, large headings, high-contrast text
- Illustrations or isometric graphics showing the product in action (calendar, trucks, mobile driver view)
- Photography style: real removalist teams working, not generic stock photos
- Color palette should feel trustworthy and operational — blues, with warm accents

## Technical Considerations

- Use Next.js App Router with static generation (`generateStaticParams`) for all marketing pages
- Consider using `@next/mdx` for content-heavy pages (blog posts, help articles)
- Image optimization via Vercel's built-in image CDN
- Font optimization via `next/font`
- Shared component library could use a `components/` folder mirroring shadcn/ui patterns

## Success Metrics

- Lighthouse performance: 95+ on all pages
- Lighthouse accessibility: 90+ on all pages
- Time to First Byte (TTFB): under 200ms
- Largest Contentful Paint (LCP): under 2.5s
- Build time: under 60 seconds

## Open Questions

- Should we use a monorepo tool (Turborepo) to manage the two projects, or keep them fully independent?
- What is the production domain? (vanman.app, getvanman.com, vanman.io, etc.)
- Should we use the same shadcn/ui theme as the main app or create a distinct marketing-site theme?
