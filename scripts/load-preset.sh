#!/usr/bin/env bash
# Load preset — fetch and pack named file bundles by task class
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PRESET_DEFS="$ROOT/arabic/references/load-presets.md"
DEST_DIR="${2:-.}"

# Validate preset exists
validate_preset() {
  local preset="$1"
  if ! grep -q "^### \`$preset\`" "$PRESET_DEFS"; then
    echo "ERROR: preset '$preset' not found in $PRESET_DEFS" >&2
    echo "Available presets:" >&2
    grep "^### \`" "$PRESET_DEFS" | sed 's/^### `/  - /' | sed 's/`$//' >&2
    exit 1
  fi
}

# Fetch preset files
fetch_preset() {
  local preset="$1"
  validate_preset "$preset"

  case "$preset" in
    plan)
      echo "arabic/references/project-mode.md"
      echo "arabic/references/advisory-mode.md"
      echo "arabic/references/project-context-scanner.md"
      ;;
    write)
      echo "arabic/references/engines.md"
      echo "arabic/references/output-templates.md"
      echo "arabic/references/humanization-protocol.md"
      ;;
    audit)
      echo "arabic/references/audit-mode.md"
      echo "arabic/references/examples.md"
      echo "arabic/references/taboos.md"
      ;;
    research)
      echo "arabic/references/research-mode.md"
      echo "arabic/references/trends-and-hooks.md"
      ;;
    seasonal)
      echo "arabic/references/project-mode.md"
      echo "arabic/references/advisory-mode.md"
      echo "arabic/references/seasonal-calendar.md"
      echo "arabic/references/trends-and-hooks.md"
      ;;
    campaign)
      echo "arabic/references/engines.md"
      echo "arabic/references/output-templates.md"
      echo "arabic/references/ads-service-matrix.md"
      echo "domains/ads-media.md"
      ;;
    book)
      echo "arabic/references/project-mode.md"
      echo "arabic/references/advisory-mode.md"
      echo "arabic/references/book-writing.md"
      echo "arabic/references/humanization-protocol.md"
      ;;
    seo-aeo-masri)
      echo "arabic/references/engines.md"
      echo "arabic/references/output-templates.md"
      echo "arabic/references/seo-aeo-masri.md"
      ;;
    seo-aeo-gulf)
      echo "arabic/references/engines.md"
      echo "arabic/references/output-templates.md"
      echo "arabic/references/seo-aeo-gulf.md"
      ;;
    seo-aeo-ksa)
      echo "arabic/references/engines.md"
      echo "arabic/references/output-templates.md"
      echo "arabic/references/seo-aeo-ksa.md"
      ;;
    seo-aeo-levantine)
      echo "arabic/references/engines.md"
      echo "arabic/references/output-templates.md"
      echo "arabic/references/seo-aeo-levantine.md"
      ;;
    audit-full)
      echo "arabic/references/audit-mode.md"
      echo "arabic/references/examples.md"
      echo "arabic/references/taboos.md"
      echo "arabic/references/rtl-audit.md"
      ;;
    dialect-lock)
      echo "arabic/references/engines.md"
      echo "arabic/references/output-templates.md"
      echo "arabic/references/command-router.md"
      ;;
    coach)
      echo "arabic/references/prompt-engineering.md"
      echo "arabic/references/advisory-mode.md"
      echo "arabic/references/examples.md"
      ;;
    init)
      echo "arabic/references/advisory-mode.md"
      echo "arabic/SKILL.md"
      echo "arabic/references/output-templates.md"
      ;;
    *)
      echo "ERROR: unknown preset '$preset'" >&2
      exit 1
      ;;
  esac
}

# Main
if [[ $# -lt 1 ]]; then
  echo "Usage: load-preset.sh <preset> [--dest <dir>]"
  echo ""
  echo "Available presets:"
  grep "^### \`" "$PRESET_DEFS" | sed 's/^### `/  - /' | sed 's/`$//'
  exit 1
fi

PRESET="$1"

echo "Fetching preset: $PRESET"
fetch_preset "$PRESET" | while read -r file; do
  if [[ -f "$ROOT/$file" ]]; then
    echo "  ✓ $file"
  else
    echo "  ✗ $file (not found)"
  fi
done

echo "OK: preset '$PRESET' validated"
