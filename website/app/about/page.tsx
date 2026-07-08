import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { InstallCta } from "@/components/install-cta";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/about"].title,
  description: siteMeta["/about"].description,
};

const commandTrail = [
  "/arabic plan website --dialect masri",
  "/arabic write page --brief .arabic/briefs/website-home.yaml",
  "/arabic write page --brief .arabic/briefs/website-install.yaml",
  "/arabic write page --brief .arabic/briefs/website-features.yaml",
  "/arabic write page --brief .arabic/briefs/website-commands.yaml",
  "/arabic write page --brief .arabic/briefs/website-tutorials.yaml",
  "/arabic write page --brief .arabic/briefs/website-examples.yaml",
  "/arabic write page --brief .arabic/briefs/website-about.yaml",
  "/arabic write page --brief .arabic/briefs/website-docs.yaml",
  "/arabic audit website/content --dialect masri",
];

const auditPages = [
  { page: "home", score: "17/18", note: "مش مجرد ترجمة ✓" },
  { page: "install", score: "16/18", note: "fork + FAQ (AEO)" },
  { page: "features", score: "17/18", note: "·" },
  { page: "commands", score: "18/18", note: "أقوى نبرة dev" },
  { page: "tutorials", score: "16/18", note: "·" },
  { page: "examples", score: "17/18", note: "«قبل» متعمد MSA" },
  { page: "about", score: "17/18", note: "meta/dogfood متوقع" },
  { page: "docs", score: "18/18", note: "·" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero title="لماذا مهارة العربية الرائعة؟">
        <p>
          وكالة محتوى عربي داخل الـ IDE. تستشير قبل الكتابة.{" "}
          <strong className="text-[var(--fg)]">مش مجرد ترجمة.</strong>
        </p>
      </PageHero>

      <section className="mb-10">
        <h2 className="section-heading text-xl md:text-2xl font-semibold text-[var(--fg)]">
          مسار البناء (dogfood)
        </h2>
        <pre
          className="rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] p-4 text-sm text-[var(--fg-muted)] overflow-x-auto"
          dir="ltr"
        >
          plan → briefs → write → audit → Next.js port → deploy
        </pre>
        <p className="text-sm text-[var(--fg-muted)] mt-3 text-center max-w-2xl mx-auto">
          كل نص عربي على الموقع ناتج عن /arabic write على أدلة من الريبو. مفيش
          copywriter خارجي.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="section-heading text-xl md:text-2xl font-semibold text-[var(--fg)]">
          مسار الأوامر (frozen)
        </h2>
        <pre
          className="rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] p-4 text-xs md:text-sm text-[var(--fg-muted)] overflow-x-auto leading-relaxed"
          dir="ltr"
        >
          {commandTrail.join("\n")}
        </pre>
      </section>

      <section className="mb-10 card">
        <h2 className="text-xl font-semibold text-[var(--fg)] mb-2 text-center">
          ملخص التدقيق (G16 — frozen)
        </h2>
        <p className="text-sm text-[var(--fg-muted)] mb-4 text-center">
          Snapshot date: 2026-07-04 · Register: L3 Masri · Verdict: PUBLISH
        </p>
        <p className="text-lg font-semibold text-[var(--brand)] mb-4 text-center">
          Overall: 17/18 ✅ PASS
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-right py-2 text-[var(--fg)]">الصفحة</th>
                <th className="text-right py-2 text-[var(--fg)]">النتيجة</th>
                <th className="text-right py-2 text-[var(--fg)]">ملاحظة</th>
              </tr>
            </thead>
            <tbody>
              {auditPages.map((row) => (
                <tr
                  key={row.page}
                  className="border-b border-[var(--border)] text-[var(--fg-muted)]"
                >
                  <td className="py-2">{row.page}</td>
                  <td className="py-2">{row.score}</td>
                  <td className="py-2">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-4 text-sm text-[var(--fg-muted)] space-y-1">
          <li>
            <strong className="text-[var(--fg)]">Legacy register:</strong> clean
            · مفيش MSA جامد في UI
          </li>
          <li>
            <strong className="text-[var(--fg)]">AI-likelihood:</strong>{" "}
            low–medium · FAQ/bento متوازية (AEO by design)
          </li>
          <li>
            <strong className="text-[var(--fg)]">Brand ledger:</strong> المهارة ·
            ثبّت المهارة · مش مجرد ترجمة ✓
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="section-heading text-xl md:text-2xl font-semibold text-[var(--fg)]">
          مصادر
        </h2>
        <ul className="text-sm text-[var(--fg-muted)] space-y-2 max-w-xl mx-auto">
          <li>
            <a
              href="https://github.com/mediabubble-adv/arabic-skill/blob/main/docs/planning/website-dogfood.md"
              className="text-[var(--brand)]"
            >
              website-dogfood.md
            </a>{" "}
            (sitemap + G13–G18)
          </li>
          <li>
            <a
              href="https://github.com/mediabubble-adv/arabic-skill/blob/main/arabic/SKILL.md"
              className="text-[var(--brand)]"
            >
              SKILL.md
            </a>{" "}
            (runtime behavior)
          </li>
        </ul>
      </section>

      <section className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-[var(--fg)] mb-2">
          MediaBubble
        </h2>
        <p className="text-[var(--fg-muted)]">
          منتج من MediaBubble — شريك محتوى عربي للفرق التي تبني بأدوات AI. الموقع
          نفسه إثبات: اتبنى بـ /arabic، اتدقق، واتنشر.
        </p>
      </section>

      <InstallCta />
    </PageShell>
  );
}
