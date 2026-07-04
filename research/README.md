# Research layer (`research/`)

Collected intelligence for the `arabic` runtime skill. Canonical depth stays in `reference/`; distilled, task-ready rules live in `arabic/`.

**Plan:** [docs/planning/research-intelligence-plan.md](../docs/planning/research-intelligence-plan.md)  
**Distillation order:** [docs/planning/reference-distillation.md](../docs/planning/reference-distillation.md)

## Three layers

| Layer | Path | Role |
|-------|------|------|
| Canonical | `reference/` | Specialist packs — source of truth |
| Collected | `research/` | Citations, curated findings, queue |
| Runtime | `arabic/` | What agents load during tasks |

**Rule:** Never write directly into `arabic/SKILL.md` from research. Every runtime change goes through **distill → PR → golden test**.

## Folder map

```text
research/
├── README.md                 # This file
├── index.json                # Topic registry (sync with knowledge-base/)
├── sources/sources.yaml      # Citation registry (stable IDs)
├── distillation-queue.md     # Pending → runtime items (max 20 open)
├── knowledge-base/           # Curated findings (one topic per file)
├── prompts/                  # Reusable agent research prompts
└── snapshots/                # Optional dated captures (gitignored)
```

## Monthly cycle (7 steps)

1. **PLAN** — Pick ≤3 topics from `distillation-queue.md` + platform changelog check
2. **COLLECT** — Run a prompt from `prompts/`; save to `knowledge-base/`
3. **CITE** — Register URLs in `sources/sources.yaml`
4. **CURATE** — Dedupe, trust tier, flag stale or `needs_live_verification`
5. **DISTILL** — Map to runtime target(s); ≤50 lines per PR
6. **TEST** — Golden test or audit fixture proves improvement
7. **INDEX** — Update `index.json` + `arabic/references/INDEX.md`

## Trust tiers

| Tier | Examples | Runtime use |
|------|----------|-------------|
| **A** | Official platform docs, government, major dictionaries | Direct rules |
| **B** | Established industry blogs, verified practitioners | Examples + notes |
| **C** | Social posts, forums, anecdotes | Hints only — human review before runtime |

Tier **C** must carry a human-review flag before entering `arabic/dialects/` or any runtime file.

## Commands (R3+)

| Command | Role |
|---------|------|
| `/arabic research <topic>` | Structured research run → `knowledge-base/` |
| `/arabic research distill` | Process `distillation-queue.md` into PR plan |
| `/arabic research status` | Show `index.json` + stale sources |

## Validation

```bash
bash scripts/validate-research-scaffold.sh   # R0 — required files exist
# scripts/validate-research.sh             # R4 — stale-source checker (planned)
```

## Phase status

| Phase | Deliverable | Status |
|-------|-------------|--------|
| **R0** | Scaffold (this tree) | ✅ |
| **R1** | First reference distillation | Planned |
| **R2** | Platform KB (Meta, Google, TikTok) | Planned |
| **R3** | `/arabic research` wiring | Planned |
| **R4** | `validate-research.sh` | Planned |
