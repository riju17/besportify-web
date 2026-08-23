# BeSportify Website — Product Requirements Document

## 1. Document status

- Version: 1.1
- Date: 23 August 2026
- Status: Draft for owner review; product scope defined, factual brand inputs pending
- Product owner: BeSportify

## 2. Product summary

Build a premium public-facing corporate website for BeSportify, a sports-technology company with cricket as its current focus. The website will establish the parent brand, present StatStrike as its flagship cricket-intelligence product, showcase services and proof of work, publish insights, support recruitment, and generate qualified commercial enquiries. A Sanity-powered editorial workspace will allow authorized company users to manage content and media without changing source code.

The corporate website is separate from the authenticated StatStrike application.

### Product boundaries

The project has three distinct surfaces:

1. **Public website:** the customer-facing BeSportify brand, product, service, proof, content, recruitment, and enquiry experience.
2. **Editorial workspace:** Sanity Studio, used only by invited company members to manage approved website content and media.
3. **StatStrike application:** the existing authenticated cricket-intelligence product, linked from the website but developed and operated separately.

This distinction must remain clear in design, repositories, permissions, analytics, and deployment.

## 3. Positioning

**Company positioning:** BeSportify builds intelligent products and analytical solutions for modern sport, with cricket as its current focus.

**Brand promise:** BeSportify turns sports data into intelligence that people can understand, trust, and act upon.

**StatStrike positioning:** StatStrike by BeSportify is a cricket-intelligence platform for performance analysis, scouting, player selection, opposition preparation, and match strategy.

## 4. Objectives

### Primary

1. Establish BeSportify as a credible sports-technology company.
2. Generate qualified StatStrike demo requests.
3. Generate team, league, academy, brand, and technology partnership enquiries.

### Secondary

1. Explain BeSportify's analytical and custom-development services.
2. Demonstrate real-world credibility through approved partnerships and case studies.
3. Build thought leadership through Insights.
4. Attract relevant employees, interns, and collaborators.
5. Allow trained non-developers to safely maintain website content when the technical owner is unavailable.

## 5. Target audiences

1. Professional teams and franchises
2. Leagues and tournament organizers
3. Coaches, performance analysts, scouts, and selectors
4. Cricket academies and players
5. Sports brands and sponsors
6. Prospective employees, interns, and collaborators

## 6. User needs

| User | Primary question | Desired action |
|---|---|---|
| Team decision-maker | Can this improve preparation and decision-making? | Request a demo |
| Coach or analyst | What analysis and workflows are supported? | Explore StatStrike |
| Tournament organizer | Can BeSportify support competition-wide data needs? | Discuss a partnership |
| Academy or player | Can performance be tracked and improved? | Submit an enquiry |
| Brand or sponsor | Can commercial performance be measured? | Discuss services |
| Candidate | What work does BeSportify do and how can I join? | View/apply for a role |

### Internal editorial users

| Internal user | Need | Permitted outcome |
|---|---|---|
| Administrator | Manage the CMS safely | Invite/remove users, manage configuration and all content |
| Publisher | Control what becomes public | Review, publish, unpublish, schedule where supported, and restore content |
| Editor | Maintain day-to-day website information | Draft, edit, upload media, preview, and submit for approval |
| Contributor | Prepare limited content | Create and edit assigned drafts without publishing |

Exact role availability depends on the selected Sanity plan. If the plan cannot enforce this separation, the team must either revise the role model or choose the necessary plan; hiding buttons in Studio is not sufficient access control.

## 7. Sitemap

- Home
- Products
  - StatStrike
- Services
- Case Studies
  - Case-study detail
- Insights
  - Article detail
- About
  - Team
- Careers
- Contact
- Privacy Policy
- Terms of Use
- 404

## 8. Page requirements

### Home

