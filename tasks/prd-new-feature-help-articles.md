# PRD: Help Center Articles for New Features

## Introduction

Add help center articles for the 7 new features in VanMan. This includes creating 2 new help categories (Workflow Automation, Integrations) and adding articles to 3 existing categories (Calendar & Scheduling, Fleet & Trucks, Invoicing & Xero). Each article follows the existing help article format: 200–400 words, second-person active voice, using `<StepByStep>`, `<Step>`, `<Callout>`, and `<UIPath>` components.

## Goals

- Create new help category "Integrations" with articles covering Gmail, Outlook, and Xero setup
- Create new help category "Workflow Automation" with articles covering the workflow builder
- Add articles to existing "Calendar & Scheduling" category for calendar events
- Add articles to existing "Fleet & Trucks" category for live tracking
- Add articles to existing "Invoicing & Xero" category for materials and costing
- Register new categories in the help system so they appear on the `/help` page
- All articles match existing help content tone and structure

## User Stories

### US-001: Add "Integrations" help category
**Description:** As a developer, I need to register the "Integrations" help category so articles appear on the help center.

**Acceptance Criteria:**
- [ ] Add `integrations` entry to `categoryMeta` in `src/lib/help.ts` with name "Integrations", description "Connect Gmail, Outlook, and Xero to VanMan.", icon "Plug"
- [ ] Create directory `content/help/integrations/`
- [ ] Category appears on `/help` page
- [ ] Typecheck passes

### US-002: Write Gmail integration help articles
**Description:** As a user, I want help articles about connecting Gmail so I can set up email capture and reply from VanMan.

**Acceptance Criteria:**
- [ ] Create 3 MDX files in `content/help/integrations/`: `connecting-gmail.mdx`, `how-email-job-matching-works.mdx`, `replying-to-emails-from-vanman.mdx`
- [ ] Each file has YAML frontmatter with title, description, category: "integrations", sortOrder (1–3), lastUpdated: "2026-03-06", and tags (3–5 keywords)
- [ ] Read existing help articles first (e.g. `content/help/getting-started/`) and match tone, depth (200–400 words), active voice, second-person style
- [ ] Articles use `<StepByStep>`/`<Step>` for procedural guides, `<Callout>` for tips/warnings, and `<UIPath>` for menu paths
- [ ] Cover: connecting Gmail via Settings > Integrations with OAuth one-click flow, how VanMan matches emails to jobs by scanning for job numbers in subject lines, replying to emails from the Messages tab on a job using the reply drawer
- [ ] Typecheck passes

### US-003: Write Outlook integration help articles
**Description:** As a user, I want help articles about connecting Outlook so I can set up email capture from Microsoft 365.

**Acceptance Criteria:**
- [ ] Create 2 MDX files in `content/help/integrations/`: `connecting-outlook.mdx`, `gmail-vs-outlook-which-to-connect.mdx`
- [ ] Each file has YAML frontmatter with title, description, category: "integrations", sortOrder (4–5), lastUpdated: "2026-03-06", and tags (3–5 keywords)
- [ ] Read existing help articles first and match tone, depth (200–400 words), active voice, second-person style
- [ ] Articles use `<StepByStep>`/`<Step>`, `<Callout>`, and `<UIPath>`
- [ ] Cover: connecting Outlook via Settings > Integrations with Microsoft OAuth flow, comparison of Gmail vs Outlook integration (both work the same way — connect whichever your business uses, only one can be active at a time)
- [ ] Typecheck passes

### US-004: Write Xero integration help articles
**Description:** As a user, I want comprehensive help articles about Xero integration beyond the single existing "Connecting Xero" article.

