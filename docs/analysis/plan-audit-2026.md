# Plan Audit — Awesome Arabic Skill
> Date: 2026-06-30 | Auditor: Claude | Repo state: 0.1.0 dev

> **Method:** Read on disk only. Phase 0 discovery covered `arabic/` runtime (42 `.md` files), all `docs/` (product, planning, analysis, engineering, supported), `reference/` (38 packs, sampled deeply), `scripts/`, `.github/`, root metadata. Validation scripts were executed. This report was written **before any rewrite**; the rewrite phases (D–H) remain paused pending maintainer decisions (§12).

> **Post-audit remediation (2026-06-30, same session).**
>
> **A — Immediate safe fixes (decision-independent):**
> 1. ✅ **`scripts/validate-skill.sh` regex** — `(?:…)` → `(…)`; the reference-integrity scan now runs (verified: catches an injected missing ref; real repo still exits 0). *(P0-3)*
> 2. ✅ **`arabic/references/INDEX.md`** — `taboos.md` added to build status; totals corrected 37 → 42; build-status rows now self-consistently sum to 42. *(P0-4)*
> 3. ✅ **`versioning-and-releases.md`** + **`skill-craft-and-release-research.md`** — PRD criteria count "10" → "11". *(P3-3, partial — PRD §12 G1–G18 traceability column still pending)*
>
> **B — Post-decision reconciliation (after maintainer answered §12 Q1/Q2/Q3):**
> 4. ✅ **Unified phase scheme P0–P7** authored in `implementation-plan.md §0` (single source of truth) with an old→new crosswalk; `roadmap.md`, `versioning-and-releases.md`, `ci-pipeline.md`, `skill-craft-and-release-research.md`, `CHANGELOG.md` reconciled. *(P0-1)*
> 5. ✅ **G1–G18 golden-test master table** authored in `implementation-plan.md §0.3`; gate split **G1–G12 → v1.0.0, G13–G18 → v1.1.0**; conflicting counts removed across docs. *(P0-2)*
> 6. ✅ **`voice.md` placed in P3** (Coach & Memory), resolving the roadmap-vs-impl-plan sequencing conflict.
> 7. ✅ **Git initialized** — baseline commit on `main`; this reconciliation lives on branch `docs/plan-unify-scheme`.
>
> Still intentionally **untouched** (separate, larger work): the SKILL.md advisory rewrite and creation of the 13 planned runtime files. The §1 risks and §4.3 conflicts below describe the **as-found** state; the items above are now resolved.

---

## 1. Executive summary

- **Overall plan quality: 8/10** — the documentation set is unusually complete, internally cross-linked, and honest about its own non-goals. It loses points for phase-numbering conflicts between `roadmap.md` and `implementation-plan.md`, an undefined golden-test set (G1–G18 referenced but never specified), and a stale inventory count.
- **Runtime readiness: 3/10** — the shipped `arabic/SKILL.md` still implements the **old write-first model** (Zero-Guessing intake + 7 tools + 7 modules). None of the advisory-first architecture the docs describe — Advisory/Pro/Project/Audit/Prompt-Coach modes, `/arabic` commands, `command-router.md`, `project-context-scanner.md`, `voice.md` — exists in runtime. The plan is written; the product is not yet built.
- **Claude execution readiness: ✅ ready (as of remediation).** The three ambiguities that would have forced guessing — (a) phase numbering, (b) the G1–G18 set, (c) golden-test timing — are now resolved (see remediation note). All documentation-side P0/P2/P3 recommendations are closed. The only substantial work left is **P1-1: the runtime build** (advisory `SKILL.md` + the 13 planned runtime files), which is implementation, not planning.
- **Top 3 risks (ranked):**
  1. **Docs/behavior illusion.** Every planning doc reads as if advisory-first is the product. It is not shipped. A contributor could "complete" docs and believe v1.0.0 is near while runtime is essentially the 0.1.0 baseline.
  2. **Phase-numbering collision.** "Phase 3" means *Coach & Memory* in `roadmap.md` but *Capability Expansion* in `implementation-plan.md`. Per-phase branch names and PRs built on this will mis-route work.
  3. **CI gave false assurance.** `validate-skill.sh`'s core check (SKILL.md → missing-file references) was a **silent no-op** due to a regex incompatibility (details in §9). ✅ Fixed this session — the gate now runs.
