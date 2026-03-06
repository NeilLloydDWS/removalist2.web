# PRD: New Feature Pages for Website

## Introduction

Update the VanMan marketing website to showcase 7 new features that have been added to the app. Major features (Workflow Automation, Email Integration, Day Plan) get their own dedicated feature pages. Smaller features (Calendar Events, Live Truck Tracking, Materials & Costing) are added to existing related feature pages.

## Goals

- Add 3 new feature landing pages: Workflow Automation, Email Integration (Gmail + Outlook), Day Plan
- Update 2 existing feature pages: Calendar & Scheduling (add Calendar Events), Fleet Management (add Live Tracking)
- Update 1 existing feature page: Invoicing & Xero (add Materials & Costing)
- Add all new features to the features list on the main Features page
- Maintain consistent structure and tone with existing feature pages

## User Stories

### US-001: Add "Workflow Automation" to features list
**Description:** As a website visitor, I want to see Workflow Automation listed on the main features page so I know VanMan offers business automation.

**Acceptance Criteria:**
- [ ] Add new entry to `src/lib/features.ts` with slug `workflow-automation`, name "Workflow Automation", tagline "Automate your business rules", icon "Workflow", and 4 bullet points covering: visual workflow builder, trigger-based automation, conditional logic with approvals, pre-built templates
- [ ] Entry appears on the `/features` page in the features grid
- [ ] Typecheck passes

### US-002: Create "Workflow Automation" feature page data
**Description:** As a website visitor, I want a dedicated `/features/workflow-automation` page so I can learn about VanMan's workflow automation capabilities.

**Acceptance Criteria:**
- [ ] Create `src/lib/feature-pages/workflow-automation.ts` following the `FeaturePageData` interface
- [ ] Title: "Workflow Automation", tagline: "Automate your business rules"
- [ ] 3 benefits covering: visual workflow builder (drag-and-drop nodes), trigger-based automation (job created, status changed, booking received), built-in templates for common workflows
- [ ] 3 detail sections covering: the React Flow visual editor with trigger/condition/action/delay/approval nodes, action types (send SMS, send email, change status, create Xero invoice, call webhook), execution logs and dry-run testing
- [ ] Integration callout referencing job-management, customer-communications, invoicing-xero
- [ ] Related features: job-management, customer-communications, invoicing-xero
- [ ] SEO metadata with title "Workflow Automation for Moving Companies | VanMan"
- [ ] Register in `src/lib/feature-pages/index.ts`
- [ ] Page renders at `/features/workflow-automation`
- [ ] Typecheck passes

### US-003: Add "Email Integration" to features list
**Description:** As a website visitor, I want to see Email Integration listed on the main features page so I know VanMan connects to Gmail and Outlook.

**Acceptance Criteria:**
- [ ] Add new entry to `src/lib/features.ts` with slug `email-integration`, name "Email Integration", tagline "Your inbox meets your jobs", icon "Mail", and 4 bullet points covering: Gmail and Outlook support, automatic email-to-job matching by job number, reply to emails from inside VanMan, attachment capture and storage
- [ ] Entry appears on the `/features` page
- [ ] Typecheck passes

### US-004: Create "Email Integration" feature page data
**Description:** As a website visitor, I want a dedicated `/features/email-integration` page so I can learn about VanMan's Gmail and Outlook email integration.

**Acceptance Criteria:**
- [ ] Create `src/lib/feature-pages/email-integration.ts` following the `FeaturePageData` interface
- [ ] Title: "Email Integration", tagline: "Your inbox meets your jobs"
- [ ] 3 benefits covering: automatic job matching (emails mentioning job numbers are captured against the right job), reply from VanMan (respond to emails without leaving the app), works with Gmail and Outlook/Microsoft 365
- [ ] 3 detail sections covering: one-click OAuth connect for Gmail or Outlook, real-time email capture via webhooks (Gmail Pub/Sub and Microsoft Graph), email threading with attachment storage
- [ ] Integration callout referencing job-management, customer-communications
- [ ] Related features: job-management, customer-communications, workflow-automation
- [ ] SEO metadata with title "Gmail & Outlook Integration for Moving Companies | VanMan"
- [ ] Register in `src/lib/feature-pages/index.ts`
- [ ] Page renders at `/features/email-integration`
- [ ] Typecheck passes

### US-005: Add "Day Plan" to features list
**Description:** As a website visitor, I want to see Day Plan listed on the main features page so I know VanMan offers a daily operations overview.

**Acceptance Criteria:**
- [ ] Add new entry to `src/lib/features.ts` with slug `day-plan`, name "Day Plan", tagline "Your daily operations at a glance", icon "MapPin", and 4 bullet points covering: calendar timeline plus Google Maps in one view, colour-coded truck routes and markers, cross-highlighting between calendar and map, real-time location updates
- [ ] Entry appears on the `/features` page
- [ ] Typecheck passes

### US-006: Create "Day Plan" feature page data
**Description:** As a website visitor, I want a dedicated `/features/day-plan` page so I can learn about VanMan's daily operations dashboard.

