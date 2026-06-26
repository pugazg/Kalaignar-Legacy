# Kalaignar M. Karunanidhi’s Legacy — Interactive Report

A premium, mobile-first digital report that turns the peer-reviewed study *“Kalaignar M.
Karunanidhi’s Legacy: A Holistic Socio-Economic Transformation of Tamil Nadu”*
(Yoganandham, GJIBR 2026) into a 10-minute visual experience.

The deliverable is a single React component: **`KarunanidhiLegacy.jsx`**.

---

## Run it

It renders directly in the Claude artifact viewer. To run locally:

**Vite (quickest):**
```bash
npm create vite@latest legacy -- --template react
cd legacy && npm install recharts lucide-react
# replace src/App.jsx with KarunanidhiLegacy.jsx, then:
npm run dev
```

**Next.js:**
```bash
npx create-next-app@latest legacy
cd legacy && npm install recharts lucide-react
# drop the file in as a page/client component ("use client" at the top), then:
npm run dev
```

Only two runtime dependencies: `recharts` (charts) and `lucide-react` (icons).
Styling is self-contained (inline theme tokens + an injected `<style>` block), so no
Tailwind config or CSS files are required.

---

## What’s inside

- **Hero** — full-screen, animated ledger figures, dual CTAs, scroll cue.
- **Executive Summary** — 8 icon cards distilling the abstract.
- **Legacy Overview** — 24 tappable pillars, each revealing its headline outcome.
- **Timeline** — animated 1969–2011 arc with a stat per milestone.
- **Thematic Sections** — all 24 domains as filterable, expandable cards (initiatives,
  statistics, full detail, source).
- **Statistics Dashboard** — the paper’s tables rendered as bar / line / area /
  horizontal-bar / comparison charts with animated counters.
- **References** + footer (author, journal, copyright, back-to-top).
- **Chrome** — sticky nav with scroll-spy, full-text search overlay, dark-mode toggle,
  reading-progress bar, back-to-top, reduced-motion support, keyboard focus.

---

## File ↔ folder mapping

The brief asked for `/components`, `/sections`, `/data`, `/lib`, `/styles`. To keep the
report runnable as one artifact, those layers live as clearly separated regions inside
the single file and split out 1:1:

| Region in `KarunanidhiLegacy.jsx` | Maps to |
|---|---|
| `PAPER`, `HEADLINE_FIGURES`, `SUMMARY`, `PILLARS`, `TIMELINE`, `SECTIONS`, `CHARTS`, `REFERENCES` | `/data/*.ts` |
| `palette()`, `FONT_CSS`, `display/mono/body` | `/styles/theme.ts` |
| `useReveal`, `useCountUp`, `accentOf`, `ChartTip` | `/lib/hooks.ts`, `/lib/utils.ts` |
| `Eyebrow`, `Counter`, `ChartFrame`, `Nav`, `Progress`, `SearchOverlay`, `BackToTop`, `ThemeCard` | `/components/*` |
| `Hero`, `Summary`, `Pillars`, `Timeline`, `Themes`, `Dashboard`, `References`, `Footer` | `/sections/*` |
| `App` | `app/page.tsx` |

---

## Content & accuracy

Every figure is taken **directly from the source paper** — exact numbers preserved
(literacy 80.3%, 69% reservation, 44 lakh midday-meal beneficiaries, ₹36,000 cr urban
investment, factories 7,000 → 40,000+, renewables 44.7% → 58.6%, poverty 32% → 11%,
IMR 44 → 21, and so on). Long paragraphs are summarised for the web; nothing is invented
or independently fact-checked.

## Notes on the build

- **Framer Motion** was requested but isn’t available in this runtime, so animations use
  CSS keyframes + `IntersectionObserver` (scroll reveals, count-ups, hover states) —
  same effect, zero extra dependencies, and `prefers-reduced-motion` respected.
- **Charts** use Recharts (requested). **Icons** use Lucide (requested).
- The image gallery is rendered as CSS/SVG data panels rather than embedded raster
  figures, since the PDF’s infographics are flattened images and the brief asks to
  recreate diagrams as responsive components instead of embedding static art.