- **Top 3 highest-ROI fixes:**
  1. Define the single canonical **phase map** (one numbering) and the full **G1–G18 golden-test table**, in `implementation-plan.md`, and have every other doc reference it.
  2. Fix `validate-skill.sh` regex so the reference-integrity gate actually runs; add `validate-frontmatter.sh` (referenced by `roadmap.md` but absent).
  3. Correct `INDEX.md` inventory (claims 37 built; 42 on disk; `taboos.md` missing from build status) — this is the "architecture lock / truthful inventory" the implementation plan's own Phase 0 demands.

---

## 2. Alignment matrix

PRD §12 has **11** numbered criteria (note: `versioning-and-releases.md` calls it "10 items" — off by one). Mapping each to roadmap/implementation phases and runtime files:

| PRD §12 criterion | Roadmap phase | Impl-plan phase | Runtime file(s) | Status |
|-------------------|---------------|-----------------|-----------------|--------|
| #1 Advisor before writer by default | Phase 1 | Phase 1 (Behavioral Core) | `SKILL.md`, `references/advisory-mode.md` | ❌ not shipped (SKILL.md is write-first; advisory-mode.md absent) |
| #2 Humanization clearly stronger | Phase 2 | Phase 2 (Humanization v2) | `references/humanization-protocol.md` | ⚠️ v1 exists; v2 layers not in runtime |
| #3 Prompt Coach end-to-end | Phase 3 | Phase 3 (Capability) | `references/prompt-engineering.md` | ❌ file absent |
| #4 Brand voice save/reuse | Phase 3 | Phase 7 (Persistence) | `arabic/voice.md` | ❌ file absent |
| #5 Project Mode (web/campaign/book) | Phase 5 | Phase 4 (Project Mode) | `references/project-mode.md`, `book-writing.md` | ❌ files absent |
| #6 Ads beyond Meta/Google | Phase 4 | Phase 3 (Capability) | `references/ads-service-matrix.md`, `domains/ads-media.md` | ❌ files absent |
| #7 Dev-tech w/ correct terminology | Phase 4/5 | Phase 3 (Capability) | `domains/dev-tech.md` | ❌ file absent |
| #8 Project-aware Arabic, no leakage | Phase 5 | Phase 3/5 | `references/project-context-scanner.md` | ❌ file absent |
| #9 Preloaded trends, no fake recency | Phase 2 | Phase 5 (Runtime) | `references/trends-and-hooks.md`, `seasonal-calendar.md` | ⚠️ trends file exists; seasonal-calendar absent |
| #10 Indexes/file maps match repo | Phase 0 | Phase 0 (Arch Lock) | `references/INDEX.md` | ❌ INDEX count wrong (37 vs 42) |
| #11 All outputs pass final review | Phase 1 | Phase 1/5 | `SKILL.md` review loop | ⚠️ SKILL.md has Revision Loop tool; not tied to mode flow |

**Reading:** 0 of 11 criteria are fully shipped in runtime; ~3 are partially present. Documentation coverage of the same 11 criteria is ~100%.

---

## 3. Inventory truth table

