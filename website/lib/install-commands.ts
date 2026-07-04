/** Synced with root README.md ## Install — validated by scripts/validate-website-install.sh */
export const PRIMARY_INSTALL =
  "npx @mediabubble-adv/arabic-skill install --target cursor";

export const INSTALL_TARGETS = [
  "npx @mediabubble-adv/arabic-skill install --target claude",
  "npx @mediabubble-adv/arabic-skill install --target codex",
  "npx @mediabubble-adv/arabic-skill install --target all",
  "npx @mediabubble-adv/arabic-skill install --dir ~/.cursor/skills --force",
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
] as const;
