# Aider Support Profile

## Current Fit

`Strong`

## Install

### Preferred (guided steps via CLI)

```bash
npx @mediabubble-adv/arabic-skill@latest install --target aider
```

No verified global skills folder — the CLI prints repo-docs and CLI-wrapper steps. Escape hatch: `install --dir <path>` when you have a confirmed skills root.

## Why It Fits Well

Aider is explicitly a terminal-first AI pair programming tool and works well with repo-local markdown, command conventions, and file-based persistence.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Partial | Best handled through repo docs and startup conventions |
| Commands | Strong | CLI use fits `/arabic` command patterns well |
| Subcommands | Strong | Easy to document as command variants |
| Agents / subagents | Simulated | Multi-role behavior should be simulated in one controller flow |
| Hooks / triggers | Partial | Depends on scripting and wrapper setup |
| Local docs loading | Strong | Good fit for markdown-driven context |
| Persistence via `voice.md` | Strong | File-based persistence fits terminal workflows |

## Recommended Packaging

- CLI wrapper conventions
- repo-local docs
- explicit command trees
- staged QA prompts

## What To Validate

- whether wrapper scripts are needed for slash-command UX
- how much of the advisory-first flow should be standardized at launch time

## Fixes for First-Class Support

- define an Aider adapter later if you want a polished CLI workflow
- keep multi-agent behavior simulated, not assumed native
