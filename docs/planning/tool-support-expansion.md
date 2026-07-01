# Tool Support Expansion Plan

> **Relationship to canonical docs:** this is a **sub-plan of P7 — Distribution** ([roadmap.md](./roadmap.md#p7--distribution-v110), [implementation-plan.md §0.1](./implementation-plan.md#01-unified-phase-map)). It does not introduce a new top-level phase or track letter. Work items are labeled `P7-A` … `P7-E` to avoid colliding with the existing `C0–C5` Command Surface track, whose `C1` already means "command-router + Cursor adapter."
>
> **Supersedes:** `.cursor/plans/supported_tools_expansion_b92746b2.plan.md`. That file is untracked (`.gitignore` excludes `.cursor/*` except `commands/`/`rules/`), so it never reached the repo or a collaborator. Its factual inventory was verified against disk and support-matrix.md during the audit that produced this plan (2026-07-01) and is reused below; keep the original file locally as background research only — it is not authoritative and should not be edited further.
>
> **Does not depend on "P8".** `AGENTS.md` and `CHANGELOG.md [Unreleased]` informally reference a "P8" (plan-first bundles, audit/RTL extensions, load-discipline refactor) that is not yet defined in `roadmap.md` or `implementation-plan.md §0.1`. That is a separate governance gap — resolve it independently by extending the canonical phase map. This plan's scope (tool-surface documentation and installer honesty) ships without it.

**Goal:** Close the gap between claimed and actual tool-surface coverage — document Codex and ChatGPT, standardize adapter quality across the 9 Partial tools, validate the 4 Unknown tools, and align installer docs with `bin/arabic-skill.js` reality — as part of the existing v1.1.0 / P7 distribution push.

**Architecture:** Documentation-only change set. No runtime (`arabic/`) files change. Every task edits or adds Markdown under `docs/supported/` (plus one root `README.md` table update and one optional CI script). Each work item is independently mergeable — no ordering dependency between P7-A through P7-D; P7-E depends on P7-A landing first (it links to the new profiles).

**Tech Stack:** Markdown, existing `scripts/validate-docs.sh` / `scripts/validate-skill.sh` CI gates, optional new Bash validation script.

---

## 0. Verified current inventory (re-confirmed on disk, 2026-07-01)

| Fit | Count | Tools |
|-----|-------|-------|
| Strong | 8 | Claude, Cursor, Aider, Amp, Cline, OpenHands, Windsurf, Zed |
| Partial | 9 | Continue, Kiro, JetBrains Junie, Replit, Sourcegraph Cody, VS Code, Kilo Code, Gemini, Copilot |
| Limited | 1 | Qwen |
| Unknown | 4 | Antigravity, Hermes Agent, OpenClaw, OpenCode |

- `ls docs/supported/*/` = 22 folders. Matches `support-matrix.md` row-for-row (verified by count, not just by table).
- `bin/arabic-skill.js` `targetRoots` = `{cursor, claude, codex}`. **Codex is already a valid `--target` with zero docs** — `docs/supported/codex/` does not exist. This is the highest-leverage single gap: an installable target with no explanation of what it installs to.
- `README.md` and `docs/supported/README.md` show Codex and ChatGPT **icons only** — no profile link, no row in `support-matrix.md`.
- Windsurf and Aider are named "first-class" in `roadmap.md` P7 Tool Priority but have **no `targetRoots` entry** — installing to them today requires the manual `git clone` fallback or `--dir`. Out of scope to fix here (see §4); flagging so P7-E documents the workaround instead of implying it doesn't exist.

## 1. Work items

### P7-A — Codex + ChatGPT profiles

**Files:**
- Create: `docs/supported/codex/README.md`
- Create: `docs/supported/chatgpt/README.md`
- Modify: `docs/supported/README.md` (add both to "Tool Folders" list, already has both in "Icon Assets")
- Modify: `docs/supported/support-matrix.md` (add two rows)

**Step 1 — Write `docs/supported/codex/README.md`**

Mirror the structure of `docs/supported/claude/README.md` (already has the Preferred-npx / Manual-Fallback install pattern from the uncommitted `AGENTS.md`-adjacent changes — reuse that pattern, don't diverge):

```markdown
# Codex Support Profile

**Skill:** Awesome Arabic Skill (`arabic`)

## Current Fit

`Strong`

## Install

### Preferred (npx)

\`\`\`bash
npx @mediabubble-adv/arabic-skill install --target codex
\`\`\`

### Manual Fallback

\`\`\`bash
git clone https://github.com/mediabubble-adv/arabic-skill.git
cd arabic-skill
cp -r arabic ~/.codex/skills/arabic
\`\`\`

## Why It Fits Well

Codex's skills directory (`~/.codex/skills/`) accepts the same portable Markdown
runtime pack as Claude and Cursor — no adapter layer needed for core content generation.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | `SKILL.md` frontmatter + body loads directly |
| Commands | Partial | No native `/arabic` slash command; use prompt convention from [command-router.md](../../../arabic/references/command-router.md) |
| Subcommands | Partial | Prompt-conventional, not native |
| Agents / subagents | Unknown | Not yet validated in this environment |
| Hooks / triggers | Unknown | Not yet validated |
| Local docs loading | Strong | Skills-folder pattern loads all runtime Markdown |
| Persistence via `voice.md` | Strong | Repo-local file works via skills folder |

## What To Validate

- Whether Codex supports any native command routing beyond the skills-folder load
- Whether subagents/hooks exist in the current Codex CLI/IDE surface

## Fixes for First-Class Support

- Confirm `~/.codex/skills/` is the correct install path across Codex CLI versions (validate before marking `Strong` with confidence — currently inferred from `targetRoots`, not hands-on tested)
```

**Step 2 — Write `docs/supported/chatgpt/README.md`**

ChatGPT has no skills-folder mechanism and no `npx install` target — this profile is intentionally `Partial`, prompt-wrapper only:

```markdown
# ChatGPT Support Profile

**Skill:** Awesome Arabic Skill (`arabic`)

## Current Fit

`Partial`

## Install

No CLI installer target exists for ChatGPT (`bin/arabic-skill.js` does not list it). Use one of:

- **Custom GPT instructions:** paste `arabic/SKILL.md` body into the Custom GPT system prompt field; upload `arabic/references/*.md` and `arabic/dialects/*.md` as Knowledge files (subject to ChatGPT's per-file and total upload limits).
- **Project instructions (ChatGPT Projects):** paste `SKILL.md` into project instructions; upload reference files as project files.
- **Per-conversation:** paste `SKILL.md` at the start of a chat; large reference packs will not fit reliably in context this way — prefer Custom GPT or Projects for real use.

## Why It's Partial, Not Strong

ChatGPT has no local filesystem, no skills folder, and no native subcommand routing.
The advisory-first operating model and dialect/domain packs work as a system prompt +
uploaded knowledge, but:

- no persistent `voice.md` across sessions without the user re-uploading it
- no `/arabic` command surface — prompt convention only
- file upload/knowledge limits may force trimming which reference packs are included

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Partial | Works via Custom GPT / Project instructions field |
| Commands | Limited | Prompt convention only, no native routing |
| Subcommands | Limited | Prompt convention only |
| Agents / subagents | Limited | No native subagent model |
| Hooks / triggers | Limited | None |
| Local docs loading | Partial | Knowledge/file upload, subject to size limits |
| Persistence via `voice.md` | Limited | Requires manual re-upload per session/project |

## Fixes for First-Class Support

- None available without a ChatGPT-side mechanism (Actions/plugins) — out of scope until ChatGPT exposes a skills-equivalent API
```

**Step 3 — Add both to `docs/supported/README.md`**

In the existing "Tool Folders" bullet list, insert (keep alphabetical-by-appearance as the file already does — insert near the top since Codex/Claude/Cursor are the flagship row):

```markdown
- [Codex](./codex/README.md)
- [ChatGPT](./chatgpt/README.md)
```

**Step 4 — Add both rows to `docs/supported/support-matrix.md`**

```markdown
| Codex | Strong | skills-folder + docs | Partial | Unknown | Strong | Medium |
| ChatGPT | Partial | Custom GPT / Project instructions + knowledge upload | Limited | Limited | Limited | Medium |
```

**Step 5 — Verify**

Run: `bash scripts/validate-docs.sh`
Expected: `Docs link validation passed` (confirms the two new README links resolve and no other link broke).

**Step 6 — Commit**

```bash
git add docs/supported/codex/README.md docs/supported/chatgpt/README.md docs/supported/README.md docs/supported/support-matrix.md
git commit -m "docs(supported): add Codex and ChatGPT tool profiles (P7-A)"
```

---

### P7-B — Adapter template + apply to top 3 Partial tools

**Files:**
- Modify: `docs/supported/gemini/README.md`
- Modify: `docs/supported/copilot/README.md`
- Modify: `docs/supported/vs-code/README.md`

**Step 1 — Read the two reference adapters first**

`docs/supported/cursor/commands.md` and `docs/supported/claude/README.md` are the house templates (per the original Track C plan's own instruction — this was correct). Every Partial-tool README must end up with these five sections in this order: `Current Fit`, `Install` (Preferred npx / Manual Fallback), `Expected Support` table, `v1.1 Command Map`, `Load-Set / Persistence`.

**Step 2 — Add the missing `v1.1 Command Map` section to each of the 3 files**

This is the section none of the 22 existing READMEs have yet (confirmed absent by grep before writing). Template per file:

```markdown
## v1.1 Command Map

| Task | Native command | Prompt fallback |
|---|---|---|
| Plan | none | "arabic plan &lt;project&gt;" per [project-mode.md](../../../arabic/references/project-mode.md) |
| Audit | none | "arabic audit" per [audit-mode.md](../../../arabic/references/audit-mode.md) |
| Audit RTL | none | "arabic audit rtl" |
| Audit (capped scan) | none | "arabic audit --dir &lt;path&gt;" |
```

Adjust the "Native command" column per tool if a native slash-command equivalent exists (verify per tool before writing `none` — do not assume).

**Step 3 — Add `Persistence` line to each (if missing)**

```markdown
## Persistence

`.arabic/voice.md` and `.arabic/projects/{slug}/plan.md` — repo-local files, work identically across all three tools since none has a native memory API this skill can hook into.
```

**Step 4 — Verify**

Run: `bash scripts/validate-docs.sh`

**Step 5 — Commit**

```bash
git add docs/supported/gemini/README.md docs/supported/copilot/README.md docs/supported/vs-code/README.md
git commit -m "docs(supported): standardize v1.1 command map for Gemini, Copilot, VS Code (P7-B)"
```

---

### P7-C — Apply the same template to remaining 6 Partial tools

**Files:**
- Modify: `docs/supported/kiro/README.md`
- Modify: `docs/supported/replit/README.md`
- Modify: `docs/supported/continue/README.md`
- Modify: `docs/supported/sourcegraph-cody/README.md`
- Modify: `docs/supported/kilo-code/README.md`
- Modify: `docs/supported/jetbrains-junie/README.md`

Repeat P7-B Steps 2–3 for each file. One commit per file (or one combined commit if reviewed together) — match whatever granularity the reviewer prefers; keep each file's diff self-contained so a partial revert is possible.

**Verify:** `bash scripts/validate-docs.sh` after all six.

**Commit:**

```bash
git add docs/supported/kiro/README.md docs/supported/replit/README.md docs/supported/continue/README.md docs/supported/sourcegraph-cody/README.md docs/supported/kilo-code/README.md docs/supported/jetbrains-junie/README.md
git commit -m "docs(supported): standardize v1.1 command map for remaining Partial tools (P7-C)"
```

---

### P7-D — Validate the 4 Unknown tools

**Files:**
- Modify: `docs/supported/antigravity/README.md`
- Modify: `docs/supported/hermes-agent/README.md`
- Modify: `docs/supported/openclaw/README.md`
- Modify: `docs/supported/opencode/README.md`
- Modify: `docs/supported/support-matrix.md` (fit-tier column, if promoted)

**Step 1 — Run the smoke checklist** from `docs/supported/integration-model.md` §Compatibility Checklist against each tool: can it load project instructions, reference local Markdown, support `/arabic`-style commands, route modes, simulate subagents, preserve context, use repo-local persistence, support staged workflows.

**Step 2 — Update each README** with a dated validation note and, if warranted, a promoted fit tier:

```markdown
## Validation

**Validated 2026-07-XX.** [Result of the smoke checklist — promote to Partial/Limited with justification, or document the specific blocker keeping it Unknown.]
```

**Step 3 — Update `support-matrix.md`** fit-tier column only for tools that were actually promoted — do not bulk-change all 4 to the same tier without individual justification.

**Step 4 — Verify:** `bash scripts/validate-docs.sh`

**Step 5 — Commit:**

```bash
git add docs/supported/antigravity/README.md docs/supported/hermes-agent/README.md docs/supported/openclaw/README.md docs/supported/opencode/README.md docs/supported/support-matrix.md
git commit -m "docs(supported): validate Unknown-tier tools, update fit tiers (P7-D)"
```

---

### P7-E — Installer docs and distribution alignment

**Files:**
- Modify: `README.md` (root)
- Create (optional): `scripts/validate-supported.sh`
- Modify (if script created): `.github/workflows/validate.yml`

**Step 1 — Root README table**

Add a table linking all 24 profiles (22 existing + Codex + ChatGPT from P7-A). Place it near the existing tool-icon row in `README.md`.

**Step 2 (optional) — `scripts/validate-supported.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "==> Validating docs/supported/ folder coverage..."

fail=0
for dir in docs/supported/*/; do
  tool=$(basename "$dir")
  if ! grep -q "($tool/README.md)" docs/supported/README.md 2>/dev/null && \
     ! grep -qi "$tool" docs/supported/README.md; then
    echo "MISSING from docs/supported/README.md index: $tool"
    fail=1
  fi
done

echo "==> Checking support-matrix.md row count vs folder count..."
folder_count=$(find docs/supported -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')
matrix_rows=$(($(grep -c '^|' docs/supported/support-matrix.md) - 2)) # minus header + separator
if [ "$folder_count" -ne "$matrix_rows" ]; then
  echo "MISMATCH: $folder_count folders vs $matrix_rows support-matrix.md rows"
  fail=1
fi

if [ "$fail" -eq 0 ]; then
  echo "==> validate-supported.sh passed"
fi
exit $fail
```

**Step 3 — Verify:** `bash scripts/validate-supported.sh` locally before wiring into CI.

**Step 4 — Wire into `package.json` `validate` script and `.github/workflows/validate.yml`** only after Step 3 passes cleanly against the post-P7-A/D state (folder count will be 24, matrix rows must match).

**Step 5 — Commit:**

```bash
git add README.md scripts/validate-supported.sh .github/workflows/validate.yml package.json
git commit -m "docs(supported): root README profile table + optional CI coverage gate (P7-E)"
```

---

## 2. Backlog — not in this plan's scope (v1.2+)

Do not start these without explicit prioritization:

| Candidate | Rationale |
|-----------|-----------|
| Roo Code | Cline fork; rules + skills pattern |
| Trae | Growing IDE agent surface |
| Bolt / Lovable | Staged web project mode aligns with future website plans |
| Factory / Devin | Agent platforms; compare to OpenHands adapter |

New `targetRoots` for Windsurf/Aider in `bin/arabic-skill.js` are also out of scope here — document the `--dir` manual workaround in P7-B/C instead of adding unverified installer presets.

## 3. Acceptance / success criteria

- [ ] `docs/supported/codex/README.md` and `chatgpt/README.md` exist and are linked from `docs/supported/README.md`
- [ ] `support-matrix.md` row count == `docs/supported/*/` folder count (24)
- [ ] All 4 Unknown-tier tools have a dated validation note; fit tiers updated only where justified
- [ ] Gemini, Copilot, VS Code have a `v1.1 Command Map` section
- [ ] Remaining 6 Partial tools have the same section
- [ ] Root `README.md` links all 24 profiles
- [ ] `bash scripts/validate-docs.sh` and `bash scripts/validate-skill.sh` both pass after every commit
- [ ] (Optional) `scripts/validate-supported.sh` passes and is wired into CI

## 4. Git delivery (matches `implementation-plan.md §15` format)

| Item | Branch | PR title |
|------|--------|----------|
| P7-A | `docs/p7a-codex-chatgpt-profiles` | `docs(supported): P7-A — Codex + ChatGPT profiles` |
| P7-B | `docs/p7b-partial-adapter-template` | `docs(supported): P7-B — command map for top 3 Partial tools` |
| P7-C | `docs/p7c-partial-adapter-remaining` | `docs(supported): P7-C — command map for remaining Partial tools` |
| P7-D | `docs/p7d-validate-unknown-tools` | `docs(supported): P7-D — validate Unknown-tier tools` |
| P7-E | `docs/p7e-installer-distribution-docs` | `docs(supported): P7-E — root README table + optional CI gate` |

Each merges independently to `main` after `validate-docs.sh`/`validate-skill.sh` pass — no ordering dependency except P7-E should land after P7-A (it links to the new profiles).

## 5. Open item to raise separately (not blocking this plan)

`roadmap.md`'s header still reads `Product version: 0.1.0 (development)` — stale since `v1.0.0` shipped. Fix independently of this plan (one-line edit, unrelated scope).
