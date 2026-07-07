# Research Distillation Lifecycle — Topic State Machine

> **Load when:** `/arabic research status`, `/arabic research distill`, validating research workflow  
> **Pair with:** `research-mode.md` (command workflow), `research/index.json` (state tracking)

Topics in the knowledge base progress through a lifecycle: from raw collection to polished distillation. Track state to avoid gaps and enforce valid transitions.

---

## Topic Lifecycle States

### 1. `collected`
**Definition:** Raw material gathered but not yet organized  
**Triggers:** `/arabic research <query>` collects links, snippets, quotes  
**Entry:** Topic created in `research/index.json` with `lifecycle_state: "collected"`  
**Duration:** 1–3 days typical  
**Next state:** `curated` (when material is reviewed + organized)

**Validation rules:**
- ✓ Topic has a name and query
- ✓ At least one source linked
- ✓ No publish/delivery yet

---

### 2. `curated`
**Definition:** Material reviewed, organized, and ready for synthesis  
**Triggers:** `/arabic research distill <topic>` begins curation  
**Entry:** Review sources, remove duplicates, tag by theme, order by relevance  
**Duration:** 2–5 days typical  
**Outputs:** Cleaned source list, thematic groupings, key insights identified  
**Next state:** `distilled` (when synthesis complete) OR `deferred` (if deprioritized)

**Validation rules:**
- ✓ All sources reviewed (no "unknown" status)
- ✓ Duplicates removed
- ✓ Themes tagged
- ✓ At least 3 sources (or explicit reasoning for fewer)

---

### 3. `distilled`
**Definition:** Polished, synthesis-ready knowledge — can ship  
**Triggers:** `/arabic research distill <topic>` → curation complete → synthesis written  
**Entry:** Write distilled summary (5–15 sentences), tag key phrases, link to output file  
**Duration:** 3–7 days typical (curation + synthesis)  
**Outputs:** Distilled summary, tagged phrases, cross-references to other topics  
**Next state:** `deferred` (when deprioritized) OR stays `distilled` (long-term reference)

**Last-distilled tracking:** Record `last_distilled` timestamp each time topic is refreshed  
**Refresh cadence:** Recommended 60+ days between distillations (flag if stale)

**Validation rules:**
- ✓ Synthesis written (≥5 sentences)
- ✓ Key phrases tagged
- ✓ Sources cited in output
- ✓ Topic linked to output artifact

---

### 4. `deferred`
**Definition:** Intentionally put on hold (low priority, research debt, waiting for events)  
**Triggers:** Manual `lifecycle_state: "deferred"` in `research/index.json`  
**Reason:** Explicitly state why (e.g., "awaiting market signals", "research debt", "lower priority")  
**Duration:** Indefinite  
**Next state:** `collected` (when picked up again)

**Validation rules:**
- ✓ Reason documented in `defer_reason` field
- ✓ No expectation of distillation until un-deferred

---

## State Diagram

```
collected ──→ curated ──→ distilled ──┐
                 ↑          ↓         │
                 └──────────┴──────→ deferred
                                        ↓
                                   (return to collected)
```

---

## Transition Rules (Enforcement)

| From | To | Allowed? | Condition |
|------|----|----|-----------|
| `collected` | `curated` | ✅ Yes | Sources reviewed |
| `collected` | `deferred` | ✅ Yes | Reason documented |
| `curated` | `distilled` | ✅ Yes | Synthesis written |
| `curated` | `collected` | ✅ Yes (rare) | New sources to add |
| `curated` | `deferred` | ✅ Yes | Reason documented |
| `distilled` | `deferred` | ✅ Yes | Reason documented |
| `distilled` | `curated` | ✅ Yes (refresh) | Refreshing old topic |
| `deferred` | `collected` | ✅ Yes | Picking back up |
| `deferred` | `distilled` | ❌ No | Must go through `collected`/`curated` |

---

## Index.json Schema

Each topic in `research/index.json` includes:

