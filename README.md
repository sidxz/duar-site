# duar-site

Product site for [Duar](https://github.com/sidxz/duar) — https://duar.io. Docs live at https://sidxz.github.io/duar/ (moving to https://docs.duar.io/).

```bash
pnpm install
pnpm dev                 # http://localhost:3000
pnpm lint && pnpm build  # static export → out/
scripts/shoot.sh home    # screenshots → .verify/
```

Deploys to GitHub Pages on push to `main` (see `.github/workflows/deploy.yml`) and is served at **https://duar.io** (`public/CNAME`; apex A records + `www` CNAME point at GitHub Pages; repo Settings → Pages → Source = GitHub Actions, custom domain duar.io, Enforce HTTPS on).

Docs live at https://docs.duar.io (served from the `sidxz/duar` repo).
