# Support Matrix

| Tool | Current Fit | Best Packaging | Commands | Subagents | Persistence | Fix Priority | Install |
|---|---|---|---|---|---|---|---|
| Claude | Strong | system instructions + project docs + skill/rules pattern | Strong | Strong/Simulated | Strong | Low | preset |
| Cursor | Strong | repo rules + docs + command conventions | Strong | Partial/Simulated | Strong | Low | preset |
| Codex | Strong | skills-folder + docs | Partial | Unknown | Strong | Medium | preset |
| ChatGPT | Partial | Custom GPT / Project instructions + knowledge upload | Limited | Limited | Limited | High | print |
| Antigravity | Partial | `.agents/skills/` + global skills + docs | Partial | Partial | Strong | Medium | preset, workspace |
| Aider | Strong | CLI wrapper + repo docs + command conventions | Strong | Simulated | Strong | Low | print |
| Amp | Strong | CLI + plugins + custom agents adapter | Strong | Strong | Strong | Medium | print |
| Cline | Strong | rules + CLI/IDE docs + command tree | Strong | Strong | Strong | Low | print |
| Continue | Partial | local config + prompt docs + repo context | Partial | Limited | Partial | Medium | print |
| Hermes Agent | Partial | `~/.hermes/skills/` + in-repo skills + docs | Partial | Partial | Strong | Medium | preset, workspace |
| Kiro | Partial | steering/spec/workflow docs + prompt wrapper | Partial | Partial | Partial | Medium | print |
| JetBrains Junie | Partial | IDE-specific instructions + project docs | Partial | Limited | Partial | Medium | print |
| OpenClaw | Partial | workspace `skills/` + `openclaw skills` + docs | Partial | Partial | Strong | Medium | preset, workspace |
| OpenHands | Strong | agent platform adapter + workflow docs | Strong | Strong | Strong | Medium | print |
| Replit Agent | Partial | skills/docs + staged project workflows | Partial | Partial | Strong | Medium | print |
| Sourcegraph Cody | Partial | repo context + instruction wrapper | Partial | Limited | Partial | Medium | print |
| Windsurf | Strong | rules + docs + command conventions | Strong | Partial/Simulated | Strong | Low | print |
| VS Code | Partial | docs + prompt files + extension-specific instructions | Partial | Limited | Partial | Medium | print |
| OpenCode | Partial | `.opencode/skills/` + native `skill` tool + docs | Partial | Partial | Strong | Medium | preset, workspace |
| Kilo Code | Partial | local rules/docs + adapter conventions | Partial | Partial | Partial | Medium | print |
| Gemini | Partial | system instructions + prompt files + project docs | Partial | Limited | Partial | Medium | print |
| Qwen | Limited | system prompt/API wrapper + docs | Partial | Limited | Partial | High | print |
| Copilot | Partial | custom instructions + prompt files + repo docs | Partial | Limited | Partial | Medium | print |
| Zed | Strong | ACP/agent adapter + project docs | Partial | Strong | Strong | Medium | print |

**Install column:** `preset` = `npx … install --target <id>` (global skills dir); `workspace` = add `--scope workspace`; `print` = guided manual steps (no file copy). Any tool also supports `install --dir <path>`. Run `install --list` for paths.

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
