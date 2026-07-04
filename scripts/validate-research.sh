#!/usr/bin/env bash
# R4 gate: stale-source checker + distillation queue health for research/
# Policy: research-mode.md (90-day stale) + research-monthly-cron.md tiers
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! ROOT="$ROOT" python3 <<'PY'; then
import os
import re
import sys
from datetime import datetime
from pathlib import Path

root = Path(os.environ["ROOT"])
research = root / "research"
sources_path = research / "sources/sources.yaml"
queue_path = research / "distillation-queue.md"

STALE_WARN_DAYS = 90
STALE_FAIL_DAYS = 180
MAX_OPEN_QUEUE = 20

today_raw = os.environ.get("RESEARCH_VALIDATE_TODAY", "")
if today_raw:
    today = datetime.strptime(today_raw, "%Y-%m-%d").date()
else:
    today = datetime.now().date()

errors: list[str] = []
warnings: list[str] = []


def fail(msg: str) -> None:
    errors.append(msg)


def warn(msg: str) -> None:
    warnings.append(msg)


def parse_sources(path: Path) -> list[dict]:
    text = path.read_text()
    if not re.search(r"^sources:\s*$", text, re.MULTILINE):
        fail("FAIL: sources.yaml missing top-level sources key")
        return []

    entries: list[dict] = []
    blocks = re.split(r"\n(?=\s*-\s+id:\s)", text)
    for block in blocks[1:]:
        entry: dict = {}
        for line in block.splitlines():
            m = re.match(r"^\s*-\s+id:\s+(\S+)\s*$", line)
            if m:
                entry["id"] = m.group(1)
                continue
            m = re.match(r"^\s+accessed:\s+(\S+)\s*$", line)
            if m:
                entry["accessed"] = m.group(1)
        if entry.get("id"):
            entries.append(entry)
    return entries


def count_open_queue(path: Path) -> int:
    text = path.read_text()
    m = re.search(r"## Open\s*\n(.*?)\n## In progress", text, re.DOTALL)
    if not m:
        fail("FAIL: distillation-queue.md missing Open section")
        return 0
    count = 0
    for line in m.group(1).splitlines():
        if re.match(r"^\|\s*RQ-\d+", line):
            count += 1
    return count


# --- stale sources ---
sources = parse_sources(sources_path)
if not sources:
    fail("FAIL: sources.yaml has no registered sources")

fresh = stale_warn = stale_fail = 0
for entry in sources:
    sid = entry["id"]
    accessed_raw = entry.get("accessed")
    if not accessed_raw:
        fail(f"FAIL: source {sid} missing accessed date")
        continue
    try:
        accessed = datetime.strptime(accessed_raw, "%Y-%m-%d").date()
    except ValueError:
        fail(f"FAIL: source {sid} invalid accessed date: {accessed_raw!r}")
        continue

    age = (today - accessed).days
    if age <= STALE_WARN_DAYS:
        fresh += 1
    elif age <= STALE_FAIL_DAYS:
        stale_warn += 1
        warn(
            f"WARN: source {sid} accessed {accessed_raw} ({age}d ago) — re-verify before distill"
        )
    else:
        stale_fail += 1
        fail(
            f"FAIL: source {sid} accessed {accessed_raw} ({age}d ago) — >{STALE_FAIL_DAYS}d; refresh before runtime distill"
        )

# --- queue cap ---
open_count = count_open_queue(queue_path)
if open_count > MAX_OPEN_QUEUE:
    fail(
        f"FAIL: distillation-queue open rows ({open_count}) exceed cap ({MAX_OPEN_QUEUE})"
    )

# --- report ---
print(
    f"==> Research R4 validate (as-of {today.isoformat()}): "
    f"{len(sources)} sources — fresh {fresh}, warn {stale_warn}, fail {stale_fail}; "
    f"queue open {open_count}/{MAX_OPEN_QUEUE}"
)

for w in warnings:
    print(w)

if errors:
    for e in errors:
        print(e)
    sys.exit(1)

print("OK: research R4 validate passed")
PY
  exit 1
fi
