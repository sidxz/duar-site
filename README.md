# sentinel-site

Product site for [Sentinel Auth](https://github.com/sidxz/Sentinel). Docs live at https://docs.sentinel-auth.com.

```bash
pnpm install
pnpm dev                 # http://localhost:3000
pnpm lint && pnpm build  # static export → out/
scripts/shoot.sh home    # screenshots → .verify/
```

Deploys to GitHub Pages on push to `main` (see `.github/workflows/deploy.yml`). One-time: in the GitHub repo, Settings → Pages → Source = **GitHub Actions**.
Currently served at https://sidxz.github.io/sentinel-site/ via `NEXT_PUBLIC_BASE_PATH=/sentinel-site`.

## Moving to sentinel-auth.com
1. In `deploy.yml`, delete the `NEXT_PUBLIC_BASE_PATH` line and set `NEXT_PUBLIC_SITE_URL: https://sentinel-auth.com`.
2. Add `public/CNAME` containing `sentinel-auth.com`.
3. Point the apex A records at GitHub Pages (185.199.108.153, .109.153, .110.153, .111.153) and enable "Enforce HTTPS" in repo Settings → Pages. After the domain shows as verified in Settings → Pages, enable Enforce HTTPS.

## Adding admin screenshots
Drop PNGs into `public/screenshots/` and pass `src="/screenshots/<file>.png"` to `ScreenshotFrame` in `src/app/page.tsx`.

Design rules: `AGENTS.md`.
