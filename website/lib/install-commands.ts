/** Synced with root README.md ## Install — validated by scripts/validate-website-install.sh */
export const PRIMARY_INSTALL =
  "npx @mediabubble-adv/arabic-skill@latest install --target cursor";

export const SKILLS_REGISTRY_INSTALL =
  "npx skills add mediabubble-adv/arabic-skill -a cursor -g -y";

export const INSTALL_TARGETS = [
  "npx @mediabubble-adv/arabic-skill@latest install --target claude",
  "npx @mediabubble-adv/arabic-skill@latest install --target codex",
  "npx @mediabubble-adv/arabic-skill@latest install --target all",
  "npx @mediabubble-adv/arabic-skill@latest install --dir ~/.cursor/skills --force",
  SKILLS_REGISTRY_INSTALL,
] as const;

export const FIRST_COMMAND = "/arabic guide";

export const INSTALL_TABS = [
  { id: "cursor", label: "Cursor", command: PRIMARY_INSTALL },
  { id: "claude", label: "Claude", command: INSTALL_TARGETS[0] },
  { id: "codex", label: "Codex", command: INSTALL_TARGETS[1] },
  { id: "all", label: "الكل", command: INSTALL_TARGETS[2] },
  {
    id: "custom",
    label: "مسار مخصص",
    command: INSTALL_TARGETS[3],
  },
  {
    id: "skills",
    label: "skills.sh",
    command: SKILLS_REGISTRY_INSTALL,
  },
] as const;
