#!/usr/bin/env bash
# Registry parity: 24 tools, profile paths, CLI dry-run smoke.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REGISTRY="$ROOT/bin/install-targets.json"
FAIL=0

say_fail() {
  echo "FAIL: $1"
  FAIL=1
}

smoke_capture() {
  local label="$1"
  shift
  SMOKE_OUT=""
  local rc=0
  SMOKE_OUT="$("$@" 2>&1)" || rc=$?
  if [[ "$rc" -ne 0 ]]; then
    say_fail "$label command failed (exit $rc)"
    echo "$SMOKE_OUT"
    return 1
  fi
  return 0
}

echo "==> install-targets.json exists and parses"
if [[ ! -f "$REGISTRY" ]]; then
  say_fail "missing $REGISTRY"
  exit 1
fi

node -e "
const fs = require('fs');
const path = require('path');
const root = process.argv[1];
const reg = JSON.parse(fs.readFileSync(path.join(root, 'bin/install-targets.json'), 'utf8'));
const supported = fs.readdirSync(path.join(root, 'docs/supported'))
  .filter((e) => fs.statSync(path.join(root, 'docs/supported', e)).isDirectory());

const ids = reg.targets.map((t) => t.id);
const seen = new Set();
for (const id of ids) {
  if (seen.has(id)) {
    console.error('FAIL: duplicate registry id', id);
    process.exit(1);
  }
  seen.add(id);
}

const sortedIds = [...ids].sort();
const folders = supported.sort();
if (sortedIds.length !== 24) {
  console.error('FAIL: registry has', sortedIds.length, 'targets, expected 24');
  process.exit(1);
}
if (JSON.stringify(sortedIds) !== JSON.stringify(folders)) {
  console.error('FAIL: registry ids != docs/supported folders');
  console.error('registry:', sortedIds.join(', '));
  console.error('folders:', folders.join(', '));
  process.exit(1);
}

const toolNameToId = {
  'Claude': 'claude',
  'Cursor': 'cursor',
  'Codex': 'codex',
  'ChatGPT': 'chatgpt',
  'Antigravity': 'antigravity',
  'Aider': 'aider',
  'Amp': 'amp',
  'Cline': 'cline',
  'Continue': 'continue',
  'Hermes Agent': 'hermes-agent',
  'Kiro': 'kiro',
  'JetBrains Junie': 'jetbrains-junie',
  'OpenClaw': 'openclaw',
  'OpenHands': 'openhands',
  'Replit Agent': 'replit',
  'Sourcegraph Cody': 'sourcegraph-cody',
  'Windsurf': 'windsurf',
  'VS Code': 'vs-code',
  'OpenCode': 'opencode',
  'Kilo Code': 'kilo-code',
  'Gemini': 'gemini',
  'Qwen': 'qwen',
  'Copilot': 'copilot',
  'Zed': 'zed',
};

function expectedInstall(target) {
  if (target.mode === 'print') return 'print';
  if (target.mode === 'skills_home') {
    return target.workspaceDir ? 'preset, workspace' : 'preset';
  }
  console.error('FAIL: unknown registry mode', JSON.stringify(target.mode), 'for id', target.id);
  process.exit(1);
}

const registryById = new Map(reg.targets.map((t) => [t.id, t]));
const matrixPath = path.join(root, 'docs/supported/support-matrix.md');
const matrixBody = fs.readFileSync(matrixPath, 'utf8');
const matrixLines = matrixBody.split('\\n').filter((line) => line.startsWith('|'));
if (matrixLines.length < 3) {
  console.error('FAIL: support-matrix.md has no data rows');
  process.exit(1);
}
if (!matrixLines[0].includes('| Install |')) {
  console.error('FAIL: support-matrix.md missing Install column');
  process.exit(1);
}

const matrixRows = matrixLines.slice(2);
const matrixIds = [];
const matrixSeen = new Set();
for (const line of matrixRows) {
  const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
  if (cells.length < 8) {
    console.error('FAIL: malformed support-matrix row:', line);
    process.exit(1);
  }
  const toolName = cells[0];
  const installCell = cells[7];
  const id = toolNameToId[toolName];
  if (!id) {
    console.error('FAIL: unknown support-matrix tool name:', toolName);
    process.exit(1);
  }
  if (matrixSeen.has(id)) {
    console.error('FAIL: duplicate support-matrix row for id', id, '(tool:', toolName + ')');
    process.exit(1);
  }
  matrixSeen.add(id);
  matrixIds.push(id);

  const target = registryById.get(id);
  if (!target) {
    console.error('FAIL: support-matrix tool', toolName, 'has no registry entry for id', id);
    process.exit(1);
  }
  const expected = expectedInstall(target);
  if (installCell !== expected) {
    console.error(
      'FAIL: support-matrix install mismatch for',
      id + ':',
      'got',
      JSON.stringify(installCell),
      'expected',
      JSON.stringify(expected)
    );
    process.exit(1);
  }
}

matrixIds.sort();
if (matrixIds.length !== 24) {
  console.error('FAIL: support-matrix has', matrixIds.length, 'rows, expected 24');
  process.exit(1);
}
if (JSON.stringify(matrixIds) !== JSON.stringify(sortedIds)) {
  console.error('FAIL: support-matrix tool ids != registry ids');
  console.error('matrix:', matrixIds.join(', '));
  console.error('registry:', sortedIds.join(', '));
  process.exit(1);
}

