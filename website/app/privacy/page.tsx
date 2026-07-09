import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/privacy"].title,
  description: siteMeta["/privacy"].description,
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero title="سياسة الخصوصية">
        <p>آخر تحديث: يوليو ٢٠٢٦</p>
      </PageHero>
      <article className="prose-site max-w-3xl mx-auto">
        <h2>البيانات التي نجمعها</h2>
        <p>
          نموذج النشرة يجمع بريدك الإلكتروني ونوع الاشتراك (مطور / صانع محتوى /
          فريق) عند الاشتراك طوعًا. لا توجد حسابات مستخدمين على الموقع.
        </p>
        <h2>الاستخدام</h2>
        <p>
          تُستخدم البيانات لإرسال النشرة الشهرية وتحسين المحتوى. لا نبيع بياناتك
          لطرف ثالث.
        </p>
        <h2>التحليلات</h2>
        <p>
          قد نستخدم تحليلات مجمّعة (مثل Vercel Analytics) من غير ربطها بهوية
          شخصية إلا إذا نصّت الإعدادات على غير ذلك.
        </p>
        <h2>تواصل</h2>
        <p>
          لأي استفسار عن الخصوصية، افتح issue على{" "}
          <a href="https://github.com/mediabubble-adv/arabic-skill">GitHub</a>.
        </p>
      </article>
    </PageShell>
  );
}
