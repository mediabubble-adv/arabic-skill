#!/usr/bin/env bash
# Golden fixture gate: structure, path refs, ID uniqueness, lightweight smoke checks
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GOLDEN_DIR="$ROOT/tests/golden"

if [[ ! -d "$GOLDEN_DIR" ]]; then
  echo "FAIL: missing tests/golden/"
  exit 1
fi

ROOT="$ROOT" python3 <<'PY'
import os
import re
import sys
from pathlib import Path

root = Path(os.environ["ROOT"])
golden_dir = root / "tests" / "golden"

errors: list[str] = []
warnings: list[str] = []

TITLE_RE = re.compile(r"^#\s+Golden Tests?\s", re.MULTILINE)
VALIDATION_RE = re.compile(r"^##\s+Validation\s*$", re.MULTILINE)
CHECKBOX_RE = re.compile(r"^-\s+\[[ xX]\]", re.MULTILINE)
PATH_RE = re.compile(
    r"`("
    r"(?:\.github|arabic|docs|research|scripts|tests|website|\.cursor|\.arabic)"
    r"/[^`\n]+?)"
    r"`"
)
ID_PATTERNS = [
    re.compile(r"^##\s+(G-[A-Z0-9-]+-\d+)\b", re.MULTILINE),
    re.compile(r"^##\s+(G\d+)\b", re.MULTILINE),
    re.compile(r"^##\s+(RQ-\d+)\b", re.MULTILINE),
]
G13_ROUTES = [
    "/",
    "/features",
    "/install",
    "/commands",
    "/tutorials",
    "/examples",
    "/about",
    "/docs",
]


def fail(msg: str) -> None:
    errors.append(msg)


def warn(msg: str) -> None:
    warnings.append(msg)


def route_page_path(route: str) -> Path:
    if route == "/":
        return root / "website" / "app" / "page.tsx"
    slug = route.strip("/")
    return root / "website" / "app" / slug / "page.tsx"


def normalize_path(raw: str) -> str | None:
    raw = raw.strip().rstrip(".,;:")
    if not raw or raw.startswith("http"):
        return None
    if " " in raw or raw.startswith("/arabic"):
        return None
    if raw.startswith("bash ") or raw.startswith("npm "):
        return None
    if "*" in raw or "…" in raw or "..." in raw:
        return None
    if raw.endswith("/"):
        raw = raw.rstrip("/")
    return raw


def extract_paths(text: str) -> set[str]:
    found: set[str] = set()
    for match in PATH_RE.finditer(text):
        candidate = normalize_path(match.group(1))
        if candidate:
            found.add(candidate)
    return found


def extract_ids(text: str) -> list[str]:
    ids: list[str] = []
    for pattern in ID_PATTERNS:
        ids.extend(pattern.findall(text))
    return ids


fixtures = sorted(golden_dir.glob("*.md"))
if not fixtures:
    fail("FAIL: no golden fixtures in tests/golden/")
else:
    print(f"==> Golden runner: {len(fixtures)} fixture(s)")

all_ids: dict[str, str] = {}

for fixture in fixtures:
    rel = fixture.relative_to(root)
    text = fixture.read_text(encoding="utf-8")

    if not TITLE_RE.search(text):
        fail(f"FAIL: {rel} missing '# Golden Test(s) …' title")
    if not VALIDATION_RE.search(text):
        fail(f"FAIL: {rel} missing '## Validation' section")
    if not CHECKBOX_RE.search(text):
        fail(f"FAIL: {rel} has no checklist items (- [ ] / - [x])")

    for golden_id in extract_ids(text):
        prior = all_ids.get(golden_id)
        if prior and prior != str(rel):
            fail(f"FAIL: duplicate golden id {golden_id} in {rel} and {prior}")
        all_ids[golden_id] = str(rel)

    for ref in sorted(extract_paths(text)):
        target = root / ref
        if not target.exists():
            fail(f"FAIL: {rel} references missing path: {ref}")

# Lightweight smoke: G13 route files (website App Router)
for route in G13_ROUTES:
    page = route_page_path(route)
    if not page.is_file():
        fail(f"FAIL: G13 route {route} missing page file: {page.relative_to(root)}")

# G18: preview URL documented
website_readme = root / "website" / "README.md"
if website_readme.is_file():
    readme_text = website_readme.read_text(encoding="utf-8")
    if "https://" not in readme_text:
        fail("FAIL: G18 smoke — website/README.md missing preview URL")
else:
    fail("FAIL: missing website/README.md for G18 smoke")

release_playbook = root / "docs" / "engineering" / "release-playbook.md"
if release_playbook.is_file():
    if "1.1.0" not in release_playbook.read_text(encoding="utf-8"):
        warn("WARN: release-playbook.md may be missing v1.1.0 website gate section")
else:
    warn("WARN: missing docs/engineering/release-playbook.md")

# Gate scripts referenced in fixtures must exist
gate_scripts = sorted(
    {
        ref
        for fixture in fixtures
        for ref in extract_paths(fixture.read_text(encoding="utf-8"))
        if ref.startswith("scripts/validate-") and ref.endswith(".sh")
    }
)
for script in gate_scripts:
    if not (root / script).is_file():
        fail(f"FAIL: golden fixture references missing gate script: {script}")

for warning in warnings:
    print(warning)

if errors:
    for err in errors:
        print(err, file=sys.stderr)
    sys.exit(1)

print(
    f"OK: golden fixtures valid ({len(fixtures)} files, "
    f"{len(all_ids)} ids, {len(gate_scripts)} gate script refs, G13 routes present)"
)
PY
