"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HERO_INSTALL_SNIPPET } from "@/lib/install-commands";

const DISMISS_KEY = "install-bar-dismissed";

export function StickyInstallBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) === "1") {
      setDismissed(true);
      return;
    }
    function onScroll() {
      setVisible(window.scrollY > 320);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || dismissed) return null;

  async function copy() {
    await navigator.clipboard.writeText(HERO_INSTALL_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  return (
    <div
      data-testid="sticky-install-bar"
      className="fixed bottom-0 inset-x-0 z-50 border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm p-3 md:hidden"
    >
      <div className="container-site flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={dismiss}
          aria-label="إخفاء الشريط"
          className="shrink-0 inline-flex items-center justify-center size-11 text-[var(--fg-muted)] hover:text-[var(--fg)] text-lg leading-none focus-ring rounded-md"
        >
          ×
        </button>
        <Link
          href="/install"
          data-testid="sticky-install-link"
          aria-label="كل أوامر التثبيت"
          className="text-sm text-[var(--fg-muted)] underline underline-offset-2 truncate"
        >
          كل أوامر التثبيت
        </Link>
        <button
          type="button"
          onClick={copy}
          className="btn-primary text-sm shrink-0"
          aria-label="انسخ أمر التثبيت"
        >
          {copied ? "اتنسخ ✓" : "انسخ أمر التثبيت"}
        </button>
      </div>
    </div>
  );
}
