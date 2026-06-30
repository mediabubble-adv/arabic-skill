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

## Icon Assets

The repository includes local tool icons in [`../../public/assets/`](../../public/assets/). Use HTML `<img>` tags in Markdown when fixed sizing is needed.

| Tool | Asset |
|---|---|
| Claude | <img src="../../public/assets/claude-color.svg" alt="Claude" width="20" height="20"> `public/assets/claude-color.svg` |
| Cursor | <img src="../../public/assets/cursor.svg" alt="Cursor" width="20" height="20"> `public/assets/cursor.svg` |
| Codex | <img src="../../public/assets/codex-color.svg" alt="Codex" width="20" height="20"> `public/assets/codex-color.svg` |
| ChatGPT | <img src="../../public/assets/ChatGPT_Logo_2025.svg" alt="ChatGPT" width="20" height="20"> `public/assets/ChatGPT_Logo_2025.svg` |
| Gemini | <img src="../../public/assets/gemini-color.svg" alt="Gemini" width="20" height="20"> `public/assets/gemini-color.svg` |
| Qwen | <img src="../../public/assets/Qwen_Logo.svg" alt="Qwen" width="20" height="20"> `public/assets/Qwen_Logo.svg` |
| Windsurf | <img src="../../public/assets/windsurf.svg" alt="Windsurf" width="20" height="20"> `public/assets/windsurf.svg` |
| VS Code | <img src="../../public/assets/code.svg" alt="VS Code" width="20" height="20"> `public/assets/code.svg` |
| GitHub Copilot | <img src="../../public/assets/copilot.svg" alt="GitHub Copilot" width="20" height="20"> `public/assets/copilot.svg` |
| Replit Agent | <img src="../../public/assets/replit-color.svg" alt="Replit Agent" width="20" height="20"> `public/assets/replit-color.svg` |
| OpenHands | <img src="../../public/assets/openhands-color.svg" alt="OpenHands" width="20" height="20"> `public/assets/openhands-color.svg` |
| Zed | <img src="../../public/assets/zed.svg" alt="Zed" width="20" height="20"> `public/assets/zed.svg` |

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
