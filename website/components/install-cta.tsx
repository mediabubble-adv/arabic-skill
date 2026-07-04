import Link from "next/link";

export function InstallCta({
  heading = "جاهز تجرّب؟",
  sub = "سطر واحد من التيرمنال — وابدأ بـ /arabic guide",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="my-16 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-8 text-center">
      <h2 className="text-2xl font-semibold text-[var(--fg)] mb-2">{heading}</h2>
      <p className="text-[var(--fg-muted)] mb-6">{sub}</p>
      <Link href="/install" className="btn-primary">
        ثبّت المهارة
      </Link>
    </section>
  );
}
