export function SectionHeading({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <header className={`section-heading ${className}`}>
      <h2 className="text-xl md:text-2xl font-semibold text-[var(--fg)]">{title}</h2>
      {subtitle && (
        <p className="text-sm text-[var(--fg-muted)] mt-2 max-w-2xl">{subtitle}</p>
      )}
    </header>
  );
}
