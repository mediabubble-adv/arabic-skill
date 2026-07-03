# OpenClaw Support Profile

**Skill:** Awesome Arabic Skill (`arabic`)

## Current Fit

`Partial`

## Install

### Workspace (highest precedence)

```bash
git clone https://github.com/mediabubble-adv/arabic-skill.git
cd arabic-skill
mkdir -p skills
cp -r arabic skills/arabic
```

### Global (shared across agents)

```bash
git clone https://github.com/mediabubble-adv/arabic-skill.git
cd arabic-skill
mkdir -p ~/.openclaw/skills
cp -r arabic ~/.openclaw/skills/arabic
```

Or, when OpenClaw CLI is available:

```bash
openclaw skills install https://github.com/mediabubble-adv/arabic-skill.git --as arabic
```

> Verify the install path with `openclaw skills list` — OpenClaw expects `SKILL.md` at the skill root.

## Why It Is Partial

OpenClaw follows the AgentSkills spec with workspace and global skill roots, optional user-invocable slash commands, and multi-agent allowlists. The portable `arabic` runtime pack fits without rewriting. Gaps: no `npx` installer preset, agent allowlist configuration per deployment, and unverified hands-on mapping for skill-defined subagents and hooks.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | Native `SKILL.md` load + snapshot injection ([OpenClaw skills docs](https://docs.openclaw.ai/tools/skills)) |
| Commands | Partial | Skills can expose slash commands (`user-invocable`); `/arabic` subcommand tree is still skill-body conventional |
| Subcommands | Partial | Documented in `SKILL.md`; not a native nested router |
| Agents / subagents | Partial | Multi-agent platform with per-agent skill allowlists; advisory roles may need simulation |
| Hooks / triggers | Partial | Skill gating via `metadata.openclaw`, config, and filesystem watchers — exact hook surface varies |
| Local docs loading | Strong | Workspace skills + repo context |
| Persistence via `voice.md` | Strong | Repo-local files; OpenClaw run env injection is separate |

## v1.1 Command Map

| Task | Native command | Prompt fallback |
|---|---|---|
| Plan | `/arabic` (if user-invocable) + args | "arabic plan &lt;project&gt;" per [project-mode.md](../../../arabic/references/project-mode.md) |
| Audit | `/arabic` + "audit" | "arabic audit" per [audit-mode.md](../../../arabic/references/audit-mode.md) |
| Audit RTL | `/arabic` + "audit rtl" | "arabic audit rtl" |
| Audit (capped scan) | `/arabic` + "audit --dir &lt;path&gt;" | "arabic audit --dir &lt;path&gt;" |

## Persistence

`.arabic/voice.md` and `.arabic/projects/{slug}/plan.md` — repo-local files. OpenClaw `skills.entries.*.env` injection is for skill runtime, not a substitute for Project Mode plan files.

## Validation

**Validated 2026-07-03.** Smoke checklist against [integration-model.md](../integration-model.md#compatibility-checklist) (docs review + official OpenClaw skills documentation; no live OpenClaw session in CI):

| Check | Result |
|---|---|
| Load project instructions | **Pass** — workspace `skills/` + `~/.openclaw/skills/` |
| Reference local Markdown | **Pass** — AgentSkills `SKILL.md` + `{baseDir}` references |
| `/arabic`-style commands | **Partial** — optional skill slash commands; subcommands conventional |
| Mode routing | **Partial** — skill snapshot + prompt conventions |
| Subagents | **Partial** — multi-agent allowlists; skill role mapping unverified |
| Cross-session context | **Partial** — per-run skill snapshot; long sessions need file state |
| Repo-local persistence | **Pass** — `voice.md` / `.arabic/` portable |
| Staged project workflows | **Partial** — staged skill proposals exist; plan-first gate is prompt-enforced |

**Promotion:** `Unknown` → `Partial`. Blocker for `Strong`: no installer preset, per-agent allowlist setup, subagent mapping unverified.

## Recommended Packaging

- workspace `skills/arabic` install
- keep `user-invocable` enabled if slash `/arabic` is desired
- repo-local `.arabic/` for Project Mode
- configure agent skill allowlists when running multiple agents

## Fixes for First-Class Support

- add OpenClaw to `bin/arabic-skill.js` `targetRoots` or document `openclaw skills install` as the preferred path
- create an OpenClaw adapter with allowlist + slash-command frontmatter
- live-test multi-agent delegation for advisory → write → review loop
