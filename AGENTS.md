# duar-site

Product site for Duar. Single page, Next 16 static export, GitHub Pages.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — read the relevant guide in `node_modules/next/dist/docs/` before writing any code.
<!-- END:nextjs-agent-rules -->

## Design system (sibling of sidxz/docustore-site)
- **Palette:** white paper, ink `#0b0b0d`, `#f5f5f5` washes. Near-monochrome.
- **The one accent:** Duar red `#f43737` (`--color-brand`). It appears ONLY in: the header band (`bg-brand`, paper text, white CTA), hero eyebrow's first two words, the three stat numbers, capability-card wash tops, hero SVG shield + minted-token edge, one topology node, CTA border, footer hairline, security-checklist checks, one line per SDK code card. Everything else stays monochrome. Do not add red elsewhere. Never yellow.
- **Type:** IBM Plex Sans (display + body) + IBM Plex Mono (eyebrows, labels, buttons — uppercase, tracked). Self-hosted `src/app/fonts/*.woff2` (latin subset — no `→ ✓ ▶`; use lucide icons / SVG paths). No Google Fonts. No serif.
- **Buttons:** `rounded-none`, mono uppercase; `src/lib/cta.ts`. Cards `rounded-2xl`. Container `max-w-6xl px-6`. Eyebrows `/ Label`.
- **Tokens:** `src/app/globals.css`. Links: `src/lib/links.ts`. Static assets: always `asset("/path")` (basePath).
- **Logo:** the real brand mark `public/logo.png` (black shield, yellow hexagon; transparent) via `Logo` in `src/components/layout/logo.tsx`; favicon `src/app/icon.png`. Source PSD/PNG: `~/workspace/logos/duar/`.
- **Art** is hand-authored SVG in `src/components/marketing/`. No other rasters.
- **Motion:** only `tier-stack.tsx` (IntersectionObserver explode; reduced-motion → static SSR state).

## Verify (do this before claiming anything looks right)
`scripts/shoot.sh <name>` builds with the deploy basePath, serves `out/` under `/duar-site`, and writes `.verify/<name>-{desktop,mobile}.png`. **Read the PNGs.** `MOTION=1 scripts/shoot.sh x` captures the animated path (under virtual time the transition may freeze mid-way or fully settle; a shot that differs from the reduced-motion one proves the JS path ran — it is not the beauty shot).

## Deploy / domain
Push to `main` → `.github/workflows/deploy.yml` → https://duar.io (custom domain via `public/CNAME`; no basePath). Docs: https://docs.duar.io.
