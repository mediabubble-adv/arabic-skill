#!/usr/bin/env bash
set -euo pipefail

echo "==> Validating docs/supported/ folder coverage..."

fail=0
for dir in docs/supported/*/; do
  tool=$(basename "$dir")
  if ! grep -q "($tool/README.md)" docs/supported/README.md 2>/dev/null && \
     ! grep -qi "$tool" docs/supported/README.md; then
    echo "MISSING from docs/supported/README.md index: $tool"
    fail=1
  fi
done

echo "==> Checking support-matrix.md row count vs folder count..."
folder_count=$(find docs/supported -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')
matrix_rows=$(($(grep -c '^|' docs/supported/support-matrix.md) - 2))
if [ "$folder_count" -ne "$matrix_rows" ]; then
  echo "MISMATCH: $folder_count folders vs $matrix_rows support-matrix.md rows"
  fail=1
fi

if [ "$fail" -eq 0 ]; then
  echo "==> validate-supported.sh passed"
fi
exit "$fail"
