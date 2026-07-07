#!/usr/bin/env bash
# Validate RTL structure — detect bidirectional text issues (RLE, LRM, break patterns)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# RTL Unicode constants
RLE=$'‪'      # Right-to-Left Embedding
RLO=$'‮'      # Right-to-Left Override
PDF=$'‬'      # Pop Directional Formatting
LRM=$'‏'      # Left-to-Right Mark
RLM=$'‎'      # Right-to-Left Mark

SCAN_DIR="${1:-.}"
ERRORS=0
WARNINGS=0

# Count RTL markers in a file
check_rtl_structure() {
  local file="$1"
  local content

  # Skip non-text files
  [[ "$file" =~ \.(png|jpg|json|lock|map)$ ]] && return 0

  content=$(cat "$file" 2>/dev/null || return 0)

  # Check 1: Orphaned RLE without PDF
  if [[ "$content" =~ $RLE ]] && ! [[ "$content" =~ $PDF ]]; then
    echo "ERROR ($file): RLE (U+202A) found without matching PDF (U+202C)"
    ((ERRORS++))
    return 1
  fi

  # Check 2: Orphaned RLO without PDF
  if [[ "$content" =~ $RLO ]] && ! [[ "$content" =~ $PDF ]]; then
    echo "ERROR ($file): RLO (U+202E) found without matching PDF (U+202C)"
    ((ERRORS++))
    return 1
  fi

  # Check 3: Unbalanced PDF
  local rle_count
  local pdf_count
  rle_count=$(grep -o "$RLE" "$file" 2>/dev/null | wc -l)
  pdf_count=$(grep -o "$PDF" "$file" 2>/dev/null | wc -l)
  if (( rle_count > pdf_count )); then
    echo "WARN ($file): RLE count ($rle_count) > PDF count ($pdf_count) — unbalanced RTL nesting"
    ((WARNINGS++))
  fi

  # Check 4: Missing LRM after Arabic content before English
  # Simple heuristic: look for Arabic text followed immediately by English without LRM
  if [[ "$content" =~ [ء-ي][A-Za-z] ]] && ! [[ "$content" =~ [ء-ي]$LRM[A-Za-z] ]]; then
    # Only warn if there's significant Arabic-to-English transitions
    local arabic_to_en_count
    arabic_to_en_count=$(grep -o '[ء-ي][A-Za-z]' "$file" 2>/dev/null | wc -l)
    if (( arabic_to_en_count > 0 )); then
      echo "WARN ($file): Found $arabic_to_en_count Arabic→English transitions without LRM — may cause visual glitches"
      ((WARNINGS++))
    fi
  fi

  return 0
}

# Scan for RTL issues
echo "==> RTL structure validation (RLE/LRM/PDF checks)..."
find "$SCAN_DIR" -type f \( -name "*.md" -o -name "*.json" -o -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) | while read -r file; do
  check_rtl_structure "$file" || true
done

echo ""
echo "==> RTL validation complete: $ERRORS errors, $WARNINGS warnings"

if (( ERRORS > 0 )); then
  exit 1
fi

exit 0
