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

function usage() {
  return `Awesome Arabic Skill installer

Usage:
  npx @mediabubble-adv/arabic-skill install [options]
  npx @mediabubble-adv/arabic-skill --help

Options:
  --target <cursor|claude|codex|all>  Install location preset. Default: cursor
  --dir <path>                        Custom skills directory; installs <path>/arabic
  --force                             Replace an existing arabic skill folder
  --dry-run                           Print actions without writing files
  --version                           Print package version
  --help                              Show this help

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

function removeDirectory(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function copySkill(rootDir, options) {
  const destination = path.join(rootDir, "arabic");
  const label = path.relative(os.homedir(), destination).startsWith("..")
    ? destination
    : `~/${path.relative(os.homedir(), destination)}`;

  if (!fs.existsSync(skillSource)) {
    throw new Error(`Missing runtime skill folder: ${skillSource}`);
  }

  if (fs.existsSync(destination) && !options.force) {
    console.log(`Already installed: ${label}`);
    console.log("Use --force to replace it.");
    return;
  }

  if (options.dryRun) {
    const action = fs.existsSync(destination) ? "Would replace" : "Would install";
    console.log(`${action}: ${label}`);
    return;
  }

  fs.mkdirSync(rootDir, { recursive: true });
  if (fs.existsSync(destination)) removeDirectory(destination);
  fs.cpSync(skillSource, destination, { recursive: true });
  console.log(`Installed Awesome Arabic Skill to ${label}`);
}

function resolveRoots(options) {
  if (options.dir) return [path.resolve(expandHome(options.dir))];
  if (options.target === "all") return Object.values(targetRoots);
  if (!targetRoots[options.target]) {
    throw new Error(`Unknown target: ${options.target}`);
  }
  return [targetRoots[options.target]];
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
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error("Run with --help for usage.");
    process.exitCode = 1;
  }
}

main();
