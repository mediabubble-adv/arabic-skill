# Tool Support Reference

This folder tracks how **Awesome Arabic Skill** (`arabic`) should work across the tools and agent surfaces you care about.

## Purpose

Use this folder to answer three questions:

1. Does the skill support this tool well today?
2. Which parts of the skill model work in that tool?
3. What needs to be changed to make support first-class?

## Documents

- [Integration Model](./integration-model.md)
- [Support Matrix](./support-matrix.md)

## Tool Folders

- [Claude](./claude/README.md)
- [Cursor](./cursor/README.md)
- [Antigravity](./antigravity/README.md)
- [Aider](./aider/README.md)
- [Amp](./amp/README.md)
- [Cline](./cline/README.md)
- [Continue](./continue/README.md)
- [Hermes Agent](./hermes-agent/README.md)
- [Kiro](./kiro/README.md)
- [JetBrains Junie](./jetbrains-junie/README.md)
- [OpenClaw](./openclaw/README.md)
- [OpenHands](./openhands/README.md)
- [Replit Agent](./replit/README.md)
- [Sourcegraph Cody](./sourcegraph-cody/README.md)
- [Windsurf](./windsurf/README.md)
- [VS Code](./vs-code/README.md)
- [OpenCode](./opencode/README.md)
- [Kilo Code](./kilo-code/README.md)
- [Gemini](./gemini/README.md)
- [Qwen](./qwen/README.md)
- [Copilot](./copilot/README.md)
- [Zed](./zed/README.md)

## Reading Order

1. Start with `integration-model.md`
2. Review `support-matrix.md`
3. Open the tool-specific folder you want to evaluate

## Status Language

- `Strong`: good fit with the current skill architecture
- `Partial`: usable, but some features need adaptation
- `Limited`: only core prompt behavior works cleanly
- `Unknown`: assumptions exist, but the tool needs validation
