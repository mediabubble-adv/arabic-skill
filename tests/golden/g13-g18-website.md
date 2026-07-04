# Golden Tests G13–G18 — Website (v1.1.0)

Manual checklist until automated runner ships. Run before merging `feat/website-v1.1.0`.

## G13 — 8 routes render

- [x] `/` — 200
- [x] `/features` — 200
- [x] `/install` — 200
- [x] `/commands` — 200
- [x] `/tutorials` — 200
- [x] `/examples` — 200
- [x] `/about` — 200
- [x] `/docs` — 200

Verify: `cd website && npm run build && npm run start` then curl each path, or `npm run dev` + browser.

## G14 — Install copy matches README

- [x] `bash scripts/validate-website-install.sh` exits 0

## G15 — 3+ interactive components on mobile (390px)

- [x] Copy-to-clipboard on `/install` (toast: تم النسخ)
- [x] Tool tabs on `/install`
- [x] FAQ accordion on `/install`
- [x] Before/after toggle on `/examples`
- [x] Sticky install bar on `/` (mobile scroll)

## G16 — Masri audit pass

- [x] `/arabic audit --file website/content/` completed; snapshot in `.arabic/audits/website-*.md`
- [x] `/about` shows frozen audit summary (overall, per-page, legacy, AI-likelihood, date)
- [x] Global footer matches `website/content/footer.md` (choice D transparency)

## G17 — Build passes

- [x] `cd website && npm run build` exits 0

## G18 — Deploy preview documented

- [x] `website/README.md` contains live preview URL
- [x] `docs/engineering/release-playbook.md` §1.1.0 gate checked
