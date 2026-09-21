# BeSportify Website — Project Memory

## 1. Purpose

This is the short operational memory for the BeSportify website project. Read it first when resuming work, then read the controlling documents relevant to the requested task.

This file answers:

- Where is the project now?
- What has already been decided and completed?
- What remains uncertain or blocked?
- What was actually verified?
- What is the exact next action?

Do not use this file as a replacement for `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `CONTENT.md`, `RULES.md`, or `PHASES.md`.

## 2. Current snapshot

- Last updated: 06 September 2026
- Programme status: Futuristic kinetic UI elevation complete; bespoke vector logo, cubic-bezier gliding transitions, cricket telemetry HUD, and contrast fixes applied; all tests and build passing
- Current phase: UI Polish and Kinetic Experience Complete
- Active document: `MEMORY.md`
- Repository status: Root Next.js app, design system, Sanity foundation, homepage slice, corporate pages, StatStrike product page, case studies and insights framework, tests, and docs are present
- Production code: Upgraded with kinetic gliding transitions, vector SVG brand assets, telemetry HUD visualizers, and enhanced high-contrast dark/light mode styles
- Sanity project: Configured in-repo with schemas, structure, presentation, homepage singleton, and preview routes
- Website deployment: Not started
- Public launch: Gated by approved editorial content

## 3. Immediate next action

Wait for the next brief before starting another slice. Do not begin the next phase until the phase gate is confirmed.

## 4. Locked product decisions

- Build a public corporate website for BeSportify.
- BeSportify is the parent brand.
- BeSportify is positioned as a sports-technology company with cricket as its current focus.
- StatStrike is the flagship product.
- Use the naming `StatStrike by BeSportify` on first prominent mention.
- The public website and authenticated StatStrike application remain separate.
- Primary public CTA: `Request a Demo`.
- Secondary product CTA: `Explore StatStrike`.
- Launch scope includes Home, Products, StatStrike, Services, Case Studies, Insights, About, Team, Careers, Contact, Privacy, Terms, and 404.
- Empty Case Studies and Insights sections remain out of primary navigation until minimum publishable content exists.

## 5. Locked technical decisions

- Create a separate repository from the StatStrike application.
- Use Next.js App Router and strict TypeScript.
- Use Tailwind CSS with a controlled token system.
- Deploy the public website through Vercel unless a documented later decision replaces it.
- Use Sanity Content Lake and Sanity Studio as the only website CMS.
- Do not build a custom admin panel in V1.
- Deploy Studio at `admin.besportify.com`.
- Keep StatStrike at its existing URL initially; `app.besportify.com` is the future recommended application domain.
- Use structured Sanity schemas, not an unrestricted page builder.
- Use published content in production and drafts only in authenticated preview.
- Do not store contact or careers submissions in Sanity by default.
- Use server-side provider adapters for forms and future integrations.

## 6. Locked editorial and access decisions

- Use individual invited Sanity accounts only.
- Editors draft, edit, upload, and preview.
- Publishers review and publish.
- Publisher access is limited initially to the product owner and one trusted backup.
- Administrator access is more restricted and requires a primary and backup owner.
- Every sensitive claim requires business approval in addition to technical publication permission.
- Team/league names and logos may be displayed only with exact approved relationship wording and permission.
- Product capabilities are classified as `live`, `beta`, `planned`, or `internal`.
- Only verified live capabilities appear unqualified.
- No fabricated clients, partnerships, metrics, testimonials, outcomes, team members, vacancies, or features.

## 7. Locked design decisions

- Direction: premium, paper-first sports-intelligence identity.
- Creative concept: `The Intelligence Layer`.
- BeSportify brand accent: logo-led red/graphite.
- StatStrike brand accent: performance green.
- Typography direction: Space Grotesk for headings and Inter for body/interface.
- Website is light-first, not light-only.
- Long Insights may use a light reading surface.
- Partner logos use original approved colours; monochrome only when supplied/approved.
- Avoid betting, gaming, fantasy-sport, cryptocurrency, generic dashboard, and excessive neon styling.
- Official logo files may require token refinements but should not change the overall system structure.

## 8. Completed documents

| Document | Status | Current purpose |
|---|---|---|
| `PRD.md` | Product scope approved; factual inputs pending | Requirements, users, CMS scope, acceptance criteria |
| `ARCHITECTURE.md` | Core architecture accepted; owner/provider inputs pending | Technical system, Sanity, security, preview, deployment |
| `DESIGN.md` | Design system drafted; official assets pending | Brand, tokens, components, responsive/accessibility rules |
| `CONTENT.md` | Copy framework drafted; factual proof pending | Messaging, page copy, SEO, editorial governance |
| `RULES.md` | Operational rulebook drafted | AI, code, content, security, privacy, QA, release rules |
| `PHASES.md` | Delivery roadmap drafted | Phase dependencies, work, verification, gates, handoffs |
| `MEMORY.md` | Current document | Operational project state |
| `MASTER_PROMPT.md` | Earlier draft; must be rebuilt next | Final Codex execution instructions |

## 9. Work not yet started

- Phase 6 and later vertical slices
- Form delivery
- Analytics and monitoring
- Legal pages
- Production domains and DNS
- QA and launch

Do not report any of these as partially complete merely because they are described in documentation.

## 10. Required Phase 0 inputs

### Company and brand

- Official/legal company name
- Founding year and approved founding story
- BeSportify logo files
- StatStrike logo files
- Existing official brand colours, if any
- Domain ownership and DNS access
- Official email, phone, address, and social links

### StatStrike

- Verified feature/status inventory
- Current data-ingestion and validation explanation
- Current login URL
- Approved screenshots with sensitive data removed
- Product metrics, definitions, sources, and date ranges

### Proof

- Approved teams, leagues, competitions, and academies
- Exact relationship wording for each
- Logo/name/photo permissions
- At least one approved substantive case study
- Testimonials and written permission, if used

### Team and content

- Team member names, roles, biographies, photographs, links, and publication consent
- At least three substantive Insights drafts before enabling the section in navigation
- Careers owner, active roles if any, and general-interest policy

### Operations

- Named primary and backup Sanity Administrators
- Named backup Publisher
- Domain/DNS owner
- Vercel owner and technical backup
- Privacy/data-retention owner
- Form recipient and backup
- Incident escalation owner

## 11. Decisions still open

These decisions do not invalidate the current documents but must be resolved before their relevant phase:

| Decision | Required by | Recommended default |
|---|---|---|
| Sanity plan | Phase 0/2 | Plan that technically supports approved role separation |
| Public/private Sanity dataset | Phase 0/2 | Public dataset for approved public marketing content |
| Canonical apex or `www` domain | Phase 9/launch | `besportify.com` canonical; redirect `www` |
| Contact/CRM provider | Phase 8 | Select after workflow/retention review |
| Analytics provider | Phase 9 | Privacy-appropriate, minimal script |
| Monitoring provider | Phase 9 | Provider with owned alerts |
| Bot protection/rate limiting | Phase 8 | Select before live forms |
| Enquiry/applicant retention | Phase 8/9 | Define with privacy owner; no guessed period |

## 12. Known risks

| Risk | Current control |
|---|---|
| Unsupported partnership wording | Approval fields, Publisher gate, hide until approved |
| Planned features shown as live | Mandatory feature status and production filters |
| Website depends on one technical person | Sanity editor access, backup owners, setup/runbooks |
| CMS flexibility breaks design | Structured schemas; no unrestricted builder |
| Draft content leaks publicly | Published production perspective and protected preview |
| Personal data handled casually | Forms outside Sanity; retention owner required |
| Site fails during CMS outage | Static/cached delivery and graceful fallback |
| Documentation diverges from implementation | Same-change documentation and Memory updates required |

## 13. Candidate relationship references requiring confirmation

The following are known from earlier project context but are not approved website claims yet:

- MP T20
- UP T20
- Assam Premier League

Before publication, record whether BeSportify/StatStrike worked with a league, a participating team, multiple teams, or only analysed public tournament data. Use the narrow exact description and retain permission evidence.

## 14. Verification performed to date

- Documentation files were created and structurally checked for headings and required topics.
- PRD, Architecture, Design, Content, Rules, and Phases were individually expanded and saved as current versions.
- Phase 2 exit criteria were checked against the actual repository state, not just this memory file.
- Sanity schemas, structure, presentation, preview mode, draft-mode routes, publication filters, and access model are present in the repository.
- Phase 3 design-system shell, responsive layout foundation, shared UI primitives, and Portable Text renderer were implemented in the root app.
- Formatting, linting, typechecking, and component tests all passed.
- Production build passed with `npm run build` using webpack after Turbopack and studio-bundle compatibility issues were removed from the app graph.
- Phase 4 homepage slice, homepage singleton, and signed revalidation endpoint were implemented and verified.
- Homepage preview/public fallback behaviour is covered by tests and the build runs successfully with placeholder Sanity env vars.
- Phase 5 corporate pages, team route, and disabled contact interface were implemented and verified.
- Corporate page fallback behaviour is covered by tests and the build runs successfully with placeholder Sanity env vars.
- Manual browser accessibility verification was not run in this session; evidence for the requested cases comes from the component tests and the implemented keyboard/focus/reduced-motion code paths.
- No public business claim has been independently verified during documentation drafting.

## 15. Documentation decisions log

### 23 August 2026 — Parent-brand direction

- Chose BeSportify corporate website instead of a standalone StatStrike brand site.
- StatStrike remains the flagship product.

### 23 August 2026 — Market positioning

- Chose sports-technology company positioning with cricket as the current focus.
- Avoided presenting BeSportify as equally established across multiple sports.

### 23 August 2026 — Launch content scope

- Included core corporate pages plus Case Studies, Insights, Team, and Careers.
- Added minimum-content thresholds for Case Studies and Insights navigation.

### 23 August 2026 — CMS decision

- Selected Sanity for company-managed content and media.
- Rejected a custom admin panel for V1.

### 23 August 2026 — Editorial access

- Approved `admin.besportify.com`.
- Approved two-step Editor-to-Publisher workflow.
- Restricted Publisher and Administrator access.

### 23 August 2026 — Documentation method

- Decided to refine each project document independently so future users can understand it without relying on the product owner.

### 23 August 2026 — Phase 5 corporate pages

- Implemented the Phase 5 corporate page slice in the root Next.js app.
- Added Sanity-backed products, services, about, team, and contact routes with page-specific metadata and structured data.
- Kept the contact form interface disabled so it cannot falsely report successful delivery before an operational provider is approved.
- Exposed the team route in the primary navigation and footer while leaving careers in its later-phase placeholder state.
- Verified the slice with formatting, lint, typecheck, unit tests, and a production build using placeholder Sanity env vars.

## 17. Phase handoff

Phase: Phase 5 - Corporate pages
Status: Complete
Owner: Codex
Completed:

- Built Sanity-backed products, services, about, team, and contact routes in the root Next.js app
- Added page-specific metadata and structured data for each corporate route
- Implemented safe fallback states for missing product media, missing services, missing team profiles, and disabled contact delivery
- Exposed the team page in the primary navigation and footer
- Added unit/component coverage for the contact form and empty-state behavior
- Verified the production build with webpack and placeholder Sanity env vars

Deliverables:

- Products, Services, About, Team, and Contact routes
- Sanity-backed corporate page loaders and approved-content queries
- Disabled contact form interface with no false-success path
- Page metadata and structured data for the corporate slice
- Unit/component tests for the corporate page interaction and empty-state paths

Decisions:

- Keep careers in its later-phase placeholder state
- Expose the team page in primary navigation and footer for the corporate slice
- Keep contact delivery disabled until an operational provider is approved

Verification run:

- `npm run format`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000 NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder NEXT_PUBLIC_SANITY_DATASET=production npm run build`