**Acceptance Criteria:**
- [ ] Create `src/lib/feature-pages/day-plan.ts` following the `FeaturePageData` interface
- [ ] Title: "Day Plan", tagline: "Your daily operations at a glance"
- [ ] 3 benefits covering: calendar + map view (see all today's jobs on a timeline and map simultaneously), route visualisation (Google Maps with driving routes between job locations), real-time updates (live truck positions and job status changes)
- [ ] 3 detail sections covering: the split-screen layout with time-block calendar and Google Maps, truck route polylines with colour-coded markers and InfoWindow popups, cross-highlighting where clicking a job on the calendar highlights it on the map and vice versa
- [ ] Integration callout referencing calendar-scheduling, fleet-management, mobile-app
- [ ] Related features: calendar-scheduling, fleet-management, mobile-app
- [ ] SEO metadata with title "Daily Operations Dashboard for Moving Companies | VanMan"
- [ ] Register in `src/lib/feature-pages/index.ts`
- [ ] Page renders at `/features/day-plan`
- [ ] Typecheck passes

### US-007: Update "Calendar & Scheduling" feature page with Calendar Events
**Description:** As a website visitor, I want the Calendar & Scheduling feature page to mention calendar events so I know VanMan supports custom events alongside jobs.

**Acceptance Criteria:**
- [ ] Add a 4th detail section to `src/lib/feature-pages/calendar-scheduling.ts` covering calendar events: create custom events (meetings, training, vehicle servicing) alongside jobs on the same calendar, with all-day and timed event support, colour-coded display, and contact assignment
- [ ] Add "Custom events alongside jobs" to the bullets in `src/lib/features.ts` for calendar-scheduling (replace least important bullet or add 5th)
- [ ] Typecheck passes

### US-008: Update "Fleet Management" feature page with Live Truck Tracking
**Description:** As a website visitor, I want the Fleet Management feature page to mention live GPS tracking so I know VanMan tracks truck locations in real time.

**Acceptance Criteria:**
- [ ] Add a 4th detail section to `src/lib/feature-pages/fleet-management.ts` covering live tracking: real-time GPS tracking of trucks via the mobile app, live map view showing all truck positions with heading and speed, and location history
- [ ] Add a 4th benefit about live tracking: icon "MapPin", title "Track trucks in real time", description about seeing live truck positions on a map from the office
- [ ] Update the tagline or description in `src/lib/features.ts` fleet-management bullets to mention live tracking
- [ ] Typecheck passes

### US-009: Update "Invoicing & Xero" feature page with Materials & Costing
**Description:** As a website visitor, I want the Invoicing & Xero feature page to mention materials and job costing so I know VanMan handles detailed cost tracking.

**Acceptance Criteria:**
- [ ] Add a 4th detail section to `src/lib/feature-pages/invoicing-xero.ts` covering materials and costing: material catalog with categories and pricing, add materials to jobs for accurate costing, quote generation from materials, and cost-to-invoice workflow
- [ ] Add a 4th benefit about job costing: icon "Calculator", title "Detailed job costing", description about tracking materials, labour, and costs per job
- [ ] Update bullets in `src/lib/features.ts` for invoicing-xero to mention job costing/materials
- [ ] Typecheck passes

### US-010: Verify all feature pages render correctly
**Description:** As a developer, I want to verify all feature pages (9 existing + 3 new) render without errors.

**Acceptance Criteria:**
- [ ] Run `npx tsc --noEmit` and confirm no TypeScript errors
- [ ] Run `npx next build` and confirm all 12 feature pages generate successfully
- [ ] All 12 features appear on the `/features` page
- [ ] New pages render at `/features/workflow-automation`, `/features/email-integration`, `/features/day-plan`
- [ ] Typecheck passes

## Functional Requirements

- FR-1: Add 3 new entries to `src/lib/features.ts` array (workflow-automation, email-integration, day-plan)
- FR-2: Create 3 new feature page data files in `src/lib/feature-pages/` following the `FeaturePageData` interface exactly
- FR-3: Register all 3 new feature pages in `src/lib/feature-pages/index.ts`
- FR-4: Update 3 existing feature page data files with new detail sections and benefits
- FR-5: All feature page data must follow the existing `FeaturePageData` interface (no schema changes)
- FR-6: Use Lucide icon names that exist in the lucide-react package
- FR-7: All text written in Australian English

## Non-Goals

- No changes to the feature page React components or layout
- No new images or screenshots (heroImage and imagePlaceholder are text descriptions)
- No changes to the `/features` page component itself
- No changes to routing or dynamic page generation

## Technical Considerations

- Feature pages are statically generated via `generateStaticParams()` in `src/app/features/[slug]/page.tsx` — new slugs must be in the `featurePages` record to generate
- The `features` array in `src/lib/features.ts` drives the main features grid — order matters for visual layout
- Icon names must match Lucide React icon component names
- `relatedFeatures` slugs must reference valid feature slugs

## Success Metrics

- All 12 feature pages render without errors
- Build completes successfully with all static pages generated
- No TypeScript errors

## Open Questions

- Should the 3 new features appear at the end of the features list or be interspersed among existing features?
- Should any existing feature's `relatedFeatures` be updated to reference the new features?
