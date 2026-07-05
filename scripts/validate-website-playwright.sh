#!/usr/bin/env bash
# G15–G16 Playwright golden runner — builds website and runs e2e specs
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB="$ROOT/website"

if [[ ! -f "$WEB/package.json" ]]; then
  echo "FAIL: missing website/package.json"
  exit 1
fi

cd "$WEB"

if [[ ! -d node_modules ]]; then
  echo "==> Installing website dependencies..."
  npm install
fi

if [[ ! -d node_modules/@playwright/test ]]; then
  echo "FAIL: @playwright/test not installed — run npm install in website/"
  exit 1
fi

echo "==> Ensuring Playwright Chromium..."
npx playwright install chromium

echo "==> Building website (G17)..."
npm run build

echo "==> Running Playwright golden tests (G15–G16)..."
export CI=1
npx playwright test

echo "OK: website Playwright golden tests (G15–G16) passed"
