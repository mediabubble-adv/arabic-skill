# Antigravity Support Profile

## Current Fit

`Unknown`

## Current Assumption

Treat Antigravity as a tool that may support agentic workflows, but do not assume first-class compatibility until validated.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Unknown | Needs direct validation |
| Commands | Unknown | Do not assume slash commands are native |
| Subcommands | Unknown | Likely requires prompt conventions |
| Agents / subagents | Unknown | Needs proof in target surface |
| Hooks / triggers | Unknown | Needs proof in target surface |
| Local docs loading | Partial | Likely possible if repo-aware |
| Persistence via `voice.md` | Partial | File-based persistence should be portable |

## Recommended Packaging

- start with prompt-wrapper support
- rely on local docs and repo files
- treat advanced agent features as optional until verified

## What To Validate

- project instruction support
- repo-doc awareness
- command routing support
- any native agent or workflow model
- whether staged project mode can be preserved cleanly

## Fixes for First-Class Support

- create a dedicated adapter after validation
- define fallback command conventions if slash commands are not native
- simulate subagents inside one controller flow if required
