# PRD: Help Center — Remaining Category Articles

## Introduction

The VanMan Help Center currently has articles for two of ten categories: **Getting Started** (8 articles) and **Invoicing & Xero** (1 article). The remaining eight categories have defined metadata and empty content directories. This PRD covers writing 5–7 MDX articles per category to fill the gaps, giving users self-service documentation for every major feature.

All articles are stored as MDX files in `content/help/[category-slug]/[article-slug].mdx` with YAML frontmatter and use the existing custom components (`<StepByStep>`, `<Step>`, `<Callout>`, `<UIPath>`).

## Goals

- Provide 5–7 help articles for each of the 8 empty categories (40–56 articles total)
- Match the tone, depth, and component usage of existing Getting Started articles
- Ensure every article is searchable via title, description, and tags
- Reduce support burden by covering the most common user questions per feature area

## User Stories

### US-001: Write Calendar & Scheduling articles
**Description:** As a user, I want help articles about the calendar so I can learn to schedule jobs, drag-and-drop reschedule, and read the weekly view.

**Acceptance Criteria:**
- [ ] 6 MDX files created in `content/help/calendar-scheduling/`
- [ ] Articles cover: navigating the weekly view, scheduling a job on the calendar, drag-and-drop rescheduling, understanding truck colour lanes, using day/month views, handling scheduling conflicts
- [ ] Each file has valid frontmatter (title, description, category, sortOrder, lastUpdated, tags)
- [ ] Articles use `<StepByStep>`, `<Step>`, `<Callout>`, and `<UIPath>` components where appropriate
- [ ] Typecheck/lint passes

### US-002: Write Job Management articles
**Description:** As a user, I want help articles about jobs so I can learn to create, edit, track, and complete jobs.

**Acceptance Criteria:**
- [ ] 6 MDX files created in `content/help/job-management/`
- [ ] Articles cover: understanding job statuses (enquiry → completed), editing a job, adding stops to a job, adding notes and photos, tracking job history and audit trail, searching and filtering jobs
- [ ] Each file has valid frontmatter
- [ ] Articles use existing MDX components consistently
- [ ] Typecheck/lint passes

### US-003: Write Fleet & Trucks articles
**Description:** As a user, I want help articles about fleet management so I can manage trucks, colours, capacity, and team leaders.

**Acceptance Criteria:**
- [ ] 5 MDX files created in `content/help/fleet-trucks/`
- [ ] Articles cover: adding and editing trucks, choosing truck colours for the calendar, setting truck capacity, assigning a default team leader, deactivating a truck
- [ ] Each file has valid frontmatter
- [ ] Articles use existing MDX components consistently
- [ ] Typecheck/lint passes

### US-004: Write Booking Requests articles
**Description:** As a user, I want help articles about the online booking form so I can set it up, manage enquiries, and convert them to jobs.

**Acceptance Criteria:**
- [ ] 6 MDX files created in `content/help/booking-requests/`
- [ ] Articles cover: setting up your online booking form, embedding the form on your website, managing incoming enquiries, converting a booking to a job, customising booking form fields, understanding the booking pipeline (New → Contacted → Quoted → Confirmed → Declined)
- [ ] Each file has valid frontmatter
- [ ] Articles use existing MDX components consistently
- [ ] Typecheck/lint passes

### US-005: Write Customer Communications articles
**Description:** As a user, I want help articles about SMS and email so I can send messages, use templates, and track delivery.

**Acceptance Criteria:**
- [ ] 6 MDX files created in `content/help/customer-communications/`
- [ ] Articles cover: sending an SMS from a job, sending an email from a job, creating and editing message templates, using template variables (customer name, date, address, driver), understanding delivery statuses, managing incoming SMS replies
- [ ] Each file has valid frontmatter
- [ ] Articles use existing MDX components consistently
- [ ] Typecheck/lint passes

### US-006: Write Mobile App articles
**Description:** As a user, I want help articles about the mobile app so drivers, operators, and admins know how to use it.

