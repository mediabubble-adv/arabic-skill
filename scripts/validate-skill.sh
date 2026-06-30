#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILL="$ROOT/arabic/SKILL.md"
ERRORS=0

echo "==> Validating skill file references..."

if [[ ! -f "$SKILL" ]]; then
  echo "ERROR: Missing $SKILL"
  exit 1
fi

# Extract markdown path references from SKILL.md and references/
scan_file() {
  local file="$1"
  while IFS= read -r line; do
    # Only validate paths with directory prefix (dialects/, references/, etc.)
    while [[ "$line" =~ \`((dialects|references|domains|conversations|professional-docs)/[a-zA-Z0-9_./-]+\.md)\` ]]; do
      local ref="${BASH_REMATCH[1]}"
      line="${line#*\`${ref}\`}"
      # Skip external or template refs
      [[ "$ref" == http* ]] && continue
      local target="$ROOT/arabic/$ref"
      if [[ ! -f "$target" ]]; then
        echo "ERROR: $file references missing file: arabic/$ref"
        ERRORS=$((ERRORS + 1))
      fi
    done
  done < "$file"
}

scan_file "$SKILL"

for ref_file in "$ROOT/arabic/references"/*.md; do
  [[ -f "$ref_file" ]] && scan_file "$ref_file"
done

# Planned files referenced in docs but not yet created — warn only
PLANNED=(
  "references/advisory-mode.md"
  "references/prompt-engineering.md"
  "references/project-mode.md"
  "references/project-context-scanner.md"
  "references/ads-service-matrix.md"
  "references/book-writing.md"
  "references/seo-aeo-masri.md"
  "references/seasonal-calendar.md"
  "domains/ads-media.md"
  "domains/dev-tech.md"
  "voice.md"
)

for planned in "${PLANNED[@]}"; do
  if grep -rq "$planned" "$ROOT/docs/planning" "$ROOT/docs/product" 2>/dev/null; then
    if [[ ! -f "$ROOT/arabic/$planned" ]]; then
      echo "WARN: Planned file not yet created: arabic/$planned"
    fi
  fi
done

# Version sync
VERSION_FILE="$ROOT/VERSION"
if [[ -f "$VERSION_FILE" ]]; then
  ROOT_VERSION="$(tr -d '[:space:]' < "$VERSION_FILE")"
  SKILL_VERSION="$(grep -E '^version:' "$SKILL" | head -1 | sed 's/.*"\(.*\)".*/\1/')"
  if [[ "$ROOT_VERSION" != "$SKILL_VERSION" ]]; then
    echo "ERROR: VERSION ($ROOT_VERSION) != SKILL.md version ($SKILL_VERSION)"
    ERRORS=$((ERRORS + 1))
  else
    echo "OK: Version sync ($ROOT_VERSION)"
  fi

  PACKAGE_JSON="$ROOT/package.json"
  if [[ -f "$PACKAGE_JSON" ]]; then
    PACKAGE_VERSION="$(grep -E '"version":' "$PACKAGE_JSON" | head -1 | sed 's/.*"version": *"\([^"]*\)".*/\1/')"
    if [[ "$ROOT_VERSION" != "$PACKAGE_VERSION" ]]; then
      echo "ERROR: VERSION ($ROOT_VERSION) != package.json version ($PACKAGE_VERSION)"
      ERRORS=$((ERRORS + 1))
    else
      echo "OK: Package version sync ($PACKAGE_VERSION)"
    fi
  fi
fi

if [[ $ERRORS -gt 0 ]]; then
  echo "==> FAILED with $ERRORS error(s)"
  exit 1
fi

echo "==> Skill validation passed"