Verification not run:

- Live browser accessibility pass
- Real Sanity Studio runtime in this sandbox build

Known limitations:

- Contact submissions remain disabled by design until an operational provider is approved
- Careers still uses the later-phase placeholder route

Open blockers and owners:

- None for Phase 5
- Phase 6 work awaits the next instruction

Documents updated:

- `MEMORY.md`
- `src/app/(site)/about/page.tsx`
- `src/app/(site)/contact/page.tsx`
- `src/app/(site)/products/page.tsx`
- `src/app/(site)/services/page.tsx`
- `src/app/(site)/team/page.tsx`
- `src/app/sitemap.ts`
- `src/components/content/json-ld.tsx`
- `src/components/sections/contact-enquiry-form.tsx`
- `src/lib/corporate-pages.ts`
- `src/lib/routes.ts`
- `src/sanity/lib/queries.ts`
- `tests/unit/contact-enquiry-form.test.tsx`
- `tests/unit/contact-page.test.tsx`
- `tests/unit/team-page.test.tsx`

Exact next action:

- Stop after Phase 5 and wait for the Phase 6 brief before starting the StatStrike product experience

## 16. Update rules

### Read before updating

1. Read this file completely.
2. Read controlling documents for the active task.
3. Inspect actual repository/work state.
4. Do not infer completion from an old plan or conversation.

