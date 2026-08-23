# BeSportify Website — Delivery Phases and Stage Gates

## 1. Document control

- Version: 2.0
- Date: 23 August 2026
- Status: Draft implementation roadmap
- Depends on: `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `CONTENT.md`, `RULES.md`
- Intended readers: product owners, project managers, developers, designers, content teams, Sanity administrators, reviewers, and implementation agents

## 2. Purpose

This document breaks the BeSportify website into controlled delivery phases. Each phase must produce a complete, testable outcome and a clear handoff. It is not a loose checklist and should not be treated as permission to build later phases early.

The plan is designed to prevent four common failures:

1. Building polished pages around unverified claims
2. Adding Sanity after the frontend is already hard-coded
3. Launching forms, analytics, or careers without privacy ownership
4. Completing code without editor training, verification, and recovery documentation

## 3. Delivery principles

1. Truth and ownership before implementation
2. Foundations before page volume
3. One testable vertical slice at a time
4. Sanity and frontend developed together
5. Content and design reviewed in realistic layouts
6. Integrations selected only when requirements are clear
7. Every phase ends with evidence, documentation, and an exact next step

## 4. Phase status definitions

- `Not started`: no authorised implementation work
- `Ready`: dependencies and owners are available
- `In progress`: actively being implemented
- `In review`: implementation complete; verification/approval pending
- `Blocked`: cannot continue safely; blocker and owner recorded
- `Complete`: exit criteria and handoff accepted

Only one primary implementation phase should normally be `In progress`. Content collection and approved design work may run in parallel when they do not create conflicting decisions.

## 5. Mandatory phase record

For every phase, record in `MEMORY.md`:

- Start and completion dates
- Responsible owner
- Decisions and approved exceptions
- Files/components/schemas changed
- Verification actually run
- Known limitations
- Blockers transferred to later phases
- Exact next action

## 6. Roadmap summary

| Phase | Name | Primary outcome |
|---:|---|---|
| 0 | Ownership, assets, and claim audit | Safe factual starting point |
| 1 | Repository and engineering foundation | Verified project skeleton |
| 2 | Sanity content foundation | Secure editor-ready CMS |
| 3 | Design system and application shell | Reusable accessible UI foundation |
| 4 | Homepage vertical slice | End-to-end website/CMS proof |
| 5 | Corporate pages | Products, Services, About, Team, Contact |
| 6 | StatStrike product experience | Primary product conversion page |
| 7 | Case Studies and Insights | Evidence and editorial publishing |
| 8 | Careers and enquiry operations | Safe recruitment and conversion flows |
| 9 | SEO, analytics, legal, and monitoring | Production measurement and compliance |
| 10 | Full QA and editorial acceptance | Verified release candidate |
| 11 | Launch and stabilisation | Controlled production release |
| 12 | Post-launch optimisation | Evidence-led continuous improvement |

## 7. Phase 0 — Ownership, assets, and claim audit

### Objective

Create the truthful, permissioned, and operational input pack required to build the website safely.

### Required before starting

- Product owner confirms this roadmap and project boundaries
- One person is assigned to collect business inputs

### Tasks

#### Company and brand

- Confirm official/legal company name
- Confirm founding year and approved founding story
- Collect BeSportify and StatStrike logos in approved formats
- Confirm existing brand colours and usage rules
- Confirm domain ownership and DNS access
- Confirm official contact and social details

#### Product

- Audit StatStrike features as `live`, `beta`, `planned`, or `internal`
- Confirm actual data-ingestion and validation process
- Confirm current login URL and future `app.besportify.com` direction
- Capture current screenshots with sensitive information removed
- Approve product disclaimer and limitations

#### Proof and permissions

- List teams, leagues, competitions, and academies
- Record exact relationship type and wording for each
- Store permission evidence for logos, names, quotes, and photographs
- Define metrics with source, scope, date range, and reviewer
- Select at least one publishable case study
- Obtain testimonial permissions if testimonials will launch

#### People and operations

- Name primary and backup Sanity Administrators
- Name product owner and backup Publisher
- Identify Editors and Contributors
- Assign domain, deployment, privacy, form, and incident owners
- Define access-review cadence

#### Provider decisions

- Verify the Sanity plan supports required roles and preview
- Decide public versus private dataset; recommended starting point is public for approved public marketing content
- Select or deliberately defer form/CRM, analytics, monitoring, and bot-protection providers
- Define enquiry and careers retention requirements

### Deliverables

- Brand and asset folder
- Claim/permission register
- StatStrike feature inventory
- Partnership relationship matrix
- Ownership matrix
- Provider decision record
- Approved factual updates for `CONTENT.md`

### Verification

- Every proposed homepage proof item has an owner and approval status
- No sensitive information appears in screenshots
- Domain and account ownership do not depend on one person
- Sanity roles are checked against the actual plan

### Exit criteria

- Inputs needed for the homepage and StatStrike page are available or their sections are explicitly hidden
- Named administrator, publisher, domain, and privacy owners exist
- No unresolved claim is treated as approved

### Must not begin yet

- Production partner logo display
- Publishing a case study
- Live enquiry collection

## 8. Phase 1 — Repository and engineering foundation

### Objective

Create a secure, repeatable, and verified development foundation.

### Dependencies

- Phase 0 ownership decisions
- Repository owner and hosting owner assigned

### Tasks

- Create separate corporate website repository
- Initialise supported Next.js App Router and strict TypeScript
- Select and lock one package manager
- Configure Tailwind CSS and global token foundations
- Configure formatting, lint, typecheck, tests, and production build
- Create `.env.example` and environment validation
- Establish branch protection and pull-request previews
- Add project documents and repository README
- Add baseline security headers
- Create error and not-found foundations
- Configure CI

### Deliverables

- Installable repository
- Passing CI pipeline
- Local setup documentation
- Preview deployment
- Initial application shell with no unsupported public claims

### Verification

- Fresh clone setup performed by someone other than the initial creator where possible
- Formatting, lint, typecheck, tests, and build pass
- No secret appears in Git history, bundle, or example environment file
- Preview deployment is reachable to authorised reviewers

### Exit criteria

- A future developer can clone, configure, run, test, and build the project from documentation
- Main branch is protected
- Deployment rollback path is identified

## 9. Phase 2 — Sanity content foundation

### Objective

Create an editor-friendly and permission-aware content system before page copy becomes hard-coded.

### Dependencies

- Phase 0 role/plan decision
- Phase 1 repository foundation
- Content models in PRD/Architecture reviewed

### Tasks

#### Project and access

- Create/connect Sanity project and dataset
- Configure `admin.besportify.com`
- Configure approved CORS origins
- Invite Administrators, Publishers, Editors, and Contributors according to plan support
- Create least-privilege server/preview tokens

#### Schemas

- Implement site settings
- Products and product capabilities
- Services
- Partners and relationship approval
- Case studies
- Insights, authors, and categories
- Team members
- Careers
- Testimonials, metrics, and reusable CTAs
- Shared SEO, link, image, and approval objects

#### Editorial experience

- Business-language desk structure
- Singleton protection
- Helpful field descriptions and validation
- Media crop, alt, credit, and permission guidance
- Meaningful document previews
- Restricted rich text
- Draft preview/Presentation integration foundation

#### Frontend data layer

- Central Sanity client/fetch wrapper
- Fixed API version
- Explicit GROQ projections
- Frontend types
- Published and approval filters
- Safe missing-content behaviour

### Deliverables

- Deployed restricted Studio
- Complete V1 schemas
- Seeded non-sensitive draft content
- Query/type layer
- Editor guide draft

### Verification

- Editor can sign in and create drafts without code access
- Editor cannot publish if role model says they cannot
- Publisher can preview and publish
- Draft content is absent from public queries
- Partner/metric/feature validation blocks incomplete sensitive entries
- Deleted/missing optional media does not break rendering

### Exit criteria

- Editorial acceptance workflow works using representative draft content
- Production queries cannot return known draft/unapproved records
- Role limitations are technically enforced, not merely hidden in UI

### Must not begin yet

- Bulk content migration
- Public case-study launch
- Unrestricted page-builder blocks

## 10. Phase 3 — Design system and application shell

### Objective

Implement the reusable visual and interaction foundation defined in `DESIGN.md`.

### Dependencies

- Official logos reviewed or approved provisional treatment
- Phase 1 complete
- Sanity projected types stable enough for representative content

### Tasks

- Implement colour, typography, spacing, radius, and motion tokens
- Add font strategy
- Build header, desktop navigation, mobile menu, and footer
- Build containers and section wrappers
- Build button, link, tag, logo, card, metric, testimonial, media-frame, accordion, tab, and form primitives
- Build Portable Text components
- Implement focus, reduced-motion, error, empty, and loading states
- Create representative component/reference page in development if useful

### Deliverables

- Responsive application shell
- Reusable component system
- Core content renderers
- Component tests and accessibility semantics

### Verification

- 320px through large desktop layouts reviewed
- Keyboard flow and visible focus verified
- Contrast and reduced motion verified
- Long CMS content and missing optional fields tested
- No unapproved partner or product proof used in component demos

### Exit criteria

- Components needed for approved pages exist with documented variants
- New page sections can be built without inventing new tokens
- Shell is visually approved before page volume increases

## 11. Phase 4 — Homepage vertical slice

### Objective

Prove the complete production path from Sanity editing to public rendering and conversion.

### Dependencies

- Phases 0–3 complete
- Homepage copy/proof approved or safely omitted

### Tasks

- Build homepage sections in approved order
- Connect every editable section to Sanity
- Add real approved StatStrike product visual
- Implement partner proof only when approved
- Implement draft visual preview
- Implement publication/live update or targeted revalidation
- Add primary CTA routing
- Add page metadata and structured data
- Test CMS outage fallback

### Deliverables

- Complete responsive homepage
- Editor-to-publication vertical slice
- Homepage SEO/social preview
- Verified cache/revalidation behaviour

### Verification

- Nontechnical editor changes draft copy/image, previews, and publishes through authorised workflow
- Unapproved proof cannot appear publicly
- Homepage remains available during simulated CMS fetch failure
- CTA links and responsive layouts pass

### Exit criteria

- Homepage is review-ready with real content
- Editorial workflow is proven before building remaining pages
- Any architecture problem discovered is corrected and documented

## 12. Phase 5 — Corporate pages

### Objective

Build the complete BeSportify corporate narrative and general enquiry path.

### Dependencies

- Homepage vertical slice approved
- Relevant company, service, and team inputs available

### Tasks

- Products listing
- Services
- About
- Team
- Contact
- Common CTA sections
- Metadata and structured data
- Responsive/editorial QA

### Deliverables

- Core corporate page set
- Contact form interface with disabled/test provider adapter until operational provider is approved
- Sanity-managed company, service, team, and SEO content

### Verification

- Pages remain useful when optional proof/team items are missing
- Form cannot falsely report successful delivery
- Team profiles have consent and accurate roles
- All pages have unique metadata and correct heading structure

### Exit criteria

- Corporate narrative is coherent across pages
- No duplicated hard-coded CMS copy
- Contact path is ready for integration

## 13. Phase 6 — StatStrike product experience

### Objective

Create the primary product-conversion experience using verified current capabilities.

### Dependencies

- Approved feature inventory
- Current product screenshots
- Confirmed application/login URL
- Product disclaimer approved

### Tasks

- Build StatStrike hero and product identity treatment
- Build problem, user, capability, workflow, proof, FAQ, and CTA sections
- Connect feature status/approval filtering
- Add product media frames and responsive crops
- Configure Request a Demo and Login actions
- Add relevant product structured data only when truthful

### Deliverables

- Complete StatStrike page
- Verified live capability list
- Product image library
- Product-specific conversion events

### Verification

- Every public feature maps to a verified live feature or qualified status
- Screenshots contain no sensitive information
- Login redirect works
- Product page never implies guaranteed outcomes
- Mobile screenshots remain useful and legible

### Exit criteria

- Product owner approves every feature and proof statement
- Demo path is technically ready for Phase 8 integration

## 14. Phase 7 — Case Studies and Insights

### Objective

Establish credible evidence and an editorial publishing capability.

### Dependencies

- At least one approved case study
- At least three substantive Insights articles
- Writer/editor/publisher workflow operational

### Tasks

- Build Case Studies listing/detail templates
- Build Insights listing/detail templates
- Add categories, authors, related content, and editorial metadata
- Add citations/data-source/limitations components
- Add article tables/figures and responsive behaviour
- Implement draft preview for long-form content
- Publish initial approved content

### Deliverables

- At least one public case study
- At least three public Insights
- Editorial templates and authoring guide
- Related-content and social preview behaviour

### Verification

- Case-study outcomes have evidence and permissions
- Confidential material is removed
- Articles state sources and limitations
- Drafts/archives absent from listing, sitemap, and production queries
- Long-form content passes mobile and accessibility review

### Exit criteria

- Navigation items are enabled only after minimum content thresholds are met
- Content team can independently draft, preview, and publish through the approved workflow

## 15. Phase 8 — Careers and enquiry operations

### Objective

Create real operational conversion and recruitment flows with clear privacy ownership.

### Dependencies

- Form delivery provider selected
- Recipients and escalation owners named
- Privacy and retention rules approved
- Bot protection/rate limiting selected

### Tasks

- Integrate contact/demo delivery adapter
- Build enquiry-type routing if required
- Add server validation, rate limiting, bot protection, duplicate handling, and safe logs
- Build Careers page and active-role model
- Add general expression-of-interest flow only if monitored
- Configure career expiry/closure
- Implement consent and applicant-data handling
- Test delivery failures and fallback contact method

### Deliverables

- Operational demo/contact form
- Operational career application or approved external application route
- Delivery monitoring and ownership instructions
- Data-retention/deletion procedure

### Verification

- Test submissions reach the correct recipients
- Success appears only after provider acceptance
- Personal data does not enter analytics or Sanity by default
- Rate limit/bot controls work
- Expired roles disappear correctly
- Provider outage produces a useful safe error

### Exit criteria

- Business owner accepts the end-to-end enquiry process
- Privacy owner accepts collection, retention, and deletion behaviour

## 16. Phase 9 — SEO, analytics, legal, and monitoring

### Objective

Complete the production operational layer without weakening privacy or performance.

### Dependencies

- Canonical domain decided
- Analytics/monitoring providers selected
- Legal entity and privacy inputs available

### Tasks

- Finalise per-page metadata and canonical URLs
- Add sitemap, robots, redirects, structured data, and Open Graph assets
- Configure approved analytics events
- Add cookie/consent handling if required
- Configure error monitoring and alert ownership
- Finalise Privacy Policy and Terms through legal review
- Configure admin/preview indexing restrictions
- Verify environment secrets and access

### Deliverables

- SEO-complete release candidate
- Analytics event map
- Monitoring and alerting
- Approved legal pages
- Redirect and domain strategy

### Verification

- Structured data validates and reflects visible facts
- Draft/admin/preview surfaces are excluded appropriately
- Analytics contains no personal data
- Consent behaviour matches provider/legal requirements
- Alerts reach a monitored owner

### Exit criteria

- Legal/privacy owner approval
- SEO and analytics QA complete
- No unknown production trackers

## 17. Phase 10 — Full QA and editorial acceptance

### Objective

Produce a verified release candidate that can be maintained without the original developer.

### Dependencies

- All launch-scope feature phases complete
- Final content and assets available

### QA workstreams

#### Functional

- Navigation, links, forms, redirects, preview, publishing, expiry, and error states

#### Content

- Claims, permissions, spelling, links, contact details, SEO, and internal markers

#### Responsive

- 320, 375, 768, 1024, 1280, and large desktop widths plus intermediate failures

#### Accessibility

- Keyboard, focus, headings, landmarks, labels, errors, contrast, zoom, reduced motion, screen-reader semantics

#### Performance

- Core Web Vitals, media, fonts, scripts, caching, and representative page payloads

#### Security/privacy

- Secrets, headers, draft isolation, rate limits, CORS, tokens, logs, applicant data, and permissions

#### Editorial

- Nontechnical create → upload → preview → approve → publish → verify → unpublish/restore acceptance test

#### Recovery

- Previous deployment rollback, content version restore, CMS outage, and provider failure

### Deliverables

- QA report with evidence
- Closed or explicitly accepted issues
- Editor guide
- Operations/runbook
- Launch checklist
- Final ownership matrix

### Exit criteria

- Release blockers in `RULES.md` are cleared
- Production build and critical tests pass
- Product owner approves public content and experience
- Someone other than the original developer can operate the system

## 18. Phase 11 — Launch and stabilisation

### Objective

Release safely, verify production, and stabilise real operations.

### Dependencies

- Phase 10 signed off
- DNS, hosting, rollback, and escalation owners available during launch

### Tasks

- Create final backup/checkpoint
- Deploy production website and Studio
- Configure canonical redirects and DNS
- Run post-deployment smoke tests
- Submit/verify sitemap where applicable
- Confirm forms and alerts in production
- Confirm preview/editor workflows
- Monitor errors, performance, and conversions closely
- Resolve launch-critical defects through controlled changes

### Stabilisation window

Recommended: 7–14 days of heightened monitoring before routine operations.

### Deliverables

- Live production website
- Live restricted admin Studio
- Production verification record
- Launch incident log if required
- Handoff to operational owners

### Exit criteria

- No unresolved critical issue
- Forms, publishing, monitoring, and rollback confirmed
- Routine ownership accepted

## 19. Phase 12 — Post-launch optimisation

### Objective

Improve the website based on evidence rather than assumptions.

### Activities

- Review qualified enquiry and demo conversion
- Review StatStrike page engagement and CTA progression
- Review case-study and Insight usefulness
- Identify form abandonment and operational pain
- Audit performance, accessibility, broken links, stale content, and CMS access
- Publish new approved proof and content
- Improve Sanity schemas where editors struggle
- Evaluate additional sports/products only when the business is ready
- Consider a more advanced CMS plan or workflow only when actual use justifies it

### Recurring cadence

- Monthly: links, forms, active careers, key contacts, site errors
- Quarterly: access review, metrics, partner wording, product capabilities, performance/accessibility spot check
- Biannually: full content, dependency, privacy, and disaster-recovery review

### Exit criteria

This phase does not end. Each optimisation becomes a scoped change governed by `RULES.md` and recorded in `MEMORY.md`.

## 20. Parallel-work rules

The following may run in parallel when owners are clear:

- Phase 0 asset collection and content drafting
- Design refinement and schema field descriptions
- Case-study approval and Insights writing
- Legal drafting and provider evaluation

The following should not run in parallel without coordination:

- Schema removal and frontend query migration
- Major design-token change and broad page implementation
- Provider integration and privacy-policy finalisation
- Domain cutover and unrelated production deployment

## 21. Change control between phases

If a completed phase assumption changes:

1. Identify affected documents and phases.
2. Assess security, content, design, cost, and schedule impact.
3. Update the controlling document first.
4. Add or revise tests.
5. Reopen only the affected exit criteria.
6. Record the decision and reason in `MEMORY.md`.

Do not continue with a known invalid foundation merely to preserve the original schedule.

## 22. Phase handoff template

Use this at the end of every phase:

```text
Phase:
Status:
Owner:
Completed:
Deliverables:
Decisions:
Verification run:
Verification not run:
Known limitations:
Open blockers and owners:
Documents updated:
Exact next action:
```

## 23. Overall programme completion criteria

The V1 programme is complete when:

- BeSportify and StatStrike positioning is accurately represented
- Approved public pages are live and responsive
- Sanity editors can safely maintain content
- Publishing and claim controls are enforced
- Demo/contact/career operations are owned and monitored
- Accessibility, performance, security, privacy, SEO, and legal requirements pass
- Recovery and rollback are documented and tested
- A new developer and a nontechnical editor can each perform their responsibilities without relying on private knowledge from the original creator
