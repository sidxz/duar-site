#!/usr/bin/env bash
# Build with the deploy basePath, serve out/ under that prefix, screenshot desktop + mobile.
# Usage: scripts/shoot.sh [name]        → .verify/<name>-desktop.png, .verify/<name>-mobile.png
#        MOTION=1 scripts/shoot.sh anim  → drops --force-prefers-reduced-motion (JS animation path)
set -euo pipefail
cd "$(dirname "$0")/.."
NAME="${1:-page}"
BP="/duar-site"
PORT=3789

NEXT_PUBLIC_BASE_PATH="$BP" pnpm build >/dev/null
rm -rf .verify/serve && mkdir -p .verify/serve && ln -s "$PWD/out" ".verify/serve${BP}"
for p in $(lsof -tiTCP:$PORT -sTCP:LISTEN 2>/dev/null); do kill -9 "$p"; done
python3 -m http.server "$PORT" -d .verify/serve >/dev/null 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null' EXIT
for _ in $(seq 1 25); do
  curl -sf "http://localhost:${PORT}${BP}/" >/dev/null 2>&1 && break
  sleep 0.2
done
curl -sf "http://localhost:${PORT}${BP}/" | grep -q "Duar" || { echo "serve failed"; exit 1; }

CHROME=$(ls -d "$HOME"/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell 2>/dev/null | tail -1 || true)
[ -x "${CHROME:-}" ] || { echo "chrome-headless-shell not found — install Playwright chromium (npx playwright install chromium)"; exit 1; }
MOTION_FLAG="--force-prefers-reduced-motion"
[ "${MOTION:-0}" = "1" ] && MOTION_FLAG=""

shot() {
  "$CHROME" --headless=new --disable-gpu --no-sandbox --user-data-dir="$(mktemp -d)" \
    --force-color-profile=srgb --hide-scrollbars --window-size="$1" \
    --virtual-time-budget=2600 $MOTION_FLAG \
    --screenshot=".verify/$NAME-$2.png" "http://localhost:${PORT}${BP}/" 2>/dev/null
}
shot 1440,8000 desktop
shot 390,14000 mobile
echo ".verify/$NAME-desktop.png .verify/$NAME-mobile.png"