**Acceptance Criteria:**
- [ ] Create 4 MDX files in `content/help/invoicing-xero/`: `creating-an-invoice-from-a-job.mdx`, `understanding-xero-sync.mdx`, `troubleshooting-xero-errors.mdx`, `viewing-the-xero-audit-log.mdx`
- [ ] Each file has YAML frontmatter with title, description, category: "invoicing-xero", sortOrder (2–5, after the existing connecting-xero article at sortOrder 1), lastUpdated: "2026-03-06", and tags (3–5 keywords)
- [ ] Read existing help articles first and match tone and depth (200–400 words)
- [ ] Articles use `<StepByStep>`/`<Step>`, `<Callout>`, and `<UIPath>`
- [ ] Cover: generating an invoice from a completed job with one click, how two-way Xero sync works (invoices, contacts, payment status), common Xero errors and how to resolve them (auth expired, account code mismatch), viewing the integration audit log at Settings > Integrations > Xero
- [ ] Typecheck passes

### US-005: Add "Workflow Automation" help category
**Description:** As a developer, I need to register the "Workflow Automation" help category so articles appear on the help center.

**Acceptance Criteria:**
- [ ] Add `workflow-automation` entry to `categoryMeta` in `src/lib/help.ts` with name "Workflow Automation", description "Build automated workflows to save time on repetitive tasks.", icon "Workflow"
- [ ] Create directory `content/help/workflow-automation/`
- [ ] Category appears on `/help` page
- [ ] Typecheck passes

### US-006: Write workflow automation help articles
**Description:** As a user, I want help articles about workflow automation so I can build and manage workflows.

**Acceptance Criteria:**
- [ ] Create 5 MDX files in `content/help/workflow-automation/`: `creating-your-first-workflow.mdx`, `understanding-triggers-and-actions.mdx`, `adding-conditions-and-delays.mdx`, `using-workflow-templates.mdx`, `viewing-workflow-execution-logs.mdx`
- [ ] Each file has YAML frontmatter with title, description, category: "workflow-automation", sortOrder (1–5), lastUpdated: "2026-03-06", and tags (3–5 keywords)
- [ ] Read existing help articles first and match tone and depth (200–400 words)
- [ ] Articles use `<StepByStep>`/`<Step>`, `<Callout>`, and `<UIPath>`
- [ ] Cover: creating a workflow via Settings > Workflows with the visual editor, trigger types (job_created, job_status_changed, booking_created, etc.) and action types (send SMS, send email, change status, create Xero invoice, call webhook), adding condition nodes for branching logic and delay nodes for timed actions, using pre-built templates to get started quickly, viewing execution history and step-by-step logs for debugging
- [ ] Typecheck passes

### US-007: Write calendar events help articles
**Description:** As a user, I want help articles about calendar events so I can create custom events alongside jobs.

**Acceptance Criteria:**
- [ ] Create 2 MDX files in `content/help/calendar-scheduling/`: `creating-a-calendar-event.mdx`, `managing-all-day-events.mdx`
- [ ] Each file has YAML frontmatter with title, description, category: "calendar-scheduling", sortOrder (7–8, after existing 6 articles), lastUpdated: "2026-03-06", and tags (3–5 keywords)
- [ ] Read existing help articles first and match tone and depth (200–400 words)
- [ ] Articles use `<StepByStep>`/`<Step>`, `<Callout>`, and `<UIPath>`
- [ ] Cover: creating a timed or all-day event on the calendar (via the event dialog), choosing a colour and assigning a truck, adding contacts to an event, how all-day events display as a collapsible banner above the time grid
- [ ] Typecheck passes

### US-008: Write live truck tracking help articles
**Description:** As a user, I want help articles about live truck tracking so I can see where my trucks are in real time.

**Acceptance Criteria:**
- [ ] Create 2 MDX files in `content/help/fleet-trucks/`: `viewing-live-truck-locations.mdx`, `how-truck-tracking-works.mdx`
- [ ] Each file has YAML frontmatter with title, description, category: "fleet-trucks", sortOrder (6–7, after existing 5 articles), lastUpdated: "2026-03-06", and tags (3–5 keywords)
- [ ] Read existing help articles first and match tone and depth (200–400 words)
- [ ] Articles use `<StepByStep>`/`<Step>`, `<Callout>`, and `<UIPath>`
- [ ] Cover: viewing the live truck map at Trucks > Live Map with real-time markers showing position/heading/speed, how tracking works (mobile app sends GPS coordinates in the background, updates appear in real time on the web dashboard)
- [ ] Typecheck passes

