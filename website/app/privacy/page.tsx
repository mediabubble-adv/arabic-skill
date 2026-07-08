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
        <h2>البيانات اللي بنجمعها</h2>
        <p>
          نموذج النشرة بيجمع بريدك الإلكتروني ونوع الاشتراك (مطور / صانع محتوى /
          فريق) لو اشتركت طوعاً. مفيش حسابات مستخدمين على الموقع.
        </p>
        <h2>الاستخدام</h2>
        <p>
          البيانات بتستخدم لإرسال النشرة الشهرية وتحسين المحتوى. مش بنبيع بياناتك
          لطرف تالت.
        </p>
        <h2>التحليلات</h2>
        <p>
          ممكن نستخدم تحليلات مجمّعة (زي Vercel Analytics) من غير ما نربطها بهوية
          شخصية إلا لو الإعدادات بتقول كده.
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
