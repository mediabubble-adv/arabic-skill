# Website Marketing Dogfood Implementation Plan

**Goal:** Ship the v1.1.0 Arabic-first install marketing site (`website/`) that dogfoods `/arabic`, passes G13–G18, and optimizes for install copy conversion.

**Architecture:** Plan-first → Stitch visual reference → Masri copy in `website/content/` (from `/arabic write`) → Next.js App Router port with shared design tokens and client components for G15 interactives → G14 enforced by `scripts/validate-website-install.sh` against root `README.md` → Vercel preview documented in `website/README.md`.

**Tech Stack:** Next.js App Router · TypeScript · Tailwind CSS v4 (via `create-next-app`) · `next/font` (IBM Plex Sans Arabic + JetBrains Mono) · static MD content in `website/content/` · Vercel deploy

**Spec:** [docs/superpowers/specs/2026-07-03-website-marketing-dogfood-design.md](../superpowers/specs/2026-07-03-website-marketing-dogfood-design.md)  
**Branch:** `feat/website-v1.1.0`  
**Gate:** Do **not** create `website/` until plan gate cleared (`approve plan` / `وافق على الخطة`)

---

## Phase map

| Phase | Work | Golden tests |
|-------|------|--------------|
| 0 | Branch + golden fixture + plan gate | — |
| A | Stitch screens (manual, runbook) | — |
| B | `/arabic` copy + audit + ledger fix | G16 prep |
| C | Next.js scaffold + tokens + layout | — |
| D | Components + 8 routes | G13, G15 |
| E | G14 install sync + CI script | G14 |
| F | RTL audit + build + deploy docs | G16, G17, G18 |

---

### Task 0: Branch, plan gate, golden fixture

**Files:**
- Create: `tests/golden/g13-g18-website.md`
- Modify: `docs/planning/website-dogfood.md` (status line only, after gate)

**Step 1: Confirm plan gate**

User (maintainer) must reply **`approve plan`** or **`وافق على الخطة`** in the session that executes Phase C onward.

**Step 2: Create feature branch**

From repository root:

```bash
git checkout main && git pull origin main
git checkout -b feat/website-v1.1.0
```

**Step 3: Write golden test checklist**

Create `tests/golden/g13-g18-website.md`:

```markdown
# Golden Tests G13–G18 — Website (v1.1.0)

Manual checklist until automated runner ships. Run before merging `feat/website-v1.1.0`.

## G13 — 8 routes render

- [ ] `/` — 200
- [ ] `/features` — 200
- [ ] `/install` — 200
- [ ] `/commands` — 200
- [ ] `/tutorials` — 200
- [ ] `/examples` — 200
- [ ] `/about` — 200
- [ ] `/docs` — 200

Verify: `cd website && npm run build && npm run start` then curl each path, or `npm run dev` + browser.

## G14 — Install copy matches README

- [ ] `bash scripts/validate-website-install.sh` exits 0

## G15 — 3+ interactive components on mobile (390px)

- [ ] Copy-to-clipboard on `/install` (toast: تم النسخ)
- [ ] Tool tabs on `/install`
- [ ] FAQ accordion on `/install`
- [ ] Before/after toggle on `/examples`
- [ ] Sticky install bar on `/` (mobile scroll)

## G16 — Masri audit pass

- [ ] `/arabic audit --file website/content/` completed; snapshot in `.arabic/audits/website-*.md`
- [ ] `/about` shows frozen audit summary

## G17 — Build passes

- [ ] `cd website && npm run build` exits 0

## G18 — Deploy preview documented

- [ ] `website/README.md` contains live preview URL
- [ ] `docs/engineering/release-playbook.md` §1.1.0 gate checked
```

**Step 4: Commit**

```bash
git add tests/golden/g13-g18-website.md
git commit -m "test(website): add G13–G18 golden checklist fixture"
```

---

### Task 1: Phase A — Stitch generation (manual)

**Files:**
- Reference: `docs/planning/stitch-DESIGN.md`
- Reference: `docs/planning/stitch-generation-runbook.md`
- Reference: `docs/planning/stitch-website-prompts-masri.md`
- Output: Stitch project exports (screenshots/HTML — store outside repo or in `docs/planning/stitch-exports/` if small)

