/**
 * Supported-tool icons under `website/public/supported/`.
 * - `colors/` — full-color logos (work in light and dark)
 * - `black/` — dark glyphs for light mode
 * - `white/` — light glyphs for dark mode
 */

export type ToolIcon =
  | { kind: "color"; src: string }
  | { kind: "mono"; light: string; dark: string };

export type SupportedTool = {
  id: string;
  label: string;
  icon: ToolIcon;
};

export const SUPPORTED_TOOLS: SupportedTool[] = [
  {
    id: "cursor",
    label: "Cursor",
    icon: {
      kind: "mono",
      light: "/supported/black/cursor.svg",
      dark: "/supported/white/cursor-dark.png",
    },
  },
  {
    id: "claude",
    label: "Claude",
    icon: { kind: "color", src: "/supported/colors/claude-color.svg" },
  },
  {
    id: "codex",
    label: "Codex",
    icon: { kind: "color", src: "/supported/colors/codex-color.svg" },
  },
  {
    id: "vscode",
    label: "VS Code",
    icon: { kind: "color", src: "/supported/colors/vscode.svg" },
  },
  {
    id: "copilot",
    label: "Copilot",
    icon: {
      kind: "mono",
      light: "/supported/black/copilot.svg",
      dark: "/supported/white/copilot-dark.svg",
    },
  },
  {
    id: "windsurf",
    label: "Windsurf",
    icon: {
      kind: "mono",
      light: "/supported/black/windsurf-light.png",
      dark: "/supported/white/windsurf-dark.png",
    },
  },
  {
    id: "antigravity",
    label: "Antigravity",
    icon: { kind: "color", src: "/supported/colors/antigravity-color.png" },
  },
  {
    id: "kilo",
    label: "Kilo",
    icon: { kind: "color", src: "/supported/colors/kilo-code.ico" },
  },
  {
    id: "opencode",
    label: "OpenCode",
    icon: {
      kind: "mono",
      light: "/supported/black/opencode.svg",
      dark: "/supported/white/opencode-dark.png",
    },
  },
  {
    id: "gemini",
    label: "Gemini",
    icon: {
      kind: "mono",
      light: "/supported/black/aistudio-light.png",
      dark: "/supported/white/aistudio-dark.png",
    },
  },
  {
    id: "qwen",
    label: "Qwen",
    icon: { kind: "color", src: "/supported/colors/z-ai.svg" },
  },
  {
    id: "zed",
    label: "Zed",
    icon: { kind: "color", src: "/supported/colors/zed.svg" },
  },
  {
    id: "replit",
    label: "Replit",
    icon: { kind: "color", src: "/supported/colors/replit-color.svg" },
  },
  {
    id: "trae",
    label: "Trae",
    icon: { kind: "color", src: "/supported/colors/trae-color.svg" },
  },
  {
    id: "junie",
    label: "Junie",
    icon: { kind: "color", src: "/supported/colors/jetbrains-junie.svg" },
  },
  {
    id: "openclaw",
    label: "OpenClaw",
    icon: { kind: "color", src: "/supported/colors/openclaw-color.svg" },
  },
  {
    id: "manus",
    label: "Manus",
    icon: {
      kind: "mono",
      light: "/supported/black/manus.svg",
      dark: "/supported/white/manus-dark.png",
    },
  },
  {
    id: "hermes",
    label: "Hermes",
    icon: {
      kind: "mono",
      light: "/supported/black/hermesagent.svg",
      dark: "/supported/white/hermesagent-dark.png",
    },
  },
];