| Claimed in docs | On disk? | Path | Action |
|-----------------|----------|------|--------|
| 38 canonical reference packs | ✅ yes (38) | `reference/*/` | Keep — claim accurate |
| Runtime "37 files built" (`INDEX.md`) | ❌ **42 on disk** | `arabic/**/*.md` | Fix INDEX count + build-status table |
| `taboos.md` in build status | ❌ absent from status table | `arabic/references/taboos.md` (file exists) | Add to INDEX build status |
| `advisory-mode.md` | ❌ no | `arabic/references/` | Create (Phase 1) |
| `prompt-engineering.md` | ❌ no | `arabic/references/` | Create (Phase 3) |
| `project-mode.md` | ❌ no | `arabic/references/` | Create (Phase 4/5) |
| `project-context-scanner.md` | ❌ no | `arabic/references/` | Create (C1/Phase 5) |
| `command-router.md` | ❌ no | `arabic/references/` | Create (C1) |
| `ads-service-matrix.md` | ❌ no | `arabic/references/` | Create (Phase 4) |
| `book-writing.md` | ❌ no | `arabic/references/` | Create (Phase 5) |
| `seo-aeo-masri.md` | ❌ no | `arabic/references/` | Create (Phase 4) |
| `seasonal-calendar.md` | ❌ no | `arabic/references/` | Create (Phase 4) |
| `domains/ads-media.md` | ❌ no | `arabic/domains/` | Create (Phase 4) |
| `domains/dev-tech.md` | ❌ no | `arabic/domains/` | Create (Phase 5) |
| `voice.md` | ❌ no | `arabic/` | Create (Phase 3/7) |
| `research/` layer | ❌ no | repo root | Create (R0) |
| `docs/supported/cursor/commands.md` | ❌ no | `docs/supported/cursor/` | Create (C1) |
| `website/` | ❌ no (intentionally deferred) | — | Defer to v1.1.0 — correct |
| VERSION = SKILL.md version = 0.1.0 | ✅ yes | `VERSION`, `SKILL.md` | Keep |

---

## 4. Gap analysis

