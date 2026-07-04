"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] overflow-hidden"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-right text-[var(--fg)] font-medium hover:bg-[var(--bg)]/50 transition-colors"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <span className="text-[var(--brand)] text-xl shrink-0">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-[var(--border)] px-4 py-3 text-[var(--fg-muted)] text-sm">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
