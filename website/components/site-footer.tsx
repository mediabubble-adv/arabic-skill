import Link from "next/link";
import { NewsletterFormSlot } from "@/components/newsletter-form-slot";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] py-12 text-sm text-[var(--fg-muted)]">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-[var(--fg)] mb-4">تابع التحديثات</h3>
            <p className="text-xs mb-4">
              نشرة شهرية: إصدارات جديدة، أمثلة من المجتمع، ونصائح محتوى عربي.
            </p>
            <NewsletterFormSlot />
          </div>

          <div>
            <h3 className="font-semibold text-[var(--fg)] mb-4">المجتمع</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://discord.gg/cjhhJFF5N"
                  className="nav-link text-[var(--brand)] hover:underline rounded-sm"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/mediabubble-adv/arabic-skill/discussions"
                  className="nav-link text-[var(--brand)] hover:underline rounded-sm"
                >
                  GitHub Discussions
                </a>
              </li>
              <li>
                <Link href="/newsletter" className="nav-link text-[var(--brand)] hover:underline rounded-sm">
                  أرشيف النشرة
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--fg)] mb-4">مصادر</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="nav-link text-[var(--brand)] hover:underline rounded-sm">
                  الوثائق
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="nav-link text-[var(--brand)] hover:underline rounded-sm">
                  النشرة
                </Link>
              </li>
              <li>
                <Link href="/about" className="nav-link text-[var(--brand)] hover:underline rounded-sm">
                  إزاي اتبنى؟
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/mediabubble-adv/arabic-skill"
                  className="nav-link text-[var(--brand)] hover:underline rounded-sm"
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
            <Link href="/privacy" className="nav-link text-[var(--brand)] hover:underline rounded-sm">
              الخصوصية
            </Link>
            {" · "}
            <Link href="/terms" className="nav-link text-[var(--brand)] hover:underline rounded-sm">
              الشروط
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
