# npm Publishing

This repo publishes the runtime skill pack as `@mediabubble-adv/arabic-skill` so users can install with `npx` **without cloning the repository**.

## Package

| Field | Value |
|---|---|
| Package name | `@mediabubble-adv/arabic-skill` |
| Bin | `arabic-skill` |
| Runtime folder | `arabic/` |
| Minimum Node | 18 |
| Registry | `https://registry.npmjs.org/` |

The `@mediabubble-adv` npm scope must exist and the maintainer (or CI) must have publish rights.

## User Commands

```bash
npx @mediabubble-adv/arabic-skill@latest install --target cursor
npx @mediabubble-adv/arabic-skill@latest install --target claude
npx @mediabubble-adv/arabic-skill@latest install --target codex
npx @mediabubble-adv/arabic-skill@latest install --target all
```

Custom target:

```bash
npx @mediabubble-adv/arabic-skill@latest install --dir ~/.cursor/skills --force
```

**Git clone caveat:** inside this repository, `npx @mediabubble-adv/arabic-skill install` (without `@latest`) resolves the local `package.json` and fails with `command not found: arabic-skill`. Use `@latest`, or `npm run install:cursor`, or `node bin/arabic-skill.js install …`.

## Local Checks

Run before publishing:

```bash
npm run validate
npm run pack:check
bash scripts/validate-npm-pack.sh
node bin/arabic-skill.js --help
node bin/arabic-skill.js install --target cursor --dry-run
```

`npm run validate` includes `validate-npm-pack.sh` (tarball contains `bin/arabic-skill.js`, `arabic/SKILL.md`, `VERSION`, `README.md`, `LICENSE`).

## CI Publish

Workflow: [`.github/workflows/npm-publish.yml`](../../.github/workflows/npm-publish.yml)

| Trigger | When |
|---------|------|
| Tag `v*.*.*` | After merge + annotated tag (tag must match root `VERSION`) |
| `workflow_dispatch` | Manual publish from Actions tab |

**Required secret:** `NPM_TOKEN` — npm access token with publish rights on `@mediabubble-adv/arabic-skill`.

### First-time setup

1. Create an npm access token (Automation or Granular Publish) for the `@mediabubble-adv` scope.
2. Add `NPM_TOKEN` to GitHub repo **Settings → Secrets and variables → Actions**.
3. Merge distribution PR; tag on `main`:

```bash
git checkout main && git pull
git tag -a v1.1.1 -m "v1.1.1: npm distribution"
git push origin v1.1.1
```

4. Confirm workflow **Publish npm** succeeds; verify:

```bash
npm view @mediabubble-adv/arabic-skill version
npx @mediabubble-adv/arabic-skill@latest --version
npx @mediabubble-adv/arabic-skill install --target cursor --dry-run
```

## Manual Publish (maintainer)

```bash
npm login --registry=https://registry.npmjs.org/
npm publish --access public --registry=https://registry.npmjs.org/
```

`prepublishOnly` runs `validate` + `pack:check` automatically.

## Release Notes

- npm `version` must match root `VERSION` and `arabic/SKILL.md`.
- Do not publish local state files, `.env*`, `.arabic/`, editor caches, or generated archives (`files` in `package.json` is the allowlist).
- **`npx @mediabubble-adv/arabic-skill install --target cursor`** — full integration (skill + `.cursor/commands` + `.cursor/rules`) from the npm tarball.
- **`npx skills add mediabubble-adv/arabic-skill`** — skills.sh registry path (skill pack only; listing via install telemetry). Validate with `npm run validate:skills-registry`.