```json
{
  "id": "topic-001",
  "name": "Arabic SEO Query Patterns",
  "category": "seo",
  "lifecycle_state": "distilled",
  "created_at": "2026-06-15T10:00:00Z",
  "last_updated": "2026-07-05T14:30:00Z",
  "last_distilled": "2026-07-05T14:30:00Z",
  "defer_reason": null,
  "sources_count": 8,
  "output_file": "research/knowledge-base/seo-queries.md",
  "tags": ["seo", "queries", "masri", "gulf", "ksa"]
}
```

**Fields:**
- `lifecycle_state`: one of `collected` / `curated` / `distilled` / `deferred`
- `last_distilled`: ISO timestamp of last synthesis (null if never distilled)
- `defer_reason`: string (required if state is `deferred`)
- `output_file`: path to distilled knowledge artifact

---

## Validation Gates

### No state gaps
Every topic must have a valid `lifecycle_state`. Running validation should report:
- ✓ All topics have a state
- ✓ All states are valid (one of the four)
- ✗ "Topic 'X' has invalid state 'unknown'"

### Valid transitions
When a topic's state changes, enforce the transition rules above.
- ✓ `collected` → `curated` allowed
- ✗ `deferred` → `distilled` blocked (must go through intermediate states)

### Stale topics (informational)
Flag topics not distilled in 60+ days:
- ⚠ "Topic 'X' last distilled 90 days ago — consider refreshing"

### Monthly snapshot
On the 1st of each month, `scripts/snapshot-research-monthly.sh` archives current state:
```
research/snapshots/2026-07-01-state.json
research/snapshots/2026-08-01-state.json
```

Snapshots include: full index snapshot, per-state counts, stale topic list.

---

## Workflow: From Collection to Distillation

### Phase 1: Collection (1–3 days)
```
/arabic research "SEO tactics for Gulf market"
→ Gather sources (links, snippets, competitors)
→ Topic created: lifecycle_state = "collected"
```

### Phase 2: Curation (2–5 days)
```
/arabic research distill seo-gulf
→ Review 8–15 sources
→ Remove duplicates, tag by theme
→ Identify 3–5 key insights
→ Update: lifecycle_state = "curated"
```

### Phase 3: Distillation (3–7 days total)
```
/arabic research distill seo-gulf
→ Write 5–15 sentence synthesis
→ Link key phrases to sources
→ Tag cross-references (other topics)
→ Output to research/knowledge-base/seo-gulf.md
→ Update: lifecycle_state = "distilled", last_distilled = now
```

### Phase 4: Long-term (maintain)
```
Every 60+ days:
  /arabic research status → flags stale topics
  /arabic research distill seo-gulf → refresh synthesis
  → Updates: last_distilled = now
  
Monthly (automated):
  scripts/snapshot-research-monthly.sh → archives state
  → research/snapshots/YYYY-MM-DD-state.json
```

---

## Monthly Snapshot Format

**File:** `research/snapshots/2026-07-01-state.json`

```json
{
  "snapshot_date": "2026-07-01",
  "total_topics": 42,
  "by_state": {
    "collected": 8,
    "curated": 5,
    "distilled": 27,
    "deferred": 2
  },
  "stale_topics": [
    {
      "id": "topic-015",
      "name": "Khaliji E-commerce Trends",
      "last_distilled": "2026-04-20T10:00:00Z",
      "days_since_distilled": 72
    }
  ],
  "distillation_backlog": 5,
  "archived_at": "2026-07-01T00:00:00Z"
}
```

---

## CLI Commands

```bash
# Check current state
/arabic research status

# Collect sources for a topic
/arabic research "your query here"

# Move to curation phase
/arabic research distill topic-name

# View current lifecycle state
cat research/index.json | grep lifecycle_state

# Manual snapshot (for testing)
bash scripts/snapshot-research-monthly.sh

# Validate lifecycle transitions
npm run validate:research
```

---

## Pre-Delivery Checklist

- [x] All 42 topics assigned a `lifecycle_state`
- [x] No topics in invalid states
- [x] All `deferred` topics have a `defer_reason`
- [x] `last_distilled` populated for all `distilled` topics
- [x] Monthly snapshot runs on cron (1st of month, 00:00 UTC)
- [x] Validation gates enforce transitions
- [x] Research index schema updated with new fields
