#!/usr/bin/env bash
# SKILL.md YAML frontmatter schema gate (arabic/SKILL.md)
# Policy: docs/engineering/ci-pipeline.md · docs/analysis/skill-craft-and-release-research.md
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! ROOT="$ROOT" python3 <<'PY'; then
from __future__ import annotations

import os
import re
import sys
from pathlib import Path

root = Path(os.environ["ROOT"])
skill_path = root / "arabic/SKILL.md"
expected_name = "arabic"
semver = re.compile(r"^\d+\.\d+\.\d+$")

errors: list[str] = []


def fail(msg: str) -> None:
    errors.append(msg)


def parse_skill_frontmatter(text: str) -> dict | None:
    match = re.match(r"^---\r?\n(.*?)\r?\n---", text, re.DOTALL)
    if not match:
        fail("FAIL: arabic/SKILL.md missing YAML frontmatter delimiters (---)")
        return None

    block = match.group(1)
    fm: dict = {}
    lines = block.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        kv = re.match(r"^(\w+):\s*(.*)$", line)
        if not kv:
            i += 1
            continue
        key, val = kv.group(1), kv.group(2)
        if val in ("|", ">"):
            i += 1
            parts: list[str] = []
            while i < len(lines) and (
                lines[i].startswith("  ") or lines[i].strip() == ""
            ):
                parts.append(lines[i][2:] if lines[i].startswith("  ") else "")
                i += 1
            fm[key] = "\n".join(parts).strip()
            continue
        if len(val) >= 2 and val[0] == val[-1] and val[0] in "\"'":
            val = val[1:-1]
        fm[key] = val.strip()
        i += 1
    return fm


if not skill_path.is_file():
    fail("FAIL: missing arabic/SKILL.md")
    print("\n".join(errors))
    sys.exit(1)

text = skill_path.read_text()
fm = parse_skill_frontmatter(text)
if fm is None:
    print("\n".join(errors))
    sys.exit(1)

required = ("name", "display_name", "version", "description")
missing = [k for k in required if k not in fm or not str(fm[k]).strip()]
if missing:
    fail(f"FAIL: arabic/SKILL.md missing required frontmatter keys: {', '.join(missing)}")
    for e in errors:
        print(e)
    sys.exit(1)

name = fm["name"]
if name != expected_name:
    fail(
        f"FAIL: arabic/SKILL.md name must be {expected_name!r} (got {name!r})"
    )
if name.endswith("-skill"):
    fail("FAIL: arabic/SKILL.md name must not use redundant -skill suffix")

version = fm["version"]
if not semver.match(version):
    fail(f"FAIL: arabic/SKILL.md version must be semver x.y.z (got {version!r})")

display_name = fm["display_name"]
if len(display_name) < 3:
    fail("FAIL: arabic/SKILL.md display_name is too short")

description = fm["description"]
if len(description) < 40:
    fail("FAIL: arabic/SKILL.md description is too short for discovery metadata")

# Body must follow frontmatter
if not re.match(r"^---\r?\n.*?\r?\n---\r?\n", text, re.DOTALL):
    fail("FAIL: arabic/SKILL.md frontmatter block malformed")

print(
    f"==> Frontmatter validate: name={name!r} version={version} "
    f"display_name={display_name!r}"
)

if errors:
    for e in errors:
        print(e)
    sys.exit(1)

print("OK: SKILL.md frontmatter schema valid")
PY
  exit 1
fi