**Acceptance Criteria:**
- [ ] 6 MDX files created in `content/help/mobile-app/`
- [ ] Articles cover: downloading and signing in to the app, the driver day view (today's jobs), tracking time on a job, creating a job from mobile (operator), processing payments on mobile, sending invoices from mobile
- [ ] Each file has valid frontmatter
- [ ] Articles use existing MDX components consistently
- [ ] Typecheck/lint passes

### US-007: Write Team Chat articles
**Description:** As a user, I want help articles about team chat so I can message my crew and stay coordinated.

**Acceptance Criteria:**
- [ ] 5 MDX files created in `content/help/team-chat/`
- [ ] Articles cover: starting a new conversation, sending and receiving messages, understanding read status and unread counts, push notifications for messages, using chat on mobile
- [ ] Each file has valid frontmatter
- [ ] Articles use existing MDX components consistently
- [ ] Typecheck/lint passes

### US-008: Write Account & Billing articles
**Description:** As a user, I want help articles about billing and account settings so I can manage my subscription, invite team members, and update roles.

**Acceptance Criteria:**
- [ ] 6 MDX files created in `content/help/account-billing/`
- [ ] Articles cover: managing your subscription and billing, updating your payment method, understanding your free trial, inviting team members, managing user roles (Admin, Operator, Driver), cancelling your subscription
- [ ] Each file has valid frontmatter
- [ ] Articles use existing MDX components consistently
- [ ] Typecheck/lint passes

## Functional Requirements

- FR-1: Each article must be a valid MDX file with YAML frontmatter containing: `title`, `description`, `category`, `sortOrder`, `lastUpdated` (set to `"2026-03-01"`), and `tags` (array of 3–5 searchable keywords)
- FR-2: The `category` frontmatter field must match the parent directory slug exactly
- FR-3: Article filenames must be kebab-case and descriptive (e.g., `drag-and-drop-rescheduling.mdx`)
- FR-4: Articles must use the existing MDX components: `<StepByStep>` with `<Step>` for procedural guides, `<Callout variant="info|tip|warning">` for callouts, and `<UIPath path="..." />` for navigation paths
- FR-5: Each article should be 200–400 words of body content (matching existing article depth)
- FR-6: Articles must be written in active voice, second-person ("you"), with clear instructional tone matching existing Getting Started articles
- FR-7: `sortOrder` values must be sequential within each category starting at 1
- FR-8: All articles must render without errors when the Next.js dev server builds the help pages

## Non-Goals

- No new MDX components — use only existing ones
- No changes to `src/lib/help.ts` or any other source code — just add content files
- No video embeds or image assets — text and component-based content only
- No articles for Getting Started or Invoicing & Xero (already done)
- No FAQ or troubleshooting section per article — keep format consistent with existing articles

## Design Considerations

- Reuse the exact same MDX component patterns seen in `content/help/getting-started/*.mdx`
- Keep article length consistent: 3–6 `<Step>` elements for procedural articles, or 2–4 headed sections for conceptual articles
- Use `<Callout variant="tip">` for best-practice advice, `<Callout variant="info">` for contextual notes, `<Callout variant="warning">` for gotchas
- Use `<UIPath>` any time you reference a menu path (e.g., `<UIPath path="Settings > Trucks" />`)

## Technical Considerations

- Files go in existing empty directories under `content/help/`
- The build system reads MDX via `gray-matter` and processes content at build time
- Tags are used by the client-side search in `src/components/help-search.tsx`
- `generateStaticParams()` in the route files auto-discovers new articles — no code changes needed
- Related articles are auto-suggested from the same category via `getRelatedHelpArticles()`

## Success Metrics

- All 8 empty categories have 5–7 articles each (40–56 total new articles)
- `next build` completes without errors
- Every new article appears in the help center search results when searching by title or tags
- Category pages show correct article counts in the sidebar

## Open Questions

- Should any articles cross-reference articles in other categories (e.g., "See also: Creating your first job")?
- Are there specific edge cases or common support questions that should be prioritised as dedicated articles?

## Article Plan by Category

### Calendar & Scheduling (6 articles)
| # | Slug | Title |
|---|------|-------|
| 1 | `navigating-the-weekly-view` | Navigating the weekly view |
| 2 | `scheduling-a-job` | Scheduling a job on the calendar |
| 3 | `drag-and-drop-rescheduling` | Drag-and-drop rescheduling |
| 4 | `understanding-truck-colour-lanes` | Understanding truck colour lanes |
| 5 | `switching-between-views` | Switching between day, week, and month views |
| 6 | `resolving-scheduling-conflicts` | Resolving scheduling conflicts |

### Job Management (6 articles)
| # | Slug | Title |
|---|------|-------|
| 1 | `understanding-job-statuses` | Understanding job statuses |
| 2 | `editing-a-job` | Editing a job |
| 3 | `adding-stops-to-a-job` | Adding stops to a job |
| 4 | `adding-notes-and-photos` | Adding notes and photos to a job |
| 5 | `job-history-and-audit-trail` | Job history and audit trail |
| 6 | `searching-and-filtering-jobs` | Searching and filtering jobs |

### Fleet & Trucks (5 articles)
| # | Slug | Title |
|---|------|-------|
| 1 | `adding-and-editing-trucks` | Adding and editing trucks |
| 2 | `choosing-truck-colours` | Choosing truck colours for the calendar |
| 3 | `setting-truck-capacity` | Setting truck capacity |
| 4 | `assigning-a-default-team-leader` | Assigning a default team leader |
| 5 | `deactivating-a-truck` | Deactivating a truck |

### Booking Requests (6 articles)
| # | Slug | Title |
|---|------|-------|
| 1 | `setting-up-your-booking-form` | Setting up your online booking form |
| 2 | `embedding-the-form-on-your-website` | Embedding the booking form on your website |
| 3 | `managing-incoming-enquiries` | Managing incoming enquiries |
| 4 | `converting-a-booking-to-a-job` | Converting a booking to a job |
| 5 | `customising-booking-form-fields` | Customising booking form fields |
| 6 | `understanding-the-booking-pipeline` | Understanding the booking pipeline |

### Customer Communications (6 articles)
| # | Slug | Title |
|---|------|-------|
| 1 | `sending-an-sms-from-a-job` | Sending an SMS from a job |
| 2 | `sending-an-email-from-a-job` | Sending an email from a job |
| 3 | `creating-message-templates` | Creating and editing message templates |
| 4 | `using-template-variables` | Using template variables |
| 5 | `understanding-delivery-statuses` | Understanding delivery statuses |
| 6 | `managing-incoming-sms-replies` | Managing incoming SMS replies |

### Mobile App (6 articles)
| # | Slug | Title |
|---|------|-------|
| 1 | `downloading-and-signing-in` | Downloading and signing in to the app |
| 2 | `driver-day-view` | The driver day view |
| 3 | `tracking-time-on-a-job` | Tracking time on a job |
| 4 | `creating-a-job-from-mobile` | Creating a job from mobile |
| 5 | `processing-payments-on-mobile` | Processing payments on mobile |
| 6 | `sending-invoices-from-mobile` | Sending invoices from mobile |

### Team Chat (5 articles)
| # | Slug | Title |
|---|------|-------|
| 1 | `starting-a-new-conversation` | Starting a new conversation |
| 2 | `sending-and-receiving-messages` | Sending and receiving messages |
| 3 | `read-status-and-unread-counts` | Read status and unread counts |
| 4 | `push-notifications-for-messages` | Push notifications for messages |
| 5 | `using-chat-on-mobile` | Using chat on mobile |

### Account & Billing (6 articles)
| # | Slug | Title |
|---|------|-------|
| 1 | `managing-your-subscription` | Managing your subscription and billing |
| 2 | `updating-your-payment-method` | Updating your payment method |
| 3 | `understanding-your-free-trial` | Understanding your free trial |
| 4 | `inviting-team-members` | Inviting team members |
| 5 | `managing-user-roles` | Managing user roles |
| 6 | `cancelling-your-subscription` | Cancelling your subscription |
