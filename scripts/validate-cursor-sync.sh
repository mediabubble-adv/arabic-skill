#!/usr/bin/env bash
# Cursor mirror sync gate: arabic/ and .cursor/skills/arabic/ must be byte-identical.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SOURCE="arabic"
MIRROR=".cursor/skills/arabic"

if [[ ! -d "$MIRROR" ]]; then
  echo "FAIL: missing Cursor mirror: $MIRROR"
  echo "Run: node bin/arabic-skill.js install --dir .cursor/skills --force"
  exit 1
fi

if ! diff -rq --exclude='.DS_Store' "$SOURCE" "$MIRROR"; then
  echo "FAIL: arabic/ and $MIRROR/ have drifted."
  echo "Run: node bin/arabic-skill.js install --dir .cursor/skills --force"
  exit 1
fi

echo "OK: .cursor/skills/arabic/ matches arabic/"