### US-009: Write materials and costing help articles
**Description:** As a user, I want help articles about materials and job costing so I can track costs accurately.

**Acceptance Criteria:**
- [ ] Create 3 MDX files in `content/help/invoicing-xero/`: `setting-up-your-material-catalog.mdx`, `adding-materials-to-a-job.mdx`, `generating-a-quote-from-materials.mdx`
- [ ] Each file has YAML frontmatter with title, description, category: "invoicing-xero", sortOrder (6–8, after the Xero articles), lastUpdated: "2026-03-06", and tags (3–5 keywords)
- [ ] Read existing help articles first and match tone and depth (200–400 words)
- [ ] Articles use `<StepByStep>`/`<Step>`, `<Callout>`, and `<UIPath>`
- [ ] Cover: creating material categories and adding materials with pricing at Settings > Materials, assigning materials to a job from the job detail page costing tab, generating a customer-facing quote from the materials and costs on a job
- [ ] Typecheck passes

### US-010: Verify all help articles render correctly
**Description:** As a developer, I want to verify all help categories and articles render correctly on the help center.

**Acceptance Criteria:**
- [ ] Run `npx tsc --noEmit` and confirm no TypeScript errors
- [ ] Run `npx next build` and confirm all help pages generate successfully
- [ ] 12 help categories appear on `/help` (10 existing + 2 new: Integrations, Workflow Automation)
- [ ] All new articles render at their expected URLs
- [ ] Help search finds new articles by title and tags
- [ ] Typecheck passes

## Functional Requirements

- FR-1: Add 2 new category entries to `categoryMeta` in `src/lib/help.ts` (integrations, workflow-automation)
- FR-2: Create 2 new directories under `content/help/` (integrations, workflow-automation)
- FR-3: Create 21 new MDX help articles total across 5 categories
- FR-4: All articles must have valid YAML frontmatter matching `HelpArticleFrontmatter` interface
- FR-5: Articles must use existing MDX components (`<StepByStep>`, `<Step>`, `<Callout>`, `<UIPath>`) — no new components
- FR-6: `sortOrder` values must not conflict with existing articles in the same category
- FR-7: All articles written in Australian English, second-person active voice, 200–400 words
- FR-8: Icon names must be valid Lucide React icon component names

## Non-Goals

- No changes to help center infrastructure, components, or layout
- No new MDX components
- No changes to existing help articles
- No changes to the help search implementation

## Design Considerations

- Follow exact same content structure and tone as existing help articles
- Use `<StepByStep>`/`<Step>` for any procedural content (e.g. "connecting Gmail")
- Use `<Callout variant="tip">` for pro tips and `<Callout variant="info">` for additional context
- Use `<UIPath path="Settings > Integrations > Gmail" />` for navigation instructions
- Keep paragraphs short (2–3 sentences max)

## Technical Considerations

- Help categories are auto-discovered from directories under `content/help/`
- Category metadata must be registered in `src/lib/help.ts` `categoryMeta` for name, description, and icon
- Articles are sorted by `sortOrder` within each category
- New categories will automatically appear on `/help` and in `/help/[categorySlug]` routes

## Success Metrics

- All 12 help categories display on `/help` with correct article counts
- All 21 new articles render correctly with proper formatting
- Help search returns new articles by title, description, and tags
- No build errors or TypeScript warnings

## Open Questions

- Should the "Getting Started" category be updated with articles about connecting Gmail/Outlook (e.g. "Setting up email integration")?
- Should we add a "Day Plan" article to an existing category or is it covered sufficiently by the Day Plan feature page?
