#!/usr/bin/env bash
# Validate dialect purity — detect MSA bleed into dialect sections
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SCAN_DIR="${1:-.}"
ERRORS=0
WARNINGS=0

# MSA-only words/patterns (formal register markers)
MSA_MARKERS=(
  "بموجب"           # by virtue of (formal)
  "نظراً لـ"        # in view of (formal)
  "فيما يخص"        # regarding (formal)
  "لا سيما"         # especially (formal)
  "حيث أن"          # whereas (formal)
  "غير أن"          # however (formal)
  "أينما"           # wherever (formal)
  "كلما"            # whenever (formal)
  "سوف"             # shall (future, formal MSA)
  "يجب أن"          # must (formal)
  "يتعين"           # necessary (formal legal)
  "الموضوع"         # the matter (formal)
  "الجهة"           # the authority (formal)
  "المطلوب"         # the required (formal)
)

# Common Masri-specific words
MASRI_MARKERS=(
  "كويس"            # good (Masri)
  "شوية"            # a bit (Masri)
  "تمام"            # okay (Masri)
  "بتاع"            # something (Masri)
  "ماحدش"           # nobody (Masri)
  "بالراحة"         # calmly (Masri)
)

# Khaliji-specific words
KHALIJI_MARKERS=(
  "زين"             # good (Khaliji)
  "شنو"             # what (Khaliji)
  "وين"             # where (Khaliji)
  "كيفاش"           # how (Khaliji)
  "يا لله"          # come on (Khaliji)
)

check_dialect_bleed() {
  local file="$1"
  local content

  # Only check Arabic reference files
  [[ "$file" =~ references/ ]] || return 0
  [[ "$file" =~ \.(md)$ ]] || return 0

  content=$(cat "$file" 2>/dev/null || return 0)

  # Extract the dialect name from filename or section
  local dialect=""
  if [[ "$file" =~ masri ]]; then
    dialect="masri"
  elif [[ "$file" =~ khaliji ]]; then
    dialect="khaliji"
  elif [[ "$file" =~ levantine ]]; then
    dialect="levantine"
  elif [[ "$file" =~ ksa ]]; then
    dialect="ksa"
  fi

  [[ -z "$dialect" ]] && return 0

  # Check for MSA bleed in dialect sections
  for marker in "${MSA_MARKERS[@]}"; do
    if grep -q "$marker" "$file" 2>/dev/null; then
      # Verify it's not in a quote/example section
      if ! grep -B2 -A2 "$marker" "$file" | grep -q "مثال\|example\|قول\|\`\`\`"; then
        echo "WARN ($file): MSA marker '$marker' found in $dialect section (may indicate register bleed)"
        ((WARNINGS++))
      fi
    fi
  done

  # Check for dialect consistency
  if [[ "$dialect" == "masri" ]]; then
    # Masri should not have Khaliji markers
    for marker in "${KHALIJI_MARKERS[@]}"; do
      if grep -q "$marker" "$file" 2>/dev/null; then
        echo "WARN ($file): Khaliji marker '$marker' found in Masri section (inconsistent dialect)"
        ((WARNINGS++))
      fi
    done
  elif [[ "$dialect" == "khaliji" ]]; then
    # Khaliji should not have Masri markers
    for marker in "${MASRI_MARKERS[@]}"; do
      if grep -q "$marker" "$file" 2>/dev/null; then
        echo "WARN ($file): Masri marker '$marker' found in Khaliji section (inconsistent dialect)"
        ((WARNINGS++))
      fi
    done
  fi

  return 0
}

# Scan for dialect bleed
echo "==> Dialect purity validation (MSA bleed / cross-dialect mixing checks)..."
find "$SCAN_DIR" -path "*/references/*" -name "*.md" -type f | while read -r file; do
  check_dialect_bleed "$file" || true
done

echo ""
echo "==> Dialect validation complete: $ERRORS errors, $WARNINGS warnings"

if (( ERRORS > 0 )); then
  exit 1
fi

exit 0
