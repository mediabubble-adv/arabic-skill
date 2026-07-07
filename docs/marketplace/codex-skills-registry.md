# Codex Skills Registry Listing

**Status:** Ready to Verify  
**Package:** `@mediabibble-adv/arabic-skill@1.2.9`  
**Registry:** https://skills.sh

---

## Registry Entry Metadata

### Title & Summary
**Title:** Awesome Arabic Skill (50 chars max)
```
Awesome Arabic Skill
```

**Summary:** (200 chars max)
```
Masri-first Arabic content creation with 11 dialects, load presets, RTL validation, and research distillation. Install on Cursor, Claude, Codex, ChatGPT, Gemini, VS Code, and 18+ AI tools.
```

### Category & Tags

**Primary Category:** `Writing & Productivity` or `Content Creation`

**Tags:** (comma-separated, searchable)
```
arabic, content-creation, dialect, masri, multilingual, rtl, cursor, claude, codex, llm-skill, ai-writing, localization
```

### Installation Command

```bash
npx skills add mediabubble-adv/arabic-skill
```

**Alternative (with target):**
```bash
npx skills add mediabubble-adv/arabic-skill -a cursor
npx skills add mediabubble-adv/arabic-skill -a claude
npx skills add mediabubble-adv/arabic-skill -a codex
```

### Asset Links

**Logo:** 128×128 PNG (transparent background)
```
https://github.com/mediabubble-adv/arabic-skill/raw/main/public/assets/logo-128x128.png
```

**Repository:** 
```
https://github.com/mediabubble-adv/arabic-skill
```

**Homepage:**
```
https://arabic-skill.vercel.app
```

**Documentation:**
```
https://github.com/mediabubble-adv/arabic-skill#readme
```

### Author Information

**Author Name:** MediaBubble  
**Author Email:** yasser.dorgham@gmail.com  
**Author GitHub:** @mediabubble-adv  

---

## Feature Highlights (For Store Page)

### What It Does
- ✅ **11 Arabic Dialects** — Masri, KSA, Gulf, Levantine, Iraqi, Yemeni, Maghrebi, Sudanese, Libyan, MSA, White Arabic
- ✅ **Load Presets** — 11 task-class bundles for optimized reference loading (plan, write, audit, seasonal, campaign, book, coach, init, audit-full, dialect-lock, 4 regional SEO-AEO)
- ✅ **RTL & Bidirectional Text Audit** — Validate RLE/PDF balance, LRM gaps, dialect purity, MSA-bleed detection
- ✅ **Research Distillation** — 4-state topic lifecycle (collected → curated → distilled → deferred) with monthly snapshots
- ✅ **24 Tool Profiles** — Pre-configured for Cursor, Claude, Codex, ChatGPT, Gemini, VS Code, and 18+ AI platforms
- ✅ **Project-Aware** — Auto-scan repositories to explain products in natural Arabic

### Use Cases
- 📝 **Content Creation:** Captions, ads, landing pages, blogs, scripts, UI copy, professional documents
- 🎯 **Dialect Routing:** Regional market specialization (Egypt, Gulf, Saudi Arabia, Levantine)
- ✅ **Quality Assurance:** Humanize AI-generated copy, audit for translationese, validate RTL formatting
- 🔬 **Research Intelligence:** Collect, curate, and distill Arabic content topics with lifecycle tracking
- 🏢 **Enterprise Scale:** Batch processing, load discipline, compliance-ready audit trails

---

## Installation Verification Checklist

### Pre-Launch (Automated)
- [ ] `npm view @mediabubble-adv/arabic-skill` returns v1.2.9
- [ ] `npm info @mediabubble-adv/arabic-skill` includes all keywords
- [ ] Package tarball < 5MB (`npm pack --dry-run`)

### User Installation Test
- [ ] `npx skills add mediabubble-adv/arabic-skill` completes without errors
- [ ] Skill appears in `npx skills list` output
- [ ] `/arabic` command available in Cursor/Claude/Codex after install
- [ ] `npx skills remove mediabubble-adv/arabic-skill` uninstalls cleanly

### Discovery Verification
- [ ] `npx skills search arabic` shows skill in top 3 results
- [ ] `npx skills search masri` shows skill
- [ ] `npx skills search dialect` shows skill
- [ ] skills.sh registry lists skill (may take 24–48 hours after publish)

---

## Performance & Analytics

### Metrics to Track

**Installation:**
- Total installs (cumulative)
- Installs per week
- Install source (direct CLI, skills.sh, GitHub, other)

**Usage:**
- Active users (weekly active installs)
- Tool breakdown (% Cursor, % Claude, % Codex, etc.)
- Geographic distribution (IP geolocation)

**Engagement:**
- Uninstalls (churn)
- Reinstalls (returning users)
- Upgrade rate (v1.2.8 → v1.2.9)

### Target Metrics (Month 1)

| Metric | Target |
|--------|--------|
| Codex installs | 50+ |
| Active users | 20+ |
| Uninstall rate | <10% |
| Upgrade rate | >80% |

---

## Troubleshooting

### Common Installation Issues

**Error: "Skill not found"**
- Verify npm package is published: `npm view @mediabubble-adv/arabic-skill`
- Check skills registry sync (24–48 hour delay possible)
- Clear npm cache: `npm cache clean --force`

**Error: "Command /arabic not found"**
- Verify skill installed correctly: `npx skills list`
- Check tool-specific setup (Cursor, Claude, Codex may require separate configuration)
- See `docs/supported/{tool}/README.md` for tool-specific instructions

**Error: "Permission denied"**
- Ensure npm permissions correct: `npm list -g` to verify global installs
- Try with `sudo` if necessary (not recommended)

---

## Launch Checklist

### Week 1 (Jul 6–12)
- [ ] Verify v1.2.9 published to npm
- [ ] Test `npx skills add mediabubble-adv/arabic-skill` on fresh machine
- [ ] Verify `npx skills search` returns skill in top results
- [ ] Document installation metrics baseline
- [ ] Create GitHub issue for bug reports during launch

### Week 2 (Jul 13–19)
- [ ] Monitor install volume + churn
- [ ] Gather user feedback via GitHub Discussions
- [ ] Post launch announcement (Twitter, LinkedIn, GitHub Releases)
- [ ] Update README with install link + Codex badge

### Week 3–4 (Jul 20–Aug 2)
- [ ] Analyze week 1 metrics vs. targets
- [ ] Document lessons learned for ChatGPT/Gemini listings
- [ ] Prepare case study based on early adopters

---

**Next:** Proceed to ChatGPT Plugin Store setup (9A-1-B)?
