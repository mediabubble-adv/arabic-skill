# Replit Agent Support Profile

## Current Fit

`Partial`

## Why It Is Partial

Replit Agent is strong for building apps and staged agent workflows, but its center of gravity is product/app generation inside Replit rather than repo-native IDE skill routing.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Partial | Supports skills/customization concepts, but needs adaptation |
| Commands | Partial | Better as guided conventions than assumed native slash tree |
| Subcommands | Partial | Needs explicit design |
| Agents / subagents | Partial | Agent modes exist, but subagent mapping needs work |
| Hooks / triggers | Partial | Platform automations may help |
| Local docs loading | Partial | Depends on project import and skill setup |
| Persistence via `voice.md` | Strong | File-based persistence is feasible |

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

- adapter focused on app/site workflows
- strong Project Mode mapping
- prompt and advisory wrappers

## What To Validate

- how `voice.md` should be loaded in Replit projects
- whether command routing should be modeled through skills or chat conventions
- whether multi-stage QA can be expressed cleanly

## Fixes for First-Class Support

- build a Replit adapter after testing
- bias toward website/project/book flows rather than IDE-native coding assumptions
