#!/usr/bin/env bash
# Golden scenario schema gate — pairs with g1-g12-scenarios.json + manifest + signal-presets
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SCENARIOS="$ROOT/tests/golden/scenarios/g1-g12-scenarios.json"
PRESETS="$ROOT/tests/golden/scenarios/signal-presets.json"
MANIFEST="$ROOT/tests/golden/g1-g12-manifest.json"

for f in "$SCENARIOS" "$PRESETS" "$MANIFEST"; do
  if [[ ! -f "$f" ]]; then
    echo "FAIL: missing $f"
    exit 1
  fi
done

ROOT="$ROOT" python3 <<'PY'
import json
import os
import re
import sys
from pathlib import Path

root = Path(os.environ["ROOT"])
scenarios_path = root / "tests" / "golden" / "scenarios" / "g1-g12-scenarios.json"
presets_path = root / "tests" / "golden" / "scenarios" / "signal-presets.json"
manifest_path = root / "tests" / "golden" / "g1-g12-manifest.json"
errors: list[str] = []

manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
manifest_by_id = {t["id"]: t for t in manifest.get("tests") or []}

preset_data = json.loads(presets_path.read_text(encoding="utf-8"))
preset_map = preset_data.get("presets") or {}
if not preset_map:
    errors.append("FAIL: signal-presets.json has no presets")

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

STRING_LIST_KEYS = ("must_match_any", "must_not_match", "regex_match_any", "presets")
INT_KEYS = ("min_length", "max_length")

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

    for key in STRING_LIST_KEYS:
        val = signals.get(key)
        if val is not None and (not isinstance(val, list) or not all(isinstance(x, str) for x in val)):
            errors.append(f"FAIL: {sid} {key} must be a string array")

    for name in signals.get("presets") or []:
        if name not in preset_map:
            errors.append(f"FAIL: {sid} references unknown preset {name!r}")

    for key in INT_KEYS:
        val = signals.get(key)
        if val is not None and (not isinstance(val, int) or val < 0):
            errors.append(f"FAIL: {sid} {key} must be a non-negative integer")

    merged_has_rule = False
    merged: dict = {"must_match_any": [], "must_not_match": [], "regex_match_any": []}
    for name in signals.get("presets") or []:
        preset = preset_map.get(name, {})
        for key in ("must_match_any", "must_not_match", "regex_match_any"):
            merged[key].extend(preset.get(key) or [])
    for key in ("must_match_any", "must_not_match", "regex_match_any"):
        merged[key].extend(signals.get(key) or [])

    if any(merged[k] for k in ("must_match_any", "must_not_match", "regex_match_any")):
        merged_has_rule = True
    if signals.get("min_length") is not None or signals.get("max_length") is not None:
        merged_has_rule = True
    for name in signals.get("presets") or []:
        preset = preset_map[name]
        if preset.get("min_length") is not None or preset.get("max_length") is not None:
            merged_has_rule = True

    if not merged_has_rule:
        errors.append(f"FAIL: {sid} pass_signals has no effective rules")

    for pattern in merged.get("regex_match_any") or []:
        try:
            re.compile(pattern)
        except re.error as exc:
            errors.append(f"FAIL: {sid} invalid regex {pattern!r}: {exc}")

for name, preset in preset_map.items():
    if not isinstance(preset, dict):
        errors.append(f"FAIL: preset {name!r} must be an object")
        continue
    for key in ("must_match_any", "must_not_match", "regex_match_any"):
        val = preset.get(key)
        if val is not None and (not isinstance(val, list) or not all(isinstance(x, str) for x in val)):
            errors.append(f"FAIL: preset {name!r} {key} must be a string array")
    for pattern in preset.get("regex_match_any") or []:
        try:
            re.compile(pattern)
        except re.error as exc:
            errors.append(f"FAIL: preset {name!r} invalid regex {pattern!r}: {exc}")

if errors:
    for err in errors:
        print(err, file=sys.stderr)
    sys.exit(1)

print(
    f"OK: G1–G12 golden scenarios valid ({len(scenarios)} scenarios, "
    f"{len(preset_map)} presets, manifest parity)"
)
PY
