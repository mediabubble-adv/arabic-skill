"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { navLinks, secondaryNavLinks } from "@/lib/site-meta";
import { ThemeToggle } from "./theme-toggle";

const allLinks = [...navLinks.slice(1), ...secondaryNavLinks];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onViewportChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onViewportChange);
    return () => mq.removeEventListener("change", onViewportChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm">
      <div className="container-site flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="text-lg font-semibold text-[var(--fg)] hover:text-[var(--brand)] transition-colors focus-ring rounded-sm"
        >
          مهارة العربية
        </Link>

        <nav
          className="hidden lg:flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
          aria-label="التنقل الرئيسي"
        >
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-[var(--fg-muted)] hover:text-[var(--brand)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <Link href="/install" className="btn-primary text-sm hidden sm:inline-flex">
            ثبّت المهارة
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="lg:hidden inline-flex items-center justify-center size-11 rounded-md border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--brand)] hover:text-[var(--brand)] focus-ring"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "إغلاق" : "القائمة"}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              {open ? (
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-[var(--bg)]/60 lg:hidden"
            aria-label="إغلاق القائمة"
            onClick={() => setOpen(false)}
          />
          <nav
            ref={panelRef}
            id={panelId}
            className="fixed inset-y-0 right-0 z-50 w-[min(100%,18rem)] border-l border-[var(--border)] bg-[var(--bg-elev)] p-6 shadow-2xl lg:hidden flex flex-col gap-1"
            aria-label="قائمة الجوال"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-[var(--fg)]">التنقل</span>
              <button
                ref={closeBtnRef}
                type="button"
                className="inline-flex items-center justify-center size-11 rounded-md text-[var(--fg-muted)] hover:text-[var(--fg)] focus-ring"
                aria-label="إغلاق"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>
            {allLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link rounded-md px-3 py-2.5 text-[var(--fg-muted)] hover:bg-[var(--bg)] hover:text-[var(--brand)] transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/install"
              className="btn-primary mt-6 text-center"
              onClick={() => setOpen(false)}
            >
              ثبّت المهارة
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}
