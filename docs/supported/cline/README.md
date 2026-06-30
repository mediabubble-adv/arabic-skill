# Cline Support Profile

## Current Fit

`Strong`

## Why It Fits Well

Cline explicitly supports IDE, CLI, SDK, rules, plan/act workflows, MCP, and multi-agent patterns. That is very close to the architecture this skill wants.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | `.clinerules` style support maps well |
| Commands | Strong | Command tree fits naturally |
| Subcommands | Strong | Good fit for documented workflow trees |
| Agents / subagents | Strong | Native multi-agent positioning is a strong match |
| Hooks / triggers | Strong | SDK/plugins make this realistic |
| Local docs loading | Strong | Repo-local rules and docs are a good fit |
| Persistence via `voice.md` | Strong | File-based persistence fits well |

## Recommended Packaging

- explicit Cline adapter
- command tree
- agent-role mapping
- review loop mapped to plan/act and rules

## What To Validate

- exact separation between native agents and skill-defined roles
- how repo-local docs are loaded during long runs

## Fixes for First-Class Support

- create a Cline-specific adapter doc later
- map advisory, generation, and review roles to native capabilities where possible
