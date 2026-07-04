#!/usr/bin/env bash
# Verify npm pack tarball includes runtime + installer (distribution gate).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ROOT_VERSION="$(tr -d '[:space:]' < VERSION)"
PKG_VERSION="$(node -p "require('./package.json').version")"
if [[ "$ROOT_VERSION" != "$PKG_VERSION" ]]; then
  echo "FAIL: VERSION ($ROOT_VERSION) != package.json ($PKG_VERSION)"
  exit 1
fi

CONTENTS="$(npm pack --dry-run 2>&1 | awk '/Tarball Contents/{flag=1;next}/^npm notice$/{if(flag) exit}flag' | sed 's/^npm notice //' | awk '{print $NF}')"

required=(
  "bin/arabic-skill.js"
  "arabic/SKILL.md"
  ".cursor/commands/arabic.md"
  ".cursor/rules/arabic.mdc"
  "VERSION"
  "README.md"
  "LICENSE"
)

fail=0
for path in "${required[@]}"; do
  if ! echo "$CONTENTS" | grep -qx "$path"; then
    echo "FAIL: missing from npm pack: $path"
    fail=1
  fi
done

if [[ "$fail" -ne 0 ]]; then
  exit 1
fi

echo "OK: npm pack includes bin, arabic/SKILL.md, VERSION (v$PKG_VERSION)"
