# Kiro Support Profile

## Current Fit

`Partial`

## Current Assumption

Kiro appears likely to fit a structured workflow model well, especially if it supports steering, specs, or staged execution. Exact support still needs validation.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Partial | Likely good fit if project guidance is supported |
| Commands | Partial | May need prompt conventions instead of true slash commands |
| Subcommands | Partial | Can be modeled through workflow docs |
| Agents / subagents | Partial | Staged role simulation likely workable |
| Hooks / triggers | Partial | Needs validation |
| Local docs loading | Strong | If repo-aware, this should map well |
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

- project steering docs
- strong Project Mode mapping
- explicit workflow stages
- file-based context persistence

## What To Validate

- whether Kiro supports repo steering/rules natively
- how command invocation should be modeled
- whether subagent-style phases can be made explicit

## Fixes for First-Class Support

- write a Kiro-specific adapter after validation
- align Project Mode with Kiro’s native workflow model if present
