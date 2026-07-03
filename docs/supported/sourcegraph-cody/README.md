# Sourcegraph Cody Support Profile

## Current Fit

`Partial`

## Why It Is Partial

Cody is strong at codebase-aware assistance, but the full advisory-command-subagent model usually needs extra packaging.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Partial | Best through repo context and instruction wrapper |
| Commands | Partial | Better as conventions |
| Subcommands | Partial | Better documented than assumed native |
| Agents / subagents | Limited | Usually simulated unless using broader Sourcegraph agent surfaces |
| Hooks / triggers | Limited | Needs validation |
| Local docs loading | Strong | Codebase context is a core strength |
| Persistence via `voice.md` | Partial | File-based persistence should work |

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

- repo-aware instruction wrapper
- explicit command tree
- strong dev-tech support focus

## What To Validate

- whether the target is Cody specifically or broader Sourcegraph agent products
- how much project-local instruction control is available

## Fixes for First-Class Support

- create a Cody-specific adapter if you decide to support it as a primary target
- keep the skill portable rather than Sourcegraph-dependent
