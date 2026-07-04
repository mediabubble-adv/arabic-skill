#!/usr/bin/env bash
# Dry-run gate: Cursor target must install skill + command + rule paths.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

output="$(node bin/arabic-skill.js install --target cursor --dry-run --force 2>&1)"

for needle in "skills/arabic" "commands/arabic.md" "rules/arabic.mdc"; do
  if ! grep -Fq "$needle" <<< "$output"; then
    echo "FAIL: cursor dry-run missing path: $needle"
    echo "$output"
    exit 1
  fi
done

for path in ".cursor/commands/arabic.md" ".cursor/rules/arabic.mdc"; do
  if [[ ! -f "$ROOT/$path" ]]; then
    echo "FAIL: missing Cursor integration source: $path"
    exit 1
  fi
done

echo "OK: Cursor full install dry-run includes skill, command, and rule"
