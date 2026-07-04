#!/usr/bin/env bash
# Onboarding gate: templates + onboarding-mode reference exist
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

required=(
  "arabic/references/onboarding-mode.md"
  "arabic/templates/.arabic/config.yaml"
  "arabic/templates/.arabic/briefs/example.yaml"
  "arabic/templates/.arabic/README.md"
)

fail=0
for path in "${required[@]}"; do
  if [[ ! -f "$ROOT/$path" ]]; then
    echo "FAIL: missing onboarding file: $path"
    fail=1
  fi
done

if ! grep -q 'onboarding-mode.md' "$ROOT/arabic/references/INDEX.md"; then
  echo "FAIL: INDEX.md missing onboarding-mode.md entry"
  fail=1
fi

if ! grep -q '| \*\*onboarding\*\* |' "$ROOT/arabic/references/load-discipline.md"; then
  echo "FAIL: load-discipline.md missing onboarding task class"
  fail=1
fi

if [[ "$fail" -ne 0 ]]; then
  exit 1
fi

echo "OK: onboarding templates and runtime reference present"