- Clear company proposition above the fold
- Primary CTA: Request a Demo
- Secondary CTA: Explore StatStrike
- Trusted-by area using approved names and logos only
- StatStrike preview and dashboard imagery
- Capability overview
- Audience-specific solutions
- Verified impact metrics when supplied
- Featured case study and latest insights
- Approved testimonial when supplied
- Final partnership CTA

### Products

- Explain BeSportify's product philosophy
- Feature StatStrike as the only current public product
- Avoid fabricated future-product cards
- Allow future products to be added through structured content

### StatStrike

- Explain users, problems, workflows, and outcomes
- Cover only verified live capabilities
- Product visuals and screenshots
- Capabilities: player, team, opposition, match, venue, scouting, comparison, reporting, and controlled access as verified
- How-it-works section
- Approved proof and case study
- FAQ
- Demo CTA and login link

### Services

- Performance analytics
- Opposition and tactical analysis
- Player scouting and comparison
- Tournament analytics and data management
- Sports dashboards and reporting
- Predictive modelling
- Sponsorship and commercial analytics
- Custom sports-software development
- Consulting

Each service must state the customer, problem, deliverable, and outcome.

### Case Studies

- Filterable listing only if there are enough published cases; otherwise a simple grid
- Detail template: Challenge, Approach, Intelligence Delivered, Application, Outcome
- Confidential information omitted or anonymized
- Client names/logos and claims require approval flags in content data

### Insights

- Categories: Cricket Analytics, Player Intelligence, Match Strategy, Sports Technology, Research, Product Updates
- Article listing and detail pages
- Author, publish date, reading time, metadata, and social preview
- Do not prominently launch an empty Insights section; publish at least three useful articles

### About and Team

- Founding problem, mission, approach, cricket focus, and multi-sport direction
- Values and operating principles
- Team cards with approved name, role, bio, photograph, and professional link

### Careers

- Culture and disciplines
- Open roles when available
- General applications
- Application form or approved external application link
- No fake vacancies

### Contact

- Enquiry types: Demo, Partnership, Services, Media, Careers, Other
- Fields: name, work email, phone (optional), organization, role, enquiry type, sport/competition, message, consent
- Client and server validation
- Spam protection, rate limiting, success/error states

### Editorial workspace

- Accessible only to individually invited company users
- Clear content areas for Company, Products, Services, Partners, Case Studies, Insights, Team, Careers, Testimonials, Metrics, and reusable Calls to Action
- Structured forms with instructions, examples, required fields, validation, and image guidance
- Draft and preview workflow before publication
- Publication restricted to authorized roles
- Version history and recovery for managed content
- No unrestricted visual page builder in V1
- No direct access to website code, deployment secrets, or StatStrike data

## 9. Functional requirements

- Responsive and mobile-first
- Accessible keyboard navigation and visible focus states
- Demo/contact/careers forms
- StatStrike login redirect configured by environment variable
- Sanity Studio for structured content and media administration
- CMS-managed case studies, insights, team, careers, services, partners, testimonials, approved metrics, company details, and selected page content
- Draft preview, controlled publication, and version recovery
- Role-based editorial access, subject to the selected Sanity plan
- Required approval/status fields for sensitive claims
- SEO metadata, canonical URLs, Open Graph, JSON-LD, sitemap, and robots
- Analytics events for primary conversions
- Optimized images and fonts
- Custom error and not-found handling
- Cookie/privacy handling appropriate to the analytics implementation

### 9.1 CMS-managed content types

| Content type | Required fields | Important controls |
|---|---|---|
| Site settings | company name, description, contact details, social links, default SEO | singleton; publisher approval |
| Partner | name, logo, relationship wording, relationship type, approval status | exact claim required; publish flag |
| Product | name, summary, positioning, media, CTA | StatStrike initially; future-ready |
| Product capability | title, explanation, feature status, audience, evidence | only `live` appears unqualified |
| Service | title, customer, problem, deliverable, outcome, CTA | ordered and publishable |
| Case study | client, relationship, challenge, approach, deliverable, verified outcome, media | confidentiality and approval fields |
| Insight | title, slug, excerpt, author, category, body, date, SEO, hero image | draft, preview, publish |
| Team member | name, role, bio, photo, profile link, display order | explicit publish consent |
| Career | title, type, location, description, status, closing date, apply method | expiry and active status |
| Testimonial | quote, author, role, organization, permission status | approval required |
| Metric | value, unit, label, evidence note, valid date | verification and expiry review |
| CTA | label, supporting copy, destination, placement | validated internal/external link |

