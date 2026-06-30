# Kilo Code Support Profile

## Current Fit

`Partial`

## Current Assumption

Because this repo already contains a `.kilocode` folder, Kilo Code is worth supporting explicitly even if the current setup is minimal.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Partial | Likely possible with local config or docs |
| Commands | Partial | Probably better as conventions than native commands |
| Subcommands | Partial | Documented workflow likely needed |
| Agents / subagents | Partial | Likely simulated unless proven otherwise |
| Hooks / triggers | Unknown | Needs validation |
| Local docs loading | Strong | Repo-local docs should be usable |
| Persistence via `voice.md` | Strong | File-based persistence is tool-agnostic |

## Recommended Packaging

- define tool-local adapter later
- use markdown docs plus runtime conventions
- rely on file-based state

## What To Validate

- what `.kilocode` should actually contain
- whether rule files or config files are supported
- how command invocation should work
- whether project workflows can be staged cleanly

## Fixes for First-Class Support

- create actual `.kilocode` config once the execution model is confirmed
- align command conventions with the main `/arabic` model
