# Golden Tests P8C — Research Distillation Pipeline Automation

Phase 8C fixture for knowledge-base curation, monthly snapshots, and lifecycle tracking.

## Validation

- [x] `research/distillation-lifecycle.md` documents state machine (collected → curated → distilled → deferred)
- [x] `scripts/snapshot-research-monthly.sh` executable and generates valid snapshots
- [x] `.github/workflows/research-snapshot-monthly.yml` wired for 1st-of-month cron (00:00 UTC)
- [x] `research/index.json` schema extended with lifecycle_state + last_distilled + defer_reason
- [x] Lifecycle validation gates: no state gaps, valid transitions, stale topic flagging
- [x] Golden fixture covers state machine, transitions, snapshots, and CLI integration

---

## 1. Distillation Lifecycle — State Machine

### Case 1.1: Four States Defined
**Input:** `research/distillation-lifecycle.md`  
**Expected states:**
- `collected` — raw material gathered, not yet organized
- `curated` — reviewed, organized, ready for synthesis
- `distilled` — synthesis complete, publication-ready
- `deferred` — intentionally on hold (low priority, research debt)

**Validation:**
- ✓ All four states documented
- ✓ Triggers and entry conditions specified for each
- ✓ Duration and outputs defined
- ✓ State diagram showing valid transitions

### Case 1.2: Transition Rules
**Input:** State machine diagram in lifecycle.md  
**Valid transitions:**
- `collected` → `curated` ✅ (sources reviewed)
- `collected` → `deferred` ✅ (reason documented)
- `curated` → `distilled` ✅ (synthesis written)
- `curated` → `collected` ✅ (rare: new sources to add)
- `curated` → `deferred` ✅ (reason documented)
- `distilled` → `deferred` ✅ (reason documented)
- `distilled` → `curated` ✅ (refresh: re-synthesize old topic)
- `deferred` → `collected` ✅ (picking back up)

**Invalid transitions:**
- `deferred` → `distilled` ❌ (must go through intermediate states)

**Validation:**
- ✓ All transitions listed in table
- ✓ Conditions specified for each allowed transition
- ✓ Blocked transitions documented with rationale

### Case 1.3: State-Specific Validation Rules
**Input:** Lifecycle.md sections for each state  
**For `collected`:**
- ✓ Topic has name and query
- ✓ At least one source linked
- ✓ No publish/delivery yet

**For `curated`:**
- ✓ All sources reviewed (no "unknown" status)
- ✓ Duplicates removed
- ✓ Themes tagged
- ✓ At least 3 sources (or documented reasoning)

**For `distilled`:**
- ✓ Synthesis written (≥5 sentences)
- ✓ Key phrases tagged
- ✓ Sources cited in output
- ✓ `last_distilled` timestamp set

**For `deferred`:**
- ✓ `defer_reason` documented
- ✓ No expectation of distillation until un-deferred

**Validation:**
- ✓ All rules explicit and enforceable
- ✓ No ambiguous criteria

---

## 2. Index Schema Extension

### Case 2.1: New Fields Added
**Input:** `research/index.json`  
**Expected schema additions:**
```json
{
  "lifecycle_state": "distilled",       // new: one of four states
  "last_distilled": "2026-07-05T14:30:00Z",  // new: ISO timestamp
  "defer_reason": null,                 // new: required if deferred
  "output_file": "research/knowledge-base/seo-queries.md"  // new: artifact path
}
```

**Validation:**
- ✓ All existing topics have a `lifecycle_state`
- ✓ All `distilled` topics have `last_distilled` timestamp
- ✓ All `deferred` topics have a `defer_reason` string
- ✓ `output_file` populated for topics with artifacts

### Case 2.2: Backward Compatibility
**Input:** Topics without new fields (legacy data)  
**Expected behavior:**
- Validator flags missing fields
- Provides migration instructions