**Step 1: Attach design system in Stitch**

Follow runbook Step 0 — paste full `stitch-DESIGN.md`.

**Step 2: Generate 8 screens × 2 viewports**

Order: Home → Features → Install → Commands → Tutorials → Examples → About → Docs.  
Desktop 1440px then mobile 390px each.

**Step 3: Update hero copy in runbook exports**

When auditing Stitch output, replace any **مش ترجمة** with **مش مجرد ترجمة** per design spec §5.

**Step 4: Visual sign-off**

Checklist from runbook §8 — all 8 screens ☐ → ☑ before Phase C port.

**Step 5: Commit runbook checklist only (optional)**

If updating runbook checkboxes in repo:

```bash
git add docs/planning/stitch-generation-runbook.md
git commit -m "docs(stitch): mark website screens generated"
```

---

### Task 2: Phase B — `.arabic` project + content briefs

**Files:**
- Create: `.arabic/projects/awesome-arabic-website/plan.md`
- Create: `.arabic/briefs/website-home.yaml`
- Create: `.arabic/briefs/website-install.yaml`
- Create: `.arabic/briefs/website-features.yaml`
- Create: `.arabic/briefs/website-commands.yaml`
- Create: `.arabic/briefs/website-tutorials.yaml`
- Create: `.arabic/briefs/website-examples.yaml`
- Create: `.arabic/briefs/website-about.yaml`
- Create: `.arabic/briefs/website-docs.yaml`

**Step 1: Persist website plan**

Run in Cursor/Claude with `arabic` skill loaded:

```text
/arabic plan website --dialect masri
```

Save output to `.arabic/projects/awesome-arabic-website/plan.md`.

**Step 2: Create install brief (example — replicate pattern for 8 routes)**

Create `.arabic/briefs/website-install.yaml`:

```yaml
route: /install
dialect: masri
audience: mixed
primary_cta: ثبّت المهارة
sections:
  - familiarity_fork:
      dev_label: أنا مطور
      beginner_label: أول مرة أسمع عن المهارات
  - g14_block: from README Install section
  - tool_tabs: top 6 + link to /docs
  - faq:
      - هل المهارة مجانية؟
      - لازم Cursor بس؟
      - إيه الفرق عن ChatGPT؟
      - محتاج GitHub؟
  - trust_strip: الصفحة دي اتكتبت بـ /arabic
positioning: مش مجرد ترجمة
seo_title: ثبّت المهارة — npx وCursor وClaude وCodex
```

**Step 3: Write content per route**

For each brief:

```text
/arabic write page --brief .arabic/briefs/website-<route>.yaml
```

Save each delivery to `website/content/<route>.md` (create `website/content/` folder **before** scaffold if copying manually; or scaffold first in Task 4 then paste).

**Step 4: Audit all content**

```text
/arabic audit --file website/content/
```

Save snapshot to `.arabic/audits/website-2026-07-03.md` (use actual date).

**Step 5: Fix ledger in stitch prompts**

Modify `docs/planning/stitch-website-prompts-masri.md` — replace hero **مش ترجمة** lines with **مش مجرد ترجمة** (§4.1, §4.2, §4.7, §4.5 subhead).

**Step 6: Commit content + audit**

```bash
git add .arabic/ website/content/ docs/planning/stitch-website-prompts-masri.md
git commit -m "content(website): Masri copy briefs, pages, and audit snapshot"
```

---

### Task 3: G14 install validator (TDD)

**Files:**
- Create: `scripts/validate-website-install.sh`
- Create: `website/lib/install-commands.ts` (created in Task 5; script must fail until file exists)
- Modify: `package.json` (add script)
- Test: run script manually

**Step 1: Write the validator script**

