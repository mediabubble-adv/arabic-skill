# Antigravity Support Profile

**Skill:** Awesome Arabic Skill (`arabic`)

## Current Fit

`Partial`

## Install

### Preferred (npx — workspace)

```bash
npx @mediabubble-adv/arabic-skill@latest install --target antigravity --scope workspace
```

### Preferred (npx — global)

```bash
npx @mediabubble-adv/arabic-skill@latest install --target antigravity
```

### Workspace (manual)

```bash
git clone https://github.com/mediabubble-adv/arabic-skill.git
cd arabic-skill
mkdir -p .agents/skills
cp -r arabic .agents/skills/arabic
```

### Global (all workspaces)

```bash
git clone https://github.com/mediabubble-adv/arabic-skill.git
cd arabic-skill
mkdir -p ~/.gemini/config/skills
cp -r arabic ~/.gemini/config/skills/arabic
```

> **Antigravity CLI note:** CLI may read `~/.gemini/antigravity-cli/skills/` instead of `~/.agents/skills/`. If the skill does not appear, copy to the CLI skills root documented for your Antigravity CLI version.

## Why It Is Partial

Antigravity natively supports the Agent Skills open standard (`SKILL.md` with progressive disclosure) at workspace (`.agents/skills/`) and global (`~/.gemini/config/skills/`) scopes. Core writing and advisory behavior maps well. The gap is native `/arabic` command routing and unverified subagent/hook wiring — those stay prompt-conventional until a dedicated adapter is tested hands-on.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | Native `SKILL.md` discovery + activation ([Antigravity skills docs](https://antigravity.google/docs/skills)) |
| Commands | Partial | Skills are agent-triggered; no confirmed native `/arabic` router — use [command-router.md](../../../arabic/references/command-router.md) conventions |
| Subcommands | Partial | Prompt-conventional via loaded skill body |
| Agents / subagents | Partial | Agent manager and custom agents exist; skill-defined advisory roles likely need simulation |
| Hooks / triggers | Partial | Workflows and rules can gate skill use; exact hook surface not fully mapped |
| Local docs loading | Strong | Repo-aware IDE + skills-folder loads runtime Markdown |
| Persistence via `voice.md` | Strong | Repo-local files; do not rely on IDE session memory |

## v1.1 Command Map

| Task | Native command | Prompt fallback |
|---|---|---|
| Plan | none | "arabic plan &lt;project&gt;" per [project-mode.md](../../../arabic/references/project-mode.md) |
| Audit | none | "arabic audit" per [audit-mode.md](../../../arabic/references/audit-mode.md) |
| Audit RTL | none | "arabic audit rtl" |
| Audit (capped scan) | none | "arabic audit --dir &lt;path&gt;" |

## Persistence

`.arabic/voice.md` and `.arabic/projects/{slug}/plan.md` — repo-local files. Antigravity does not expose a native memory API for this skill; file-backed persistence is the portable path.

## Validation

**Validated 2026-07-03.** Smoke checklist against [integration-model.md](../integration-model.md#compatibility-checklist) (docs review + official Antigravity skills documentation; no live IDE session in CI):

| Check | Result |
|---|---|
| Load project instructions | **Pass** — `.agents/skills/` workspace + global skills roots |
| Reference local Markdown | **Pass** — skills progressive disclosure loads `SKILL.md` + references |
| `/arabic`-style commands | **Partial** — agent-triggered skills, not a native slash router |
| Mode routing | **Partial** — via skill activation + prompt conventions |
| Subagents | **Partial** — platform agents exist; skill roles need simulation |
| Cross-session context | **Partial** — IDE session + file-backed state |
| Repo-local persistence | **Pass** — `voice.md` / `.arabic/` portable |
| Staged project workflows | **Partial** — workflows feature aligns; plan-first gate is prompt-enforced |

**Promotion:** `Unknown` → `Partial`. Blocker for `Strong`: no `npx` install target, no hands-on `/arabic` command proof, subagent mapping unverified.

## Recommended Packaging

- workspace skills install (`.agents/skills/arabic`)
- master runtime in `SKILL.md`
- prompt-conventional command routing
- file-backed Project Mode state under `.arabic/`

## Fixes for First-Class Support

- shipped in `bin/install-targets.json` as `--target antigravity` (global) and `--scope workspace`; verify CLI skills root per Antigravity version
- create a dedicated adapter doc mapping advisory roles to Antigravity workflows
- live-test `/arabic` prompt conventions and agent-manager delegation
