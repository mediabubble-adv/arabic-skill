"use client";

import { useState } from "react";

const STEPS = [
  {
    id: "guide",
    label: "استشارة",
    desc: "يفهم طلبك ويوضّح الفكرة قبل ما يكتب حرف",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4z"
      />
    ),
  },
  {
    id: "clarify",
    label: "توضيح",
    desc: "يسأل عن اللي ناقص: الجمهور، اللهجة، المنصة",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    id: "recommend",
    label: "توصية",
    desc: "يقترح اتجاه وزاوية قبل ما يبدأ الكتابة",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    ),
  },
  {
    id: "write",
    label: "كتابة",
    desc: "يولّد المحتوى باللهجة والصيغة المطلوبة",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    ),
  },
  {
    id: "review",
    label: "مراجعة",
    desc: "يراجع التأنيس والـ RTL قبل التسليم",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
] as const;

export function ModeFlow() {
  const [active, setActive] = useState<string>(STEPS[0].id);
  const current = STEPS.find((s) => s.id === active) ?? STEPS[0];
  const activeIndex = STEPS.findIndex((s) => s.id === active);

  return (
    <div className="mode-flow">
      <ol className="mode-flow-track" aria-label="مراحل المسار الافتراضي">
        {STEPS.map((step, i) => {
          const isActive = step.id === active;
          const isPast = i < activeIndex;
          return (
            <li key={step.id} className="mode-flow-step">
              {i > 0 && (
                <span
                  className={`mode-flow-connector ${isPast || isActive ? "mode-flow-connector-active" : ""}`}
                  aria-hidden
                />
              )}
              <button
                type="button"
                className={`mode-flow-btn ${isActive ? "mode-flow-btn-active" : ""} ${isPast ? "mode-flow-btn-done" : ""}`}
                aria-current={isActive ? "step" : undefined}
                onClick={() => setActive(step.id)}
              >
                <span className="mode-flow-icon" aria-hidden>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    {step.icon}
                  </svg>
                </span>
                <span className="mode-flow-label">{step.label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mode-flow-detail card" role="region" aria-live="polite" aria-label="تفاصيل الخطوة الحالية">
        <p className="text-xs text-[var(--brand)] font-medium mb-1">
          الخطوة {activeIndex + 1} من {STEPS.length}
        </p>
        <p className="text-lg font-semibold text-[var(--fg)]">{current.label}</p>
        <p className="text-sm text-[var(--fg-muted)] mt-2 leading-relaxed">
          {current.desc}
        </p>
      </div>
    </div>
  );
}
