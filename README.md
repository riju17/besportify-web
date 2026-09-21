# BeSportify Web

Corporate website and Sanity editorial workspace for BeSportify.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sanity Content Lake and Studio
- Vitest and Testing Library

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `npm run format`
- `npm run test`

## Environment

Copy `.env.example` to `.env.local` and supply the Sanity project values before running CMS-connected features.

## Notes

- The repository is intentionally structured around the controlled phase plan in `PHASES.md`.
- No public claims should be added without approval and verification.

## Website policies and launch review

Privacy, terms, cookie preferences, refunds and accessibility pages are implemented.
Read [the risk audit](docs/WEBSITE-RISK-AUDIT.md) before launch. It lists missing
business facts, conditional legal requirements, asset permissions and validation limits.
Verified operator/contact information comes from approved Sanity site settings or the
`BUSINESS_*` variables in `.env.example`. The enquiry form stays disabled until those
minimum details exist, then opens a consented email draft without a contact backend.

The browser audit uses Chrome plus temporary Playwright tooling, separate from app dependencies:

```sh
npm install --prefix /private/tmp/besportify-audit-tools --no-package-lock --no-audit --no-fund playwright
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
# In another terminal:
node scripts/audit-browser.mjs
```

Set `PLAYWRIGHT_MODULE` to an alternative Playwright module path and `CHROME_PATH`
to a browser executable if needed. Results go to `docs/audit-results`. Browser checks
include axe, keyboard/storage interactions and sampled contrast against rendered
backgrounds; sampling is not exhaustive WCAG certification.
