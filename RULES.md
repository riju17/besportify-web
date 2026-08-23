# BeSportify Website — Project Rules and Operating Boundaries

## 1. Document control

- Version: 2.0
- Date: 23 August 2026
- Status: Draft for owner and technical review
- Applies to: developers, Codex/AI agents, designers, content editors, publishers, administrators, reviewers, and external contributors
- Depends on: `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `CONTENT.md`

## 2. Purpose

This document defines how the BeSportify website project must be built, changed, reviewed, published, and maintained. It protects four things:

1. Accuracy of public claims
2. Security and privacy
3. Design and engineering consistency
4. Long-term maintainability by people other than the original creator

When a convenient shortcut conflicts with these rules, the rule takes priority unless the product owner explicitly records an approved exception.

## 3. Source-of-truth hierarchy

If project documents disagree, use this order:

1. Explicit current instruction from the product owner
2. `PRD.md` — product objectives, scope, users, requirements
3. `RULES.md` — operating boundaries and quality requirements
4. `ARCHITECTURE.md` — technical structure and system responsibilities
5. `DESIGN.md` — visual and interaction system
6. `CONTENT.md` — message, copy, status, and factual requirements
7. `PHASES.md` — delivery sequence
8. `MEMORY.md` — current progress and pending work

Do not silently choose between conflicting requirements. Record the conflict and resolve it before implementing a material change.

## 4. Non-negotiable priorities

1. Truth and user trust
2. Privacy and security
3. Accessibility
4. Correct business outcome
5. Reliability and performance
6. Maintainability
7. Visual polish

A visually impressive section is not acceptable if its claim is unsupported, its interaction is inaccessible, or it makes the website materially slower.

## 5. Project boundaries

### This project includes

- Public BeSportify corporate website
- Public StatStrike marketing/product page
- Sanity Studio configuration for website content
- Demo, contact, and careers enquiry flows
- Case Studies, Insights, Team, Careers, legal, SEO, and supporting pages
- Approved connections to analytics, monitoring, form, and anti-spam providers

### This project does not include

- Rebuilding the authenticated StatStrike application
- Changing StatStrike databases, cricket statistics, user access, or business logic
- Sharing authentication between the website and StatStrike in V1
- Building a custom CMS/admin system
- Building public website user accounts
- Storing confidential sporting/player information in Sanity
- Creating a free-form page builder

Any request that crosses these boundaries requires a separately approved scope and architecture review.

## 6. Truth and evidence rules

### Never invent

- Clients, teams, leagues, academies, or partners
- Official relationship status
- Partnership permissions
- Metrics, sample sizes, results, outcomes, or dates
- Testimonials, names, roles, or quotations
- Company history, founders, credentials, awards, or milestones
- Product capabilities, security claims, or integration support
- Case studies or vacancies
- Player, team, or tactical information

### Required handling

- If a fact is missing, use an internal status marker and hide the public section.
- If wording is ambiguous, publish the narrower truthful statement.
- Distinguish `official league partner` from `worked with a team participating in the league`.
- Distinguish a deliverable from a verified outcome.
- State sample scope, date range, source, and limitations for quantitative claims.
- Only `live` product capabilities appear unqualified.
- `beta`, `planned`, and `internal` features use accurate labels or remain hidden.

### Prohibited public language without evidence

- Best
- Leading
- Number one
- Most advanced
- Guaranteed
- Revolutionary
- Industry-first
- Match-winning
- Official partner
- Trusted by

## 7. Confidentiality rules

- Do not publish private opposition plans, selection discussions, player weaknesses, medical information, access keys, contracts, or commercially sensitive reports.
- Remove or mask sensitive information in StatStrike screenshots.
- Do not infer permission from possession of a file or logo.
- An anonymised case study must remain factually accurate and non-identifying.
- Do not upload confidential documents to Sanity merely to make them easier to access.
- Ask the responsible business owner before publishing any content that could affect an active team, athlete, competition, or negotiation.

## 8. AI/Codex operating rules

### AI may

- Inspect the repository and project documents
- Implement approved requirements
- Draft content with explicit verification markers
- Create typed schemas, components, tests, and documentation
- Recommend alternatives with clear trade-offs
- Refactor code after existing behaviour is understood and protected
- Use placeholders in local development when they are impossible to publish accidentally
- Identify inconsistencies, missing states, security concerns, and unsupported claims

### AI must

- Read all relevant project documents before implementation
- Inspect existing code and preserve unrelated user changes
- State assumptions that affect architecture, content, cost, or security
- Verify current technical guidance from primary/official sources when version-sensitive
- Implement the smallest complete change that satisfies the approved phase
- Test the change before claiming completion
- Update `MEMORY.md` after meaningful work
- Report what could not be verified

### AI must not

- Fabricate public proof or silently convert draft copy into approved copy
- Install providers, SDKs, UI kits, CMS alternatives, or major libraries without a documented requirement
- Change the approved stack because another technology is more familiar
- Modify StatStrike application code or data under the corporate-site scope
- Bypass permissions, expose secrets, or disable security checks for convenience
- Mark a task complete because files were written; verification is required
- Delete user work, reset Git history, or perform destructive operations without explicit authorization
- Create production content from private conversations without owner approval

### When AI is uncertain

- For a reversible presentation choice, use the documented design default and record it.
- For a factual claim, permission, legal interpretation, security boundary, cost commitment, provider selection, or destructive action, stop and ask.
- For a missing optional section, hide it rather than invent content.

## 9. Repository and Git rules

- Use a separate repository from the StatStrike application.
- Read `AGENTS.md` or equivalent repository instructions first.
- Keep commits small and organised by feature or phase.
- Do not mix unrelated refactors with a feature change.
- Do not commit directly to protected production branches.
- Pull requests require passing CI and an appropriate reviewer.
- Never commit secrets, `.env.local`, exported personal data, raw applicant data, or unlicensed assets.
- Do not use destructive Git commands on user work.
- Preserve the package manager and lockfile chosen at initialization.
- Update documentation in the same change when behaviour or architecture changes.

## 10. TypeScript and code standards

- Enable strict TypeScript.
- Avoid `any`; use `unknown` plus validation when data is not trusted.
- Prefer explicit domain types derived from projected content.
- Use server components by default.
- Add client components only for genuine browser interaction.
- Keep components cohesive and props understandable.
- Separate content retrieval, transformation, and presentation.
- Prefer pure functions for filtering, metadata, and transformation.
- Avoid deep prop drilling when composition or a small scoped context is clearer.
- Do not create abstractions before at least two genuine use cases exist.
- Remove unused exports, styles, assets, dependencies, and feature flags.
- Comments explain intent or constraint, not obvious syntax.

## 11. Component boundaries

- `ui`: generic accessible primitives without business copy
- `layout`: navigation, footer, containers, page structure
- `sections`: approved marketing compositions
- `content`: typed Sanity and Portable Text renderers
- `forms`: fields, validation, states, and submission logic

Rules:

- Pages compose sections; they do not contain large duplicated UI implementations.
- Generic UI primitives must not query Sanity.
- Sanity query results are projected into defined frontend types.
- Content renderers must not accept arbitrary HTML.
- Interactive cards must have clear, non-conflicting click targets.
- New component variants must have a documented design-system need.

## 12. Styling rules

- Use the tokens and component rules in `DESIGN.md`.
- Build mobile-first.
- Do not scatter arbitrary colours, radii, spacing, or shadows.
- Do not introduce one-off gradients or glows without a system role.
- Use semantic class/variant names based on purpose rather than page name where reusable.
- Maintain readable line lengths.
- Respect reduced motion, keyboard focus, zoom, and contrast.
- Avoid heavy runtime styling libraries unless architecture is deliberately revised.
- Do not use inline styles for values already represented by tokens.

## 13. Dependency rules

Before adding a dependency, answer:

1. What problem does it solve?
2. Can the framework or existing code solve it safely?
3. Is it actively maintained and compatible with the current stack?
4. What browser/server bundle cost does it add?
5. Does it introduce network, privacy, security, or licensing obligations?
6. Who will maintain it?

Approved categories:

- Next.js/React core
- Official maintained Sanity packages
- Tailwind CSS
- Zod
- One approved motion solution if needed
- One approved icon solution if needed
- Testing libraries defined in Architecture
- Selected provider SDKs after approval

Avoid overlapping component, icon, form, animation, date, and utility libraries.

## 14. Sanity content-model rules

- Sanity is the only production CMS.
- Do not maintain duplicate production content in local files and Sanity.
- Use structured document/object fields instead of large unstructured rich-text documents.
- Reuse references for partners, authors, categories, and approved shared entities.
- Singleton documents cannot be duplicated.
- Every business-sensitive document includes approval metadata.
- Every product capability includes status.
- Every metric includes source, scope, valid/review date, and approval.
- Every partner includes exact relationship wording and permission state.
- Every externally sourced image includes source/credit/permission information.
- Every meaningful image requires alt text.
- Slug changes require redirects.
- Schemas evolve additively; destructive field changes require migration.

## 15. Sanity access rules

- Use individual invited accounts only.
- No public registration or shared credentials.
- Administrators: primary owner and named backup only.
- Publishers: product owner and one trusted backup initially.
- Editors draft, edit, upload, and preview; they do not publish.
- Contributors receive the narrowest role supported by the selected plan.
- Review access at least quarterly and immediately after personnel changes.
- Studio UI visibility is not a security boundary.
- Confirm role enforcement against the actual Sanity plan.
- Use the lowest-privilege API token for each purpose.
- Keep draft/read/preview tokens server-side except when the supported visual-editing flow strictly requires scoped authenticated use.

## 16. Editorial workflow rules

### Editor responsibilities

- Use approved terminology and status fields.
- Complete required SEO and media metadata.
- Verify links and responsive preview.
- Check image crop, alt text, credit, and permission.
- Record evidence and reviewer for claims.
- Submit for review; do not ask a developer to bypass publication controls.

### Publisher responsibilities

- Confirm business-owner approval.
- Check factual accuracy and relationship wording.
- Review confidentiality and legal concerns.
- Preview desktop and mobile presentation.
- Verify CTA destination, publish date, expiry, and review date.
- Unpublish content that is outdated, incorrect, or no longer permitted.

### Administrator responsibilities

- Manage accounts and configuration.
- Do not perform ordinary editorial work with elevated privileges when a lower role is sufficient.
- Maintain backup access and recovery documentation.
- Audit inactive users, tokens, and allowed origins.

## 17. Media rules

- Prefer approved SVG for BeSportify/StatStrike logos and suitable high-resolution raster photography.
- Preserve partner-logo aspect ratio and approved colours.
- Do not recolour or alter a partner logo without permission.
- Do not allow arbitrary editor-uploaded SVG in V1.
- Validate MIME type and reasonable file size.
- Remove sensitive metadata when appropriate.
- Use focal point/hotspot and crop guidance.
- Do not upload large video without a selected video-delivery approach.
- Avoid duplicate assets; reuse an existing approved asset when suitable.
- Missing media must have a deliberate fallback, not a broken image.

## 18. Content-rendering rules

- Production queries use published content and explicit business filters.
- Draft, archived, unapproved, expired, and internal content must not appear publicly.
- Portable Text supports only approved blocks, marks, and annotations.
- Unknown blocks fail safely and are reported; they do not execute arbitrary code.
- Never use `dangerouslySetInnerHTML` for normal CMS content.
- Sanitize any exceptional HTML source through an approved and tested process.
- Optional fields must not leave empty headings, gaps, or controls.
- Hide empty Case Studies and Insights navigation according to `CONTENT.md` thresholds.

## 19. Forms and personal-data rules

- Server validation is authoritative.
- Validate required fields, length, format, allowed values, and consent.
- Add rate limiting and bot protection.
- Treat all input as untrusted.
- Preserve safe entered data after recoverable errors.
- Prevent accidental duplicate submissions.
- Show success only after confirmed provider acceptance.
- Do not store enquiry or applicant data in Sanity by default.
- Do not log full messages, CV contents, or unnecessary personal data.
- Do not send personal data to analytics.
- Define recipient, retention, deletion, and access owner before production.
- Career uploads require explicit file rules, malware-risk consideration, and retention handling.

## 20. Secrets and environment rules

- Secrets never appear in browser bundles, source code, logs, screenshots, documentation examples, or CMS fields.
- Only intentionally public configuration uses `NEXT_PUBLIC_`.
- Validate environment configuration at startup/build where appropriate.
- Use different secrets for development, preview, and production.
- Rotate exposed or departed-user credentials immediately.
- Restrict Sanity CORS origins.
- Pin a fixed Sanity API version.
- `.env.example` contains names and explanations, never values.
- Never solve a missing variable by adding a fake production fallback.

## 21. Authentication and preview rules

- Public website browsing does not require authentication.
- Sanity Studio requires invited-user authentication.
- Draft preview requires a protected server-side enable flow.
- Preview routes validate requests and prevent open redirects.
- Draft content is excluded from public cache, indexing, sitemap, and feeds.
- Exiting preview clears Draft Mode.
- Preview tokens receive read-only access where possible.
- StatStrike authentication remains separate and must not be simulated on the marketing site.

## 22. Error-handling rules

### General principles

- Fail safely, visibly, and with a useful next action.
- Do not expose stack traces, tokens, provider payloads, query internals, or personal information.
- Generate a correlation identifier for server-side incidents where useful.
- Keep static public pages available when external services fail.

### CMS failures

- Continue serving the last successfully generated/cached public content.
- Log failed content fetch/revalidation safely.
- Never replace good public content with an empty page because the CMS is temporarily unavailable.
- Do not falsely tell an editor publication succeeded when revalidation failed.

### Form failures

- Distinguish validation, rate-limit, provider, and unexpected errors internally.
- Give users concise nontechnical messages.
- Preserve safe form content after recoverable failures.
- Provide an approved alternative contact method when possible.

### Media failures

- Use an intentional fallback or omit optional media.
- Preserve layout dimensions to prevent large shifts.
- Report broken required assets during QA.

## 23. Accessibility rules

- Target WCAG 2.2 AA.
- Use semantic HTML before ARIA.
- Full keyboard access and logical focus order are mandatory.
- Show visible focus indicators.
- Maintain one H1 and logical heading hierarchy.
- Provide programmatic form labels, descriptions, and errors.
- Give icon-only controls accessible names.
- Use 44×44px practical touch targets.
- Do not rely on colour, hover, animation, or position alone.
- Respect reduced motion.
- Support 200% zoom without loss of functionality.
- Test menus, forms, accordions, tabs, dialogs, and error states.
- Accessibility regressions block release.

## 24. Performance rules

- Server components and static/cached delivery by default.
- Add client JavaScript only for real interaction.
- Optimise images with explicit dimensions and responsive sizing.
- Lazy-load below-fold media.
- Avoid autoplay video and heavy continuous animation.
- Return only required Sanity fields.
- Avoid client waterfalls and one-request-per-card patterns.
- Load third-party scripts only after approval and with a clear purpose.
- Protect Core Web Vitals; measure representative production pages.
- Do not trade accessibility or correctness for a Lighthouse score.

## 25. SEO rules

- Unique truthful title and description for every public page.
- Canonical URL matches the approved domain strategy.
- Sitemap includes only publishable canonical pages.
- Drafts, archives, expired careers, preview, and admin surfaces are excluded.
- Structured data must reflect visible truthful content.
- Use redirects for changed published slugs.
- Provide appropriate Open Graph/social images.
- Do not keyword-stuff headings, alt text, or copy.
- SEO changes cannot strengthen claims beyond approved content.

## 26. Analytics rules

Track meaningful outcomes:

- Demo CTA click
- Successful demo/contact submission
- Partnership enquiry
- StatStrike login click
- Case-study view
- Insight engagement
- Career application

Do not:

- Track every decorative click
- Record form-message content
- Include personal data in event names/properties
- Block rendering on analytics
- claim successful conversion before confirmed form delivery

Analytics and cookie behaviour require privacy review before launch.

## 27. Testing requirements

### Unit

- Publication/approval/status filtering
- Environment validation
- Form schemas
- Metadata and URL helpers
- Content transformations and rich-text renderers

### Integration

- Sanity projections with representative content
- Draft versus published behaviour
- Expiry and feature-status filtering
- Form-provider adapter success/failure
- Media fallbacks

### End-to-end

- Navigation and primary pages
- Demo/contact flow
- StatStrike redirect
- Preview enable/disable
- Draft isolation
- Publication/revalidation
- Career expiry
- Mobile menu and critical keyboard flows

### Manual

- Current Chrome, Safari, Firefox, and Edge
- Mobile, tablet, and desktop layouts
- Keyboard and screen-reader semantics
- Reduced motion and 200% zoom
- Nontechnical editor acceptance workflow

No task is complete while relevant failing tests are ignored.

## 28. Verification commands and evidence

The future repository must provide scripts for:

- Formatting/check
- Lint
- Typecheck
- Unit/integration tests
- End-to-end tests
- Production build

Do not guess commands in a report. Run the committed scripts and record actual results. If the environment prevents a check, state what was not run and why.

## 29. Design and content review rules

- Compare implementation with `DESIGN.md`, not personal preference.
- Test realistic long and missing CMS content.
- Use only approved product screenshots and partner assets.
- Review public copy against `CONTENT.md` status labels.
- Remove internal markers from production output.
- Do not launch Insights with fewer than three substantive articles.
- Do not prominently launch Case Studies without at least one approved substantive case.
- Do not display unverified metrics merely to balance a layout.

## 30. Change-management rules

### Requires product-owner approval

- Sitemap or primary CTA change
- New product/service claim
- New partner/league relationship wording
- Major design-system change
- CMS replacement or unrestricted page-building capability
- Authentication/data-sharing relationship with StatStrike
- New personal-data collection
- New external provider with cost/privacy implications

### Requires architecture review

- New database or persistent store
- Private Sanity dataset or multi-dataset strategy
- New backend service
- Shared authentication
- Major schema migration
- Live match data integration
- New file-upload path

### Requires legal/privacy review

- Privacy Policy and Terms
- Applicant-data handling
- New analytics/cookies
- Public player personal/sensitive data
- Third-party brand/photography usage
- Predictive or performance claims with material consequences

## 31. Incident and rollback rules

- Maintain named operational owners and escalation contacts.
- Preserve previous deploys and Sanity version history.
- For harmful content, unpublish first, then investigate.
- For code regression, use the documented deployment rollback path.
- Rotate secrets after exposure.
- Record incident time, impact, cause, action, and follow-up without storing unnecessary personal data.
- Do not destroy evidence during incident response.

## 32. Documentation and memory rules

- Update `MEMORY.md` after each meaningful work session.
- Record date, completed work, decisions, blockers, verification, and exact next step.
- Update Architecture when system boundaries or providers change.
- Update Design when tokens or component behaviour change.
- Update Content when public messaging or claim status changes.
- Update Rules when operating boundaries change.
- Do not erase historical decisions without recording their replacement and reason.

## 33. Definition of done

A change is done only when:

1. It satisfies an approved requirement.
2. It stays within project scope.
3. Factual claims and assets are approved.
4. Security and privacy boundaries are preserved.
5. Responsive, accessibility, loading, empty, success, and error states are addressed.
6. Relevant tests are added or updated.
7. Formatting, lint, typecheck, tests, and build pass where applicable.
8. The implementation is reviewed in a production-like preview.
9. Documentation and `MEMORY.md` are current.
10. Remaining limitations and unrun verification are reported.

## 34. Release blockers

The website must not launch with:

- Unsupported partnership or product claims
- Visible internal markers, lorem ipsum, or fake metrics
- Broken links or required media
- Unmonitored contact/career destinations
- Secrets in public code or logs
- Publicly accessible drafts
- Missing Privacy/Terms review
- Critical accessibility failures
- Failing production build or critical tests
- No named administrator/backup or publishing owner
- No rollback/recovery knowledge outside the original developer

## 35. Exception process

An exception must record:

- Rule being waived
- Business reason
- Risk and affected users
- Compensating control
- Approver
- Expiry/review date

Temporary exceptions do not silently become permanent standards.

## 36. Final principle

If a future team member cannot explain why a public claim is true, who approved it, how an editor can safely change it, and how the system can recover if the change fails, the work is not ready to publish.
