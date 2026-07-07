# Phase 9A-2: Install Site SEO Optimization

**Status:** Implementation In Progress  
**Target:** Lighthouse ≥90, 500+ monthly organic visitors by 2026-08-20  
**Platform:** Next.js 15 (https://arabic-skill.vercel.app)

---

## Current State

**Framework:** Next.js 15 App Router  
**Deployment:** Vercel (automatic CDN, ISR support)  
**Routes:** 8 Masri pages (/, /features, /install, /commands, /tutorials, /examples, /about, /docs)  
**Status:** G13–G18 golden tests passing (website UX complete)

### Current Metrics (Baseline)

- **Lighthouse Score:** TBD (audit needed)
- **Core Web Vitals:** TBD
- **Organic Sessions:** ~50/month (new site, no SEO yet)
- **Indexed Pages:** ~5 (needs expansion)

---

## SEO Strategy

### Phase 1: Technical SEO (Week 1)

**1.1 Core Web Vitals Audit**

- [ ] Run Vercel Analytics dashboard
- [ ] Measure:
  - LCP (Largest Contentful Paint): target <2.5s
  - CLS (Cumulative Layout Shift): target <0.1
  - FID (First Input Delay): target <100ms
- [ ] Check Lighthouse report (DevTools → Lighthouse)
- [ ] Document baseline metrics

**1.2 Meta Tags & Open Graph**

File: `website/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Awesome Arabic Skill | AI Arabic Content Creation',
  description: 'Masri-first Arabic content creation with 11 dialects, load presets, RTL audit, and research distillation. Install on Cursor, Claude, Codex, ChatGPT, Gemini, VS Code, and 18+ AI tools.',
  keywords: ['Arabic', 'content creation', 'dialect', 'Masri', 'AI writing', 'skill', 'Cursor'],
  openGraph: {
    title: 'Awesome Arabic Skill | Arabic Content for AI Tools',
    description: 'Create, audit, and research Arabic content with AI.',
    image: 'https://arabic-skill.vercel.app/og-image.png',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awesome Arabic Skill',
    description: 'Arabic content creation for Cursor, Claude, Codex, ChatGPT, Gemini, and more',
    image: 'https://arabic-skill.vercel.app/og-image.png',
  },
};
```

**1.3 Structured Data**

Add Schema.org SoftwareApplication:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Awesome Arabic Skill',
      'description': 'Arabic content creation assistant',
      'url': 'https://arabic-skill.vercel.app',
      'applicationCategory': 'UtilityApplication',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
      },
    }),
  }}
/>
```

**1.4 robots.txt & sitemap.xml**

Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://arabic-skill.vercel.app/sitemap.xml
```

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://arabic-skill.vercel.app/</loc>
    <lastmod>2026-07-07</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://arabic-skill.vercel.app/features</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://arabic-skill.vercel.app/install</loc>
    <priority>0.9</priority>
  </url>
  <!-- ... other routes ... -->
</urlset>
```

**1.5 Canonical URLs**

Each page should declare canonical:

```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://arabic-skill.vercel.app/features',
  },
};
```

---

### Phase 2: Content SEO (Week 2)

**2.1 Target Keywords Per Route**

| Route | Primary Keyword | Secondary Keywords | Meta Description |
|-------|-----------------|--------------------|----|
| `/` | Arabic content creation AI | Masri skill, dialect routing | "Masri-first Arabic content creation with 11 dialects. Install on Cursor, Claude, Codex, ChatGPT, Gemini, VS Code, and more." |
| `/features` | dialect routing AI | RTL validation, load presets | "11 Arabic dialects, RTL bidirectional text audit, load presets for task bundling, research distillation." |
| `/install` | how to install Arabic skill | npx install Cursor | "Install Awesome Arabic Skill on Cursor (npm), Claude, Codex, ChatGPT, Gemini. One command: npx @mediabubble-adv/arabic-skill." |
| `/commands` | /arabic command CLI | skill commands | "Complete guide to /arabic commands: write, audit, coach, plan, research, voice, auto, init, help." |
| `/tutorials` | Arabic content tutorial | Masri writing guide | "Step-by-step tutorials: write captions, ads, blogs; audit copy; plan projects; research topics." |
| `/examples` | Arabic content examples | before-after samples | "Real examples of Arabic content: captions (Masri, Gulf, Levantine), ads, landing page copy, blog posts." |
| `/about` | Awesome Arabic Skill about | MediaBubble, project | "Project overview, team, and vision: bringing professional Arabic writing to AI tools." |
| `/docs` | Arabic skill documentation | guides, references | "Full documentation: commands, dialects, domains, references, load presets, RTL validation, research." |

**2.2 On-Page Optimization**

- [ ] H1 tag (one per page, unique)
- [ ] H2–H3 hierarchy (logical structure)
- [ ] Alt text on all images (Arabic + English)
- [ ] Internal linking (each page links to 2–3 others)
- [ ] Keyword density: 1–2% (natural, not stuffed)
- [ ] Meta descriptions: 150–160 characters

Example for `/install`:

```typescript
export const metadata: Metadata = {
  title: 'Install Awesome Arabic Skill | Cursor, Claude, Codex, ChatGPT, Gemini',
  description: 'How to install Awesome Arabic Skill on Cursor, Claude, Codex, ChatGPT, Gemini, VS Code, and 18+ AI tools. One command: npx install.',
};

