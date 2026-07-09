"use client";

import { useState } from "react";
import { CopyBlock } from "./copy-block";
import { INSTALL_TABS, WORKSPACE_SCOPE_HINTS } from "@/lib/install-commands";

export function ToolTabs() {
  const [activeId, setActiveId] = useState<(typeof INSTALL_TABS)[number]["id"]>(
    INSTALL_TABS[0].id,
  );
  const active = INSTALL_TABS.find((t) => t.id === activeId) ?? INSTALL_TABS[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="أدوات التثبيت"
        className="flex flex-wrap gap-2 mb-4"
      >
        {INSTALL_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeId === tab.id}
            onClick={() => setActiveId(tab.id)}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeId === tab.id
                ? "bg-[var(--brand)] text-[var(--btn-on-brand)]"
                : "border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--brand)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <CopyBlock text={active.command} />
      {WORKSPACE_SCOPE_HINTS[active.id] ? (
        <p className="text-sm text-[var(--fg-muted)] text-center mt-3">
          <code dir="ltr" className="text-xs">
            {WORKSPACE_SCOPE_HINTS[active.id]}
          </code>
        </p>
      ) : null}
    </div>
  );
}
