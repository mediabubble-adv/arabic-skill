#!/usr/bin/env python3
"""Golden agent harness — list, validate, or opt-in LLM run for G1–G12 scenarios."""
from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCENARIOS_PATH = ROOT / "tests" / "golden" / "scenarios" / "g1-g12-scenarios.json"
MANIFEST_PATH = ROOT / "tests" / "golden" / "g1-g12-manifest.json"
SKILL_PATH = ROOT / "arabic" / "SKILL.md"


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def load_scenarios() -> list[dict]:
    return load_json(SCENARIOS_PATH).get("scenarios") or []


def load_manifest() -> dict[str, dict]:
    return {t["id"]: t for t in load_json(MANIFEST_PATH).get("tests") or []}


def build_system_prompt(manifest_row: dict) -> str:
    parts = [SKILL_PATH.read_text(encoding="utf-8")]
    for rel in manifest_row.get("required_files") or []:
        path = ROOT / rel
        if path.is_file() and path != SKILL_PATH:
            parts.append(f"\n\n--- {rel} ---\n{path.read_text(encoding='utf-8')}")
    return "\n".join(parts)[:120_000]


def build_user_message(scenario: dict) -> str:
    command = scenario.get("command", "")
    prompt = scenario.get("user_prompt", "")
    input_file = scenario.get("input_file")
    body = f"Command: {command}\n\nUser request:\n{prompt}"
    if input_file:
        path = ROOT / input_file
        body += f"\n\nAttached text ({input_file}):\n{path.read_text(encoding='utf-8')}"
    return body


def check_signals(response: str, signals: dict) -> list[str]:
    failures: list[str] = []
    text = response or ""

    for pattern in signals.get("must_match_any") or []:
        if pattern not in text:
            continue
        break
    else:
        if signals.get("must_match_any"):
            failures.append(f"must_match_any: none of {signals['must_match_any']!r}")

    for pattern in signals.get("must_not_match") or []:
        if pattern in text:
            failures.append(f"must_not_match: found {pattern!r}")

    min_len = signals.get("min_length")
    if isinstance(min_len, int) and len(text) < min_len:
        failures.append(f"min_length: {len(text)} < {min_len}")

    max_len = signals.get("max_length")
    if isinstance(max_len, int) and len(text) > max_len:
        failures.append(f"max_length: {len(text)} > {max_len}")

    return failures


def call_openai(system: str, user: str) -> str:
    api_key = os.environ.get("OPENAI_API_KEY") or os.environ.get("GOLDEN_HARNESS_API_KEY")
    if not api_key:
        raise RuntimeError("Set OPENAI_API_KEY or GOLDEN_HARNESS_API_KEY for --run")

    model = os.environ.get("GOLDEN_HARNESS_MODEL", "gpt-4o-mini")
    base = os.environ.get("OPENAI_BASE_URL", "https://api.openai.com/v1").rstrip("/")
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": 0.2,
    }
    req = urllib.request.Request(
        f"{base}/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"LLM HTTP {exc.code}: {body[:500]}") from exc

    try:
        return data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError) as exc:
        raise RuntimeError(f"Unexpected LLM response shape: {data!r}") from exc


def cmd_list() -> int:
    manifest = load_manifest()
    for scenario in load_scenarios():
        sid = scenario["id"]
        print(f"{sid}\t{scenario.get('command')}\t{scenario.get('name')}")
        print(f"  files: {len(manifest.get(sid, {}).get('required_files') or [])}")
    return 0


def cmd_run(scenario_id: str | None, dry_run: bool) -> int:
    manifest = load_manifest()
    scenarios = load_scenarios()
    if scenario_id:
        scenarios = [s for s in scenarios if s.get("id") == scenario_id]
        if not scenarios:
            print(f"FAIL: unknown scenario id {scenario_id!r}", file=sys.stderr)
            return 1

    if dry_run:
        for scenario in scenarios:
            print(f"DRY RUN {scenario['id']}: would run {scenario.get('command')}")
        return 0

    failures = 0
    for scenario in scenarios:
        sid = scenario["id"]
        row = manifest[sid]
        system = build_system_prompt(row)
        user = build_user_message(scenario)
        print(f"==> Running {sid} ({scenario.get('command')})...")
        try:
            response = call_openai(system, user)
        except RuntimeError as exc:
            print(f"FAIL {sid}: {exc}", file=sys.stderr)
            return 1

        signal_failures = check_signals(response, scenario.get("pass_signals") or {})
        if signal_failures:
            failures += 1
            print(f"FAIL {sid}:", file=sys.stderr)
            for item in signal_failures:
                print(f"  - {item}", file=sys.stderr)
        else:
            print(f"OK {sid}")

    if failures:
        print(f"FAIL: {failures} scenario(s) failed signal checks", file=sys.stderr)
        return 1
    print(f"OK: {len(scenarios)} scenario(s) passed")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="G1–G12 golden agent harness")
    parser.add_argument("--list", action="store_true", help="List scenarios")
    parser.add_argument("--run", action="store_true", help="Run scenarios against LLM (requires API key)")
    parser.add_argument("--dry-run", action="store_true", help="With --run, print plan only")
    parser.add_argument("--id", dest="scenario_id", help="Run a single scenario id (e.g. G1)")
    args = parser.parse_args()

    if args.list:
        return cmd_list()
    if args.run:
        return cmd_run(args.scenario_id, args.dry_run)

    parser.print_help()
    return 0


if __name__ == "__main__":
    sys.exit(main())