### 9.2 Editorial workflow

1. An invited user creates or edits a draft.
2. Schema validation identifies incomplete or unsafe fields.
3. The editor previews the draft in the actual website layout.
4. The editor submits the entry for internal review through the agreed operational process.
5. A publisher checks accuracy, permission, formatting, links, and imagery.
6. The publisher publishes the content.
7. The website revalidates the affected pages and displays the approved update.
8. The content can later be unpublished, archived, or restored from version history.

### 9.3 Media management

- Support approved photographs, product screenshots, team/league logos, social images, and documents where required
- Require alternative text for meaningful images
- Record credit/source and usage permission where relevant
- Provide crop/hotspot controls and recommended dimensions
- Validate file type and practical file-size limits
- Prevent SVG or document uploads from becoming an uncontrolled security path
- Prefer replacing/reusing an existing approved asset over uploading duplicates
- Never use an uploaded logo as proof of an official relationship without approved relationship content

### 9.4 Preview and publication

- Preview is authenticated and can display drafts without exposing them publicly
- Production queries exclude drafts, archived records, unapproved proof, inactive careers, and non-live capabilities where appropriate
- Publication triggers targeted page revalidation
- Failed revalidation is logged and visible to the technical owner without falsely confirming a site update
- Previously generated public pages should remain available during a temporary CMS outage

## 10. Non-functional requirements

- Lighthouse targets on production-like pages: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+
- No avoidable layout shift
- Prefer server-rendered/static content; client JavaScript only where it adds value
- WCAG 2.2 AA intent
- Secure form handling; never expose secret keys in the client bundle
- Public pages remain available during temporary CMS API failures through static generation/caching and graceful fallbacks
- Supported at current Chrome, Safari, Firefox, Edge, and common mobile viewport sizes
- CMS administration must be usable by trained non-developers on a typical company laptop
- Common editorial tasks should not require Git, terminal commands, deployments, or developer assistance
- CMS and preview access must follow least privilege and use individual accounts

## 11. Success metrics

- Qualified demo requests
- Partnership and service enquiries
- StatStrike page-to-demo conversion
- StatStrike login clicks
- Case-study engagement
- Insight readership
- Career applications
- Core Web Vitals and form completion/error rate

### Editorial success metrics

- Percentage of routine content updates completed without developer assistance
- Median time from approved draft to publication
- Number of publication corrections caused by missing approval or inaccurate claims
- Percentage of published images with valid alternative text and permission metadata
- Number of inactive users retaining CMS access after periodic reviews

## 12. Content and claim governance

- Never invent clients, partnerships, league affiliations, statistics, testimonials, outcomes, awards, security claims, or capabilities.
- Use `TBC` markers or hide incomplete blocks.
- Distinguish official league partnerships from work for a participating team.
- Mark features internally as `live`, `beta`, `planned`, or `internal`; only `live` is presented without qualification.
- Every logo, quote, metric, and case study must carry an approval state in content data.
- Publishing authority and factual approval are separate: a publisher may publish only after the responsible business owner has approved the claim.
- Content entries must identify their last reviewer and review date where claims can become stale.
- Expired careers, outdated metrics, and time-sensitive statements must be automatically hidden or surfaced for review.

### Approval states

- `draft`: incomplete working content
- `in_review`: ready for business review
- `approved`: factually and legally cleared for publication
- `published`: approved and currently public
- `archived`: retained for history but not public

Implementation may map these states to Sanity's native draft/publish behavior plus explicit business-approval fields.

