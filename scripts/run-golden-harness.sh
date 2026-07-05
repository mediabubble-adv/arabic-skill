#!/usr/bin/env bash
# G1–G12 golden agent harness — list or opt-in LLM run (not in default CI)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

exec python3 "$ROOT/scripts/run-golden-harness.py" "$@"
