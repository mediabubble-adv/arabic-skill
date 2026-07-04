# Awesome Arabic Skill — Marketing Site

Arabic-first install and tutorial site (v1.1.0 dogfood).

## Preview

- **Production preview:** https://arabic-skill.vercel.app _(update after first Vercel deploy)_
- **Local:** `npm run dev` → http://localhost:3000

## Golden tests

See [tests/golden/g13-g18-website.md](../tests/golden/g13-g18-website.md).

## Install copy (G14)

Source of truth: [../README.md](../README.md) — enforced by `scripts/validate-website-install.sh`.

## Stack

Next.js 16 App Router · TypeScript · Tailwind CSS v4 · RTL (`lang="ar"` `dir="rtl"`)

## Deploy (Vercel)

From repo root, set **Root Directory** to `website` in the Vercel project settings, or:

```bash
cd website
npx vercel
```