## 12A. Editorial permissions and responsibilities

| Action | Administrator | Publisher | Editor | Contributor |
|---|---:|---:|---:|---:|
| View published content | Yes | Yes | Yes | Yes |
| Create/edit drafts | Yes | Yes | Yes | Assigned scope |
| Upload approved media | Yes | Yes | Yes | Assigned scope |
| Preview drafts | Yes | Yes | Yes | Own/assigned drafts |
| Publish/unpublish | Yes | Yes | No | No |
| Delete/restore content | Yes | Restricted | No | No |
| Invite users/change roles | Yes | No | No | No |
| Change schemas/settings | Technical administrator | No | No | No |

The final implementation must verify which controls can be enforced by the chosen Sanity plan.

## 13. Out of scope for V1

- StatStrike authentication or dashboard redevelopment
- Custom-built CMS/admin panel; Sanity Studio is the approved administration system
- E-commerce and payment processing
- Multi-language support
- Public user accounts
- Unverified live-data widgets
- Native mobile application
- Unrestricted drag-and-drop website building
- Allowing editors to change routes, application code, design tokens, or integrations
- Public CMS registration or shared company login credentials
- CMS access to StatStrike match/player databases

## 14. Launch acceptance criteria

- All sitemap pages implemented or intentionally hidden
- Forms submit to an approved destination and handle errors safely
- All visible claims and assets approved
- No placeholder text, broken links, or fake metrics in production
- Responsive QA completed
- Accessibility, lint, typecheck, tests, and production build pass
- Metadata, sitemap, robots, analytics, legal pages, and 404 verified
- An authorized editor can create, preview, and publish an Insight, case study, team member, partner logo, and career entry without code changes
- Draft or unapproved content cannot appear on the production website
- Editor onboarding, media guidance, role assignment, and recovery instructions are documented
- A non-technical company user completes an acceptance test: sign in, create a draft, upload and crop an image, add alt text, preview, request approval, publish through an authorized user, verify the public update, then unpublish/restore it
- Unauthorized roles cannot publish, alter settings, invite users, or access draft content through the public website
- A CMS outage test confirms that already generated public pages remain available

## 15. Pending owner inputs

- Official business description and founding story
- Logos and brand assets
- Domain and company contact details
- Approved partner/team/league list and exact relationship wording
- Verified StatStrike feature status and login URL
- Product screenshots
- Metrics, testimonials, and case-study evidence
- Team profiles
- Form recipients and privacy/legal details
- Sanity project, dataset, plan, Studio URL, editor accounts, and role assignments

## 16. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Editor publishes an unsupported partnership claim | Reputational/legal risk | Required relationship wording, approval fields, publisher gate |
| Excessive CMS flexibility breaks design consistency | Poor quality and maintenance burden | Structured schemas and approved sections; no unrestricted builder |
| Shared or overprivileged accounts | Unauthorized changes | Individual invitations, least privilege, periodic access review |
| Drafts leak into production | Confidential information exposure | Separate preview access and publication-safe production queries |
| Media is unlicensed or inaccessible | Legal/accessibility risk | Permission/source metadata and required alt text |
| CMS outage makes site unavailable | Lost traffic and enquiries | Static generation, caching, graceful fallback |
| Content becomes outdated | Misleading public information | Review dates, expiry fields, scheduled audit process |
| Sanity plan lacks required role granularity | Workflow cannot be enforced | Confirm plan in Phase 0 before final schema/workflow implementation |

## 17. Open decisions before implementation

1. Who will be the primary Sanity administrator and backup administrator?
2. Who is authorized to publish partnership claims, case studies, and careers?
3. Should Studio use `admin.besportify.com` (recommended) or be embedded at `besportify.com/studio`?
4. Which Sanity plan supports the approved role model at launch?
5. What is the required retention period for enquiry and careers data? This data should not be stored in Sanity unless deliberately designed and approved.
