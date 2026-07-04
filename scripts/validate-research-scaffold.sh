#!/usr/bin/env bash
# R0 gate: research/ scaffold exists and matches research-intelligence-plan.md
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

required=(
  "research/README.md"
  "research/index.json"
  "research/distillation-queue.md"
  "research/sources/sources.yaml"
  "research/knowledge-base/README.md"
  "research/snapshots/README.md"
  "research/prompts/reference-gap-scan.md"
  "research/prompts/platform-ads-research.md"
  "research/prompts/dialect-freshness-audit.md"
  "research/prompts/competitor-landing-teardown.md"
  "research/prompts/humanization-pattern-mining.md"
)

kb_dirs=(
  "research/knowledge-base/dialects"
  "research/knowledge-base/platforms"
  "research/knowledge-base/seo-aeo"
  "research/knowledge-base/humanization"
  "research/knowledge-base/marketing-psychology"
  "research/knowledge-base/seasonal"
)

fail=0
for path in "${required[@]}"; do
  if [[ ! -f "$ROOT/$path" ]]; then
    echo "FAIL: missing research scaffold file: $path"
    fail=1
  fi
done

for dir in "${kb_dirs[@]}"; do
  if [[ ! -d "$ROOT/$dir" ]]; then
    echo "FAIL: missing knowledge-base dir: $dir"
    fail=1
  fi
done

if ! python3 -c "import json; json.load(open('$ROOT/research/index.json'))" 2>/dev/null; then
  echo "FAIL: research/index.json is not valid JSON"
  fail=1
fi

if ! grep -q '^sources:' "$ROOT/research/sources/sources.yaml"; then
  echo "FAIL: research/sources/sources.yaml missing top-level sources key"
  fail=1
fi

if [[ "$fail" -ne 0 ]]; then
  exit 1
fi

echo "OK: research R0 scaffold present ($((${#required[@]})) files, $((${#kb_dirs[@]})) KB dirs)"