export default function Install() {
  return (
    <main>
      <h1>Install Awesome Arabic Skill</h1>
      <p>Get Arabic content creation on your favorite AI tool in under 1 minute.</p>
      
      <section>
        <h2>Cursor (Recommended)</h2>
        <p>Fastest integration with native skills support...</p>
        <img src="/cursor-install.png" alt="Cursor installation interface showing Awesome Arabic Skill" />
      </section>
      
      <section>
        <h2>Claude, Codex, ChatGPT, Gemini</h2>
        <p>Manual installation via copy-paste...</p>
      </section>
    </main>
  );
}
```

---

### Phase 3: Performance Optimization (Week 2)

**3.1 Image Optimization**

- [ ] Convert images to WebP format
- [ ] Add responsive srcset:
```typescript
<Image
  src="/hero.webp"
  alt="Arabic content creation interface"
  width={1200}
  height={630}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
  priority
/>
```

**3.2 Font Optimization**

Already using `next/font`:
```typescript
import { IBM_Plex_Sans_Arabic } from 'next/font/google';

const arabic = IBM_Plex_Sans_Arabic({
  weight: ['400', '600', '700'],
  preload: true,
  variable: '--font-arabic',
});
```

- [ ] Verify font preloading in Layout
- [ ] Check font-display: swap (avoid FOUT)

**3.3 CSS/JS Optimization**

- [ ] Enable CSS minification (Next.js default)
- [ ] Split code by route (automatic with App Router)
- [ ] Remove unused CSS (Tailwind v4 auto-purge)
- [ ] Defer non-critical scripts

**3.4 Cache Headers**

Configure in `vercel.json` or `vercel.ts`:

```json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, s-maxage=3600, stale-while-revalidate=86400" }
      ]
    }
  ]
}
```

---

### Phase 4: Backlinks & Authority (Week 3–4)

**4.1 Directory Submissions**

- [ ] Product Hunt → https://www.producthunt.com
  - Title: "Awesome Arabic Skill — Arabic Content Creation for AI Tools"
  - Tagline: "11 dialects, load presets, RTL audit, research distillation"
  - Category: "Developer Tools"
  - Timeline: Launch 1–2 weeks after code deployment

- [ ] GitHub Awesome Lists
  - [ ] Add to `awesome-ai-tools` → https://github.com/topics/ai-tools
  - [ ] Add to `awesome-arabic` → https://github.com/topics/arabic
  - [ ] Add to `awesome-writing` → https://github.com/topics/writing

**4.2 Outreach & Mentions**

- [ ] Arabic tech blogs (LinkedIn, Medium)
  - El Kalimat (https://elkalimat.com)
  - Arabic AI News (https://arabicai.news)
  - Tech Masri (hypothetical, for Egyptian tech community)

- [ ] AI tool directories
  - Futurepedia (AI tools directory)
  - Clay.com (AI tools aggregator)
  - Indie Hackers (submit launch)

**4.3 Social Media & SEO**

- [ ] Twitter (@mediabubble_adv)
  - Announce launch with screenshot + install command
  - Share use cases: "Writing Meta ads in 30 seconds (Masri)"
  - Tag @Cursor, @anthropic, @OpenAI (where relevant)

- [ ] LinkedIn
  - Post about Arabic content creation in AI
  - Tag relevant communities (Arab tech, AI/ML, content creators)

- [ ] GitHub Releases
  - Rich release notes (already done for v1.2.9)
  - Include screenshots from install site

---

## Success Metrics & Checkpoints

### Lighthouse Audit (Week 1)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Performance | ≥90 | TBD | ❌ |
| Accessibility | ≥95 | TBD | ❌ |
| Best Practices | ≥95 | TBD | ❌ |
| SEO | ≥95 | TBD | ❌ |
| **Overall** | **≥90** | **TBD** | **❌** |

### Traffic & Indexing (Month 1)

| Metric | Target | Timeline |
|--------|--------|----------|
| Indexed pages | 20+ | Week 2 (submit sitemap to Google Search Console) |
| Monthly organic visitors | 200+ | Week 4 |
| Avg. session duration | >2 min | Week 4 |
| Bounce rate | <50% | Week 4 |

### Backlinks & Authority (Month 1–3)

| Source | Target | Timeline |
|--------|--------|----------|
| Product Hunt upvotes | 100+ | Week 3–4 |
| GitHub stars (repo) | 50+ | Month 1 |
| Referring domains | 10+ | Month 2–3 |

---

## Implementation Checklist

### Week 1: Technical SEO

- [ ] Run Lighthouse audit (baseline metrics)
- [ ] Add meta tags (title, description, OG, Twitter)
- [ ] Add structured data (Schema.org SoftwareApplication)
- [ ] Create robots.txt + sitemap.xml
- [ ] Add canonical URLs to all pages
- [ ] Optimize Core Web Vitals (LCP, CLS, FID)
- [ ] Configure cache headers (Vercel)

### Week 2: Content SEO + Performance

- [ ] Audit all H1/H2/H3 tags
- [ ] Add/improve alt text on images
- [ ] Optimize meta descriptions per route
- [ ] Optimize images (WebP, responsive srcset)
- [ ] Verify font preloading
- [ ] Minify CSS/JS
- [ ] Test Lighthouse → target ≥90
- [ ] Enable Google Analytics 4

### Week 3: Backlinks & Discovery

- [ ] Submit to Product Hunt
- [ ] Create PR for GitHub Awesome Lists
- [ ] Outreach to Arabic tech blogs
- [ ] Post on Twitter, LinkedIn, GitHub
- [ ] Submit to AI tool directories (Futurepedia, Clay)

### Week 4: Monitoring & Iteration

- [ ] Monitor Google Search Console (indexed pages, crawl errors)
- [ ] Track GA4 metrics (organic traffic, bounce rate, session duration)
- [ ] Analyze top-performing keywords (Google Search Console)
- [ ] Adjust content based on search intent gaps
- [ ] Respond to Product Hunt feedback
- [ ] Plan month 2 SEO (blog content, case studies)

---

## Tools & Setup

### Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: https://arabic-skill.vercel.app
3. Verify via DNS record (recommended for Vercel)
4. Submit sitemap.xml
5. Monitor indexing, crawl errors, click data

### Vercel Analytics
1. Dashboard → Settings → Analytics
2. Enable Web Analytics
3. Monitor metrics: LCP, CLS, FID
4. Set alerts for performance regressions

### Google Analytics 4
1. Create GA4 property: https://analytics.google.com
2. Add tracking code to `website/app/layout.tsx`:
```typescript
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```
3. Monitor: traffic source, landing pages, bounce rate

---

## Next Steps

1. ✅ Week 1: Run Lighthouse → implement technical SEO
2. ✅ Week 2: Content optimization + Core Web Vitals tuning
3. ✅ Week 3: Backlinks & PR submissions
4. ✅ Week 4: Monitor & iterate

---

**Target Outcome:** Lighthouse ≥90, 500+ monthly organic visitors by 2026-08-20

**After 9A-2:** Move to 9A-3 (Blog & Case Studies) to expand organic reach