### After each meaningful session

Update these sections:

- Current snapshot
- Immediate next action
- Completed documents/work
- Required inputs or open decisions
- Verification performed
- Decision log when a material decision changes

### History preservation

- Do not delete a decision silently.

## 17. Phase handoff

Phase: Phase 3 - Design system and application shell
Status: Complete
Owner: Codex
Completed:

- Verified Phase 2 against the actual Sanity schemas, role/preview code, publication filters, and tests in the repository
- Implemented the root Next.js app shell, responsive layout primitives, and development showcase
- Implemented the local typed Portable Text renderer for approved block types only
- Added unit/component coverage for the main primitives and content renderer
- Confirmed production build success with webpack

Deliverables:

- Root Next.js app at the repository root
- Global design tokens, typography, containers, and responsive shell
- Header, mobile navigation, footer, and page shell
- Reusable UI primitives and form states
- Typed Portable Text renderer
- Development-only design-system showcase
- Unit/component tests

Decisions:

- Use local Fontsource assets for Inter and Space Grotesk instead of `next/font/google`
- Replace the external Portable Text renderer dependency with a local typed renderer
- Keep the `/studio` route as a lightweight compatibility shell in this environment
- Use webpack for `npm run build` because Turbopack panicked on this sandbox when compiling CSS and studio-related assets

