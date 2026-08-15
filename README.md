# duar-site

Product site for [Duar](https://github.com/sidxz/duar) — https://duar.io. Docs live at https://sidxz.github.io/duar/ (moving to https://docs.duar.io/).

```bash
pnpm install
pnpm dev                 # http://localhost:3000
pnpm lint && pnpm build  # static export → out/
scripts/shoot.sh home    # screenshots → .verify/
```

Deploys to GitHub Pages on push to `main` (see `.github/workflows/deploy.yml`). One-time: in the GitHub repo, Settings → Pages → Source = **GitHub Actions**.
Currently served at https://sidxz.github.io/duar-site/ via `NEXT_PUBLIC_BASE_PATH=/duar-site`.

## Moving to duar.io
1. In `deploy.yml`, delete the `NEXT_PUBLIC_BASE_PATH` line and set `NEXT_PUBLIC_SITE_URL: https://duar.io`.
2. Add `public/CNAME` containing `duar.io`.
3. Point the apex A records at GitHub Pages (185.199.108.153, .109.153, .110.153, .111.153). Once the domain shows as verified in repo Settings → Pages, enable "Enforce HTTPS".

Design rules: `AGENTS.md`.
