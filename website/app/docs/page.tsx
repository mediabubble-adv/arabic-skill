import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { CopyBlock } from "@/components/copy-block";
import { InstallCta } from "@/components/install-cta";
import { PRIMARY_INSTALL } from "@/lib/install-commands";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/docs"].title,
  description: siteMeta["/docs"].description,
};

export default function DocsPage() {
  return (
    <PageShell>
      <PageHero title="الوثائق والمصادر">
        <p>
          النسخة الكاملة على GitHub. هنا ملخص سريع، وابدأ بـ{" "}
          <strong className="text-[var(--fg)]">ثبّت المهارة</strong>.
        </p>
      </PageHero>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="card">
          <h2 className="font-semibold text-[var(--fg)] mb-2">بدء سريع</h2>
          <p className="text-sm text-[var(--fg-muted)] mb-3">
            ← <Link href="/install">التثبيت</Link> (G14 من README)
          </p>
        </div>
        <div className="card">
          <h2 className="font-semibold text-[var(--fg)] mb-2">أوامر</h2>
          <p className="text-sm text-[var(--fg-muted)]">
            ← <Link href="/commands">سطح الأوامر</Link> (/arabic guide وغيره)
          </p>
        </div>
        <div className="card">
          <h2 className="font-semibold text-[var(--fg)] mb-2">أدوات مدعومة</h2>
          <p className="text-sm text-[var(--fg-muted)]">
            ٢٤ أداة: Cursor، Claude، Codex، ChatGPT، Gemini، Qwen، Windsurf، VS
            Code، وغيرهم.{" "}
            <a
              href="https://github.com/mediabubble-adv/arabic-skill/tree/main/docs/supported"
              className="text-[var(--brand)]"
            >
              فهرس الأدوات
            </a>
          </p>
        </div>
        <div className="card">
          <h2 className="font-semibold text-[var(--fg)] mb-2">GitHub</h2>
          <ul className="text-sm text-[var(--fg-muted)] space-y-1">
            <li>
              <a
                href="https://github.com/mediabubble-adv/arabic-skill/blob/main/README.md"
                className="text-[var(--brand)]"
              >
                README
              </a>
            </li>
            <li>
              <a
                href="https://github.com/mediabubble-adv/arabic-skill/blob/main/CHANGELOG.md"
                className="text-[var(--brand)]"
              >
                CHANGELOG
              </a>{" "}
              (1.1.0)
            </li>
            <li>
              <a
                href="https://github.com/mediabubble-adv/arabic-skill/blob/main/CONTRIBUTING.md"
                className="text-[var(--brand)]"
              >
                مساهمة
              </a>
            </li>
          </ul>
        </div>
      </div>

      <section className="mb-10 max-w-2xl mx-auto">
        <h2 className="section-heading text-xl md:text-2xl font-semibold text-[var(--fg)]">
          تثبيت (G14)
        </h2>
        <CopyBlock text={PRIMARY_INSTALL} />
      </section>

      <InstallCta
        heading="ثبّت المهارة"
        sub="ثم ارجع للوثائق الكاملة على GitHub."
      />
    </PageShell>
  );
}
