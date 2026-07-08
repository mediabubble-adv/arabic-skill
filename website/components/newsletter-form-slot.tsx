"use client";

import dynamic from "next/dynamic";

const NewsletterForm = dynamic(
  () => import("@/app/components/NewsletterForm").then((m) => m.NewsletterForm),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-40 max-w-md animate-pulse rounded-md bg-[var(--bg-elev)]"
        aria-hidden
      />
    ),
  },
);

export function NewsletterFormSlot() {
  return <NewsletterForm />;
}
