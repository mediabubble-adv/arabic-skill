# OpenCode Support Profile

## Current Fit

`Unknown`

## Current Assumption

OpenCode should be treated as a portable-agent target until its exact instruction, command, and workflow model is validated.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Partial | Likely prompt-wrapper friendly |
| Commands | Partial | Likely convention-driven |
| Subcommands | Partial | Likely convention-driven |
| Agents / subagents | Unknown | Needs validation |
| Hooks / triggers | Unknown | Needs validation |
| Local docs loading | Partial | Likely possible if repo-aware |
| Persistence via `voice.md` | Partial | File-based persistence should port |

## Recommended Packaging

- prompt-wrapper first
- local docs second
- advanced orchestration only after validation

## What To Validate

- instruction surface
- repo awareness
- command routing
- whether agent roles can be modeled natively

## Fixes for First-Class Support

- create an OpenCode adapter only after testing
- keep fallback path centered on markdown docs and prompt conventions
