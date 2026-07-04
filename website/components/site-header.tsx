import Link from "next/link";
import { navLinks } from "@/lib/site-meta";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm">
      <div className="container-site flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="text-lg font-semibold text-[var(--fg)] hover:text-[var(--brand)] transition-colors"
        >
          مهارة العربية
        </Link>
        <nav className="hidden lg:flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--fg-muted)] hover:text-[var(--brand)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/install" className="btn-primary text-sm shrink-0">
          ثبّت المهارة
        </Link>
      </div>
    </header>
  );
}
