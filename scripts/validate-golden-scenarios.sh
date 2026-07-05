#!/usr/bin/env bash
# Golden scenario schema gate — pairs with g1-g12-scenarios.json + manifest
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SCENARIOS="$ROOT/tests/golden/scenarios/g1-g12-scenarios.json"
MANIFEST="$ROOT/tests/golden/g1-g12-manifest.json"

for f in "$SCENARIOS" "$MANIFEST"; do
  if [[ ! -f "$f" ]]; then
    echo "FAIL: missing $f"
    exit 1
  fi
done

ROOT="$ROOT" python3 <<'PY'
import json
import os
import sys
from pathlib import Path

root = Path(os.environ["ROOT"])
scenarios_path = root / "tests" / "golden" / "scenarios" / "g1-g12-scenarios.json"
manifest_path = root / "tests" / "golden" / "g1-g12-manifest.json"
errors: list[str] = []

manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
manifest_by_id = {t["id"]: t for t in manifest.get("tests") or []}

data = json.loads(scenarios_path.read_text(encoding="utf-8"))
scenarios = data.get("scenarios") or []

if len(scenarios) != 12:
    errors.append(f"FAIL: expected 12 scenarios, found {len(scenarios)}")

expected_ids = [f"G{i}" for i in range(1, 13)]
ids = [s.get("id") for s in scenarios]

def golden_num(gid: str | None) -> int | None:
    if not gid or not isinstance(gid, str) or not gid.startswith("G"):
        return None
    tail = gid[1:]
    return int(tail) if tail.isdigit() else None

for gid in ids:
    if golden_num(gid) is None:
        errors.append(f"FAIL: malformed scenario id: {gid!r}")

if sorted([g for g in ids if golden_num(g) is not None], key=golden_num) != expected_ids:
    errors.append(f"FAIL: scenario ids must be G1–G12 exactly, got {ids}")

for scenario in scenarios:
    sid = scenario.get("id", "?")
    manifest_row = manifest_by_id.get(sid)
    if not manifest_row:
        errors.append(f"FAIL: {sid} missing from g1-g12-manifest.json")
        continue

    command = scenario.get("command", "")
    if command != manifest_row.get("command"):
        errors.append(
            f"FAIL: {sid} command mismatch — scenario {command!r} vs manifest {manifest_row.get('command')!r}"
        )

    user_prompt = (scenario.get("user_prompt") or "").strip()
    input_file = scenario.get("input_file")
    if not user_prompt and not input_file:
        errors.append(f"FAIL: {sid} needs user_prompt or input_file")

    if input_file:
        path = root / input_file
        if not path.is_file():
            errors.append(f"FAIL: {sid} input_file missing: {input_file}")

    signals = scenario.get("pass_signals") or {}
    if not isinstance(signals, dict):
        errors.append(f"FAIL: {sid} pass_signals must be an object")
        continue

    has_rule = any(
        signals.get(k)
        for k in (
            "must_match_any",
            "must_not_match",
            "min_length",
            "max_length",
        )
    )
    if not has_rule:
        errors.append(f"FAIL: {sid} pass_signals has no rules")

    for key in ("must_match_any", "must_not_match"):
        val = signals.get(key)
        if val is not None and (not isinstance(val, list) or not all(isinstance(x, str) for x in val)):
            errors.append(f"FAIL: {sid} {key} must be a string array")

    for key in ("min_length", "max_length"):
        val = signals.get(key)
        if val is not None and (not isinstance(val, int) or val < 0):
            errors.append(f"FAIL: {sid} {key} must be a non-negative integer")

if errors:
    for err in errors:
        print(err, file=sys.stderr)
    sys.exit(1)

print(f"OK: G1–G12 golden scenarios valid ({len(scenarios)} scenarios, manifest parity)")
PY
