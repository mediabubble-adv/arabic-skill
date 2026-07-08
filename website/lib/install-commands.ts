/** Synced with root README.md ## Install — validated by scripts/validate-website-install.sh */
export const PRIMARY_INSTALL =
  "npx @mediabubble-adv/arabic-skill@latest install --target cursor";

/** Hero teaser — short one-liner without tool target */
export const HERO_INSTALL_SNIPPET =
  "npx @mediabubble-adv/arabic-skill@latest install";

export const SKILLS_REGISTRY_INSTALL =
  "npx skills add mediabubble-adv/arabic-skill -a cursor -g -y";

export const INSTALL_TARGETS = [
  "npx @mediabubble-adv/arabic-skill@latest install --list",
  "npx @mediabubble-adv/arabic-skill@latest install --target claude",
  "npx @mediabubble-adv/arabic-skill@latest install --target codex",
  "npx @mediabubble-adv/arabic-skill@latest install --target hermes-agent",
  "npx @mediabubble-adv/arabic-skill@latest install --target openclaw",
  "npx @mediabubble-adv/arabic-skill@latest install --target opencode",
  "npx @mediabubble-adv/arabic-skill@latest install --target antigravity",
  "npx @mediabubble-adv/arabic-skill@latest install --target antigravity --scope workspace",
  "npx @mediabubble-adv/arabic-skill@latest install --target chatgpt",
  "npx @mediabubble-adv/arabic-skill@latest install --target all",
  "npx @mediabubble-adv/arabic-skill@latest install --dir ~/.cursor/skills --force",
  SKILLS_REGISTRY_INSTALL,
] as const;

export const FIRST_COMMAND = "/arabic guide";

/** Example brief path after `/arabic init` — matches arabic/templates/.arabic/ */
export const INIT_BRIEF_EXAMPLE =
  "/arabic write caption --brief .arabic/briefs/example.yaml";

/** skills_home presets for install page tabs (print tools documented separately) */
export const PRESET_INSTALL_TABS = [
  { id: "cursor", label: "Cursor", command: PRIMARY_INSTALL },
  { id: "claude", label: "Claude", command: INSTALL_TARGETS[1] },
  { id: "codex", label: "Codex", command: INSTALL_TARGETS[2] },
  { id: "hermes", label: "Hermes", command: INSTALL_TARGETS[3] },
  { id: "openclaw", label: "OpenClaw", command: INSTALL_TARGETS[4] },
  { id: "opencode", label: "OpenCode", command: INSTALL_TARGETS[5] },
  { id: "antigravity", label: "Antigravity", command: INSTALL_TARGETS[6] },
  { id: "all", label: "الكل", command: INSTALL_TARGETS[9] },
  {
    id: "custom",
    label: "مسار مخصص",
    command: INSTALL_TARGETS[10],
  },
  {
    id: "skills",
    label: "skills.sh",
    command: SKILLS_REGISTRY_INSTALL,
  },
] as const;

/** @deprecated use PRESET_INSTALL_TABS — kept for existing imports */
export const INSTALL_TABS = PRESET_INSTALL_TABS;

/** Print-only tools — guided manual install via CLI */
export const PRINT_INSTALL_TARGETS = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    command: "npx @mediabubble-adv/arabic-skill@latest install --target chatgpt",
    note: "دليل يدوي — مفيش مجلد skills محلي",
  },
  {
    id: "windsurf",
    label: "Windsurf",
    command: "npx @mediabubble-adv/arabic-skill@latest install --target windsurf",
    note: "قواعد وdocs — مفيش مسار عالمي مؤكد",
  },
  {
    id: "aider",
    label: "Aider",
    command: "npx @mediabubble-adv/arabic-skill@latest install --target aider",
    note: "CLI + repo docs",
  },
  {
    id: "vs-code",
    label: "VS Code",
    command: "npx @mediabubble-adv/arabic-skill@latest install --target vs-code",
    note: "حسب الإضافة اللي شغّالة",
  },
  {
    id: "list",
    label: "كل الأدوات",
    command: "npx @mediabubble-adv/arabic-skill@latest install --list",
    note: "٢٤ أداة — preset أو دليل يدوي",
  },
] as const;

/** Workspace scope hint for dual-scope preset tabs (not in README G14 block) */
export const WORKSPACE_SCOPE_HINTS: Partial<
  Record<(typeof PRESET_INSTALL_TABS)[number]["id"], string>
> = {
  antigravity:
    "لمشروع واحد: npx @mediabubble-adv/arabic-skill@latest install --target antigravity --scope workspace",
  opencode:
    "لمشروع واحد: npx @mediabubble-adv/arabic-skill@latest install --target opencode --scope workspace",
};