Create `scripts/validate-website-install.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
README="$ROOT/README.md"
INSTALL_TS="$ROOT/website/lib/install-commands.ts"

if [[ ! -f "$INSTALL_TS" ]]; then
  echo "FAIL: missing $INSTALL_TS"
  exit 1
fi

# Extract bash blocks under ## Install until next ## heading
readme_block=$(awk '/^## Install/{flag=1;next}/^## /{if(flag) exit}flag' "$README" \
  | sed -n '/^```bash$/,/^```$/{ /^```/d; p; }')

fail=0
while IFS= read -r line; do
  [[ -z "$line" ]] && continue
  if ! grep -Fq "$line" "$INSTALL_TS"; then
    echo "FAIL: README install line not in install-commands.ts:"
    echo "  $line"
    fail=1
  fi
done <<< "$readme_block"

if [[ "$fail" -ne 0 ]]; then
  exit 1
fi

echo "OK: website install commands match README.md Install section"
```

```bash
chmod +x scripts/validate-website-install.sh
```

**Step 2: Run to verify failure (before website exists)**

```bash
bash scripts/validate-website-install.sh
```

Expected: `FAIL: missing website/lib/install-commands.ts`

**Step 3: Wire root validate (after Task 5 creates file)**

Add to root `package.json` scripts:

```json
"validate:website-install": "bash scripts/validate-website-install.sh"
```

Extend `validate` script:

```json
"validate": "bash scripts/validate-skill.sh && bash scripts/validate-docs.sh && bash scripts/validate-supported.sh && bash scripts/validate-website-install.sh"
```

Note: only add to `validate` once `website/lib/install-commands.ts` exists, or gate with `[[ -f website/lib/install-commands.ts ]]` in script for incremental PRs.

**Step 4: Commit script**

```bash
git add scripts/validate-website-install.sh
git commit -m "chore(website): add G14 README install parity validator"
```

---

### Task 4: Phase C — Next.js scaffold

**Prerequisite:** Plan gate cleared.

**Files:**
- Create: entire `website/` tree via `create-next-app`
- Create: `website/lib/install-commands.ts`
- Create: `website/lib/site-meta.ts`
- Modify: `website/app/layout.tsx`
- Modify: `website/app/globals.css`

**Step 1: Scaffold (non-interactive)**

From repository root:

```bash
npx create-next-app@latest website \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --use-npm \
  --yes
```

**Step 2: Create G14 source of truth**

Create `website/lib/install-commands.ts`:

```typescript
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
```

**Step 3: Verify G14 script passes**

```bash
bash scripts/validate-website-install.sh
```

Expected: `OK: website install commands match README.md Install section`

**Step 4: Site metadata map**

Create `website/lib/site-meta.ts`:

```typescript
export const siteMeta = {
  "/": {
    title: "مهارة العربية الرائعة — شريكك المصري لكتابة المحتوى",
    description:
      "ثبّت المهارة في Cursor وClaude وCodex. استشارة → توضيح → توصية → كتابة → مراجعة. مش مجرد ترجمة.",
  },
  "/install": {
    title: "ثبّت المهارة — npx وCursor وClaude وCodex",
    description:
      "سطر واحد من التيرمنال. ٢٤ أداة مدعومة. أوامر التثبيت من README.",
  },
  // ... remaining routes from website-dogfood.md §3
} as const;
```

(Fill all 8 routes from [website-dogfood.md §3](./website-dogfood.md).)

**Step 5: RTL root layout**

Replace `website/app/layout.tsx` core attributes:

```tsx
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arabic-skill.vercel.app"), // update on deploy
  title: { default: "مهارة العربية الرائعة", template: "%s · مهارة العربية" },
  description: "شريكك المصري لكتابة المحتوى — مش مجرد ترجمة.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${arabic.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**Step 6: Design tokens in globals.css**

Add CSS variables from [website-design-system.md §3–§6](./website-design-system.md):

```css
:root {
  --bg: #0b0b0f;
  --bg-elev: #141419;
  --fg: #f5f5f2;
  --fg-muted: #a1a1aa;
  --border: #26262e;
  --brand: #1fb28a;
  --brand-strong: #0e8c6b;
  --accent: #e7c873;
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-arabic), system-ui, sans-serif;
  line-height: 1.8;
}
```

**Step 7: Smoke dev server**

```bash
cd website && npm run dev
```

