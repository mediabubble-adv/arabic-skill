#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ERRORS=0

echo "==> Validating markdown links in docs/..."

check_links_in_file() {
  local file="$1"
  local dir
  dir="$(dirname "$file")"

  # Match [text](./path) or [text](../path)
  while IFS= read -r link; do
    [[ -z "$link" ]] && continue
    # Strip anchor
    local path="${link%%#*}"
    [[ "$path" =~ ^https?:// ]] && continue
    [[ "$path" =~ ^mailto: ]] && continue

    local target
    if [[ "$path" == /* ]]; then
      target="$ROOT$path"
    else
      target="$(cd "$dir" && realpath -m "$path" 2>/dev/null || echo "$dir/$path")"
    fi

    if [[ ! -e "$target" ]]; then
      echo "ERROR: Broken link in $file → $link (resolved: $target)"
      ERRORS=$((ERRORS + 1))
    fi
  done < <(grep -oE '\]\([^)]+\)' "$file" 2>/dev/null | sed 's/^](//;s/)$//' || true)
}

while IFS= read -r -d '' md_file; do
  check_links_in_file "$md_file"
done < <(find "$ROOT/docs" "$ROOT/README.md" -name '*.md' -print0 2>/dev/null)

if [[ $ERRORS -gt 0 ]]; then
  echo "==> FAILED with $ERRORS broken link(s)"
  exit 1
fi

echo "==> Docs link validation passed"
