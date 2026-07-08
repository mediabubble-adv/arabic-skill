import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ModeFlow } from "@/components/mode-flow";
import { BeforeAfterCard } from "@/components/before-after-card";
import { InstallCta } from "@/components/install-cta";
import { StickyInstallBar } from "@/components/sticky-install-bar";
import { StatStrip } from "@/components/stat-strip";
import { CopyBlock } from "@/components/copy-block";
import { RevealSection } from "@/components/reveal-section";
import { HeroKeyboardBackground } from "@/components/hero-keyboard-bg";
import { ToolsMarquee } from "@/components/tools-marquee";
import { SectionHeading } from "@/components/section-heading";
import { siteMeta } from "@/lib/site-meta";
import { HERO_INSTALL_SNIPPET } from "@/lib/install-commands";

export const metadata: Metadata = {
  title: siteMeta["/"].title,
  description: siteMeta["/"].description,
};

const bento = [
  {
    title: "محتوى",
    desc: "منشورات، إعلانات، صفحات هبوط، مدونات، سكريبتات",
    accent: false,
  },
  {
    title: "لهجات",
    desc: "١١+ لهجة. مصري أولاً.",
    accent: false,
  },
  {
    title: "تأنيس",
    desc: "بيشيل أسلوب الترجمة والجمل اللي شكلها AI",
    accent: true,
  },
  {
    title: "مشروع",
    desc: "/arabic auto بيمسح المشروع ويشرحه بعربي يفهمه أي حد",
    accent: false,
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <RevealSection className="hero-bleed section-gap-loose" delay={0}>
        <div className="hero-stack">
          <div className="container-site hero-head">
            <p className="hero-eyebrow">Awesome Arabic Skill</p>
            <h1 className="hero-title">
              <span className="hero-title-line">شريكك المصري لكتابة المحتوى</span>
              <br />
              <span className="hero-title-line">جوه أدوات الذكاء الاصطناعي</span>
            </h1>
            <p className="hero-tagline hero-tagline--head">مش مجرد ترجمة.</p>
          </div>

          <div className="hero-keyboard-strip" aria-hidden>
            <HeroKeyboardBackground className="hero-keyboard-illustration" />
          </div>

          <div className="container-site hero-body">
            <div className="hero-chips">
              <span className="hero-chip">سهل التثبيت</span>
              <span className="hero-chip">مصري أولاً</span>
              <span className="hero-chip">مفتوح المصدر</span>
            </div>
            <div className="hero-actions">
              <Link href="/install" className="btn-primary">
                ثبّت المهارة
              </Link>
              <Link href="/examples" className="btn-secondary">
                شوف أمثلة
              </Link>
            </div>
            <div className="hero-install-preview">
              <CopyBlock text={HERO_INSTALL_SNIPPET} compact />
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="section-gap tools-section" delay={80}>
        <SectionHeading
          title="أدوات مدعومة"
          subtitle="أدوات مدعومة: Cursor وClaude وCodex وغيرهم. تثبيت تلقائي للأدوات الأساسية، وإعداد يدوي لباقي الأدوات."
          className="section-heading--gap-md"
        />
        <ToolsMarquee />
      </RevealSection>

      <RevealSection className="section-gap-tight" delay={120}>
        <StatStrip />
      </RevealSection>

      <RevealSection className="section-gap-loose" delay={160}>
        <SectionHeading
          title="المسار الافتراضي"
          subtitle="استشارة ثم توضيح ثم توصية ثم كتابة ثم مراجعة. مش كتابة على طول."
          className="section-heading--gap-md"
        />
        <ModeFlow />
      </RevealSection>

      <RevealSection className="section-gap-loose" delay={200}>
        <SectionHeading title="قبل وبعد" className="section-heading--gap-lg" />
        <BeforeAfterCard
          before="اكتشف كيف يمكن لمهارة العربية أن تساعدك في إنشاء محتوى عربي احترافي."
          after="المهارة دي شريكك جوه الـ IDE: بتفهم السياق وتكتب مصري من غير ما تحس إنها ترجمة."
        />
      </RevealSection>

      <RevealSection className="section-gap" delay={240}>
        <SectionHeading title="ليه المهارة دي؟" className="section-heading--gap-lg" />
        <div className="bento-grid">
          {bento.map((item) => (
            <div
              key={item.title}
              className={`card bento-card ${item.accent ? "bento-accent" : ""}`}
            >
              <h3 className="font-semibold text-[var(--fg)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="section-gap" delay={280}>
        <InstallCta
          heading="ثبّت المهارة"
          sub="سطر واحد من التيرمنال وإنت جاهز."
        />
      </RevealSection>

      <StickyInstallBar />
    </PageShell>
  );
}
