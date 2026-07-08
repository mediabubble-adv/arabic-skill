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
const ids = reg.targets.map((t) => t.id).sort();
const folders = supported.sort();
if (ids.length !== 24) {
  console.error('FAIL: registry has', ids.length, 'targets, expected 24');
  process.exit(1);
}
if (JSON.stringify(ids) !== JSON.stringify(folders)) {
  console.error('FAIL: registry ids != docs/supported folders');
  console.error('registry:', ids.join(', '));
  console.error('folders:', folders.join(', '));
  process.exit(1);
}
const seen = new Set();
for (const t of reg.targets) {
  if (seen.has(t.id)) {
    console.error('FAIL: duplicate id', t.id);
    process.exit(1);
  }
  seen.add(t.id);
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
}
console.log('OK: registry ids match 24 support folders and profile checks');
" "$ROOT" || FAIL=1

echo "==> support-matrix.md has Install column"
if ! grep -q '| Install |' "$ROOT/docs/supported/support-matrix.md"; then
  say_fail "support-matrix.md missing Install column"
fi

matrix_rows=$(($(grep -c '^|' "$ROOT/docs/supported/support-matrix.md") - 2))
if [[ "$matrix_rows" -ne 24 ]]; then
  say_fail "support-matrix rows ($matrix_rows) != 24"
fi

echo "==> CLI dry-run: hermes-agent (skills_home)"
out="$(node bin/arabic-skill.js install --target hermes-agent --dry-run 2>&1)"
if ! grep -Fq "hermes/skills/arabic" <<< "$out"; then
  say_fail "hermes-agent dry-run missing skills path"
  echo "$out"
fi

echo "==> CLI dry-run: chatgpt (print)"
out="$(node bin/arabic-skill.js install --target chatgpt --dry-run 2>&1)"
if ! grep -Fq "Install guide: chatgpt" <<< "$out"; then
  say_fail "chatgpt dry-run missing install guide header"
  echo "$out"
fi
if ! grep -Eq "Profile: (docs/supported/chatgpt/README.md|https://github.com/mediabubble-adv/arabic-skill/blob/main/docs/supported/chatgpt/README.md)" <<< "$out"; then
  say_fail "chatgpt dry-run missing profile link"
  echo "$out"
fi
if ! grep -Fq "ملاحظة: اسم المجلد لازم يكون arabic" <<< "$out"; then
  say_fail "chatgpt dry-run missing Masri footer"
  echo "$out"
fi

echo "==> CLI dry-run: all (skills_home batch)"
out="$(node bin/arabic-skill.js install --target all --dry-run 2>&1)"
if ! grep -Fq "Installing 7 skills_home presets (skipping 17 print tools)" <<< "$out"; then
  say_fail "all dry-run missing summary header"
  echo "$out"
fi
for needle in "commands/arabic.md" "rules/arabic.mdc" "skills/arabic"; do
  if ! grep -Fq "$needle" <<< "$out"; then
    say_fail "all dry-run missing path: $needle"
    echo "$out"
  fi
done
if ! grep -Fq "Skipped by --target all" <<< "$out"; then
  say_fail "all dry-run missing skipped footer"
  echo "$out"
fi

echo "==> CLI dry-run: opencode workspace scope"
out="$(node bin/arabic-skill.js install --target opencode --scope workspace --dry-run 2>&1)"
if ! grep -Fq ".opencode/skills/arabic" <<< "$out"; then
  say_fail "opencode workspace dry-run missing path"
  echo "$out"
fi

echo "==> CLI --list grouped output"
out="$(node bin/arabic-skill.js install --list 2>&1)"
if ! grep -Fq "skills_home (7)" <<< "$out"; then
  say_fail "install --list missing skills_home group header"
  echo "$out"
fi
if ! grep -Fq "print (17)" <<< "$out"; then
  say_fail "install --list missing print group header"
  echo "$out"
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
