import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { InstallCta } from "@/components/install-cta";
import { NewsletterForm } from "@/app/components/NewsletterForm";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/newsletter"].title,
  description: siteMeta["/newsletter"].description,
};

export default function NewsletterPage() {
  return (
    <PageShell>
      <PageHero title="خليك متابع">
        <p>نشرة شهرية: إصدارات جديدة، أمثلة من المجتمع، ونصايح محتوى عربي.</p>
        <p className="text-sm mt-2">
          إيميل واحد في الشهر. من غير سبام. إلغاء الاشتراك في أي وقت.
        </p>
      </PageHero>

      <section className="section-gap max-w-md mx-auto card">
        <h2 className="text-xl font-semibold text-[var(--fg)] mb-6 text-center">
          اشترك
        </h2>
        <NewsletterForm />
      </section>

      <section className="section-gap max-w-3xl mx-auto">
        <h2 className="section-heading text-xl md:text-2xl font-semibold text-[var(--fg)]">
          إيه اللي هيوصلك؟
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="font-semibold text-[var(--fg)] mb-2">إصدارات جديدة</h3>
            <p className="text-sm text-[var(--fg-muted)]">
              آخر الميزات والإصلاحات في المهارة.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-[var(--fg)] mb-2">من المجتمع</h3>
            <p className="text-sm text-[var(--fg-muted)]">
              أمثلة حقيقية من فرق بتكتب عربي.
            </p>
          </div>
          <div className="card">
            <h3 className="font-semibold text-[var(--fg)] mb-2">نصايح عملية</h3>
            <p className="text-sm text-[var(--fg-muted)]">
              لهجات، presets، وتدقيق RTL.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center text-sm text-[var(--fg-muted)] mb-10">
        <p>
          عندك سؤال؟{" "}
          <a
            href="https://github.com/mediabubble-adv/arabic-skill/discussions"
            className="text-[var(--brand)] hover:underline"
          >
            GitHub Discussions
          </a>
        </p>
        <p className="mt-3">
          أو ابدأ بالتثبيت من{" "}
          <Link href="/install" className="text-[var(--brand)] hover:underline">
            هنا
          </Link>
          .
        </p>
      </section>

      <InstallCta />
    </PageShell>
  );
}
