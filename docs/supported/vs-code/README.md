# VS Code Support Profile

## Current Fit

`Partial`

## Why It Is Partial

VS Code by itself is an editor, not a complete skill runtime. Support depends on which AI extension or agent layer is active.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Partial | Usually extension-dependent |
| Commands | Partial | Better as prompt files or task conventions |
| Subcommands | Partial | Can be documented, not always native |
| Agents / subagents | Limited | Usually simulated |
| Hooks / triggers | Limited | Depends heavily on extension capabilities |
| Local docs loading | Strong | Repo docs are easy to keep nearby |
| Persistence via `voice.md` | Strong | File-based persistence is straightforward |

## Recommended Packaging

- rely on docs + prompt files
- assume simulated workflows
- treat VS Code as a host for another assistant layer

## What To Validate

- which extension is considered the real execution surface
- whether custom instructions are supported
- how commands should be invoked in practice

## Fixes for First-Class Support

- define extension-specific adapters later
- keep the runtime portable so VS Code can host it regardless of assistant choice
