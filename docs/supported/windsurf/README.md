# Windsurf Support Profile

## Current Fit

`Strong`

## Install

### Preferred (guided steps via CLI)

```bash
npx @mediabubble-adv/arabic-skill@latest install --target windsurf
```

No verified global skills folder — do not guess `~/.windsurf/skills`. The CLI prints rules/docs packaging steps. Escape hatch: `install --dir <path>` when you have a confirmed skills root.

## Why It Fits Well

Windsurf is close to the same integration category as Cursor for this skill:

- repo-aware workflow
- rules-oriented setup
- markdown-heavy context model
- file-based persistence

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | Good fit for runtime router and mode rules |
| Commands | Strong | `/arabic` conventions should map well |
| Subcommands | Strong | Good fit for documented command trees |
| Agents / subagents | Partial | Often simulated rather than truly native |
| Hooks / triggers | Partial | Depends on current rules surface |
| Local docs loading | Strong | Very good fit |
| Persistence via `voice.md` | Strong | File-based context is natural |

## Recommended Packaging

- tool-specific rules wrapper
- runtime markdown pack
- command conventions
- explicit QA loop

## What To Validate

- exact rules-file conventions to standardize
- whether project-mode stage prompts should be split out
- how much of the QA loop can be made tool-native

## Fixes for First-Class Support

- define a Windsurf adapter doc later if deployment becomes a real target
- keep subagents as simulated workflow roles unless native support is proven
