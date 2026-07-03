#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
README="$ROOT/README.md"
INSTALL_TS="$ROOT/website/lib/install-commands.ts"

if [[ ! -f "$INSTALL_TS" ]]; then
  echo "FAIL: missing $INSTALL_TS"
  exit 1
fi

# Extract bash blocks under ## Install until next ## heading
readme_block=$(awk '/^## Install/{flag=1;next}/^## /{if(flag) exit}flag' "$README" \
  | sed -n '/^```bash$/,/^```$/{ /^```/d; p; }')

fail=0
while IFS= read -r line; do
  [[ -z "$line" ]] && continue
  if ! grep -Fq "$line" "$INSTALL_TS"; then
    echo "FAIL: README install line not in install-commands.ts:"
    echo "  $line"
    fail=1
  fi
done <<< "$readme_block"

if [[ "$fail" -ne 0 ]]; then
  exit 1
fi

echo "OK: website install commands match README.md Install section"
