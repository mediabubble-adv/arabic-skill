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

if ! ROOT="$ROOT" python3 <<'PY'; then
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path
from typing import Union, Optional, Set

root = Path(os.environ["ROOT"])
research = root / "research"
index = json.loads((research / "index.json").read_text())
topics = index.get("topics", [])

REQUIRED_FM = ("topic", "last_reviewed", "trust_tier", "sources", "runtime_targets", "status")
INDEX_REQUIRED = ("id", "file", "topic", "last_reviewed", "trust_tier", "runtime_targets", "status")
TRUST_TIERS = {"A", "B", "C"}
STATUSES = {"collected", "curated", "distilled", "deferred"}


def fail(msg: str) -> None:
    print(msg)
    sys.exit(1)


def parse_frontmatter(text: str) -> Optional[dict]:
    match = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not match:
        return None
    fm: dict = {}
    current_list: Optional[str] = None
    for line in match.group(1).splitlines():
        if line.startswith("  - "):
            if current_list is None:
                fail("FAIL: KB frontmatter list item without parent key")
            fm.setdefault(current_list, []).append(line[4:].strip())
            continue
        kv = re.match(r"^(\w+):\s*(.*)$", line)
        if not kv:
            continue
        key, val = kv.group(1), kv.group(2).strip()
        current_list = None
        if val:
            fm[key] = val
        else:
            current_list = key
            fm[key] = []
    return fm


def load_source_ids() -> Set[str]:
    text = (research / "sources/sources.yaml").read_text()
    return {m.group(1) for m in re.finditer(r"^\s*-\s+id:\s+(\S+)\s*$", text, re.MULTILINE)}


def validate_date(label: str, value: str) -> None:
    try:
        datetime.strptime(value, "%Y-%m-%d")
    except ValueError:
        fail(f"FAIL: {label} invalid date (expected YYYY-MM-DD): {value}")


def validate_frontmatter(rel: str, fm: dict, source_ids: set[str]) -> None:
    missing = [k for k in REQUIRED_FM if k not in fm]
    if missing:
        fail(f"FAIL: {rel} missing frontmatter keys: {', '.join(missing)}")

    if fm["trust_tier"] not in TRUST_TIERS:
        fail(f"FAIL: {rel} trust_tier must be A, B, or C (got {fm['trust_tier']!r})")
    if fm["status"] not in STATUSES:
        fail(f"FAIL: {rel} status must be collected|curated|distilled|deferred (got {fm['status']!r})")
    validate_date(f"{rel} last_reviewed", fm["last_reviewed"])

    sources = fm["sources"]
    if not isinstance(sources, list) or not sources:
        fail(f"FAIL: {rel} sources[] must be a non-empty list")
    for sid in sources:
        if sid not in source_ids:
            fail(f"FAIL: {rel} references unknown source id: {sid}")

    targets = fm["runtime_targets"]
    if not isinstance(targets, list) or not targets:
        fail(f"FAIL: {rel} runtime_targets[] must be a non-empty list")


def compare_index_frontmatter(rel: str, topic: dict, fm: dict) -> None:
    for field in ("topic", "last_reviewed", "trust_tier", "status"):
        if fm.get(field) != topic.get(field):
            fail(
                f"FAIL: {rel} frontmatter {field}={fm.get(field)!r} "
                f"!= index.json {field}={topic.get(field)!r}"
            )
    if sorted(fm.get("runtime_targets", [])) != sorted(topic.get("runtime_targets", [])):
        fail(f"FAIL: {rel} runtime_targets[] out of sync with index.json")


source_ids = load_source_ids()
seen_ids: set[str] = set()
seen_files: set[str] = set()
indexed: dict[str, dict] = {}

for i, topic in enumerate(topics):
    if "path" in topic:
        fail(f"FAIL: research/index.json topics[{i}] uses deprecated 'path'; use 'file' (§7c)")

    missing = [k for k in INDEX_REQUIRED if k not in topic]
    if missing:
        fail(f"FAIL: research/index.json topics[{i}] missing keys: {', '.join(missing)}")

    topic_id = topic["id"]
    if topic_id in seen_ids:
        fail(f"FAIL: research/index.json duplicate id: {topic_id}")
    seen_ids.add(topic_id)

    rel = topic["file"]
    if rel in seen_files:
        fail(f"FAIL: research/index.json duplicate file: {rel}")
    seen_files.add(rel)
    indexed[rel] = topic

    kb = research / rel
    if not kb.is_file():
        fail(f"FAIL: research/index.json topics[{i}].file not found: research/{rel}")

    if topic["trust_tier"] not in TRUST_TIERS:
        fail(f"FAIL: index.json topics[{i}].trust_tier must be A, B, or C")
    if topic["status"] not in STATUSES:
        fail(f"FAIL: index.json topics[{i}].status invalid")
    validate_date(f"index.json topics[{i}].last_reviewed", topic["last_reviewed"])

    fm = parse_frontmatter(kb.read_text())
    if fm is None:
        fail(f"FAIL: {rel} missing YAML frontmatter (§7a)")
    validate_frontmatter(rel, fm, source_ids)
    compare_index_frontmatter(rel, topic, fm)

kb_root = research / "knowledge-base"
kb_files = sorted(
    p for p in kb_root.rglob("*.md") if p.name != "README.md"
)
for kb in kb_files:
    rel = kb.relative_to(research).as_posix()
    if rel not in indexed:
        fail(f"FAIL: orphan KB file not listed in index.json: {rel}")

if len(kb_files) != len(topics):
    fail(
        f"FAIL: index.json topic count ({len(topics)}) != KB file count ({len(kb_files)})"
    )
PY
  echo "FAIL: research KB frontmatter / index.json check failed"
  fail=1
fi

if ! grep -q '^sources:' "$ROOT/research/sources/sources.yaml"; then
  echo "FAIL: research/sources/sources.yaml missing top-level sources key"
  fail=1
fi

if [[ "$fail" -ne 0 ]]; then
  exit 1
fi

kb_count="$(find "$ROOT/research/knowledge-base" -name '*.md' ! -name 'README.md' | wc -l | tr -d ' ')"
echo "OK: research R0 scaffold present ($((${#required[@]})) files, $((${#kb_dirs[@]})) KB dirs, ${kb_count} KB topics indexed)"