Expected: `http://localhost:3000` loads with RTL `dir` on `<html>`.

**Step 8: Commit scaffold**

```bash
git add website/ package.json scripts/validate-website-install.sh
git commit -m "feat(website): scaffold Next.js App Router with RTL layout and G14 install lib"
```

---

### Task 5: Shared components

**Files:**
- Create: `website/components/site-header.tsx`
- Create: `website/components/site-footer.tsx`
- Create: `website/components/copy-block.tsx`
- Create: `website/components/install-cta.tsx`
- Create: `website/components/faq-accordion.tsx`
- Create: `website/components/tool-tabs.tsx`
- Create: `website/components/before-after-card.tsx`
- Create: `website/components/mode-flow.tsx`
- Create: `website/components/sticky-install-bar.tsx`

**Step 1: CopyBlock (client)**

`website/components/copy-block.tsx`:

```tsx
"use client";

import { useState } from "react";

export function CopyBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--bg-elev)] p-4">
      <pre dir="ltr" className="font-[family-name:var(--font-mono)] text-sm overflow-x-auto">
        {text}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="mt-3 rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-[var(--bg)]"
      >
        {copied ? "تم النسخ" : "نسخ"}
      </button>
    </div>
  );
}
```

**Step 2: SiteFooter (server)**

Masri footer per spec §4.5:

```tsx
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] py-8 text-sm text-[var(--fg-muted)]">
      <p>
        اتبنى بـ <code dir="ltr">/arabic</code> ·{" "}
        <Link href="/about" className="text-[var(--brand)]">إزاي اتبنى؟</Link>
        {" · "}
        <a href="https://github.com/mediabubble-adv/arabic-skill">GitHub</a>
        {" · "}
        <Link href="/docs" className="text-[var(--brand)]">الوثائق</Link>
      </p>
    </footer>
  );
}
```

**Step 3: Implement remaining components**

Follow [website-design-system.md §7](./website-design-system.md) behavior specs. Each interactive component uses `"use client"` where needed.

**Step 4: Commit**

```bash
git add website/components/
git commit -m "feat(website): add shared marketing components (copy, footer, FAQ, tabs)"
```

---

### Task 6: Eight routes (G13)

**Files:**
- Create: `website/app/page.tsx`
- Create: `website/app/install/page.tsx`
- Create: `website/app/features/page.tsx`
- Create: `website/app/commands/page.tsx`
- Create: `website/app/tutorials/page.tsx`
- Create: `website/app/examples/page.tsx`
- Create: `website/app/about/page.tsx`
- Create: `website/app/docs/page.tsx`
- Create: `website/lib/content.ts` (load MD from `website/content/`)

**Step 1: Content loader**

```typescript
import fs from "node:fs";
import path from "node:path";

export function getPageContent(slug: string): string {
  const file = path.join(process.cwd(), "content", `${slug}.md`);
  return fs.readFileSync(file, "utf8");
}
```

**Step 2: Home `/`**

Wire: hero (**مش مجرد ترجمة**), primary CTA → `/install`, secondary → `/examples`, one before/after mini card, mode-flow, 4-tile bento, final CTA band, `StickyInstallBar` on mobile.

**Step 3: Install `/install`**

Wire familiarity fork (`ToolTabs` + beginner explainer), `CopyBlock` with `PRIMARY_INSTALL`, FAQ accordion, trust strip → `/about`.

**Step 4: Remaining six routes**

Port Stitch layouts; pull copy from `website/content/*.md`; each page includes `InstallCta` band.

**Step 5: About `/about`**

Include frozen audit excerpt from `.arabic/audits/website-*.md`, command trail, repo links to `website-dogfood.md` and `SKILL.md`.

**Step 6: Verify G13**

```bash
cd website && npm run build
```

Expected: build succeeds; no missing routes.

**Step 7: Commit**

```bash
git add website/app/ website/lib/content.ts website/content/
git commit -m "feat(website): add 8 marketing routes with Masri content (G13)"
```

---

### Task 7: Phase E — wire validate into CI

**Files:**
- Modify: `package.json`
- Modify: `.github/workflows/validate.yml` (if website install check should run only when `website/` exists)

