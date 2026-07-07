import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ModeFlow } from "@/components/mode-flow";
import { BeforeAfterCard } from "@/components/before-after-card";
import { InstallCta } from "@/components/install-cta";
import { StickyInstallBar } from "@/components/sticky-install-bar";
import { StatStrip } from "@/components/stat-strip";
import { CopyBlock } from "@/components/copy-block";
import { siteMeta } from "@/lib/site-meta";
import { PRIMARY_INSTALL } from "@/lib/install-commands";

export const metadata: Metadata = {
  title: siteMeta["/"].title,
  description: siteMeta["/"].description,
};

const bento = [
  {
    title: "محتوى",
    desc: "منشورات، إعلانات، صفحات هبوط، مدونات، سكريبتات",
    span: false,
  },
  {
    title: "لهجات",
    desc: "١١+ لهجة. مصري أولاً.",
    span: false,
  },
  {
    title: "تأنيس",
    desc: "بيشيل أسلوب الترجمة والجمل اللي شكلها AI",
    span: true,
  },
  {
    title: "مشروع",
    desc: "/arabic auto بيمسح المشروع ويشرحه بعربي يفهمه أي حد",
    span: false,
  },
];

const tools = [
  "Cursor",
  "Claude",
  "Codex",
  "ChatGPT",
  "Gemini",
  "Qwen",
  "Windsurf",
  "VS Code",
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="hero-panel section-gap max-w-4xl">
        <p className="text-[var(--brand)] text-sm font-medium mb-3">
          Awesome Arabic Skill
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--fg)] leading-tight mb-4 max-w-2xl">
          شريكك المصري لكتابة المحتوى جوه أدوات الذكاء الاصطناعي
        </h1>
        <p className="text-lg text-[var(--fg-muted)] mb-2 max-w-xl">
          بيقرأ السياق، يوضّح الفكرة، يوصي بالاتجاه، يكتب، ويراجع — قبل ما
          يسلّم.
        </p>
        <p className="text-lg font-semibold text-[var(--accent)] mb-6">
          مش مجرد ترجمة.
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/install" className="btn-primary">
            ثبّت المهارة
          </Link>
          <Link href="/examples" className="btn-secondary">
            شوف أمثلة
          </Link>
        </div>
        <div className="max-w-xl">
          <p className="text-xs text-[var(--fg-muted)] mb-2">معاينة حية</p>
          <CopyBlock text={PRIMARY_INSTALL} />
        </div>
      </section>

      <StatStrip />

      <section className="section-gap">
        <h2 className="text-xl font-semibold text-[var(--fg)] mb-4">
          المسار الافتراضي
        </h2>
        <ModeFlow />
      </section>

      <section className="section-gap">
        <h2 className="text-xl font-semibold text-[var(--fg)] mb-4">
          قبل وبعد
        </h2>
        <BeforeAfterCard
          before="اكتشف كيف يمكن لمهارة العربية أن تساعدك في إنشاء محتوى عربي احترافي."
          after="المهارة دي شريكك جوه الـ IDE — بتفهم السياق وتكتب مصري من غير ما تحس إنها ترجمة."
        />
      </section>

      <section className="section-gap">
        <h2 className="text-xl font-semibold text-[var(--fg)] mb-6">
          ليه المهارة دي؟
        </h2>
        <div className="bento-grid">
          {bento.map((item) => (
            <div
              key={item.title}
              className={`card ${item.span ? "bento-span-2" : ""}`}
            >
              <h3 className="font-semibold text-[var(--fg)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--fg-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-gap overflow-hidden">
        <p className="text-sm text-[var(--fg-muted)] mb-3">أدوات مدعومة</p>
        <div className="flex flex-wrap gap-3 text-sm text-[var(--fg-muted)]">
          {tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-[var(--border)] px-3 py-1"
            >
              {tool}
            </span>
          ))}
          <span className="rounded-full border border-[var(--brand)] px-3 py-1 text-[var(--brand)]">
            +14 أداة
          </span>
        </div>
      </section>

      <InstallCta
        heading="ثبّت المهارة"
        sub="سطر واحد من التيرمنال وإنت جاهز."
      />
      <StickyInstallBar />
    </PageShell>
  );
}
