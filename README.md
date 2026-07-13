# Guardian Way — Website

A Next.js 15 (App Router) + Tailwind v4 landing page for Guardian ,
Gurugram's smart school-cab safety platform.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Fonts

Manrope and Plus Jakarta Sans are self-hosted via `@fontsource/manrope` and
`@fontsource/plus-jakarta-sans` (imported in `app/layout.tsx`), so the real
brand fonts load with no call to fonts.googleapis.com and no extra setup —
just `npm install` and go.

## Structure

- `app/page.tsx` — assembles all sections
- `components/` — one file per section (Hero, TrustBar, ProblemSolution,
  HowItWorks, SafetyRings, Features, Stats, Audiences, Testimonials, FAQ,
  CTAFooter) plus `Navbar.tsx`
- Icons via `@iconify/react` (Phosphor + MDI icon sets, resolved at runtime)
- Animation via `framer-motion`

## Design tokens (in `app/globals.css`)

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#153E75` | Primary — trust, headlines |
| `--yellow` | `#FFC83D` | Secondary — CTAs, highlights |
| `--mint` | `#3CB995` | Success / safety accent |
| `--coral` | `#FF5A5F` | Danger / SOS only |
| `--bg` | `#FBFBFD` | Page background |
| `--card` | `#F2F7FD` | Card / section background |

## Content source

Copy and structure are based on the brand brief and brochure you provided
(Guardian Way positioning, "8 Layers of Safety," the 6-step ride flow,
trust-bar checklist, and school/driver/investor messaging). Replace the
placeholder testimonials, stats, and photography with real data as it
becomes available — the `Testimonials.tsx` and `Stats.tsx` components are
built to make that a one-line swap per item.

## Next steps you may want

- Swap the illustrated hero mockup for real app screenshots / driver photos
- Wire the "Register Child" and "Request Callback" CTAs to a form or CRM
- Add a real blog (`/blog`) and a dedicated `/safety` deep-dive page — both
  called out as high-value in the brief