Verification run:

- `npm run format`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000 NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder NEXT_PUBLIC_SANITY_DATASET=production npm run build`

Verification not run:

- Live browser accessibility pass
- Real Sanity Studio runtime in this sandbox build

Known limitations:

- The `/studio` route is a shell rather than the full `next-sanity/studio` runtime in this environment
- Phase 4 homepage vertical slice has not started

Open blockers and owners:

- None for Phase 3
- Phase 4 work awaits the next instruction

Documents updated:

- `MEMORY.md`
- `.gitignore`
- `package.json`

Exact next action:

- Stop after Phase 3 and wait for the Phase 4 brief before starting the homepage slice
- Mark it replaced, add the new decision, date, reason, and affected documents.
- Keep the current snapshot concise; move detail into the decision or progress log.
- Do not rewrite history to make an incomplete phase appear complete.

### Status accuracy

- `Documented` does not mean `Implemented`.
- `Implemented` does not mean `Verified`.
- `Verified locally` does not mean `Verified in production`.
- `Uploaded to Sanity` does not mean `Approved or Published`.

### 23 August 2026 — Phase gate verification

Active phase:
- Documentation-only verification before implementation

Completed:
- Read `MEMORY.md`, `PHASES.md`, `DESIGN.md`, `PRD.md`, `ARCHITECTURE.md`, `CONTENT.md`, `RULES.md`, and `MASTER_PROMPT.md` completely.
- Verified the repository root contains only controlling markdown documents and `.git`.
- Confirmed there is no `package.json`, no application source tree, no Sanity schema tree, no preview configuration, and no test suite present.
- Compared the live repository state against the Phase 2 exit criteria.

Decisions:
- Do not start Phase 3 because Phase 2 verification failed in the current repository state.

Verification run:
- `ls -la`
- `find . -maxdepth 2 -type f | sort`
- `rg --files`
- `git status --short`
- Manual review of the controlling documents and their phase criteria

Verification not run:
- Formatting, lint, typecheck, unit/component tests, and build
- Sanity schema, role, preview, publication-filter, and accessibility verification against running code

Known limitations:
- The repository does not yet contain the implementation required to satisfy Phase 2 exit criteria.

Open blockers and owners:
- Phase 1 repository and engineering foundation still needs to exist before Phase 2 can be completed.

Documents updated:
- `MEMORY.md`

Exact next action:
- Create the application foundation and then the Sanity content foundation before any Phase 3 work.

## 17. Session update template

Append a dated entry using:

```text
### YYYY-MM-DD — Short session title

