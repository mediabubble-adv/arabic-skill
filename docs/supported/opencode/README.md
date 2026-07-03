# OpenCode Support Profile

**Skill:** Awesome Arabic Skill (`arabic`)

## Current Fit

`Partial`

## Install

### Project-scoped

```bash
git clone https://github.com/mediabubble-adv/arabic-skill.git
cd arabic-skill
mkdir -p .opencode/skills
cp -r arabic .opencode/skills/arabic
```

### Global

```bash
git clone https://github.com/mediabubble-adv/arabic-skill.git
cd arabic-skill
mkdir -p ~/.config/opencode/skills
cp -r arabic ~/.config/opencode/skills/arabic
```

> OpenCode also scans `.claude/skills/` and `.agents/skills/` for compatibility. Folder name must match the `name:` frontmatter (`arabic`).

## Why It Is Partial

OpenCode natively discovers Agent Skills via the `skill` tool (`.opencode/skills/`, `~/.config/opencode/skills/`, plus Claude/agent-compatible paths). The portable runtime pack loads without an adapter rewrite. Gaps: no `npx` preset, permission gating in `opencode.json`, and convention-driven `/arabic` subcommands rather than a native router.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | Native `skill` tool loads `SKILL.md` on demand ([OpenCode skills docs](https://opencode.ai/docs/skills/)) |
| Commands | Partial | Invoke via `skill` tool or natural language; no native `/arabic` router |
| Subcommands | Partial | Documented in skill body; prompt-conventional |
| Agents / subagents | Partial | Custom agents + per-agent permission overrides; advisory roles likely simulated |
| Hooks / triggers | Limited | `opencode.json` permission patterns; no repo hook contract assumed |
| Local docs loading | Strong | Skills-folder + repo walk-up discovery |
| Persistence via `voice.md` | Strong | Repo-local files |

## v1.1 Command Map

| Task | Native command | Prompt fallback |
|---|---|---|
| Plan | none | "arabic plan &lt;project&gt;" per [project-mode.md](../../../arabic/references/project-mode.md) |
| Audit | none | "arabic audit" per [audit-mode.md](../../../arabic/references/audit-mode.md) |
| Audit RTL | none | "arabic audit rtl" |
| Audit (capped scan) | none | "arabic audit --dir &lt;path&gt;" |

## Persistence

`.arabic/voice.md` and `.arabic/projects/{slug}/plan.md` — repo-local files. OpenCode agent session state is separate; do not assume cross-session memory for Project Mode.

## Validation

**Validated 2026-07-03.** Smoke checklist against [integration-model.md](../integration-model.md#compatibility-checklist) (docs review + official OpenCode skills documentation; no live OpenCode session in CI):

| Check | Result |
|---|---|
| Load project instructions | **Pass** — `.opencode/skills/` + global + compatible paths |
| Reference local Markdown | **Pass** — native `skill` tool progressive disclosure |
| `/arabic`-style commands | **Partial** — skill invocation; subcommand tree is conventional |
| Mode routing | **Partial** — skill load + prompt conventions |
| Subagents | **Partial** — custom agents exist; skill role mapping unverified |
| Cross-session context | **Partial** — session-bound; file state for long Project Mode |
| Repo-local persistence | **Pass** — `voice.md` / `.arabic/` portable |
| Staged project workflows | **Partial** — plugin workflows possible; plan-first gate is prompt-enforced |

**Promotion:** `Unknown` → `Partial`. Blocker for `Strong`: no installer preset, permission config per project, subagent mapping unverified.

## Recommended Packaging

- `.opencode/skills/arabic` or global `~/.config/opencode/skills/arabic`
- allow `skill` permissions in `opencode.json` (default is allow)
- prompt-conventional command routing
- file-backed Project Mode under `.arabic/`

## Fixes for First-Class Support

- add OpenCode to `bin/arabic-skill.js` `targetRoots` after path verification
- document `opencode.json` permission patterns for team installs
- live-test custom-agent overrides and long-running Project Mode sessions
