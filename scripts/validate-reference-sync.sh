#!/usr/bin/env bash
# Reference sync gate: INDEX parity, distillation map, queue exclusivity, runtime citations
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

MAP="$ROOT/scripts/reference-distillation-map.json"
INDEX="$ROOT/arabic/references/INDEX.md"
QUEUE="$ROOT/research/distillation-queue.md"

if [[ ! -f "$MAP" ]]; then
  echo "FAIL: missing distillation map: scripts/reference-distillation-map.json"
  exit 1
fi

if ! ROOT="$ROOT" python3 <<'PY'; then
import json
import os
import re
import sys
from pathlib import Path

root = Path(os.environ["ROOT"])
arabic = root / "arabic"
reference = root / "reference"
index_path = arabic / "references" / "INDEX.md"
queue_path = root / "research" / "distillation-queue.md"
map_path = root / "scripts" / "reference-distillation-map.json"
research_index = root / "research" / "index.json"

errors: list[str] = []
warnings: list[str] = []


def fail(msg: str) -> None:
    errors.append(msg)


def warn(msg: str) -> None:
    warnings.append(msg)


def count_lines(path: Path) -> int:
    return len(path.read_text(encoding="utf-8").splitlines())


# --- load distillation map ---
cfg = json.loads(map_path.read_text(encoding="utf-8"))
mappings = cfg.get("mappings") or []
dialect_auto = cfg.get("dialect_auto") or {}
canonical_only = set(cfg.get("canonical_only") or [])
dialect_max = int(dialect_auto.get("max_lines") or 150)
dialect_skip = set(dialect_auto.get("skip_reference") or [])

# --- reference pack inventory ---
ref_packs = sorted(
    p.name
    for p in reference.iterdir()
    if p.is_dir() and p.name.startswith("arabic-")
)
if len(ref_packs) != 38:
    warn(f"WARN: expected 38 reference/ packs, found {len(ref_packs)}")

mapped_refs: set[str] = set()
for entry in mappings:
    ref = entry.get("reference")
    if not ref:
        fail("FAIL: distillation map entry missing reference key")
        continue
    mapped_refs.add(ref)
    ref_dir = reference / ref
    if not ref_dir.is_dir():
        fail(f"FAIL: distillation map references missing pack: reference/{ref}/")
    for rel in entry.get("runtime") or []:
        target = root / rel
        if not target.is_file():
            fail(f"FAIL: distillation map target missing: {rel}")
        budget = entry.get("max_lines")
        if budget and target.suffix == ".md":
            lines = count_lines(target)
            if lines > budget:
                warn(
                    f"WARN: {rel} has {lines} lines (budget {budget} for reference/{ref})"
                )

# auto dialect pairs
for pack in ref_packs:
    if pack in mapped_refs or pack in canonical_only or pack in dialect_skip:
        continue
    if not pack.startswith("arabic-"):
        continue
    dialect = pack.removeprefix("arabic-")
    runtime = arabic / "dialects" / f"{dialect}.md"
    if runtime.is_file():
        mapped_refs.add(pack)
        lines = count_lines(runtime)
        if lines > dialect_max:
            warn(
                f"WARN: arabic/dialects/{dialect}.md has {lines} lines "
                f"(dialect budget {dialect_max})"
            )

unmapped = [p for p in ref_packs if p not in mapped_refs and p not in canonical_only]
for pack in unmapped:
    warn(f"WARN: reference/{pack}/ has no distillation map entry (add mapping or canonical_only)")

for pack in canonical_only:
    if not (reference / pack).is_dir():
        warn(f"WARN: canonical_only lists missing pack: reference/{pack}/")

# --- INDEX.md filesystem parity ---
index_text = index_path.read_text(encoding="utf-8")

indexed_paths: set[str] = set()
for m in re.finditer(
    r"`((?:references|dialects|domains|conversations|professional-docs)/[^`]+\.md)`",
    index_text,
):
    indexed_paths.add(m.group(1))
for core in ("SKILL.md", "voice.md"):
    if f"`{core}`" in index_text or core in index_text:
        indexed_paths.add(core)

runtime_dirs = {
    "references": arabic / "references",
    "dialects": arabic / "dialects",
    "domains": arabic / "domains",
    "conversations": arabic / "conversations",
    "professional-docs": arabic / "professional-docs",
}

on_disk: set[str] = {"SKILL.md", "voice.md"}
for prefix, dir_path in runtime_dirs.items():
    if not dir_path.is_dir():
        fail(f"FAIL: missing runtime dir: arabic/{prefix}/")
        continue
    for md in sorted(dir_path.glob("*.md")):
        on_disk.add(f"{prefix}/{md.name}")

for path in sorted(indexed_paths):
    if path in ("SKILL.md", "voice.md"):
        target = arabic / path
    else:
        target = arabic / path
    if not target.is_file():
        fail(f"FAIL: INDEX.md lists missing file: arabic/{path}")

orphans = sorted(on_disk - indexed_paths)
for path in orphans:
    fail(f"FAIL: runtime file not listed in INDEX.md: arabic/{path}")

# parse Total built / breakdown
total_match = re.search(r"\*\*Total built:\*\*\s*(\d+)", index_text)
refs_match = re.search(r"references/\s*\((\d+)", index_text)
dialect_match = re.search(r"dialects/\s*\((\d+)", index_text)
domain_match = re.search(r"domains/\s*\((\d+)", index_text)
conv_match = re.search(r"conversations/\s*\((\d+)", index_text)
prof_match = re.search(r"professional-docs/\s*\((\d+)", index_text)

