# JetBrains Junie Support Profile

## Current Fit

`Partial`

## Why It Is Partial

Junie is a JetBrains-integrated coding agent, but the `arabic` system is repo-doc and command driven, so support depends on how much project-local instruction and workflow control the IDE exposes.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Partial | IDE-native AI settings may help, but need adaptation |
| Commands | Partial | Better documented as conventions |
| Subcommands | Partial | Better through docs than native command routing |
| Agents / subagents | Limited | Native agent exists, but skill-specific subagents likely need simulation |
| Hooks / triggers | Limited | Needs validation |
| Local docs loading | Strong | JetBrains projects can keep strong repo docs nearby |
| Persistence via `voice.md` | Strong | File-based persistence is portable |

## Recommended Packaging

- JetBrains-focused instruction wrapper
- repo docs
- explicit Project Mode and Prompt Coach flows

## What To Validate

- how Junie consumes project instructions
- whether repo-local docs are surfaced reliably
- how much staged workflow it supports cleanly

## Fixes for First-Class Support

- create a JetBrains adapter if this becomes a real target
- avoid assuming native slash-command support
