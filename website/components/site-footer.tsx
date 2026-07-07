import Link from "next/link";
import { NewsletterForm } from "@/app/components/NewsletterForm";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] py-12 text-sm text-[var(--fg-muted)]">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-[var(--fg)] mb-4">خليك متابع</h3>
            <p className="text-xs mb-4">
              نشرة شهرية: إصدارات جديدة، أمثلة من المجتمع، ونصايح محتوى عربي.
            </p>
            <NewsletterForm />
          </div>

          <div>
            <h3 className="font-semibold text-[var(--fg)] mb-4">المجتمع</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/mediabubble-adv/arabic-skill/discussions"
                  className="text-[var(--brand)] hover:underline"
                >
                  GitHub Discussions
                </a>
              </li>
              <li>
                <Link href="/newsletter" className="text-[var(--brand)] hover:underline">
                  أرشيف النشرة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--fg)] mb-4">مصادر</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-[var(--brand)] hover:underline">
                  الوثائق
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[var(--brand)] hover:underline">
                  المدونة
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[var(--brand)] hover:underline">
                  إزاي اتبنى؟
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/mediabubble-adv/arabic-skill"
                  className="text-[var(--brand)] hover:underline"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-6 text-xs">
          <p>
            اتبنى بـ <code dir="ltr">/arabic</code> · © 2026 MediaBubble ·{" "}
            <Link href="/privacy" className="text-[var(--brand)] hover:underline">
              الخصوصية
            </Link>
            {" · "}
            <Link href="/terms" className="text-[var(--brand)] hover:underline">
              الشروط
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