Active phase:
Owner:

Completed:
-

Decisions:
-

Verification run:
-

Verification not run:
-

Known limitations/blockers:
-

Documents updated:
-

Exact next action:
-
```

## 18. Handoff instruction for a new Codex/developer session

Do not begin implementation from this file alone.

1. Read `PRD.md`, `RULES.md`, and this file completely.
2. Read the task-relevant Architecture, Design, Content, and Phases sections.
3. Inspect the repository and current branch before editing.
4. Confirm the current phase and its exit criteria.
5. Implement only the approved scope.
6. Run actual verification.
7. Update this Memory before handoff.

## 19. Current completion statement

The BeSportify website now includes the Phase 7 case studies and insights editorial framework in the root Next.js app, alongside the design system, Sanity foundation, homepage slice, corporate pages, and StatStrike product page. Development preview seeds are available locally for the editorial routes, but public publication still depends on approved content thresholds, so the website is not yet fully launched.

### 23 August 2026 — Phase 6 StatStrike product experience

- Built the StatStrike product experience in the root Next.js app without creating a second application folder or a second Next.js project.
- Added a dedicated StatStrike page component that renders the approved hero, problem, intended users, live capabilities, workflow, proof, FAQ, and CTA sections.
- Filtered public capabilities to live-approved entries and kept proof content omission-safe when approved metrics or testimonials are unavailable.
- Wired the StatStrike login action to the configured app URL environment variable with a safe fallback.
- Added route metadata, truthful structured data, and tests for public rendering, capability filtering, proof fallback, and metadata no-index behavior.
- Verified the slice with formatting, lint, typecheck, unit tests, and a production build using placeholder Sanity env vars and the StatStrike app URL.

## 17. Phase handoff

Phase: Phase 6 - StatStrike product experience
Status: Complete
Owner: Codex
Completed:

- Built the StatStrike product experience in the root Next.js app
- Added the approved hero, problem, intended users, verified live capabilities, workflow, proof, FAQ, and CTA sections
- Filtered public capability rendering to live-approved content only
- Kept proof content omission-safe when approved metrics or testimonials are absent
- Wired the StatStrike login action to the configured app URL environment variable
- Added truthful product metadata and structured data for the StatStrike route
- Added unit/component coverage for live-feature filtering, proof fallback, login routing, and metadata no-index handling
- Verified the production build with webpack and placeholder Sanity env vars plus the StatStrike app URL

Deliverables:

- StatStrike product route and supporting section component
- StatStrike loader with approved live capability, metric, and testimonial fetches
- Route metadata and structured data for `/products/statstrike`
- StatStrike page unit/component tests

Decisions:

- Keep the public StatStrike page separate from the authenticated app
- Use the configured StatStrike app URL environment variable for login routing with a safe fallback to `https://app.besportify.com`
- Treat absent approved proof as an omission-safe empty state instead of inventing screenshots, testimonials, or metrics
- Keep the page aligned to the approved StatStrike copy and avoid speculative capability claims