**Step 1: Update root validate script**

```json
"validate": "bash scripts/validate-skill.sh && bash scripts/validate-docs.sh && bash scripts/validate-supported.sh && bash scripts/validate-website-install.sh"
```

**Step 2: Run full validate**

```bash
npm run validate
```

Expected: all scripts exit 0.

**Step 3: Commit**

```bash
git add package.json .github/workflows/validate.yml
git commit -m "ci(website): enforce G14 install parity in npm run validate"
```

---

### Task 8: RTL audit + build (G16, G17)

**Step 1: RTL source audit**

```text
/arabic audit rtl --dir website/
```

Fix any tier-1 issues in `website/app/` and `website/components/`.

**Step 2: Production build**

```bash
cd website && npm run build
```

Expected: exit 0 (G17).

**Step 3: Manual G15 check**

Mobile 390px — confirm copy, tabs, FAQ, before/after, sticky bar.

**Step 4: Commit fixes**

```bash
git add website/
git commit -m "fix(website): RTL audit fixes and G17 build green"
```

---

### Task 9: Deploy + G18 documentation

**Files:**
- Create: `website/README.md`
- Modify: `docs/engineering/release-playbook.md` (preview URL line if needed)
- Modify: `CHANGELOG.md` `[Unreleased]`

**Step 1: Deploy to Vercel**

```bash
cd website
npx vercel --yes
```

Or connect `mediabubble-adv/arabic-skill` monorepo with root directory `website`.

**Step 2: Document preview URL**

Create `website/README.md`:

```markdown
# Awesome Arabic Skill — Marketing Site

Arabic-first install and tutorial site (v1.1.0 dogfood).

## Preview

- **Production preview:** https://<your-vercel-url>
- **Local:** `npm run dev` → http://localhost:3000

## Golden tests

See [tests/golden/g13-g18-website.md](../tests/golden/g13-g18-website.md).

## Install copy (G14)

Source of truth: [../README.md](../README.md) — enforced by `scripts/validate-website-install.sh`.
```

**Step 3: Update CHANGELOG**

Under `[Unreleased]`:

```markdown
### Added
- `website/` — Arabic-first marketing site (G13–G18): install funnel, dogfood `/about`, 8 routes
- `scripts/validate-website-install.sh` — G14 README install parity
```

**Step 4: Run golden checklist**

Mark all items in `tests/golden/g13-g18-website.md`.

**Step 5: Commit + PR**

```bash
git add website/README.md CHANGELOG.md docs/engineering/release-playbook.md
git commit -m "docs(website): document Vercel preview URL (G18)"
git push -u origin feat/website-v1.1.0
gh pr create --title "feat(website): marketing site v1.1.0 (G13–G18)" --body "## Summary
- Arabic-first RTL Next.js site with install-first funnel
- Dogfood transparency on /about + footer
- G14 enforced via validate-website-install.sh

## Test plan
- [ ] npm run validate
- [ ] tests/golden/g13-g18-website.md all checked
- [ ] Preview URL live"
```

---

## Doc sync checklist (post-merge)

- [ ] `docs/planning/website-dogfood.md` — status EXECUTE complete; **مش مجرد ترجمة** in §3 meta
- [ ] `docs/planning/stitch-website-prompts-masri.md` — ledger + hero lines
- [ ] `docs/README.md` — link to `docs/planning/2026-07-03-website-marketing-dogfood.md`
- [ ] `docs/planning/website-design-system.md` — footer + install fork cross-refs

---

## Out of scope (do not implement in this plan)

- PostHog/Vercel Analytics event wiring (hooks only — add `website/lib/analytics.ts` stub if needed)
- `npx skills add` registry
- Browser screenshot RTL tier
- English mirror site
- Automated Playwright golden runner

---

## Related

- [Design spec](../superpowers/specs/2026-07-03-website-marketing-dogfood-design.md)
- [Website dogfood plan](./website-dogfood.md)
- [Stitch runbook](./stitch-generation-runbook.md)
- [Release playbook](../engineering/release-playbook.md)