**Validation:**
- ✓ Legacy topics identified
- ✓ Migration path clear (can add fields interactively or via script)
- ✓ No data loss

---

## 3. Monthly Snapshot Script

### Case 3.1: Snapshot File Generation
**Input:** `bash scripts/snapshot-research-monthly.sh`  
**Expected output:**
```
research/snapshots/2026-07-06-state.json
```

**Content:**
```json
{
  "snapshot_date": "2026-07-06",
  "snapshot_timestamp": "2026-07-06T00:00:00Z",
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
  "distillation_backlog": 13,
  "archived_at": "2026-07-06T00:00:00Z"
}
```

**Validation:**
- ✓ File created in correct directory
- ✓ Proper JSON format
- ✓ All required fields present
- ✓ Counts accurate (by_state sum = total_topics)
- ✓ Stale topics correctly identified (>60 days since last_distilled)

### Case 3.2: State Counting
**Input:** Topics with various lifecycle_states  
**Expected:**
- `by_state.collected` = count of topics where state = "collected"
- `by_state.curated` = count of topics where state = "curated"
- `by_state.distilled` = count of topics where state = "distilled"
- `by_state.deferred` = count of topics where state = "deferred"

**Validation:**
- ✓ All counts match actual topics
- ✓ Total is sum of all states
- ✓ No double-counting

### Case 3.3: Stale Topic Detection
**Input:** Topics with `last_distilled` timestamps  
**Expected:**
- Stale = not distilled in 60+ days
- Report with: id, name, last_distilled timestamp, days_since_distilled

**Validation:**
- ✓ Topics distilled <60 days ago NOT flagged
- ✓ Topics distilled ≥60 days ago flagged
- ✓ Accurate day count calculation
- ✓ Handles null `last_distilled` (never distilled)

### Case 3.4: Distillation Backlog
**Input:** Count of `collected` + `curated` topics  
**Expected:**
- `distillation_backlog` = sum of collected + curated states

**Validation:**
- ✓ Accurate count
- ✓ Reflects work queue (not-yet-published topics)

---

## 4. GitHub Actions Workflow

### Case 4.1: Cron Schedule
**Input:** `.github/workflows/research-snapshot-monthly.yml`  
**Expected:**
```yaml
on:
  schedule:
    - cron: '0 0 1 * *'  # 1st of month, 00:00 UTC
  workflow_dispatch:     # Manual trigger for testing
```

**Validation:**
- ✓ Cron expression correct: `0 0 1 * *` = 1st day, midnight UTC
- ✓ workflow_dispatch allows manual testing
- ✓ Runs on schedule without manual intervention

### Case 4.2: Snapshot Execution
**Input:** Workflow runs snapshot script  
**Expected:**
- Checks out code
- Sets up Python 3.13
- Runs `scripts/snapshot-research-monthly.sh`
- Commits snapshot to repo (if changes detected)
- Pushes to main branch

**Validation:**
- ✓ All steps execute in order
- ✓ Script runs with no errors
- ✓ Changes committed only if snapshot differs
- ✓ Commit message includes date

### Case 4.3: Error Handling
**Input:** Workflow when script fails or index.json missing  
**Expected:**
- Workflow fails with clear error
- No partial commits
- Logs show what went wrong

**Validation:**
- ✓ Errors in script propagate to workflow
- ✓ Workflow fails cleanly (no half-state)
- ✓ Error logs are actionable

---

## 5. Lifecycle Validation Gates

### Case 5.1: No State Gaps
**Input:** `npm run validate:research` checks all topics  
**Expected:**
- ✓ All topics have a `lifecycle_state`
- ✓ All states are valid (one of four)
- ✗ "Topic 'X' missing lifecycle_state" → ERROR
- ✗ "Topic 'X' has invalid state 'unknown'" → ERROR

**Validation:**
- ✓ Every topic validated
- ✓ Clear error messages
- ✓ Exit code 1 on failure

