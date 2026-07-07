# Awesome Arabic Skill — Metrics & Analytics

**Maintenance Mode Metrics Dashboard**

---

## Overview

During Maintenance Mode (Phase 9A complete), we track weekly, monthly, and quarterly metrics to understand user adoption, community health, and product stability.

---

## Quick Links

### Weekly Tracking
- **[Marketplace Tracker](./marketplace-tracker.md)** — Codex, ChatGPT, Gemini install counts (updated Sundays)
- **[Weekly Report Template](./weekly-report-template.md)** — GA4 data, community stats, action items

### Setup & Configuration
- **[GA4 Setup](./GA4_SETUP.md)** — Configure Google Analytics for install site

---

## Success Metrics (Phase 9A Targets)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| NPM cumulative installs | 1,000+ | — | In progress |
| Website monthly organic users | 500+ | — | In progress |
| Discord community members | 50+ | — | In progress |
| Newsletter subscribers | 100+ | — | In progress |
| Blog monthly impressions | 200+ | — | In progress |
| Website Lighthouse score | ≥90 | — | In progress |
| Support response time | <48h | — | In progress |
| Test suite pass rate | 100% | ✅ | Stable |
| Unpatched P0 security issues | 0 | ✅ | Secure |

---

## Cadence

### Weekly (Sunday Evening)
1. Marketplace snapshot (15 min)
   - Log Codex, ChatGPT, Gemini installs
   - Check for anomalies
   - Update: marketplace-tracker.md

2. Community check (10 min)
   - Discord: member count, active discussions
   - GitHub Discussions: unanswered questions
   - Newsletter: subscriber count, open rates

### Monthly (Month-End)
1. Compile GA4 data, marketplace data, community stats
2. Write: `weekly-report-[YYYY-MM-DD].md`
3. Identify trends & action items

### Quarterly (Every 3 Months)
1. 3-month trend analysis
2. User feedback review
3. Dependency health check
4. Technical debt assessment
5. Decision: continue maintenance vs. Phase 9B vs. sunset

---

## How to Use This Directory

```bash
# Track marketplace installs weekly
cat marketplace-tracker.md

# Fill out weekly report template
cp weekly-report-template.md weekly-report-$(date +%Y-%m-%d).md
# ... edit with current data

# Configure GA4 if needed
cat GA4_SETUP.md
```

---

## Reporting Issues

- **Analytics question?** Open [GitHub Issues](https://github.com/mediabubble-adv/arabic-skill/issues)
- **Metrics anomaly?** Post in Discord #metrics
- **Feature request?** [GitHub Discussions](https://github.com/mediabubble-adv/arabic-skill/discussions)

---

**Last Updated:** 2026-07-07  
**Maintenance Mode Status:** Active  
**Next Review:** 2026-10-07 (Quarterly)
