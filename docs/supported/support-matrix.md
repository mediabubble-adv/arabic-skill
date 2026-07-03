# Support Matrix

| Tool | Current Fit | Best Packaging | Commands | Subagents | Persistence | Fix Priority |
|---|---|---|---|---|---|---|
| Claude | Strong | system instructions + project docs + skill/rules pattern | Strong | Strong/Simulated | Strong | Low |
| Cursor | Strong | repo rules + docs + command conventions | Strong | Partial/Simulated | Strong | Low |
| Codex | Partial | skills-folder + docs | Partial | Unknown | Strong | Medium |
| ChatGPT | Partial | Custom GPT / Project instructions + knowledge upload | Limited | Limited | Limited | High |
| Antigravity | Partial | `.agents/skills/` + global skills + docs | Partial | Partial | Strong | Medium |
| Aider | Strong | CLI wrapper + repo docs + command conventions | Strong | Simulated | Strong | Low |
| Amp | Strong | CLI + plugins + custom agents adapter | Strong | Strong | Strong | Medium |
| Cline | Strong | rules + CLI/IDE docs + command tree | Strong | Strong | Strong | Low |
| Continue | Partial | local config + prompt docs + repo context | Partial | Limited | Partial | Medium |
| Hermes Agent | Partial | `~/.hermes/skills/` + in-repo skills + docs | Partial | Partial | Strong | Medium |
| Kiro | Partial | steering/spec/workflow docs + prompt wrapper | Partial | Partial | Partial | Medium |
| JetBrains Junie | Partial | IDE-specific instructions + project docs | Partial | Limited | Partial | Medium |
| OpenClaw | Partial | workspace `skills/` + `openclaw skills` + docs | Partial | Partial | Strong | Medium |
| OpenHands | Strong | agent platform adapter + workflow docs | Strong | Strong | Strong | Medium |
| Replit Agent | Partial | skills/docs + staged project workflows | Partial | Partial | Strong | Medium |
| Sourcegraph Cody | Partial | repo context + instruction wrapper | Partial | Limited | Partial | Medium |
| Windsurf | Strong | rules + docs + command conventions | Strong | Partial/Simulated | Strong | Low |
| VS Code | Partial | docs + prompt files + extension-specific instructions | Partial | Limited | Partial | Medium |
| OpenCode | Partial | `.opencode/skills/` + native `skill` tool + docs | Partial | Partial | Strong | Medium |
| Kilo Code | Partial | local rules/docs + adapter conventions | Partial | Partial | Partial | Medium |
| Gemini | Partial | system instructions + prompt files + project docs | Partial | Limited | Partial | Medium |
| Qwen | Limited | system prompt/API wrapper + docs | Partial | Limited | Partial | High |
| Copilot | Partial | custom instructions + prompt files + repo docs | Partial | Limited | Partial | Medium |
| Zed | Strong | ACP/agent adapter + project docs | Partial | Strong | Strong | Medium |

## Interpretation

- `Strong` means the current architecture maps well with modest tool-specific packaging.
- `Partial` means the skill can work, but commands, agents, or hooks need adaptation.
- `Limited` means the core writing behavior works, but the full advisory-agent model needs a wrapper.
- `Unknown` means the tool should be validated before claiming full support.

## Common Fix Themes

Across the tools, the same issues repeat:

1. command routing is not always native
2. subagents often need simulation
3. hooks vary widely by tool
4. persistence may require repo files instead of tool memory
5. project mode usually needs explicit staged prompts