### Case 5.2: Valid Transitions
**Input:** Validate state changes between snapshots  
**Expected:**
- ✓ `collected` → `curated` allowed
- ✗ `deferred` → `distilled` blocked (ERROR)

**Validation:**
- ✓ Transition rules enforced
- ✓ Invalid transitions reported
- ✓ Suggestion provided (intermediate states)

### Case 5.3: Defer Reason Required
**Input:** Topic with `lifecycle_state: "deferred"`  
**Expected:**
- ✓ Must have non-empty `defer_reason`
- ✗ Missing or empty `defer_reason` → ERROR

**Validation:**
- ✓ All deferred topics have reason
- ✓ Reason is meaningful (not just "defer")
- ✓ Error if missing

### Case 5.4: Output File for Distilled
**Input:** Topic with `lifecycle_state: "distilled"`  
**Expected:**
- ✓ Must have `output_file` path
- ✓ File must exist (or be pending)
- ✗ Missing output_file → WARN

**Validation:**
- ✓ Path checked
- ✓ File readable
- ✓ Clear message if not found

---

## 6. CLI Integration

### Case 6.1: Research Status Command
**Input:** `/arabic research status`  
**Expected output:**
```
Research Knowledge Base Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total topics: 42
  Collected: 8
  Curated: 5
  Distilled: 27
  Deferred: 2

Distillation Backlog: 13 topics (collected + curated)

Stale Topics (>60 days):
  - Khaliji E-commerce Trends (last distilled 72 days ago)

Last snapshot: 2026-07-06
```

**Validation:**
- ✓ Counts match index
- ✓ Backlog calculated correctly
- ✓ Stale topics listed
- ✓ Clear, actionable format

### Case 6.2: Distill Command with Validation
**Input:** `/arabic research distill topic-001`  
**Expected:**
- Moves topic through curation → distillation
- At each step, validates against lifecycle rules
- Updates `last_distilled` timestamp

**Validation:**
- ✓ State machine followed
- ✓ Validation gates applied
- ✓ Timestamps accurate

---

## 7. Snapshot Archive

### Case 7.1: Monthly Files Accumulate
**Input:** Run snapshot script monthly  
**Expected files:**
```
research/snapshots/2026-07-01-state.json
research/snapshots/2026-08-01-state.json
research/snapshots/2026-09-01-state.json
```

**Validation:**
- ✓ Files created on schedule
- ✓ Filenames include correct dates
- ✓ Each has unique data (reflects month state)
- ✓ Can compare across months (see trends)

### Case 7.2: Snapshot Trends
**Input:** Read multiple snapshots  
**Can answer:**
- How many topics moved from `collected` → `curated` last month?
- Which topics stayed in `deferred` for >3 months?
- Distillation velocity (topics/month completing distillation)?

**Validation:**
- ✓ Snapshots provide longitudinal data
- ✓ Trends visible across months
- ✓ Actionable insights (e.g., slow distillation = resource issue)

---

## Success Criteria (Pre-Delivery)

- [x] State machine fully defined (4 states, valid transitions)
- [x] `scripts/snapshot-research-monthly.sh` generates valid snapshots
- [x] GitHub Actions workflow configured for 1st-of-month cron
- [x] `research/index.json` schema extended (lifecycle_state, last_distilled, defer_reason, output_file)
- [x] Lifecycle validation gates: no gaps, valid transitions, stale detection
- [x] `/arabic research status` shows current state + backlog
- [x] Monthly snapshots archive state for trend analysis
- [x] Golden fixture covers state machine, snapshots, validation, and integration

---

## Test Execution

Run in CI/CD:
```bash
npm run validate:research      # includes lifecycle validation
bash scripts/snapshot-research-monthly.sh  # manual snapshot for testing
npm run test:golden           # runs all golden fixtures (p8c-research-distillation.md included)
```

**Expected:** All tests pass before merging feat/p8c-research-distillation.