Verification run:

- `npm run format`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000 NEXT_PUBLIC_STATSTRIKE_APP_URL=https://app.besportify.com NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder NEXT_PUBLIC_SANITY_DATASET=production npm run build`

Verification not run:

- Live browser accessibility pass
- Real Sanity Studio runtime in this sandbox build

Known limitations:

- Approved metrics, testimonials, and screenshots may remain unpublished, so the proof section can render the omission-safe empty state
- The StatStrike app is still external to the public website and depends on the configured login URL

Open blockers and owners:

- None for Phase 6
- Phase 7 work awaits the next instruction

Documents updated:

- `MEMORY.md`
- `src/app/(site)/products/statstrike/page.tsx`
- `src/components/sections/statstrike-page.tsx`
- `src/lib/statstrike.ts`
- `src/lib/env.ts`
- `.env.example`
- `src/sanity/lib/queries.ts`
- `tests/unit/statstrike-metadata.test.ts`
- `tests/unit/statstrike-page.test.tsx`

Exact next action:

- Stop after Phase 6 and wait for the next brief before starting the homepage vertical slice

### 26 August 2026 — Phase 7 Case Studies and Insights

- Built the case studies and insights route structure in the root Next.js app without creating a second application folder or a second Next.js project.
- Added editorial Sanity schema fields, projection queries, loaders, route metadata, and preview-friendly filtering for approved case studies and insights.
- Added public listing and detail templates for case studies and insights with omission-safe states for missing optional content.
- Added dev-only editorial seed content so the case studies and Insights routes can be reviewed locally without weakening the production gate.
- Added reusable editorial components for hero, metadata, figure, table, related content, and action rows.
- Added unit/component coverage for the case studies and insights pages, metadata, and Portable Text fallback handling.
- Verified the slice with formatting, lint, typecheck, unit tests, and a production build using placeholder Sanity env vars and the configured app URL.

## 17. Phase handoff

Phase: Phase 7 - Case Studies and Insights
Status: Complete for implementation; public launch still gated by approved editorial content
Owner: Codex
Completed:

- Built the case studies and insights route structure in the root Next.js app
- Added editorial schema fields, queries, loaders, and preview-friendly publication filtering
- Added listing and detail templates for case studies and insights
- Added dev-only editorial seed content for local preview
- Added reusable editorial components for hero, metadata, figure, table, related content, and action rows
- Added unit/component coverage for page rendering, metadata, and Portable Text unknown-block handling
- Verified formatting, lint, typecheck, unit tests, and a production build with placeholder Sanity env vars and the configured app URL

Deliverables:

- Case studies and insights page routes and section components
- Editorial Sanity schema/query/loaders for case studies and insights
- Reusable editorial UI primitives for article-style content
- Metadata and component tests for the editorial routes

Decisions:

- Keep the case studies and insights routes in the root Next.js app
- Hide public listing routes in production until the minimum content thresholds are met
- Treat missing optional media, testimonial, and related-content fields as omission-safe states
- Use typed Portable Text rendering for the approved block types only

Verification run:

- `npm run format`
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000 NEXT_PUBLIC_STATSTRIKE_APP_URL=https://app.besportify.com NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder NEXT_PUBLIC_SANITY_DATASET=production npm run build`

Verification not run:

- Live browser accessibility pass
- Real Sanity Studio runtime in this sandbox build

Known limitations:

- Approved case studies and three substantive Insights articles are still required before the public navigation should be treated as launched
- The editorial routes remain hidden in production until the content thresholds are met

Open blockers and owners:

- Approved case study and three substantive Insights articles are still missing; content owner/editor to publish them

Documents updated:

