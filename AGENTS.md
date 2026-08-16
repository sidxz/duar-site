# duar-site

Product site for Duar. Single page, Next 16 static export, GitHub Pages.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
This version has breaking changes — read the relevant guide in `node_modules/next/dist/docs/` before writing any code.
<!-- END:nextjs-agent-rules -->

## Design system (sibling of sidxz/docustore-site)
- **Two grounds.** The navbar + hero are the one dark region: ink `#0b0b0d`, paper type, a crimson glow. Everything after the hero is white paper with `#f5f5f5` washes, near-monochrome. Cards, code, bands, footer never go dark (the topology art is the one ink card below the fold). Docs stay light too.
- **The one accent:** Duar red `#f43737` (`--color-brand`). It is light, never a slab. It appears ONLY in: the 2px gradient hairline at the very top of the page (navbar), the hero glow (`hero-backdrop.tsx`, `--color-brand-deep` `#7a0f1f` is its only companion), the beta pill's dot, hero SVG shield + minted-token edge, one line per column of the hero claims ledger, capability-card wash tops, one topology node, CTA border, footer hairline, security-checklist checks, one line per SDK code card. Everything else stays monochrome. Do not add red elsewhere. Never yellow (the logo's hexagon is the exception).
- **Type:** Schibsted Grotesk (display + body; one variable woff2, weights 400–600) + DM Mono 400/500 (eyebrows, labels, buttons, code, ledger — labels uppercase, tracked). Both SIL OFL, self-hosted in `src/app/fonts/` (Google latin subset — no `→ ✓ ▶`; use lucide icons / SVG paths); CSS vars `--font-schibsted` / `--font-dm-mono` from `layout.tsx`. No Google Fonts at runtime. No serif. Deliberately not the Inter / Plex / Space Grotesk / JetBrains Mono cluster — don't drift back to it.
- **Buttons:** `rounded-none`, mono uppercase; `src/lib/cta.ts` — `ctaPrimary`/`ctaOutline` on paper, `ctaOnInk`/`ctaOutlineOnInk`/`ctaOnInkSm` on the ink hero/navbar. Cards `rounded-2xl`. Container `max-w-6xl px-6`. Eyebrows `/ Label`.
- **Navbar:** sticky, `bg-ink/85 backdrop-blur`, hairline bottom; the hero is pulled up under it (`-mt-[66px] pt-[66px]`) so the blur has the glow behind it. Text on it is paper. Hero copy: `text-paper`, secondary `text-paper/60`, numerals `text-paper/50`.
- **Tokens:** `src/app/globals.css`. Links: `src/lib/links.ts`. Static assets: always `asset("/path")` (basePath).
- **Logo:** the real brand mark `public/logo.png` (black shield, yellow hexagon; transparent) via `Logo` in `src/components/layout/logo.tsx`; `inverted` (navbar) uses `public/logo-on-ink.png` — same mark with the black repainted paper (generated from logo.png; regenerate if the mark changes). Favicon `src/app/icon.png`. Source PSD/PNG: `~/workspace/logos/duar/`.
- **Art** is hand-authored SVG in `src/components/marketing/`. `token-flow.tsx` is drawn paper-on-ink (it lives in the hero); the rest ink-on-paper. No other rasters.
- **Motion:** `hero-backdrop.tsx` (hero: hairline grid, two glow blobs on 22/28 s `animate-glow-*` drifts, and the claims ledger — server-rendered mono columns on a CSS `animate-ledger` loop, `xl:` only, runs to the viewport edge), `tier-stack.tsx` (IntersectionObserver explode), `reveal.tsx` (mounted once in `page.tsx`; fades up every `[data-reveal]` element on first viewport entry, `data-reveal="stagger"` staggers children — only added below the fold, so no-JS/reduced-motion/on-screen content is simply visible). Reduced-motion → static everywhere. ≤2 animated things per view; new sections get `data-reveal`, not their own animation.

## Verify (do this before claiming anything looks right)
`scripts/shoot.sh <name>` builds with the deploy basePath, serves `out/` under `/duar-site`, and writes `.verify/<name>-{desktop,mobile}.png`. **Read the PNGs.** `MOTION=1 scripts/shoot.sh x` captures the animated path (under virtual time the transition may freeze mid-way or fully settle; a shot that differs from the reduced-motion one proves the JS path ran — it is not the beauty shot).

## Deploy / domain
Push to `main` → `.github/workflows/deploy.yml` → https://duar.io (custom domain via `public/CNAME`; no basePath). Docs: https://docs.duar.io.
