import Link from "next/link";
import { NewsletterForm } from "@/app/components/NewsletterForm";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] py-12 text-sm text-[var(--fg-muted)]">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Newsletter Signup */}
          <div>
            <h3 className="font-semibold text-[var(--fg)] mb-4">
              Stay Updated
            </h3>
            <p className="text-xs mb-4">
              Monthly release notes, user spotlights, and Arabic content tips.
            </p>
            <NewsletterForm />
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-semibold text-[var(--fg)] mb-4">
              Community
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://discord.gg/[invite-code]"
                  className="text-[var(--brand)] hover:underline"
                >
                  Discord Server
                </a>
              </li>
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
                  Newsletter Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-[var(--fg)] mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-[var(--brand)] hover:underline">
                  الوثائق
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[var(--brand)] hover:underline">
                  Blog
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

        {/* Bottom Footer */}
        <div className="border-t border-[var(--border)] pt-6 mt-6 text-xs">
          <p>
            اتبنى بـ <code dir="ltr">/arabic</code> · © 2026 MediaBubble ·{" "}
            <Link href="/privacy" className="text-[var(--brand)] hover:underline">
              Privacy
            </Link>
            {" · "}
            <Link href="/terms" className="text-[var(--brand)] hover:underline">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
