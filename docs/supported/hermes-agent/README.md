# Hermes Agent Support Profile

## Current Fit

`Unknown`

## Current Assumption

Treat Hermes Agent as an agent-oriented surface that may support instruction persistence and workflow control, but do not claim first-class compatibility until validated against its real command, rule, and orchestration model.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Unknown | Needs direct validation |
| Commands | Partial | Likely possible through prompt or command conventions |
| Subcommands | Unknown | Needs proof in the target workflow surface |
| Agents / subagents | Partial | Name suggests agent support, but exact model is unknown |
| Hooks / triggers | Unknown | Needs direct validation |
| Local docs loading | Partial | Likely portable if repo-aware |
| Persistence via `voice.md` | Partial | File-based persistence should transfer well |

## Recommended Packaging

- start with adapter docs
- use repo-local references as the primary memory layer
- treat advanced orchestration as optional until native capabilities are confirmed
- map the advisory flow before adding command depth

## What To Validate

- how Hermes Agent loads project instructions
- whether it supports reusable command surfaces
- whether subagents are native, simulated, or unsupported
- whether hooks, workflows, or staged tasks exist
- how long-running Project Mode sessions should persist context

## Fixes for First-Class Support

- create a Hermes Agent adapter spec after validation
- define a fallback command tree if native commands are weak
- map guide -> clarify -> recommend -> write -> review into its native agent lifecycle
