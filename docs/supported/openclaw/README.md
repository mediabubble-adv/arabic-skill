# OpenClaw Support Profile

## Current Fit

`Unknown`

## Current Assumption

Treat OpenClaw as a potentially agent-capable tool surface, but keep support status conservative until its instruction model, workflow control, and persistence behavior are validated directly.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Unknown | Needs direct validation |
| Commands | Partial | May require wrapper conventions instead of native commands |
| Subcommands | Unknown | Needs proof in the target surface |
| Agents / subagents | Unknown | Do not assume native orchestration without validation |
| Hooks / triggers | Unknown | Needs proof in the target surface |
| Local docs loading | Partial | Likely portable if repo context is exposed |
| Persistence via `voice.md` | Partial | File-based persistence should be portable |

## Recommended Packaging

- prompt wrapper first
- repo-local docs as the core support layer
- staged workflow prompts for advisory and Project Mode behavior
- file-backed persistence instead of tool memory assumptions

## What To Validate

- whether OpenClaw supports project-level instructions
- whether it has a command palette or slash-command equivalent
- whether agent chaining or delegation is native
- how hooks or event-driven workflows work
- how stable context remains across long content sessions

## Fixes for First-Class Support

- create an OpenClaw adapter after validation
- define fallback command conventions if commands are not native
- simulate subagents through structured role prompts if needed