### 4.1 Missing runtime files
13 planned runtime artifacts are absent (all warned by `validate-skill.sh`, plus `command-router.md` which the script's PLANNED list omits): `advisory-mode.md`, `prompt-engineering.md`, `project-mode.md`, `project-context-scanner.md`, `command-router.md`, `ads-service-matrix.md`, `book-writing.md`, `seo-aeo-masri.md`, `seasonal-calendar.md`, `domains/ads-media.md`, `domains/dev-tech.md`, `voice.md`, plus the whole `research/` scaffold.

### 4.2 Docs-only / behavior-not-shipped
The advisory-first operating model is the product's headline change (PRD §14, `operating-model.md`). It is **fully documented and zero-percent implemented**. Likewise: `/arabic` command surface (complete spec, no runtime router), project-aware scanning (3 docs describe it, no scanner file), brand-voice persistence (PRD §C, no `voice.md`), Prompt Coach (PRD §D, no file). The repo is far better *planned* than *built* — and nothing in the runtime makes that obvious to a user.

### 4.3 Conflicts between PRD, SKILL.md, operating-model
- **SKILL.md vs operating-model/PRD:** SKILL.md describes a "Zero-Guessing Mandate" + 7 tools + 7 modules write-first flow. PRD §6 and `operating-model.md` define 5 named modes (Advisory/Pro/Project/Audit/Prompt-Coach) with distinct flows. SKILL.md names none of these modes. `collaboration-rules.md` says "when PRD and runtime disagree, update runtime to match PRD" — that update has not happened.
- **Phase numbering:** `roadmap.md` Phase 3 = *Coach & Memory*; `implementation-plan.md` Phase 3 = *Capability Expansion*. The two documents are not reconcilable by number. Cross-references like "Phases 1–5 complete" (used as the v1.0.0 gate in 3 docs) are therefore ambiguous.
- **`voice.md` sequencing:** roadmap puts it in Phase 3 (before Masri depth); implementation-plan puts persistence in Phase 7 (after capability expansion). Contradiction.
- **PRD §12 item count:** PRD lists 11 criteria; `versioning-and-releases.md` gate says "10 items."

### 4.4 Broken or stale cross-links
- `validate-docs.sh` passes — **no broken internal markdown links.** Good.
- **Forward-reference rot:** `CHANGELOG.md` `[Unreleased]` cites "golden tests G1–G18"; no doc defines beyond G13 (`roadmap.md`) / G12 (`command-surface.md`). The G1–G18 table the audit prompt assumes does not yet exist anywhere.
- **Golden-test count is contradicted four ways:** `roadmap.md` says **13/13** (and "13+"), while `versioning-and-releases.md`, `skill-craft-and-release-research.md:233`, and `ci-pipeline.md` all say **12** — and ci-pipeline schedules them at **v1.5.0** while versioning makes them a **v1.0.0** gate. Three docs say 12, one says 13, and the timing disagrees.
- `roadmap.md` lists `scripts/validate-frontmatter.sh` as a current CI gate; the script does not exist and `ci-pipeline.md` schedules frontmatter lint as *future v1.1.0*. Three-way inconsistency.

---

## 5. Reference distillation audit

`reference-distillation.md` is sound in principle (Phases A–E, "what NOT to distill" list) but lacks **per-pack line budgets** and **per-pack do-not-copy lists**, and its A–E phases are not tied to numbered implementation phases. Sampled packs are deep and real (e.g., `arabic-masri/SKILL.md` = 1060 lines).

| reference/ pack | Runtime target | Priority | Phase | Lines budget (recommend) |
|-----------------|----------------|----------|-------|--------------------------|
| `arabic-qa` (232 + 4 ref files) | Audit Mode in `SKILL.md` + `humanization-protocol.md` | P0 | Impl Phase 2 | ≤120 distilled |
| `arabic-content-strategist` (203 + 7) | `advisory-mode.md` + `project-mode.md` | P0 | Impl Phase 1/4 | ≤150 |
| `arabic-creator` (289 + 6) | Pro Mode brief schema in `intake-protocols.md` | P1 | Impl Phase 1 | ≤100 |
| `arabic-seo-optimizer` (146 + 6) | `seo-aeo-masri.md` | P1 | Impl Phase 3 | ≤150 |
| `arabic-masri` (1060 + 4) | `dialects/masri.md` expansion | P1 | Impl Phase 5 | ≤200 (link deep cuts) |
| per-dialect packs (`arabic-khaliji`, `-levantine`, `-iraqi`, `-yemeni`, `-sudanese`, `-maghrebi`) | matching `dialects/*.md` | P2 | Impl Phase 5 | ≤150 each |
| `arabic-project-manager` | `project-mode.md` stages | P2 | Impl Phase 4 | ≤100 |
| `arabic-agent-orchestration` | `SKILL.md` Module 6 | P2 | Impl Phase 5 | ≤60 |
| religious/calligraphy/lexicography/watan packs | **keep canonical only** | — | — | do not distill |

**Validation of distillation:** none defined today. Recommend each distillation PR cite the source pack + line count and add/extend a golden test fixture proving the new rule fires (currently `reference-distillation.md` only says "run validate-skill.sh + update INDEX").

---

## 6. Research intelligence audit

`research-intelligence-plan.md` is the **strongest planning doc** — 3-layer model, trust tiers A/B/C, monthly cycle, distillation queue cap (20), phasing R0–R4, and guardrails against fake recency.

| Topic | Current spec quality | Gaps | Recommended structure |
|-------|---------------------|------|-----------------------|
| Folder structure | High — full tree | `index.json` schema not specified | Add JSON schema block |
| Prompt library | Medium — 3 templates inline | Audit prompt names **5** files (`reference-gap-scan.md`, `platform-ads-research.md`, `dialect-freshness-audit.md`, `competitor-landing-teardown.md`, `humanization-pattern-mining.md`); only 3 implied, different names | Reconcile to 5 named files in `research/prompts/` |
| Knowledge-base template | Low — frontmatter listed in acceptance only | No explicit template block (`topic`, `last_reviewed`, `trust_tier`, `sources[]`, `runtime_targets[]`) | Add a canonical template |
| `sources.yaml` schema | Medium | Fields not enumerated | Add YAML schema |
| Web-research behavior | Implicit | No explicit "official-docs-first + record URL/date/tier + `needs_live_verification` when offline" rule | Add a Required Web-Research Behavior section |
| Decision tree (reference vs internet) | Missing | No mermaid | Add mermaid decision diagram |
| Git workflow | Missing | No branch/PR convention for `feat/research-R0-scaffold` | Add |

Open questions in the doc (in-repo vs separate research repo; platform priority; AR/EN ratio; Tier-C approver) are good and should be surfaced to the maintainer (see §12).

---

## 7. Command surface audit

`command-surface.md` is detailed and mostly production-ready. The write-subcommand table has **38 rows** (exceeds the 25-row bar) and routing principles are clear.

| Subcommand area | Routed in SKILL.md? | Engine/template mapped? | Test exists? |
|-----------------|--------------------|-----------------------|--------------|
| Root verbs (`guide/write/audit/coach/plan/research/voice/auto/init/help`) | ❌ SKILL.md has no `/arabic` awareness | ✅ in command-surface table | G7–G12 defined; not in master table |
| `write <type>` (36 rows) | ❌ | ✅ workspace→engine→template | partial (G8, G12) |
| `plan <project>` | ❌ | ✅ staged | G10 |
| `auto` + project scan | ❌ | ✅ detection signals + flow | G11 |
| `research` | ❌ | ✅ → research plan | none |
| `voice` | ❌ | ⚠️ schema only "planned" | none |

**Gaps vs audit-prompt requirements:** no dedicated **flag reference** table (`--dialect/--platform/--brief/--file/--out/--yes/--count` appear only in examples); no **error-handling** spec beyond a one-line mention ("unknown subcommand → suggest nearest"); no **mermaid** auto-flow diagram; `command-router.md` and `project-context-scanner.md` are specified-to-create but absent; `docs/supported/cursor/commands.md` does not exist (only `cursor/README.md`). Golden tests stop at G12 — G13–G18 (website) undefined.

**Routing-rule check:** the doc asserts every subcommand maps through `dialect → domain → workspace → engine → template → taboo → humanization → review`, but SKILL.md's current pipeline is `dialect → domain → conversation → prof-doc → workspace → engine → template → taboo → humanization → review`. The mapping is plausible but **not yet written down per-command** — no orphan-command proof exists.

---

## 8. Project-aware content audit

| Capability | Current state | Required files | Risks | Tests |
|------------|--------------|----------------|-------|-------|
| Safe repo scan | Specified in 3 places (PRD §G, `command-surface.md` §7.3, `implementation-plan.md` §6H) — consistent | `project-context-scanner.md` (absent) | Secret leakage if scanner ships without enforced `.env*`/lockfile/build exclusions | impl Test 7, G11 |
| Evidence→claim grounding | Well described (must cite which files informed output; no invented features) | scanner + `domains/dev-tech.md` | Hallucinated product claims | impl Test 7/8 |
| Arabic outputs (explain/tutorial/readme/landing/release) | Mapped to commands (`auto explain`, `write tutorial/readme`, `plan website`) | scanner + dev-tech domain | Thin-evidence repos → over-claiming | impl Test 8, roadmap accept #13 |

**Verdict:** the *specification* is the best-aligned cross-doc feature in the repo. The *implementation* is zero. The dedicated "scan a real repo → Arabic explanation without leaking private files" test exists in three forms (impl Test 7, roadmap acceptance #13, G11) but those three are not unified into one numbered golden test.

---

## 9. Engineering governance audit

| Area | Current state | Gaps vs best practice |
|------|--------------|----------------------|
| Branching | Strong: prefixes, release/hotfix flow, protection rules | No mapping of branch name → implementation phase (per-phase playbook missing) |
| Versioning | Strong: VERSION=SKILL sync rule, v1.0.0 gate, tag format, changelog policy | Gate says "10 items" (PRD has 11); gate says golden 12/12 while roadmap says 13/13 |
| Collaboration/PR | Strong: conventional titles, PR checklist, CODEOWNERS, AI-edit note | CODEOWNERS covers only `SKILL.md`, `dialects/`, `VERSION`, workflows — not `arabic/references/`, `docs/planning/`, or future `research/` |
| CI | Solid intent (validate + version-sync + release-on-tag) | `validate-skill.sh` reference scan was a silent no-op (**✅ now fixed**, see below); `validate-frontmatter.sh` referenced in roadmap but absent; golden-test runner unscheduled at v1.0.0 (ci-pipeline parks it at v1.5.0) |
| Release playbook | Absent | No `release-playbook.md`; step-by-step for v1.0.0/v1.1.0 lives only partially in versioning doc |
| Git for this session | **Unavailable** | Repo is not a git checkout (`.git` absent) — per audit-prompt §K, branch/commit/PR steps are skipped this session |

**CI bug detail (P1):** In `scripts/validate-skill.sh`, the path-extraction loop uses
`[[ "$line" =~ \`((?:dialects|references|...)/...\.md)\` ]]`.
Bash's `[[ =~ ]]` uses POSIX ERE, which does **not** support the PCRE non-capturing group `(?:…)`. The regex fails to compile (verified: *"repetition-operator operand invalid"*), the `while` condition evaluates false, and the loop body never executes. `set -e` does not trip because the failure is in a loop condition. Result: the check that should flag SKILL.md references to missing runtime files **validates nothing**. Only the planned-file `grep` warnings and the version-sync check actually run. The same script runs in `validate.yml` on Ubuntu, so CI inherited the false-green. **✅ Fixed this session:** replaced `(?:…)` with a capturing `(…)`; outer-group index (`BASH_REMATCH[1]`) is unchanged, so the path-extraction logic is preserved. Verified the scan now flags an injected missing reference and the real repo still exits 0.

---

## 10. Sequencing critique

- **Behavioral-core-before-expansion: enforced in intent, muddied in numbering.** `roadmap.md`, `collaboration-rules.md` ("behavior before content"), and `implementation-plan.md` §13 all correctly insist advisory core ships before domain files. But `implementation-plan.md` Phase 3 (Capability Expansion) creates 8 content/domain files *before* Phase 4 (Project Mode) and Phase 5 (Runtime Integration) wire them in — so files can exist for two phases before they are reachable from routing. Acceptable if the dependency is explicit; today it is not drawn as a graph.
- **What to cut/defer:** keep `website/` deferred to v1.1.0 (correct). Defer R3/R4 research automation past v1.0.0 (already done). `typography-basics.md` (mentioned only in `reference-distillation.md` Phase D) is not in PRD §8 IA — cut or justify.
- **What to merge:** unify the three project-scan tests (impl Test 7, roadmap #13, G11) into one golden test. Merge the golden-test definitions scattered across roadmap/command-surface/versioning into one master G1–G18 table.
- **Critical-path order (recommended):** Phase 0 truthful-inventory fix → Phase 1 advisory SKILL.md + `advisory-mode.md` → Phase 2 humanization v2 + Audit Mode → command-router (C1) → project-context-scanner → remaining domain/capability files. Persistence (`voice.md`) should land with Coach (matching roadmap, not impl-plan Phase 7).

---

## 11. Recommendations (ranked P0–P3)

| ID | Recommendation | Effort | Impact | Target phase |
|----|----------------|--------|--------|--------------|
| P0-1 | ✅ **FIXED** — unified scheme P0–P7 in `implementation-plan.md §0`; all docs reconciled | M | High | P0 |
| P0-2 | ✅ **FIXED** — G1–G18 master table in `implementation-plan.md §0.3`; conflicting lists removed | M | High | P0 |
| P0-3 | ✅ **FIXED** — `validate-skill.sh` regex repaired; reference-integrity scan now runs | S | High | Phase 0 (chore) |
| P0-4 | ✅ **FIXED** — `INDEX.md` corrected (37→42, `taboos.md` added to build status) | S | High | Phase 0 |
| P1-1 | ✅ **FIXED** — `SKILL.md` rewritten to advisory-first 5-mode model; `advisory-mode.md` created; G1/G7/G12 satisfied by construction (no auto-runner yet). Later P2–P5 runtime files remain future phases | L | High | P1 |
| P1-2 | ✅ **FIXED** — golden-test timing reconciled (G1–G12 gate v1.0.0); `validate-frontmatter.sh` documented as a planned v1.1.0 gate (consistent across roadmap + ci-pipeline) | S | Med | P1 |
| P1-3 | ✅ **FIXED** — `voice.md` placed in P3 (Coach & Memory) across all docs | S | Med | P3 |
| P2-1 | ✅ **FIXED (spec)** — flag-reference, error-handling, mermaid, routing-pipeline proof added to `command-surface.md`; `cursor/commands.md` created. Runtime `command-router.md`/`project-context-scanner.md` remain in the build phase (P1-1/C1) | L | High | C1 |
| P2-2 | ✅ **FIXED** — research plan upgraded: 5 named prompts, KB/sources.yaml/index.json schemas, web-research behavior, decision-tree mermaid, git workflow | M | Med | R0 |
| P2-3 | ✅ **FIXED** — per-pack line budgets + do-not-copy table added to `reference-distillation.md` | M | Med | P2 |
| P3-1 | ✅ **FIXED** — `release-playbook.md` created; per-phase git playbook added to implementation-plan §15 | M | Med | P6 |
| P3-2 | ✅ **FIXED** — CODEOWNERS now covers `arabic/references/`, `docs/planning/`, `research/` | S | Low | chore |
| P3-3 | ✅ **FIXED** — count "10"→11 corrected; PRD §12 G1–G18 traceability table added | S | Med | P2 |
| P3-4 | ✅ **FIXED** — `website-design-system.md` created (tokens, AR+EN type, motion, components, G13–G18); linked from roadmap P7 + docs index | M | Low | P7 |

---

## 12. Open questions for maintainer (max 7)

1. **Phase numbering authority:** should `implementation-plan.md` own the canonical numbering and roadmap defer to it, or vice versa? (Blocks P0-1.)
2. **Golden-test timing:** do golden tests G1–G12 gate **v1.0.0** (per `versioning-and-releases.md`) or land at **v1.5.0** (per `ci-pipeline.md`)? They cannot be both.
3. **`voice.md` phase:** ship brand-voice persistence with Coach (roadmap Phase 3) or after capability expansion (impl-plan Phase 7)?
4. **`research/` location:** in-repo or a separate `arabic-skill-research` repo? (Carried over from the research plan's own open questions.)
5. **G13–G18 scope:** are the six website golden tests in-scope for the plan now (v1.1.0 spec), or should the master table stop at G12 until the website phase begins?
6. **Git:** this workspace is not a git checkout. Should doc edits proceed file-only (per audit-prompt §K) and you handle commits/PR separately, or do you want the repo initialized first?
7. **Tier-C slang approval:** who is the human reviewer that signs off Tier-C dialect slang before it enters `dialects/*.md`?

---

## Appendix — Documentation progress vs shipped behavior

| Dimension | Documentation | Shipped runtime |
|-----------|--------------|-----------------|
| Advisory-first operating model | 100% specified | 0% (SKILL.md still write-first) |
| `/arabic` command surface | ~90% specified | 0% (no command awareness) |
| Project-aware Arabic content | ~95% specified | 0% (no scanner) |
| Humanization v2 | 100% specified | ~30% (v1 protocol present) |
| Engineering governance (branch/version/CI) | ~90% specified | CI partially functional (1 gate is a no-op) |
| Reference library | n/a | 38 packs present and deep ✅ |
| Runtime content packs (dialects/domains/conversations/prof-docs) | n/a | 42 files present ✅ (inventory miscounted as 37) |

**Bottom line:** this is a well-planned product with an honest roadmap and a real, deep reference library — but the headline behavioral change (advisor, not writer) and its command/scanner/persistence surface area are entirely unbuilt. Treat the current state as *0.1.0 with excellent documentation*, not as *near-v1.0.0*. The plan is executable once the phase numbering, the golden-test set, and the CI no-op are fixed.
