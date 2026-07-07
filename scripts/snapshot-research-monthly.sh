#!/usr/bin/env bash
# Snapshot research monthly — archive knowledge-base state with lifecycle tracking
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

INDEX="$ROOT/research/index.json"
SNAPSHOTS_DIR="$ROOT/research/snapshots"

# Create snapshots directory if it doesn't exist
mkdir -p "$SNAPSHOTS_DIR"

# Generate snapshot date (YYYY-MM-DD format)
SNAPSHOT_DATE=$(date -u +"%Y-%m-%d")
SNAPSHOT_FILE="$SNAPSHOTS_DIR/${SNAPSHOT_DATE}-state.json"

echo "==> Research snapshot: generating state archive for $SNAPSHOT_DATE..."

if [[ ! -f "$INDEX" ]]; then
  echo "ERROR: Missing $INDEX"
  exit 1
fi

# Count topics by state
COLLECTED=$(python3 -c "
import json
with open('$INDEX') as f:
    data = json.load(f)
    count = sum(1 for t in data.get('topics', []) if t.get('lifecycle_state') == 'collected')
    print(count)
" 2>/dev/null || echo 0)

CURATED=$(python3 -c "
import json
with open('$INDEX') as f:
    data = json.load(f)
    count = sum(1 for t in data.get('topics', []) if t.get('lifecycle_state') == 'curated')
    print(count)
" 2>/dev/null || echo 0)

DISTILLED=$(python3 -c "
import json
with open('$INDEX') as f:
    data = json.load(f)
    count = sum(1 for t in data.get('topics', []) if t.get('lifecycle_state') == 'distilled')
    print(count)
" 2>/dev/null || echo 0)

DEFERRED=$(python3 -c "
import json
with open('$INDEX') as f:
    data = json.load(f)
    count = sum(1 for t in data.get('topics', []) if t.get('lifecycle_state') == 'deferred')
    print(count)
" 2>/dev/null || echo 0)

TOTAL=$((COLLECTED + CURATED + DISTILLED + DEFERRED))

# Identify stale topics (not distilled in 60+ days)
STALE=$(python3 << 'PYTHON_EOF'
import json
from datetime import datetime, timedelta
import sys

try:
    with open('research/index.json') as f:
        data = json.load(f)

    now = datetime.utcnow()
    cutoff = now - timedelta(days=60)

    stale = []
    for topic in data.get('topics', []):
        if topic.get('lifecycle_state') == 'distilled':
            last_distilled = topic.get('last_distilled')
            if last_distilled:
                dt = datetime.fromisoformat(last_distilled.replace('Z', '+00:00'))
                if dt < cutoff:
                    days_ago = (now - dt).days
                    stale.append({
                        "id": topic.get('id'),
                        "name": topic.get('name'),
                        "last_distilled": last_distilled,
                        "days_since_distilled": days_ago
                    })

    print(json.dumps(stale, indent=2))
except Exception as e:
    print("[]", file=sys.stderr)
PYTHON_EOF
)

# Build snapshot JSON
SNAPSHOT_JSON=$(python3 << PYTHON_EOF
import json
from datetime import datetime

snapshot = {
    "snapshot_date": "$SNAPSHOT_DATE",
    "snapshot_timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
    "total_topics": $TOTAL,
    "by_state": {
        "collected": $COLLECTED,
        "curated": $CURATED,
        "distilled": $DISTILLED,
        "deferred": $DEFERRED
    },
    "stale_topics": $STALE,
    "distillation_backlog": $((COLLECTED + CURATED)),
    "archived_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}

print(json.dumps(snapshot, indent=2))
PYTHON_EOF
)

# Write snapshot file
echo "$SNAPSHOT_JSON" > "$SNAPSHOT_FILE"

echo "✓ Snapshot written: $SNAPSHOT_FILE"
echo "  - Total topics: $TOTAL"
echo "  - Collected: $COLLECTED"
echo "  - Curated: $CURATED"
echo "  - Distilled: $DISTILLED"
echo "  - Deferred: $DEFERRED"
echo "  - Stale (>60 days): $(echo "$STALE" | python3 -c "import json, sys; print(len(json.load(sys.stdin)))" 2>/dev/null || echo 0)"

echo ""
echo "==> Monthly snapshot complete"
