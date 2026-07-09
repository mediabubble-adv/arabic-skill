# Amp Support Profile

## Current Fit

`Strong`

## Install

### Preferred (guided steps via CLI)

```bash
npx @mediabubble-adv/arabic-skill@latest install --target amp
```

No verified global skills folder — the CLI prints adapter and workspace packaging steps. Escape hatch: `install --dir <path>` when you have a confirmed skills root.

## Why It Fits Well

Amp has an explicit CLI, plugins, custom agents, and agent workflows. That makes it a strong target for the `arabic` architecture.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | Good fit through adapter and workspace conventions |
| Commands | Strong | CLI-native mindset maps well to command routing |
| Subcommands | Strong | Clean fit for structured command trees |
| Agents / subagents | Strong | Custom agents are directly relevant |
| Hooks / triggers | Strong | Plugin/event model is promising |
| Local docs loading | Partial | Needs adapter design and validation |
| Persistence via `voice.md` | Strong | File-based persistence should port cleanly |

## Recommended Packaging

- dedicated Amp adapter
- command router mapping
- custom-agent mapping for advisory, writing, and review roles
- plugin policy for hooks and QA

## What To Validate

- exact plugin/hook lifecycle for workspace policy
- how custom agents should be separated
- how local repo docs are best surfaced inside Amp

## Fixes for First-Class Support

- create a real Amp adapter spec later
- map the advisory-first lifecycle to Amp custom agents
