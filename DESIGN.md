# BeSportify Website — Design System

## 1. Creative direction

BeSportify should feel like a credible performance-intelligence company: precise, athletic, modern, and calm. The design must avoid both corporate dullness and exaggerated gaming/neon aesthetics.

Principles:

1. Intelligence before decoration
2. Performance energy with disciplined restraint
3. Product evidence over generic promises
4. Strong hierarchy and generous spacing
5. Accessible interaction and readable data

## 2. Brand relationship

- BeSportify: master brand; logo-led charcoal/black identity with a signal red accent
- StatStrike: flagship cricket product; performance green accent
- Both share typography, spacing, radii, and motion language
- Red is reserved for BeSportify brand moments, primary CTAs, links, and focus states
- Green is used deliberately on StatStrike sections and product CTAs, not everywhere

## 3. Color tokens

The logo artwork has been supplied. The values below are the active brand palette.
Token names remain compatibility aliases from the starter implementation.

| Token | Value | Use |
|---|---|---|
| `ink-950` | `#FAF7F3` | Main paper background |
| `ink-900` | `#F3EDE7` | Alternate background |
| `slate-800` | `#E7DFD6` | Cards and surfaces |
| `slate-700` | `#D3C8BE` | Borders |
| `blue-500` | `#ED1C24` | BeSportify brand accent red |
| `violet-500` | `#4A3A38` | Warm graphite support tone |
| `green-400` | `#2F9D58` | StatStrike accent |
| `white-100` | `#141414` | Primary text |
| `grey-300` | `#5F5A56` | Secondary text |
| `success` | `#2F9D58` | Success feedback |
| `warning` | `#C78B2E` | Warning feedback |
| `danger` | `#D93A3F` | Error feedback |

Every foreground/background pair must be contrast-tested. Do not encode meaning through color alone.

## 4. Typography

- Display and headings: Space Grotesk
- Body, controls, and navigation: Inter
- Fallback: system sans-serif stack
- Use tabular numerals for metrics

Suggested scale:

| Style | Desktop | Mobile |
|---|---:|---:|
| Display | 64–72px | 42–48px |
| H1 | 56px | 38px |
| H2 | 40px | 32px |
| H3 | 28px | 24px |
| Body large | 20px | 18px |
| Body | 16px | 16px |
| Small | 14px | 14px |

Use fluid `clamp()` values and comfortable line lengths. Body copy should generally remain under 70 characters per line.

## 5. Spacing and layout

- Base spacing unit: 4px
- Common rhythm: 8, 12, 16, 24, 32, 48, 64, 96, 128
- Maximum content width: approximately 1200–1280px
- Reading width: approximately 720px
- Responsive grid: 4 columns mobile, 8 tablet, 12 desktop
- Section spacing should feel generous; avoid stacking many shallow bands

## 6. Shape and depth

- Card radius: 16–20px
- Button radius: 10–12px
- Pills reserved for metadata/status, not every label
- Use subtle borders and tonal surfaces before shadows
- Glows must be faint, local, and tied to meaningful accent elements

## 7. Key components

- Header and accessible mobile menu
- Hero with product evidence
- Primary, secondary, tertiary, and text buttons
- Trusted-by logo strip
- Product browser/mockup frame
- Capability cards
- Audience solution tabs or cards
- Metric block
- Case-study card
- Insight card
- Team card
- Career listing
- Testimonial
- FAQ accordion
- Forms with validation states
- Footer and legal navigation

## 8. Imagery

Prefer:

- Authentic match/team photographs with permission
- High-quality product screenshots
- Cropped analytical UI details
- Abstract pitch/field geometry
- Data paths, trajectories, and grids derived from meaningful cricket concepts

Avoid:

- Generic business stock photos
- Unlicensed team or league photography
- Fake charts or invented match data
- Decorative bat/ball/wicket clip art
- AI-generated imagery presented as a real team, player, or event

## 9. Motion

- Use motion to explain hierarchy and product behavior
- Typical duration: 160–400ms for UI; up to 700ms for deliberate hero reveals
- Use opacity and transform; avoid layout-triggering animation
- Respect `prefers-reduced-motion`
- No continuous background motion that distracts from copy
- Metrics must not animate from false values in a misleading way

## 10. Page-specific direction

### Home hero

- Strong left-aligned proposition on a light paper surface
- Clear CTAs
- Real StatStrike screenshot in a refined product frame
- Subtle pitch/grid motif in the background with red brand glow

### StatStrike page

- Green accent introduced as the product identity
- Alternate outcome-led copy and visual product evidence
- Avoid presenting every feature as an identical card

### Case studies

- Editorial layout with evidence, pull metrics, and visual artifacts
- Confidentiality notes where appropriate

### Insights

- High-readability editorial typography
- Category, date, author, and reading time
- Minimal decorative chrome inside article bodies

## 11. Accessibility

- Minimum 44×44px practical touch targets
- Visible focus indicators
- Never place essential text inside images
- Useful alternative text; decorative imagery uses empty alt
- Forms pair labels, instructions, and errors programmatically
- Accordions, dialogs, and menus follow WAI-ARIA interaction patterns
- Do not rely on hover for essential information

## 12. Design QA checklist

- Approved logos and proportions used correctly
- No placeholder or invented sports visuals in production
- Contrast and focus verified
- Mobile layouts reviewed at 320px and common larger widths
- Long names, titles, and error messages tested
- Empty/one-item/many-item content states reviewed
- Reduced-motion behavior verified
- Product screenshots remain legible and appropriately cropped
