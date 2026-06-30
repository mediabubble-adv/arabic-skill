# OpenHands Support Profile

## Current Fit

`Strong`

## Why It Fits Well

OpenHands is an agent platform, not just an editor plugin. It supports autonomous coding workflows, cloud/local execution, integrations, and SDK-based customization. That makes it a strong architecture match.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | Good fit through platform and SDK layers |
| Commands | Strong | Good fit for workflow and task routing |
| Subcommands | Strong | Good fit for structured execution trees |
| Agents / subagents | Strong | Native agent-platform mindset is aligned |
| Hooks / triggers | Strong | Integrations and automation fit well |
| Local docs loading | Partial | Depends on deployment path |
| Persistence via `voice.md` | Strong | File-based context maps well |

## Recommended Packaging

- OpenHands adapter
- workflow/task mapping
- advisory-first roles mapped to agent tasks
- project and book modes mapped to staged workflows

## What To Validate

- best way to inject repo docs into agent runs
- how task orchestration should map to skill modes
- where QA loops should execute

## Fixes for First-Class Support

- build an OpenHands adapter spec later
- map Project Mode directly to OpenHands task workflows
