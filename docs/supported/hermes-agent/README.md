# Hermes Agent Support Profile

**Skill:** Awesome Arabic Skill (`arabic`)

## Current Fit

`Partial`

## Install

### Preferred (npx — global)

```bash
npx @mediabubble-adv/arabic-skill@latest install --target hermes-agent
```

### Preferred (npx — workspace)

```bash
npx @mediabubble-adv/arabic-skill@latest install --target hermes-agent --scope workspace
```

### Manual (global skills root)

```bash
git clone https://github.com/mediabubble-adv/arabic-skill.git
cd arabic-skill
mkdir -p ~/.hermes/skills
cp -r arabic ~/.hermes/skills/arabic
```

### In-repo (team-shared)

```bash
mkdir -p skills && cp -r arabic skills/arabic
# commit skills/arabic/SKILL.md + references when your Hermes setup scans in-repo skills
```

> Hermes also supports agent-authored skills via `skill_manage`. Prefer manual or in-repo install for a pinned product version.

## Why It Is Partial

Hermes Agent implements the agentskills.io `SKILL.md` standard with progressive disclosure (`skills_list` → `skill_view`) and exposes each installed skill as a slash command. Core advisory and writing behavior fits well. Remaining gaps: unmapped native subagent orchestration for skill-defined roles, and hooks/triggers that vary by deployment.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | `~/.hermes/skills/` + in-repo skills; agentskills.io-compatible `SKILL.md` ([Hermes skills docs](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills)) |
| Commands | Partial | Installed skills become slash commands; `/arabic` works if the skill folder/name resolves to `arabic` — subcommand tree is still convention-driven |
| Subcommands | Partial | Documented in skill body; not a native nested command router |
| Agents / subagents | Partial | Background review and `skill_manage` exist; skill-defined advisory roles likely need simulation |
| Hooks / triggers | Limited | Cron/background behavior is deployment-specific; do not assume repo hooks |
| Local docs loading | Strong | `skill_view(name, file_path)` loads reference files on demand |
| Persistence via `voice.md` | Strong | Repo-local files; Hermes procedural memory is separate from `voice.md` |

## v1.1 Command Map

| Task | Native command | Prompt fallback |
|---|---|---|
| Plan | `/arabic` + "plan &lt;project&gt;" (if skill slash works) | "arabic plan &lt;project&gt;" per [project-mode.md](../../../arabic/references/project-mode.md) |
| Audit | `/arabic` + "audit" | "arabic audit" per [audit-mode.md](../../../arabic/references/audit-mode.md) |
| Audit RTL | `/arabic` + "audit rtl" | "arabic audit rtl" |
| Audit (capped scan) | `/arabic` + "audit --dir &lt;path&gt;" | "arabic audit --dir &lt;path&gt;" |

## Persistence

`.arabic/voice.md` and `.arabic/projects/{slug}/plan.md` — repo-local files. Hermes `skill_manage` procedural memory is additive, not a substitute for Project Mode plan files.

## Validation

**Validated 2026-07-03.** Smoke checklist against [integration-model.md](../integration-model.md#compatibility-checklist) (docs review + official Hermes Agent skills documentation; no live Hermes session in CI):

| Check | Result |
|---|---|
| Load project instructions | **Pass** — `~/.hermes/skills/` and in-repo skill trees |
| Reference local Markdown | **Pass** — `skill_view` progressive disclosure |
| `/arabic`-style commands | **Partial** — skill slash commands; subcommand tree is conventional |
| Mode routing | **Partial** — via skill body + natural-language invocation |
| Subagents | **Partial** — agent tooling exists; advisory role mapping unverified |
| Cross-session context | **Partial** — session + `skill_manage` memory; long Project Mode needs file state |
| Repo-local persistence | **Pass** — `voice.md` / `.arabic/` portable |
| Staged project workflows | **Partial** — plan-first gate is prompt-enforced in skill body |

**Promotion:** `Unknown` → `Partial`. Blocker for `Strong`: no installer preset, hooks vary by deployment, subagent mapping unverified.

## Recommended Packaging

- global or in-repo `SKILL.md` install
- slash-command or natural-language skill invocation
- repo-local `.arabic/` for Project Mode state
- simulated advisory/QA layers where native orchestration is weak

## Fixes for First-Class Support

- shipped in `bin/install-targets.json` as `--target hermes-agent` (global) and `--scope workspace` (in-repo)
- create a Hermes adapter mapping guide → clarify → recommend → write → review to native lifecycle
- live-test `/arabic` slash invocation and subcommand depth
