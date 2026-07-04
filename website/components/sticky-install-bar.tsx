"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function StickyInstallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 320);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm p-3 md:hidden">
      <div className="container-site flex items-center justify-between gap-3">
        <p className="text-sm text-[var(--fg-muted)] truncate">
          ثبّت في دقيقة
        </p>
        <Link href="/install" className="btn-primary text-sm shrink-0">
          ثبّت المهارة
        </Link>
      </div>
    </div>
  );
}
