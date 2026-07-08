import type { ReactNode } from "react";

export function PageHero({
  title,
  children,
  className = "",
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`page-hero ${className}`.trim()}>
      <h1 className="page-hero-title">{title}</h1>
      {children ? <div className="page-hero-lead">{children}</div> : null}
    </header>
  );
}
