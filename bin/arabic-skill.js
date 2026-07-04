#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");
const skillSource = path.join(packageRoot, "arabic");
const packageJson = require(path.join(packageRoot, "package.json"));

const targetRoots = {
  cursor: path.join(os.homedir(), ".cursor", "skills"),
  claude: path.join(os.homedir(), ".claude", "skills"),
  codex: path.join(os.homedir(), ".codex", "skills")
};

const cursorIntegration = [
  {
    label: "command",
    source: path.join(packageRoot, ".cursor", "commands", "arabic.md"),
    destination: path.join(os.homedir(), ".cursor", "commands", "arabic.md")
  },
  {
    label: "rule",
    source: path.join(packageRoot, ".cursor", "rules", "arabic.mdc"),
    destination: path.join(os.homedir(), ".cursor", "rules", "arabic.mdc")
  }
];

function usage() {
  return `Awesome Arabic Skill installer

Usage:
  npx @mediabubble-adv/arabic-skill install [options]
  npx @mediabubble-adv/arabic-skill --help

Options:
  --target <cursor|claude|codex|all>  Install location preset. Default: cursor
  --dir <path>                        Custom skills directory; installs <path>/arabic (skill only)
  --force                             Replace existing skill or Cursor integration files
  --dry-run                           Print actions without writing files
  --version                           Print package version
  --help                              Show this help

Cursor target installs:
  ~/.cursor/skills/arabic/     runtime skill pack
  ~/.cursor/commands/arabic.md /arabic slash command
  ~/.cursor/rules/arabic.mdc   routing rule for Arabic tasks

skills.sh registry (skill only, all agents):
  npx skills add mediabubble-adv/arabic-skill -a cursor -g -y

Examples:
  npx @mediabubble-adv/arabic-skill install --target cursor
  npx @mediabubble-adv/arabic-skill install --target claude --force
  npx @mediabubble-adv/arabic-skill install --dir ~/.cursor/skills
`;
}

function expandHome(inputPath) {
  if (!inputPath) return inputPath;
  if (inputPath === "~") return os.homedir();
  if (inputPath.startsWith("~/")) return path.join(os.homedir(), inputPath.slice(2));
  return inputPath;
}

function formatPath(targetPath) {
  const relative = path.relative(os.homedir(), targetPath);
  return relative.startsWith("..") ? targetPath : `~/${relative}`;
}

function parseArgs(argv) {
  const options = {
    command: "install",
    target: "cursor",
    dir: null,
    force: false,
    dryRun: false
  };

  const args = [...argv];
  if (args[0] && !args[0].startsWith("-")) {
    options.command = args.shift();
  }

  while (args.length) {
    const arg = args.shift();
    if (arg === "--target") options.target = args.shift();
    else if (arg === "--dir") options.dir = args.shift();
    else if (arg === "--force") options.force = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--help" || arg === "-h") options.command = "help";
    else if (arg === "--version" || arg === "-v") options.command = "version";
    else throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

function removePath(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function installPath({ source, destination, force, dryRun, kind }) {
  const label = formatPath(destination);

  if (!fs.existsSync(source)) {
    throw new Error(`Missing ${kind} source: ${source}`);
  }

  if (fs.existsSync(destination) && !force) {
    console.log(`Already installed (${kind}): ${label}`);
    console.log("Use --force to replace it.");
    return false;
  }

  if (dryRun) {
    const action = fs.existsSync(destination) ? "Would replace" : "Would install";
    console.log(`${action} (${kind}): ${label}`);
    return true;
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  if (fs.existsSync(destination)) removePath(destination);

  const sourceStat = fs.statSync(source);
  if (sourceStat.isDirectory()) {
    fs.cpSync(source, destination, { recursive: true });
  } else {
    fs.copyFileSync(source, destination);
  }

  console.log(`Installed ${kind} to ${label}`);
  return true;
}

function copySkill(rootDir, options) {
  return installPath({
    source: skillSource,
    destination: path.join(rootDir, "arabic"),
    force: options.force,
    dryRun: options.dryRun,
    kind: "skill"
  });
}

function installCursorIntegration(options) {
  for (const item of cursorIntegration) {
    installPath({
      source: item.source,
      destination: item.destination,
      force: options.force,
      dryRun: options.dryRun,
      kind: item.label
    });
  }
}

function resolveRoots(options) {
  if (options.dir) return [path.resolve(expandHome(options.dir))];
  if (options.target === "all") return Object.values(targetRoots);
  if (!targetRoots[options.target]) {
    throw new Error(`Unknown target: ${options.target}`);
  }
  return [targetRoots[options.target]];
}

function shouldInstallCursorIntegration(options) {
  return !options.dir && (options.target === "cursor" || options.target === "all");
}

function main() {
  try {
    const options = parseArgs(process.argv.slice(2));

    if (options.command === "help") {
      console.log(usage());
      return;
    }

    if (options.command === "version") {
      console.log(packageJson.version);
      return;
    }

    if (options.command !== "install") {
      throw new Error(`Unknown command: ${options.command}`);
    }

    for (const root of resolveRoots(options)) {
      copySkill(root, options);
    }

    if (shouldInstallCursorIntegration(options)) {
      installCursorIntegration(options);
    } else if (options.dir && options.target === "cursor") {
      console.log(
        "Skill only (--dir). For full Cursor integration (command + rule), run: npx @mediabubble-adv/arabic-skill install --target cursor"
      );
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error("Run with --help for usage.");
    process.exitCode = 1;
  }
}

main();
