# Zed Support Profile

## Current Fit

`Strong`

## Why It Fits Well

Zed has explicit agent support, ACP connectivity, tool permissions, and a bring-your-own-agent model. That makes it a good target for a portable skill architecture.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Partial | Adapter and project docs are likely needed |
| Commands | Partial | More likely via agent/task conventions than slash-native UX |
| Subcommands | Partial | Good fit as documented workflow tree |
| Agents / subagents | Strong | Strong match through agentic editing and ACP |
| Hooks / triggers | Partial | Depends on agent/client setup |
| Local docs loading | Strong | Repo docs fit well in an editor workflow |
| Persistence via `voice.md` | Strong | File-based persistence is portable |

## Recommended Packaging

- Zed adapter
- ACP-compatible workflow assumptions
- strong Project Mode and review integration

## What To Validate

- how best to present command routing in Zed
- whether repo-local docs can be surfaced reliably during agent runs
- how review/QA should be staged in the diff workflow

## Fixes for First-Class Support

- define an ACP-oriented adapter later
- preserve the advisory-first flow even if commands are modeled as tasks
