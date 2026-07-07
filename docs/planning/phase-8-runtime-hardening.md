# Phase 8 — Runtime Hardening & Intelligence

> **Release target:** v1.2.9 (or v1.3.0 for all three sub-phases combined)  
> **Scope:** Three parallel tracks — Load discipline, RTL/dialect validation, Research automation  
> **Gate:** P8A–P8C complete + all validation passing + documented behavior

---

## Overview

Phase 8 hardens the runtime for production: task-class bundling, bidirectional text safety, and knowledge-base automation. Three independent sub-phases can ship separately or together.

| Sub-phase | Goal | Effort | Fit |
|-----------|------|--------|-----|
| **P8A** | Smart task-class load sets | Medium | v1.2.9 (patch) |
| **P8B** | RTL/dialect guardrails | Medium | v1.2.9 (patch) |
| **P8C** | Research distillation automation | High | v1.3.0 (feature tier) |

---

## P8A — Load-discipline Smart Bundling

**Goal:** Optimize `references/load-discipline.md` with preset bundles and auto-selection.

### Files to create/modify:
- Create: `arabic/references/load-presets.md` — named bundles (e.g., `seasonal`, `campaign`, `book`, `audit-full`, `dialect-lock`)
- Create: `scripts/load-preset.sh` — CLI tool to fetch and pack presets
- Modify: `SKILL.md` — reference presets in routing logic
- Modify: `load-discipline.md` — document preset pattern
- Create: `tests/golden/p8a-load-presets.md` — fixture validating preset selection

### Behavior:
```bash
# User can say: "I need the campaign bundle"
# System loads: project-mode.md + seasonal-calendar.md + ads-service-matrix.md + campaigns (curated)
```

### Validation:
- [ ] 5+ presets defined and documented
- [ ] Preset selection matches load-discipline task classes
- [ ] CLI can fetch and pack presets without manual file listing
- [ ] Golden test validates preset structure

---

## P8B — Audit-mode RTL & Dialect Hardening

**Goal:** Add RTL detection and MSA-bleed guards to audit flow.

### Files to create/modify:
- Modify: `arabic/references/audit-mode.md` — add RTL + dialect detection sections
- Create: `scripts/validate-rtl.sh` — scan for RTL issues (missing RLE, LRM, bidirectional breaks)
- Create: `scripts/validate-dialect-bleed.sh` — check for MSA + dialect mixing per rule
- Modify: `docs/supported/rtl-audit.md` — expand RTL audit checklist
- Create: `tests/golden/p8b-rtl-dialect-audit.md` — fixture validating RTL + dialect guardrails

### Behavior:
```bash
# User runs: /arabic audit rtl
# System checks:
# - Bidirectional text structure (RLE/LRM placement)
# - No MSA bleed into chosen dialect
# - Dialect consistency within sections
```

### Validation:
- [ ] `validate-rtl.sh` detects 5+ common RTL issues
- [ ] `validate-dialect-bleed.sh` flags MSA in Masri/Khaliji sections
- [ ] Audit output includes RTL score + recommendations
- [ ] Golden test validates detection accuracy

---

## P8C — Research Distillation Pipeline Automation

**Goal:** Automate knowledge-base curation, monthly snapshots, and lifecycle tracking.

### Files to create/modify:
- Create: `research/distillation-lifecycle.md` — topic state machine (collected → curated → distilled → deferred)
- Modify: `scripts/validate-research.sh` — add lifecycle checks (no state gaps, valid transitions)
- Create: `scripts/snapshot-research-monthly.sh` — automated monthly archive (triggered by CI cron)
- Create: `.github/workflows/research-snapshot-monthly.yml` — cron trigger (1st of month)
- Modify: `research/index.json` — add `lifecycle_state` + `last_distilled` fields
- Create: `tests/golden/p8c-research-distillation.md` — fixture validating lifecycle + snapshots

### Behavior:
```bash
# Monthly (1st), CI runs:
# - Validates all topics have a lifecycle state
# - Archives current state to research/snapshots/2026-07-*
# - Flags stale topics (not distilled in 60+ days)
# - Reports distillation backlog

# User can check: `/arabic research status`
# Output includes: topic health, distillation debt, snapshot age
```

### Validation:
- [ ] `snapshot-research-monthly.yml` runs without error
- [ ] Snapshots archive successfully each month
- [ ] Lifecycle state transitions are enforced
- [ ] Golden test validates snapshot structure + metadata

---

## Delivery Plan

### Phase 8A (Load-discipline)
**Branch:** `feat/p8a-load-presets`  
**Effort:** 1–2 days  
**Blocking:** None (can ship independently)  
**PR:** P8A load-presets

### Phase 8B (RTL/Dialect)
**Branch:** `feat/p8b-rtl-dialect-audit`  
**Effort:** 1–2 days  
**Blocking:** None (can ship independently)  
**PR:** P8B RTL + dialect audit hardening

### Phase 8C (Research Distillation)
**Branch:** `feat/p8c-research-distillation`  
**Effort:** 2–3 days  
**Blocking:** None (can ship independently OR combined with A+B)  
**PR:** P8C research distillation pipeline

### Release Strategy
- **v1.2.9**: P8A + P8B (patch tier, runtime safety)
- **v1.3.0**: Add P8C (minor tier, automation + intelligence)

Or:
- **v1.2.9**: All three (P8A–C combined, larger patch)

**Recommendation:** Ship **v1.2.9** with all three (P8A–C) to complete the v1.2 line as a full runtime hardening release.

---

## Success Criteria

- [ ] All three sub-phases implemented and tested
- [ ] `npm run validate` passes all 14+ gates
- [ ] Golden fixtures (P8A, P8B, P8C) all pass
- [ ] CHANGELOG and roadmap updated
- [ ] v1.2.9 tagged and released