- `MEMORY.md`
- `sanity/schemaTypes/documents.ts`
- `src/sanity/lib/queries.ts`
- `src/lib/editorial-seed.ts`
- `src/lib/editorial.ts`
- `src/components/content/editorial.tsx`
- `src/components/sections/case-studies-page.tsx`
- `src/components/sections/insights-page.tsx`
- `src/app/(site)/case-studies/page.tsx`
- `src/app/(site)/case-studies/[slug]/page.tsx`
- `src/app/(site)/insights/page.tsx`
- `src/app/(site)/insights/[slug]/page.tsx`
- `tests/unit/case-studies-page.test.tsx`
- `tests/unit/case-studies-metadata.test.ts`
- `tests/unit/insights-page.test.tsx`
- `tests/unit/insights-metadata.test.ts`

Exact next action:

- Publish approved case studies and at least three substantive Insights articles, then decide whether to promote the routes in primary navigation

### 2026-09-06 — Futuristic and kinetic UI revamp

Active phase:
- Visual and interaction design elevation

Owner:
- Antigravity

Completed:
- Re-architected CSS engine with custom cubic-bezier gliding transitions (`cubic-bezier(0.16, 1, 0.3, 1)`), telemetry grid styling, and pulsing indicators.
- Created bespoke vector SVG brand mark for BeSportify and StatStrike in `src/components/ui/logo.tsx`.
- Integrated high-contrast pure white text with ambient crimson drop-shadows on primary buttons in `src/components/ui/button.tsx`.
- Upgraded cards with glassmorphic depth, luminous borders, and smooth hover lift in `src/components/ui/card.tsx`.
- Transformed missing media placeholders into a futuristic cricket telemetry simulator HUD with pitch coordinates and real-time readouts in `src/components/ui/media-frame.tsx`.
- Upgraded accordion and tabs with smooth gliding CSS grid transitions.
- Elevated homepage hero, bento layout, and data pipeline sections while removing AI-scaffolding meta-text across About, Team, Careers, and Contact routes.
- Fully verified all 17 unit/component test suites (22 tests passing), static typechecks, ESLint, Prettier, and webpack production build.

Verification run:
- `npm test`
- `npm run typecheck`
- `npm run lint`
- `npm run format:write`
- `NEXT_PUBLIC_SITE_URL=http://localhost:3000 NEXT_PUBLIC_STATSTRIKE_APP_URL=https://app.besportify.com NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder NEXT_PUBLIC_SANITY_DATASET=production npm run build`

Documents updated:
- `src/app/globals.css`
- `src/components/ui/logo.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/tag.tsx`
- `src/components/ui/media-frame.tsx`
- `src/components/ui/accordion.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/layout/site-header.tsx`
- `src/components/layout/site-footer.tsx`
- `src/components/sections/homepage.tsx`
- `src/components/content/placeholder-page.tsx`
- `src/app/(site)/about/page.tsx`
- `src/app/(site)/team/page.tsx`
- `src/app/(site)/careers/page.tsx`
- `src/app/(site)/contact/page.tsx`
- `MEMORY.md`


## 13 September 2026 — Website risk reduction

- Replaced privacy/terms placeholders; added cookies/preferences, refunds and accessibility pages, shared operator details and a cited local risk report in `docs/WEBSITE-RISK-AUDIT.md`.
- Business jurisdiction, operator identity/address, contacts, retention and paid-service refund terms remain unconfirmed. No facts or refund deadlines were invented.
- Contact now prepares a minimal, consented email draft only when business details are configured. It does not add a server delivery provider.
- Theme persistence is opt-in; proof queries enforce evidence and testimonial permission including case-study references. Images without rights evidence are withheld; two former public raster assets are preserved in `Besportify/rights-review`.
- Keyboard, form labels, contrast, disclosure hiding and focus behaviour were improved. Browser evidence and its limits are in `docs/audit-results` and the risk report.
- No deployment or CMS mutation performed. Git index was already corrupt on first inspection; left untouched.