for (const t of reg.targets) {
  const profile = path.join(root, t.profile);
  if (!fs.existsSync(profile)) {
    console.error('FAIL: missing profile', t.profile);
    process.exit(1);
  }
  const body = fs.readFileSync(profile, 'utf8');
  if (!body.includes('## Install')) {
    console.error('FAIL:', t.id, 'profile missing ## Install');
    process.exit(1);
  }
  if (!body.includes('install --target ' + t.id)) {
    console.error('FAIL:', t.id, 'profile missing install --target', t.id);
    process.exit(1);
  }
  if (t.mode === 'skills_home') {
    if (!t.skillsDir || !body.includes(t.skillsDir.replace(/^~/, '~'))) {
      console.error('FAIL:', t.id, 'skillsDir', t.skillsDir, 'not found in profile');
      process.exit(1);
    }
    if (t.workspaceDir && !body.includes(t.workspaceDir)) {
      console.error('FAIL:', t.id, 'workspaceDir', t.workspaceDir, 'not found in profile');
      process.exit(1);
    }
  }
  if (t.mode === 'print' && (!t.printSteps || t.printSteps.length === 0)) {
    console.error('FAIL:', t.id, 'print target missing printSteps');
    process.exit(1);
  }
  if (t.mode !== 'skills_home' && t.mode !== 'print') {
    console.error('FAIL:', t.id, 'unsupported mode', JSON.stringify(t.mode));
    process.exit(1);
  }
}
console.log('OK: registry ids match 24 support folders, matrix parity, and profile checks');
" "$ROOT" || FAIL=1

echo "==> CLI dry-run: hermes-agent (skills_home)"
if smoke_capture "hermes-agent dry-run" node bin/arabic-skill.js install --target hermes-agent --dry-run; then
  if ! grep -Fq "hermes/skills/arabic" <<< "$SMOKE_OUT"; then
    say_fail "hermes-agent dry-run missing skills path"
    echo "$SMOKE_OUT"
  fi
fi

echo "==> CLI dry-run: chatgpt (print)"
if smoke_capture "chatgpt dry-run" node bin/arabic-skill.js install --target chatgpt --dry-run; then
  if ! grep -Fq "Install guide: chatgpt" <<< "$SMOKE_OUT"; then
    say_fail "chatgpt dry-run missing install guide header"
    echo "$SMOKE_OUT"
  fi
  if ! grep -Eq "Profile: (docs/supported/chatgpt/README.md|https://github.com/mediabubble-adv/arabic-skill/blob/main/docs/supported/chatgpt/README.md)" <<< "$SMOKE_OUT"; then
    say_fail "chatgpt dry-run missing profile link"
    echo "$SMOKE_OUT"
  fi
  if ! grep -Fq "ملاحظة: اسم المجلد لازم يكون arabic" <<< "$SMOKE_OUT"; then
    say_fail "chatgpt dry-run missing Masri footer"
    echo "$SMOKE_OUT"
  fi
fi

echo "==> CLI dry-run: all (skills_home batch)"
if smoke_capture "all dry-run" node bin/arabic-skill.js install --target all --dry-run; then
  if ! grep -Fq "Installing 7 skills_home presets (skipping 17 print tools)" <<< "$SMOKE_OUT"; then
    say_fail "all dry-run missing summary header"
    echo "$SMOKE_OUT"
  fi
  for needle in "commands/arabic.md" "rules/arabic.mdc" "skills/arabic"; do
    if ! grep -Fq "$needle" <<< "$SMOKE_OUT"; then
      say_fail "all dry-run missing path: $needle"
      echo "$SMOKE_OUT"
    fi
  done
  if ! grep -Fq "Skipped by --target all" <<< "$SMOKE_OUT"; then
    say_fail "all dry-run missing skipped footer"
    echo "$SMOKE_OUT"
  fi
fi

echo "==> CLI dry-run: opencode workspace scope"
if smoke_capture "opencode workspace dry-run" node bin/arabic-skill.js install --target opencode --scope workspace --dry-run; then
  if ! grep -Fq ".opencode/skills/arabic" <<< "$SMOKE_OUT"; then
    say_fail "opencode workspace dry-run missing path"
    echo "$SMOKE_OUT"
  fi
fi

echo "==> CLI --list grouped output"
if smoke_capture "install --list" node bin/arabic-skill.js install --list; then
  if ! grep -Fq "skills_home (7)" <<< "$SMOKE_OUT"; then
    say_fail "install --list missing skills_home group header"
    echo "$SMOKE_OUT"
  fi
  if ! grep -Fq "print (17)" <<< "$SMOKE_OUT"; then
    say_fail "install --list missing print group header"
    echo "$SMOKE_OUT"
  fi
fi

echo "==> CLI unknown target exits non-zero"
set +e
node bin/arabic-skill.js install --target bogus >/dev/null 2>&1
bogus_exit=$?
set -e
if [[ "$bogus_exit" -eq 0 ]]; then
  say_fail "bogus target should exit non-zero"
fi

echo "==> CLI missing --target value exits non-zero"
set +e
node bin/arabic-skill.js install --target >/dev/null 2>&1
missing_exit=$?
set -e
if [[ "$missing_exit" -eq 0 ]]; then
  say_fail "missing --target value should exit non-zero"
fi

echo "==> CLI --scope workspace on cursor fails"
set +e
out="$(node bin/arabic-skill.js install --target cursor --scope workspace 2>&1)"
cursor_ws_exit=$?
set -e
if [[ "$cursor_ws_exit" -eq 0 ]]; then
  say_fail "cursor --scope workspace should exit non-zero"
fi
if ! grep -Fq "no workspace path" <<< "$out"; then
  say_fail "cursor --scope workspace missing error message"
  echo "$out"
fi

if [[ "$FAIL" -eq 0 ]]; then
  echo "==> validate-install-targets.sh passed"
fi
exit "$FAIL"
