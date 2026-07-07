# Phase 9A-5: Marketing Metrics & Analytics Dashboard

**Status:** In Progress  
**Start Date:** 2026-07-07  
**Goal:** Establish comprehensive metrics tracking across all distribution & marketing channels

---

## Dashboard Architecture

### 1. Install Analytics (Vercel)

**Data Source:** Vercel Analytics + npm telemetry

**Metrics to Track:**
- NPM installs per week (trending)
- Total cumulative installs (v1.0.0 → now)
- Top referrer sources (npm registry, skills.sh, GitHub, Product Hunt, etc.)
- Geographic distribution (% by region: MENA, Europe, US, Asia)
- Tool breakdown (% via Cursor, Claude, Codex, manual)
- Installation success rate (installs vs. errors)

**Setup:**
- [ ] Enable Vercel Analytics in project settings
- [ ] Configure npm telemetry tracking
- [ ] Set up weekly automated snapshots (GitHub Actions → docs/metrics/weekly/)

**Target:** Track 1,000+ cumulative installs by 6-month mark

---

### 2. Website Analytics (Google Analytics 4)

**Data Source:** GA4 events on install site (https://arabic-skill.vercel.app)

**Metrics to Track:**
- **Page Performance:**
  - Landing page views & bounce rate (/)
  - Install page views (/install)
  - Blog traffic per post (/blog/posts/*)
  - Docs traffic (/docs)
  - Features & About traffic

- **Conversion Funnel:**
  - Landing → Install page (CTR)
  - Install page → npm install command (copy rate)
  - First use confirmation (tracked via CLI telemetry)

- **Traffic Sources:**
  - Organic search (keywords)
  - Direct visits
  - Referrals (Discord, GitHub, Product Hunt, etc.)
  - Social media (Twitter, LinkedIn)

- **User Behavior:**
  - Session duration per page
  - Device breakdown (mobile vs. desktop)
  - Language/locale preference

**Setup:**
- [ ] Create GA4 property (if not existing)
- [ ] Add tracking ID to Next.js site (via environment variable)
- [ ] Create custom events for key actions:
  - `install_click` — clicked install button
  - `copy_command` — copied npm command
  - `blog_read` — scrolled to 50% of article
  - `docs_search` — searched documentation
- [ ] Set up conversion goals (Install, First Use)
- [ ] Configure attribution model (last-click)

**Target:** 500+ monthly organic users by 3-month mark

**Targets (by 9A-5 end):**
- 50+ sessions/day
- 2-3 min avg session duration
- < 40% bounce rate

---

### 3. Marketplace Analytics

**Data Sources:** Platform-specific dashboards + manual tracking

**Codex Skills Registry:**
- [ ] Total installs (from telemetry)
- [ ] Listing views (if available)
- [ ] Rating/reviews
- [ ] Share of "Top Arabic Tools" category

**ChatGPT Plugin Store:**
- [ ] Active installations
- [ ] Usage frequency (if API available)
- [ ] Ratings & reviews
- [ ] Spotlight/featured status

**Gemini Extensions:**
- [ ] Activation count
- [ ] Active daily/monthly users (if API available)
- [ ] Rating & reviews
- [ ] Traffic to docs/help pages

**Tracking Method:**
- Manual weekly snapshot from each platform (copy-paste into metrics doc)
- Automated alerts if install count drops (anomaly detection)

**Template:** docs/metrics/marketplace-tracker.md (weekly updated)

---

### 4. Community Analytics

**Discord Server:**
- Member count (target: 50+ by Q3)
- Active members (posted last 30 days)
- Message volume (avg/day)
- Top channels by engagement
- New member join rate

**GitHub Discussions:**
- Total discussions created (target: 10+)
- Discussions by category (Question, Idea, Announcement)
- Avg response time to questions
- Most upvoted ideas
- Unanswered questions (gap analysis)

**Email Newsletter (Substack):**
- Subscriber count (target: 100+ by Q3)
- Open rate (target: 25%+)
- Click-through rate (target: 5%+)
- Unsubscribe rate (target: <2%)
- Segment breakdown (Creators vs Devs vs Enterprise)

**Social Media Mentions:**
- Twitter/X mentions of "Awesome Arabic Skill" or "Arabic Skill"
- LinkedIn posts referencing the skill
- Product Hunt comments/votes (if listed)
- GitHub stars (trending)

**Tracking Method:**
- Manual weekly snapshot from Discord (member count)
- Substack analytics dashboard (auto-refreshes)
- GitHub Discussions stats page
- Twitter search (or Janetter/Buffer)

---

## Weekly Metrics Report

**Template:** docs/metrics/weekly-report-template.md

**Structure:**
```markdown
# Weekly Metrics Report — Week of [Date]

## Install Analytics
- NPM installs this week: X
- Cumulative: Y
- Top referrer: [source]

## Website Analytics
- Sessions: X
- Avg session duration: Xm Ys
- Bounce rate: X%
- Top page: [url]
- New visitors: X%

## Marketplace
- Codex installs: X
- ChatGPT activations: X
- Gemini users: X

## Community
- Discord members: X (+Y this week)
- GitHub discussions: X
- Newsletter subscribers: X (+Y this week)
- Newsletter open rate: X%

## Key Insights
- [1-2 observations]
- [Action items for next week]

## Trends (Last 4 Weeks)
- Install growth: [↑/→/↓]
- Community growth: [↑/→/↓]
- Blog engagement: [↑/→/↓]
```

**Generation:** Manual or automated via GitHub Actions weekly cron

---

## Dashboard Tools

### Vercel Analytics
- Built-in to Vercel project
- Accessible via: Vercel Dashboard → Project → Analytics
- Tracks Core Web Vitals + custom events

### Google Analytics 4
- Dashboard: https://analytics.google.com
- Property ID: [to be set in env]
- Tracked via `next/third-parties/google` in Next.js

### Community Dashboards
- **Discord Analytics:** Available in server settings (member trends, activity)
- **GitHub Discussions:** Built into repo (stats page)
- **Substack Analytics:** Built-in dashboard
- **Twitter:** Use Twitter Analytics or 3rd-party tool (Janetter, Buffer)

---

## Success Criteria

| Metric | Target | By When | Status |
|--------|--------|---------|--------|
| NPM installs | 1,000+ cumulative | 6 months | ⏳ |
| Website organic traffic | 500+ monthly users | 3 months | ⏳ |
| Discord members | 50+ | 2 months | ⏳ |
| Newsletter subscribers | 100+ | 2 months | ⏳ |
| Blog traffic | 200+ impressions/month | 2 months | ⏳ |
| Lighthouse score | ≥90 | 1 week | ⏳ |

---

## Next Steps

1. **GA4 Setup**
   - Create property (or verify existing)
   - Add tracking ID to .env.local
   - Verify events are firing (browser console)
   - Create goals in GA4 dashboard

2. **Vercel Analytics**
   - Enable in project settings
   - Confirm npm telemetry collection
   - Set up weekly snapshots

3. **Marketplace Tracking**
   - Create tracker template (marketplace-tracker.md)
   - Populate with first snapshot
   - Set reminder for weekly updates

4. **Community Metrics**
   - Finalize Discord member count baseline
   - Export GitHub Discussions list
   - Log initial newsletter subscriber count
   - Set up social media mentions alert

5. **Weekly Report**
   - Create template in docs/metrics/
   - Schedule GitHub Actions cron (weekly)
   - Distribute to team

---

**Phase 9A-5 Completion Criteria:**
- ✅ GA4 property created & verified
- ✅ Vercel Analytics enabled
- ✅ Weekly metrics report template created
- ✅ First 2 weeks of reports generated
- ✅ Marketplace tracker established
- ✅ Community metrics baseline captured
- ✅ Dashboard access verified (all team members)

---

**Related:** docs/metrics/ directory (weekly reports), docs/planning/p9a-distribution-marketing.md (overview)
