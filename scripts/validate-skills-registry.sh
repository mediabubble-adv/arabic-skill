#!/usr/bin/env bash
# Verify mediabubble-adv/arabic-skill is discoverable via skills CLI (skills.sh telemetry path).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v npx >/dev/null 2>&1; then
  echo "SKIP: npx not available"
  exit 0
fi

output="$(npx skills add mediabubble-adv/arabic-skill --list -y 2>&1)" || {
  echo "FAIL: skills add --list failed"
  echo "$output"
  exit 1
}

if ! grep -Fq "arabic" <<< "$output"; then
  echo "FAIL: skills registry did not list 'arabic' skill"
  echo "$output"
  exit 1
fi

skill_name="$(grep -E '^name:' "$ROOT/arabic/SKILL.md" | head -1 | sed 's/.*: *//' | tr -d ' "')"
if [[ "$skill_name" != "arabic" ]]; then
  echo "FAIL: arabic/SKILL.md name ($skill_name) != arabic"
  exit 1
fi

echo "OK: skills.sh registry lists mediabubble-adv/arabic-skill (skill: arabic)"
