import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] py-8 text-sm text-[var(--fg-muted)]">
      <div className="container-site">
        <p>
          اتبنى بـ <code dir="ltr">/arabic</code> ·{" "}
          <Link href="/about" className="text-[var(--brand)]">
            إزاي اتبنى؟
          </Link>
          {" · "}
          <a
            href="https://github.com/mediabubble-adv/arabic-skill"
            className="text-[var(--brand)]"
          >
            GitHub
          </a>
          {" · "}
          <Link href="/docs" className="text-[var(--brand)]">
            الوثائق
          </Link>
        </p>
      </div>
    </footer>
  );
}
