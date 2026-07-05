# Golden Tests G15–G16 — Playwright (v1.2.x)

Automated UX and content smoke tests. Run via `npm run validate:website-playwright` or CI job `website-e2e`.

## PW-15 — Mobile viewport (390px)

**Command:** `bash scripts/validate-website-playwright.sh` (includes `website/e2e/g15-mobile-ux.spec.ts`)

**Expected:**

| Component | Route | Assertion |
|-----------|-------|-----------|
| Copy-to-clipboard | `/install` | Button shows `تم النسخ` after click |
| Tool tabs | `/install` | Claude/Codex tabs swap command in `pre` |
| FAQ accordion | `/install` | First item toggles open/closed |
| Before/after | `/examples` | `قبل` / `بعد` swap copy |
| Sticky install bar | `/` | Appears after scroll >320px on mobile |

## PW-16 — Frozen audit + footer SSOT

**Command:** same runner (`website/e2e/g16-content.spec.ts`)

**Expected:**

- `/about` — G16 frozen snapshot heading, date, overall score, legacy/AI-likelihood/brand lines, 8-page audit table
- Global footer — fragments from `website/content/footer.md` (`اتبنى بـ`, `/arabic`, links)
- `/` hero — positioning lock `مش مجرد ترجمة.`

## Manual audit (beyond Playwright)

- Full `/arabic audit --file website/content/` re-run before major copy changes
- Live Masri register scoring beyond frozen snapshot

## Validation

- [ ] `npm run validate:website-playwright` exits 0
- [ ] CI `website-e2e` job green on PR