actual_refs = len(list((arabic / "references").glob("*.md")))
actual_dialects = len(list((arabic / "dialects").glob("*.md")))
actual_domains = len(list((arabic / "domains").glob("*.md")))
actual_conv = len(list((arabic / "conversations").glob("*.md")))
actual_prof = len(list((arabic / "professional-docs").glob("*.md")))
actual_total = (
    1  # SKILL.md
    + (1 if (arabic / "voice.md").is_file() else 0)
    + actual_refs
    + actual_dialects
    + actual_domains
    + actual_conv
    + actual_prof
)

if refs_match and int(refs_match.group(1)) != actual_refs:
    fail(
        f"FAIL: INDEX.md references count ({refs_match.group(1)}) != "
        f"on-disk ({actual_refs})"
    )
if dialect_match and int(dialect_match.group(1)) != actual_dialects:
    fail(
        f"FAIL: INDEX.md dialects count ({dialect_match.group(1)}) != "
        f"on-disk ({actual_dialects})"
    )
if domain_match and int(domain_match.group(1)) != actual_domains:
    fail(
        f"FAIL: INDEX.md domains count ({domain_match.group(1)}) != "
        f"on-disk ({actual_domains})"
    )
if conv_match and int(conv_match.group(1)) != actual_conv:
    fail(
        f"FAIL: INDEX.md conversations count ({conv_match.group(1)}) != "
        f"on-disk ({actual_conv})"
    )
if prof_match and int(prof_match.group(1)) != actual_prof:
    fail(
        f"FAIL: INDEX.md professional-docs count ({prof_match.group(1)}) != "
        f"on-disk ({actual_prof})"
    )
if total_match and int(total_match.group(1)) != actual_total:
    fail(
        f"FAIL: INDEX.md Total built ({total_match.group(1)}) != "
        f"computed ({actual_total})"
    )

# --- runtime citations to reference/ ---
ref_cite = re.compile(r"`(reference/[a-zA-Z0-9_./-]+)`|(?:^|\s)(reference/[a-zA-Z0-9_./-]+)")
for md in sorted(arabic.rglob("*.md")):
    if "templates" in md.parts:
        continue
    text = md.read_text(encoding="utf-8")
    for m in ref_cite.finditer(text):
        cited = (m.group(1) or m.group(2)).rstrip(".,;:")
        # normalize to path under reference/
        rel = cited.removeprefix("reference/")
        target = reference / rel
        if not target.exists():
            fail(f"FAIL: {md.relative_to(root)} cites missing {cited}")

# --- distillation queue mutual exclusivity ---
if queue_path.is_file():
    queue_text = queue_path.read_text(encoding="utf-8")
    sections = {
        "open": re.search(r"## Open\s*\n(.*?)\n## In progress", queue_text, re.DOTALL),
        "in_progress": re.search(
            r"## In progress\s*\n(.*?)\n## Deferred", queue_text, re.DOTALL
        ),
        "deferred": re.search(
            r"## Deferred\s*\n(.*?)\n## Distilled", queue_text, re.DOTALL
        ),
        "distilled": re.search(r"## Distilled \(recent\)\s*\n(.*?)\n---", queue_text, re.DOTALL),
    }
    ids_by_section: dict[str, set[str]] = {}
    for name, block in sections.items():
        if not block:
            fail(f"FAIL: distillation-queue.md missing section: {name}")
            continue
        ids = set(re.findall(r"\b(RQ-\d{3})\b", block.group(1)))
        ids_by_section[name] = ids

    all_ids: dict[str, list[str]] = {}
    for section, ids in ids_by_section.items():
        for rid in ids:
            all_ids.setdefault(rid, []).append(section)
    for rid, where in sorted(all_ids.items()):
        if len(where) > 1:
            fail(
                f"FAIL: {rid} appears in multiple queue sections: {', '.join(where)}"
            )

    # distilled runtime targets should exist
    distilled_block = sections.get("distilled")
    if distilled_block:
        for line in distilled_block.group(1).splitlines():
            if not re.match(r"^\|\s*RQ-", line):
                continue
            for target in re.findall(r"`arabic/[^`]+`", line):
                rel = target.strip("`").removeprefix("arabic/")
                if not (arabic / rel).is_file():
                    fail(f"FAIL: distilled queue cites missing runtime: arabic/{rel}")

# --- research index runtime_targets ---
if research_index.is_file():
    data = json.loads(research_index.read_text(encoding="utf-8"))
    for topic in data.get("topics", []):
        for rel in topic.get("runtime_targets", []):
            path = rel.removeprefix("arabic/")
            if not (arabic / path).is_file():
                fail(f"FAIL: research/index.json target missing: {rel}")

# --- report ---
print(
    f"==> Reference sync: {len(ref_packs)} packs, "
    f"{len(mapped_refs)} mapped, {len(canonical_only)} canonical-only; "
    f"INDEX {actual_total} runtime files"
)
for w in warnings:
    print(w)

if errors:
    for e in errors:
        print(e)
    sys.exit(1)

print("OK: reference sync check passed")
PY
  exit 1
fi
