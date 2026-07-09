#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");
const skillSource = path.join(packageRoot, "arabic");
const packageJson = require(path.join(packageRoot, "package.json"));
const registry = require(path.join(__dirname, "install-targets.json"));

const targetsById = Object.fromEntries(registry.targets.map((t) => [t.id, t]));
const PROFILE_REPO_BASE =
  "https://github.com/mediabubble-adv/arabic-skill/blob/main/docs/supported";

function usage() {
  const homeIds = registry.targets.filter((t) => t.mode === "skills_home").map((t) => t.id);
  const printCount = registry.targets.filter((t) => t.mode === "print").length;

  return `Awesome Arabic Skill installer

Usage:
  npx @mediabubble-adv/arabic-skill@latest install [options]
  npm run install:cursor   (from a git clone — npx alone fails inside this repo)
  node bin/arabic-skill.js install [options]
  npx @mediabubble-adv/arabic-skill --help

Options:
  --target <id|all>     Install preset (${registry.targets.length} tools; default: cursor)
  --list                List all install targets with mode and path
  --scope <home|workspace>  For dual-scope tools (default: home)
  --dir <path>          Custom skills directory; installs <path>/arabic (skill only)
  --force               Replace existing skill or integration files
  --dry-run             Print actions without writing files
  --version             Print package version
  --help                Show this help

Modes:
  skills_home (${homeIds.length})  Copy arabic/ to a global skills directory
  print (${printCount})            Guided manual steps (no file copy)

--target all installs every skills_home preset (skips print-only tools).
Run install --list for the full table.

Cursor target also installs:
  ~/.cursor/commands/arabic.md   /arabic slash command
  ~/.cursor/rules/arabic.mdc     routing rule for Arabic tasks

skills.sh registry (skill only, all agents):
  npx skills add mediabubble-adv/arabic-skill -a cursor -g -y

Examples:
  npx @mediabubble-adv/arabic-skill@latest install --target cursor
  npx @mediabubble-adv/arabic-skill@latest install --target hermes-agent
  npx @mediabubble-adv/arabic-skill@latest install --target antigravity --scope workspace
  npx @mediabubble-adv/arabic-skill@latest install --target chatgpt
  npx @mediabubble-adv/arabic-skill@latest install --list
  npm run install:cursor -- --force
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

function requireOptionValue(flag, value) {
  if (value === undefined || value === null || value === "") {
    throw new Error(`Missing value for ${flag}`);
  }
  return value;
}

function parseArgs(argv) {
  const options = {
    command: "install",
    target: "cursor",
    dir: null,
    scope: null,
    force: false,
    dryRun: false,
    list: false
  };

  const args = [...argv];
  if (args[0] && !args[0].startsWith("-")) {
    options.command = args.shift();
  }

  while (args.length) {
    const arg = args.shift();
    if (arg === "--target") options.target = requireOptionValue("--target", args.shift());
    else if (arg === "--dir") options.dir = requireOptionValue("--dir", args.shift());
    else if (arg === "--scope") options.scope = requireOptionValue("--scope", args.shift());
    else if (arg === "--force") options.force = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--list") options.list = true;
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

function installIntegrationFiles(target, options) {
  if (!target.integrationFiles || target.integrationFiles.length === 0) return;

  for (const item of target.integrationFiles) {
    installPath({
      source: path.join(packageRoot, item.source),
      destination: path.resolve(expandHome(item.destination)),
      force: options.force,
      dryRun: options.dryRun,
      kind: item.label
    });
  }
}

function assertWorkspaceScope(target, options) {
  if (options.scope === "workspace" && !target.workspaceDir) {
    throw new Error(
      `Target ${target.id} has no workspace path; use --scope home or --dir <path>`
    );
  }
}

function resolveScope(options, target) {
  if (options.scope) {
    if (options.scope !== "home" && options.scope !== "workspace") {
      throw new Error(`Unknown scope: ${options.scope} (use home or workspace)`);
    }
    if (options.scope === "workspace") {
      assertWorkspaceScope(target, options);
    }
    return options.scope;
  }
  return target.defaultScope || "home";
}

function resolveSkillsRoot(target, options) {
  const scope = resolveScope(options, target);

  if (scope === "workspace") {
    return path.resolve(process.cwd(), target.workspaceDir);
  }

  if (!target.skillsDir) {
    throw new Error(`Target ${target.id} has no skillsDir`);
  }
  return path.resolve(expandHome(target.skillsDir));
}

function cursorDirHint() {
  console.log(
    "Skill only (--dir). For full Cursor integration (command + rule), run: npx @mediabubble-adv/arabic-skill@latest install --target cursor"
  );
}

function installSkillsHome(target, options) {
  const root = resolveSkillsRoot(target, options);
  const scope = resolveScope(options, target);

  if (scope === "workspace" && !options.dryRun && !fs.existsSync(process.cwd())) {
    throw new Error("Workspace install requires a project directory (cwd)");
  }

  copySkill(root, options);

  if (
    !options.dir &&
    target.integrationFiles &&
    target.integrationFiles.length > 0 &&
    resolveScope(options, target) === "home"
  ) {
    installIntegrationFiles(target, options);
  } else if (options.dir && target.id === "cursor") {
    cursorDirHint();
  }
}

function profileDocLink(target) {
  const localProfile = path.join(packageRoot, target.profile);
  if (fs.existsSync(localProfile)) {
    return target.profile;
  }
  return `${PROFILE_REPO_BASE}/${target.id}/README.md`;
}

function installPrint(target, options) {
  console.log(`Install guide: ${target.id} (${target.manualReason || "manual"})`);
  console.log("");

  const steps = target.printSteps || [];
  if (steps.length === 0) {
    console.log(`See ${profileDocLink(target)} for install steps.`);
  } else {
    steps.forEach((step, index) => {
      console.log(`${index + 1}. ${step}`);
    });
  }

  console.log("");
  console.log("Tip: folder name must match SKILL.md frontmatter name: arabic");
  console.log("ملاحظة: اسم المجلد لازم يكون arabic");
  console.log(`Profile: ${profileDocLink(target)}`);

  if (options.dryRun) {
    console.log("(dry-run: no files written)");
  }
}

function installTarget(target, options) {
  if (target.mode === "skills_home") {
    installSkillsHome(target, options);
    return;
  }
  if (target.mode === "print") {
    installPrint(target, options);
    return;
  }
  throw new Error(`Unsupported mode for ${target.id}: ${target.mode}`);
}

function printTargetTable(targets) {
  const idWidth = Math.max(...targets.map((t) => t.id.length), 2);
  const modeWidth = Math.max(...targets.map((t) => t.mode.length), 4);

  console.log(`${"id".padEnd(idWidth)}  ${"mode".padEnd(modeWidth)}  path / notes`);
  console.log(`${"-".repeat(idWidth)}  ${"-".repeat(modeWidth)}  ${"-".repeat(40)}`);

  for (const target of targets) {
    let pathNote = "print";
    if (target.mode === "skills_home") {
      const parts = [`home: ${target.skillsDir}`];
      if (target.workspaceDir) parts.push(`workspace: ${target.workspaceDir}`);
      pathNote = parts.join("; ");
    }
    console.log(`${target.id.padEnd(idWidth)}  ${target.mode.padEnd(modeWidth)}  ${pathNote}`);
  }
}

function listTargets() {
  const homeTargets = registry.targets.filter((t) => t.mode === "skills_home");
  const printTargets = registry.targets.filter((t) => t.mode === "print");

  console.log(`skills_home (${homeTargets.length})`);
  printTargetTable(homeTargets);
  console.log("");
  console.log(`print (${printTargets.length})`);
  printTargetTable(printTargets);

  console.log("");
  console.log(`Total: ${registry.targets.length} targets`);
  console.log("--target all installs skills_home presets only.");
}

function formatTargetListByMode() {
  const groups = { skills_home: [], print: [] };
  for (const target of registry.targets) {
    if (groups[target.mode]) groups[target.mode].push(target.id);
  }

  const lines = [];
  if (groups.skills_home.length) {
    lines.push(`skills_home: ${groups.skills_home.join(", ")}`);
  }
  if (groups.print.length) {
    lines.push(`print: ${groups.print.join(", ")}`);
  }
  return lines.join("\n");
}

function getTarget(id) {
  const target = targetsById[id];
  if (!target) {
    throw new Error(`Unknown target: ${id}\n\nKnown targets:\n${formatTargetListByMode()}`);
  }
  return target;
}

function resolveInstallPlan(options) {
  if (options.dir) {
    return {
      targets: [],
      customRoot: path.resolve(expandHome(options.dir))
    };
  }

  if (options.target === "all") {
    return {
      targets: registry.targets.filter((t) => t.mode === "skills_home"),
      skipped: registry.targets.filter((t) => t.mode !== "skills_home"),
      isAll: true
    };
  }

  const target = getTarget(options.target);
  if (options.scope === "workspace") {
    assertWorkspaceScope(target, options);
  }

  return { targets: [target] };
}

function printAllSummaryHeader(plan) {
  if (!plan.isAll) return;
  const homeCount = plan.targets.length;
  const skippedCount = plan.skipped ? plan.skipped.length : 0;
  console.log(
    `Installing ${homeCount} skills_home presets (skipping ${skippedCount} print tools)...`
  );
  console.log("");
}

function printSkippedSummary(skipped) {
  if (!skipped || skipped.length === 0) return;

  console.log("");
  console.log("Skipped by --target all (not skills_home):");
  for (const target of skipped) {
    console.log(`  - ${target.id} (${target.mode})`);
  }
  console.log("Install individually: npx @mediabubble-adv/arabic-skill@latest install --target <id>");
}

function printNextSteps() {
  console.log(`
Next steps:
  1. Open your project in your editor
  2. /arabic guide     — advisory first run (no repo files needed)
  3. /arabic init      — scaffold .arabic/ in a client repo

Install docs: https://arabic-skill.vercel.app/install
`);
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

    if (options.list) {
      listTargets();
      return;
    }

    const plan = resolveInstallPlan(options);
    let wroteFiles = false;
    let isPrintOnly = false;

    if (plan.customRoot) {
      wroteFiles = copySkill(plan.customRoot, options) || wroteFiles;
      if (options.target === "cursor") {
        cursorDirHint();
      }
    } else {
      printAllSummaryHeader(plan);
      for (const target of plan.targets) {
        if (target.mode === "print") {
          isPrintOnly = true;
        }
        const before = options.dryRun;
        installTarget(target, options);
        if (!before && target.mode === "skills_home") {
          wroteFiles = true;
        }
      }
      printSkippedSummary(plan.skipped);
    }

    if (!options.dryRun && !isPrintOnly && (wroteFiles || plan.customRoot)) {
      printNextSteps();
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error("Run with --help for usage.");
    process.exitCode = 1;
  }
}

main();
