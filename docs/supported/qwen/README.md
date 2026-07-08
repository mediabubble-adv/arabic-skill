# Qwen Support Profile

## Current Fit

`Limited`

## Install

### Preferred (guided steps via CLI)

```bash
npx @mediabubble-adv/arabic-skill@latest install --target qwen
```

No verified global skills folder — the CLI prints system-prompt/API wrapper steps. Escape hatch: `install --dir <path>` when you have a confirmed skills root.

## Why It Is Limited

Qwen is best treated as a model target, not a full tool runtime, unless a specific agentic environment is chosen around it.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | Good fit via system prompt or wrapper |
| Commands | Partial | Usually wrapper-driven |
| Subcommands | Partial | Usually wrapper-driven |
| Agents / subagents | Limited | Should be simulated |
| Hooks / triggers | Limited | Usually external to the model |
| Local docs loading | Partial | Depends on hosting environment |
| Persistence via `voice.md` | Partial | Better through explicit file loading |

## Recommended Packaging

- API or wrapper integration
- strong runtime prompt contract
- file-based context injection
- simulated multi-stage behavior

## What To Validate

- target execution environment around Qwen
- markdown context limits
- wrapper support for command routing

## Fixes for First-Class Support

- build a wrapper spec rather than assuming native tool support
- keep subagents and hooks external to the model unless proven otherwise
