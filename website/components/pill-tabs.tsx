"use client";

import { useRef } from "react";

export type PillTab = { id: string; label: string };

export function PillTabs({
  tabs,
  activeId,
  onChange,
  size = "md",
  ariaLabel,
  testId,
}: {
  tabs: readonly PillTab[];
  activeId: string;
  onChange: (id: string) => void;
  size?: "sm" | "md";
  ariaLabel: string;
  testId?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    let next = index;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = index + 1;
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") next = index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    next = (next + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    refs.current[next]?.focus();
  }

  const pad = size === "sm" ? "px-3 py-1.5" : "px-4 py-2";

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      data-testid={testId}
      className="flex flex-wrap gap-2"
    >
      {tabs.map((tab, i) => {
        const selected = tab.id === activeId;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`rounded-md ${pad} text-sm font-medium transition-colors ${
              selected
                ? "bg-[var(--brand)] text-[var(--bg)]"
                : "border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--brand)]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
