# npm Publishing

This repo can publish the runtime skill pack as an npm package so users can install with `npx`.

## Package

| Field | Value |
|---|---|
| Package name | `@mediabubble-adv/arabic-skill` |
| Bin | `arabic-skill` |
| Runtime folder | `arabic/` |
| Minimum Node | 18 |

The package name assumes the `@mediabubble-adv` npm scope exists and the maintainer has publish rights. If the scope is unavailable, update `package.json` before first publish.

## User Commands

```bash
npx @mediabubble-adv/arabic-skill install --target cursor
npx @mediabubble-adv/arabic-skill install --target claude
npx @mediabubble-adv/arabic-skill install --target codex
npx @mediabubble-adv/arabic-skill install --target all
```

Custom target:

```bash
npx @mediabubble-adv/arabic-skill install --dir ~/.cursor/skills --force
```

## Local Checks

Run before publishing:

```bash
npm run validate
npm run pack:check
node bin/arabic-skill.js --help
node bin/arabic-skill.js install --target cursor --dry-run
```

## Publish

```bash
npm login
npm publish --access public
```

After publish, verify:

```bash
npx @mediabubble-adv/arabic-skill --version
npx @mediabubble-adv/arabic-skill install --target cursor --dry-run
```

## Release Notes

- npm `version` must match root `VERSION` and `arabic/SKILL.md`.
- Do not publish local state files, `.env*`, `.arabic/`, editor caches, or generated archives.
- `npx skills add mediabubble-adv/arabic-skill` remains a separate registry/discovery path from this npm package.
