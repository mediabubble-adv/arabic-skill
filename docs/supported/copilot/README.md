# Copilot Support Profile

## Current Fit

`Partial`

## Why It Is Partial

Copilot can support structured instructions and repo-local documentation, but the full command-and-subagent model usually needs adaptation.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | Good fit for custom instructions |
| Commands | Partial | Better as documented command conventions |
| Subcommands | Partial | Better as documented workflow trees |
| Agents / subagents | Limited | Usually simulated |
| Hooks / triggers | Limited | Depends on active Copilot surface |
| Local docs loading | Partial | Often workable through repo context |
| Persistence via `voice.md` | Strong | File-based persistence is portable |

## v1.1 Command Map

| Task | Native command | Prompt fallback |
|---|---|---|
| Plan | none | "arabic plan &lt;project&gt;" per [project-mode.md](../../../arabic/references/project-mode.md) |
| Audit | none | "arabic audit" per [audit-mode.md](../../../arabic/references/audit-mode.md) |
| Audit RTL | none | "arabic audit rtl" |
| Audit (capped scan) | none | "arabic audit --dir &lt;path&gt;" |

## Persistence

`.arabic/voice.md` and `.arabic/projects/{slug}/plan.md` — repo-local files, work identically across all three tools since none has a native memory API this skill can hook into.

## Recommended Packaging

- custom instructions
- prompt files
- repo docs
- explicit staged workflows

## What To Validate

- which Copilot surface is the target
- how much repo context it reliably sees
- whether prompt files improve command consistency

## Fixes for First-Class Support

- create a Copilot-specific adapter later
- keep commands explicit and documented
- simulate subagent roles through staged prompts
