# Bilingual Pipeline — EN ↔ AR Content Order

**Load when:** `brief`, `plan website`, `write` (page/landing/ui/website), or `improve` requests dual-language output, or flags `--lang-order` / `--lang` are set.

> **Product default:** Arabic first (`ar_en`) — مصري أولاً. English is an optional twin, never a machine reverse-translate of Arabic, and Arabic is never a Google-style calque of English.

---

## 1. Modes

| Mode | Flag | Picker label | Behavior |
|------|------|--------------|----------|
| **Arabic → English** | `--lang-order ar_en` ◆ default | العربية أولاً ثم الإنجليزي | Lock dialect/register; write Arabic; then native English twin matching section/component IDs |
| **English → Arabic** | `--lang-order en_ar` | الإنجليزي أولاً ثم العربي | Write English first (brief or body); then Arabic via dialect + humanization engines |
| **Arabic only** | `--lang ar` | عربي فقط | Skip English pass |
| **English only** | `--lang en` | English only | Skip Arabic pass (rare; still load Arabic taboo/RTL if UI eventually flips) |

If the user does not set flags, **ask one lettered picker** before generating dual-language website/UI copy:

```text
A) العربية أولاً ثم الإنجليزي ◆
B) الإنجليزي أولاً ثم العربي
C) عربي فقط
D) English only
```

---

## 2. Hard rules

1. **Adapt, do not translate.** Same intent, proof, and CTA job — different native wording and rhythm.
2. **Parallel slots.** Every section/component keeps the same ID across languages (`hero.title`, `pricing.cta`, `form.email.error`).
3. **Arabic owns:** dialect, RTL, Arabic char budgets, Masri/Gulf CTA feel.
4. **English owns:** Latin SEO title/description when the EN surface is public; keep brand names consistent with AR ledger.
5. **Length:** Arabic runs ~20–30% longer — validate UI char limits on the Arabic string, then fit English; never pad English to match Arabic length.
6. **Forbidden:** EN→AR calques (“اكتشف كيف يمكنك…”); AR→EN that flattens voice into generic SaaS English; mixing dialects inside one locale file.

---

## 3. Pass order

### `ar_en`
1. Draft Arabic against brief + dialect + `website-ui-system.md` slots.
2. Humanize + taboo scan (AR).
3. Draft English from the **Arabic meaning map** (bullets of intents per slot), not from literal AR text.
4. Align IDs; flag any EN claim missing from AR (or vice versa).

### `en_ar`
1. Draft English against brief (clear, native marketing/UI English).
2. Extract intent map per slot.
3. Draft Arabic from that map with dialect lock — load Website Content / UI engines + humanization.
4. Align IDs; re-check Arabic char limits and RTL for UI strings.

---

## 4. Disk / output shapes

**Preferred for websites:** sibling files or paired blocks.

```text
page.ar.md / page.en.md
# or
## hero.title
ar: …
en: …
```

**Brief fields** (when saved via `/arabic brief`):

```yaml
lang_order: ar_en   # or en_ar
languages: [ar, en] # or [ar] / [en]
```

**Improve / audit:** preserve `lang_order` in locks; rewrite both locales when scope is bilingual; never “translate the improved AR into EN” as a patch — regenerate the twin from the new intent map.

---

## 5. Load discipline

Load this file **instead of** inventing ad-hoc EN/AR steps. Pair with:

- `dialects/{dialect}.md` for Arabic pass
- `references/website-ui-system.md` for component slots
- `references/humanization-protocol.md` after each locale draft
- `references/taboos.md` before final delivery (both locales if cultural claims appear in EN)

Do not load this file for single-locale social captions unless the user asked for bilingual.

---

## Related

- `references/project-mode.md` — website stages include bilingual sitemap/copy
- `references/engines.md` — Website Content + UI/UX slices
- `skills/brief.md` — lang-order picker + YAML fields
- `skills/improve.md` — keep language order when rewriting from audit
