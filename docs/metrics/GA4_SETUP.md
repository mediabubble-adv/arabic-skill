# Google Analytics 4 (GA4) Setup Guide

**Goal:** Track website traffic, user behavior, and conversion funnel for Awesome Arabic Skill install site (https://arabic-skill.vercel.app)

---

## Prerequisites

- Google account (gmail.com)
- Admin access to Vercel project
- Access to repository to add environment variables

---

## Step 1: Create GA4 Property (If Not Existing)

### 1.1 Go to Google Analytics
1. Visit https://analytics.google.com
2. Sign in with your Google account
3. Click **"Admin"** (bottom left)
4. Under **"Account"** column, select or create account: `Awesome Arabic Skill`

### 1.2 Create Property
1. In **"Property"** column, click **"Create Property"**
2. Fill in:
   - **Property name:** `Arabic Skill Website`
   - **Reporting timezone:** UTC (or your timezone)
   - **Currency:** USD
3. Click **"Create"**

### 1.3 Select Industry & Business Details
- **Industry category:** Technology (or Software & SaaS)
- **Business size:** Small
- **Primary business objective:** [ ] Acquire customers [ ] Engage users [ ] Understand customers
4. Click **"Create"** again

### 1.4 Get Measurement ID
1. In the left sidebar, go to **"Data collection"** → **"Web"**
2. You'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
3. **Copy this ID** — you'll need it in Step 2

---

## Step 2: Add Tracking ID to Next.js Site

### 2.1 Set Environment Variable

**File:** `.env.local` (at root of `website/` directory)

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID from Step 1.4.

### 2.2 Update Layout (if using Google Analytics library)

**File:** `website/app/layout.tsx`

If not already present, add Google Analytics:

```typescript
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 2.3 Deploy Changes

```bash
git add website/app/layout.tsx .env.local
git commit -m "feat(analytics): Add GA4 tracking to install site"
git push origin main
```

Wait for Vercel deployment to complete (~2 min).

---

## Step 3: Verify Tracking is Working

### 3.1 Check in Browser Console

1. Visit https://arabic-skill.vercel.app
2. Open DevTools: **F12** → **Console** tab
3. Type: `window.dataLayer` and press Enter
4. You should see an array with GA events
5. Look for: `["config", "G-XXXXXXXXXX"]`

### 3.2 Check in GA4 Realtime Report

1. Go to https://analytics.google.com
2. Select your property: `Arabic Skill Website`
3. In left sidebar, go to **"Reports"** → **"Realtime"**
4. Visit the website (https://arabic-skill.vercel.app)
5. You should see **"Active users: 1"** or more in the Realtime dashboard

If you see data, **✅ GA4 is working!**

---

## Step 4: Set Up Custom Events

### 4.1 Event Tracking (Optional but Recommended)

Add these events to track key user actions:

**File:** `website/app/components/TrackingEvents.tsx`

```typescript
'use client';

export function trackEvent(name: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params);
  }
}

// Usage in components:
// import { trackEvent } from '@/app/components/TrackingEvents'
// trackEvent('install_click', { tool: 'cursor', url: '/install' })
```

### 4.2 Track Installation Button Clicks

**Example: Add to install button component**

```typescript
const handleInstallClick = () => {
  trackEvent('install_click', { 
    tool: 'cursor',
    source: 'homepage'
  });
  // ... rest of click handler
};
```

### 4.3 Common Events to Track

- `install_click` — User clicked install button
- `copy_command` — User copied npm command
- `blog_read` — User scrolled to 50% of blog post
- `docs_search` — User searched documentation
- `discord_join` — User clicked Discord link
- `newsletter_signup` — User subscribed to newsletter

---

## Step 5: Set Up GA4 Dashboards & Reports

### 5.1 Create Traffic Dashboard

1. Go to https://analytics.google.com
2. Select your property: `Arabic Skill Website`
3. Click **"Reports"** (left sidebar)
4. Under **"Life cycle"**, click **"Acquisition"** → **"Traffic acquisition"**
5. You'll see:
   - Sessions by traffic source
   - New vs. returning users
   - Device breakdown

### 5.2 Create Conversion Goals

1. In GA4, go to **"Admin"** → **"Events"**
2. Look for these events (auto-tracked):
   - `page_view` (automatic)
   - `user_engagement` (automatic)
3. For custom events, go to **"Conversions"** and add:
   - **Event name:** `install_click`
   - Mark as conversion (toggles the checkbox)
4. Repeat for: `copy_command`, `blog_read`, `newsletter_signup`

### 5.3 Set Up Conversion Funnel

1. Go to **"Reports"** → **"Engagement"** → **"Funnels"**
2. Create a new funnel:
   - **Step 1:** Page view: `/` (landing page)
   - **Step 2:** Page view: `/install`
   - **Step 3:** Event: `copy_command`
3. Name it: **"Install Conversion Funnel"**
4. Save

---

## Step 6: Weekly Reporting

### 6.1 Export Weekly Data

1. Every Sunday at 6 PM UTC, manually export:
   - **Traffic summary:** Acquisition → Traffic acquisition
   - **Top pages:** Engagement → Pages and screens
   - **Conversions:** Conversion funnel

2. Or set up **scheduled email reports:**
   - Go to **"Admin"** → **"Email subscriptions"**
   - Click **"Create subscription"**
   - Choose frequency: **Weekly**
   - Select metrics: Sessions, Bounce rate, Conversion rate
   - Email: [team-email@...]

### 6.2 Update Weekly Metrics Report

1. Copy data from GA4
2. Paste into: `docs/metrics/weekly-report-[YYYY-MM-DD].md`
3. Commit and push

---

## Troubleshooting

### No data showing in GA4 Realtime

**Problem:** GA4 says "No active users"

**Solution:**
1. Check that Measurement ID is correct in `.env.local`
2. Verify site is deployed (check Vercel deployment status)
3. Clear browser cache: **Ctrl+Shift+Delete** → Clear browsing data
4. Reload the site and wait 30 seconds
5. Check browser console for errors (`F12` → Console)

### Events not firing

**Problem:** Custom events (like `install_click`) don't appear in GA4

**Solution:**
1. Verify `trackEvent()` function is called in component
2. Check browser console for JavaScript errors
3. Wait 24-48 hours (GA4 takes time to process data)
4. Check GA4 **"Events"** tab to see all fired events

### Wrong property selected

**Problem:** Data is going to the wrong GA4 property

**Solution:**
1. Verify Measurement ID in `.env.local`
2. In GA4 Admin, confirm you're looking at the right property: `Arabic Skill Website`
3. Double-check the `G-` ID matches

---

## References

- **GA4 Setup:** https://developers.google.com/analytics/devguides/collection/ga4
- **Next.js GA4 Integration:** https://nextjs.org/docs/app/building-your-application/integrations/google-analytics
- **GA4 Events:** https://support.google.com/analytics/answer/11396839
- **Conversion Tracking:** https://support.google.com/analytics/answer/9268998

---

## Next Steps

1. ✅ Create GA4 property
2. ✅ Add Measurement ID to `.env.local`
3. ✅ Deploy site with GA4 tracking
4. ✅ Verify realtime data
5. ✅ Set up custom events (optional)
6. ✅ Create dashboards
7. ⏳ Start collecting weekly reports

---

**GA4 Property:** `Arabic Skill Website`  
**Measurement ID:** `G-[YOUR-ID]`  
**Site:** https://arabic-skill.vercel.app  
**Dashboard:** https://analytics.google.com

**Related:** docs/metrics/weekly-report-template.md, docs/planning/9a5-marketing-metrics.md
