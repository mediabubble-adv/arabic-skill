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

if ! ROOT="$ROOT" python3 <<'PY' 2>/dev/null; then
import json
import os
import sys
from pathlib import Path

root = Path(os.environ["ROOT"])
index = json.loads((root / "research/index.json").read_text())
topics = index.get("topics", [])
for i, topic in enumerate(topics):
    if "path" in topic:
        print(f"FAIL: research/index.json topics[{i}] uses deprecated 'path'; use 'file' (§7c)")
        sys.exit(1)
    rel = topic.get("file")
    if not rel:
        print(f"FAIL: research/index.json topics[{i}] missing 'file'")
        sys.exit(1)
    kb = root / "research" / rel
    if not kb.is_file():
        print(f"FAIL: research/index.json topics[{i}].file not found: research/{rel}")
        sys.exit(1)
PY
  echo "FAIL: research/index.json schema check failed"
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
