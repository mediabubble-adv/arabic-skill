# Integration Model for Tool Support

## Goal

Define one reusable model for adapting **Awesome Arabic Skill** (`arabic`) across multiple tools without rebuilding the skill from scratch for each one.

## Core Skill Components

Every tool integration should be evaluated against these components:

1. **System instructions**
2. **Rules files**
3. **Commands**
4. **Subcommands**
5. **Agents / subagents**
6. **Hooks / triggers**
7. **Context loading**
8. **Persistent files** like `voice.md`
9. **Project workflows**
10. **Review / QA pass**

## Portability Strategy

The skill should not depend on one vendor-specific surface.

Instead, the integration model should separate:

- **portable logic**
- **tool-specific packaging**

### Portable Logic

These should remain stable across tools:

- operating model
- intake protocols
- engines
- templates
- humanization rules
- taboo rules
- domain packs
- dialect packs

### Tool-Specific Packaging

These vary by tool:

- where instructions live
- how commands are invoked
- whether subagents are native or simulated
- whether hooks exist
- whether repo docs can be loaded automatically

## Support Levels

### Level 1 — Prompt Wrapper

The skill runs as:

- system prompt
- chat instructions
- uploaded knowledge

Works for:

- tools with no native rules or subagent system

### Level 2 — Rules-Based IDE Support

The skill runs as:

- project rules
- local docs
- command conventions
- reusable prompt files

Works for:

- IDE tools that support repo-local instructions

### Level 3 — Agentic Integration

The skill runs as:

- rules
- commands
- subagents
- workflow stages
- persistent context

Works for:

- tools with richer agent execution models

## Compatibility Checklist

For each tool, evaluate:

- Can it load project instructions?
- Can it reference local markdown files reliably?
- Can it support command-style workflows like `/arabic write ...`?
- Can it support mode routing?
- Can it simulate or run subagents?
- Can it preserve context across sessions?
- Can it work with repo-local persistence files?
- Can it support staged project workflows?

## Design Rule

When a tool cannot support a feature natively, fall back in this order:

1. native feature
2. repo rules and docs
3. prompt conventions
4. simulated workflow inside one agent

## Main Recommendation

Treat **Awesome Arabic Skill** (`arabic`) as a portable skill architecture with tool adapters, not as a single tool-specific prompt.
