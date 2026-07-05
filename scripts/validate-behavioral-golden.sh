#!/usr/bin/env bash
# G1–G12 behavioral golden routing contract gate (no LLM)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

MANIFEST="$ROOT/tests/golden/g1-g12-manifest.json"

if [[ ! -f "$MANIFEST" ]]; then
  echo "FAIL: missing tests/golden/g1-g12-manifest.json"
  exit 1
fi

ROOT="$ROOT" python3 <<'PY'
import json
import os
import sys
from pathlib import Path

root = Path(os.environ["ROOT"])
manifest_path = root / "tests" / "golden" / "g1-g12-manifest.json"
errors: list[str] = []

manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
tests = manifest.get("tests") or []

if len(tests) != 12:
    errors.append(f"FAIL: expected 12 G1–G12 manifest entries, found {len(tests)}")

ids = [t.get("id") for t in tests]
expected_ids = [f"G{i}" for i in range(1, 13)]
if sorted(ids, key=lambda x: int(x[1:])) != expected_ids:
    errors.append(f"FAIL: manifest ids must be G1–G12 exactly, got {ids}")

seen_commands: dict[str, str] = {}
for entry in tests:
    gid = entry.get("id", "?")
    command = entry.get("command", "")
    if not command:
        errors.append(f"FAIL: {gid} missing command")
        continue
    prior = seen_commands.get(command)
    if prior and prior != gid:
        if command not in {"/arabic plan website"}:
            errors.append(f"FAIL: duplicate command {command!r} on {gid} and {prior}")

    required_files = entry.get("required_files") or []
    for rel in required_files:
        target = root / rel
        if not target.is_file():
            errors.append(f"FAIL: {gid} missing required file: {rel}")

    markers = entry.get("markers") or []
    if not markers:
        errors.append(f"FAIL: {gid} has no markers")
        continue

    file_texts = {}
    for rel in required_files:
        target = root / rel
        if target.is_file():
            file_texts[rel] = target.read_text(encoding="utf-8")

    for marker in markers:
        if not any(marker in text for text in file_texts.values()):
            errors.append(
                f"FAIL: {gid} marker not found in any required file: {marker!r}"
            )

# SKILL.md mode router must reference core modes for behavioral suite
skill = (root / "arabic" / "SKILL.md").read_text(encoding="utf-8")
for mode in ("Advisory", "Audit", "Prompt Coach", "Project", "Research", "Onboarding"):
    if mode not in skill:
        errors.append(f"FAIL: arabic/SKILL.md Mode Router missing {mode!r}")

load_discipline = root / "arabic" / "references" / "load-discipline.md"
if load_discipline.is_file():
  ld = load_discipline.read_text(encoding="utf-8")
  for task in ("plan", "write", "audit", "research", "onboarding"):
      if f"| **{task}** |" not in ld and f"| {task} |" not in ld:
          errors.append(f"FAIL: load-discipline.md missing task class {task!r}")

if errors:
    for err in errors:
        print(err, file=sys.stderr)
    sys.exit(1)

print(f"OK: G1–G12 behavioral routing contracts valid ({len(tests)} tests, manifest v{manifest.get('version', 1)})")
PY
