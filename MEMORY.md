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

- Last updated: 23 August 2026
- Programme status: Pre-development documentation
- Current phase: Documentation refinement before Phase 0
- Active document: `MEMORY.md`
- Repository status: Corporate website repository not yet created
- Production code: Not started
- Sanity project: Not yet confirmed/created
- Website deployment: Not started
- Public launch: Not started

## 3. Immediate next action

Refine `MASTER_PROMPT.md` so it accurately instructs Codex to read the completed project documents, execute only Phase 0 and Phase 1 initially, preserve claim controls, and establish the repository and Sanity foundation without inventing missing business inputs.

After the master prompt is approved, begin Phase 0 from `PHASES.md`.

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

- Direction: premium, dark, sports-intelligence identity.
- Creative concept: `The Intelligence Layer`.
- BeSportify provisional accent: electric blue/violet.
- StatStrike provisional accent: performance green.
- Typography direction: Space Grotesk for headings and Inter for body/interface.
- Website is dark-first, not dark-only.
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

- Corporate website Git repository
- Next.js application
- Sanity project, dataset, schemas, and Studio
- Design implementation
- Public page implementation
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
- No code, build, browser, accessibility, security, provider, or deployment verification has occurred because implementation has not started.
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
- Mark it replaced, add the new decision, date, reason, and affected documents.
- Keep the current snapshot concise; move detail into the decision or progress log.
- Do not rewrite history to make an incomplete phase appear complete.

### Status accuracy

- `Documented` does not mean `Implemented`.
- `Implemented` does not mean `Verified`.
- `Verified locally` does not mean `Verified in production`.
- `Uploaded to Sanity` does not mean `Approved or Published`.

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

The BeSportify website is not yet built. Its product requirements, technical architecture, design system, content strategy, operating rules, and delivery phases have been documented. The next documentation task is to rebuild `MASTER_PROMPT.md`; the next programme task after that is Phase 0 ownership, asset, and claim collection.
