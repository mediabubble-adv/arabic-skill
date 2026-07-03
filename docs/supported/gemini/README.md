# Gemini Support Profile

## Current Fit

`Partial`

## Why It Is Partial

Gemini can support the portable parts of the skill well, but the full advisory-agent system depends on the exact Gemini surface being used.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | Good fit for system instructions and prompt wrappers |
| Commands | Partial | Usually convention-driven unless CLI/workflow layer exists |
| Subcommands | Partial | Good fit for documented command trees |
| Agents / subagents | Limited | Often simulated through staged prompting |
| Hooks / triggers | Limited | Depends on the specific Gemini product surface |
| Local docs loading | Partial | Depends on repo/tooling surface |
| Persistence via `voice.md` | Partial | Better through file-based context than memory assumptions |

## v1.1 Command Map

| Task | Native command | Prompt fallback |
|---|---|---|
| Plan | none | "arabic plan &lt;project&gt;" per [project-mode.md](../../../arabic/references/project-mode.md) |
| Audit | none | "arabic audit" per [audit-mode.md](../../../arabic/references/audit-mode.md) |
| Audit RTL | none | "arabic audit rtl" |
| Audit (capped scan) | none | "arabic audit --dir &lt;path&gt;" |

## Persistence

`.arabic/voice.md` and `.arabic/projects/{slug}/plan.md` — repo-local files, work identically across tools without a native memory API this skill can hook into.

## Recommended Packaging

- strong prompt-wrapper support
- explicit runtime docs
- command conventions
- simulated advisory and QA layers

## What To Validate

- which Gemini surface is the real target
- whether repo-local docs are accessible
- whether project workflows can be staged cleanly

## Fixes for First-Class Support

- define a Gemini adapter for the chosen surface
- keep command routing explicit instead of relying on hidden behavior
