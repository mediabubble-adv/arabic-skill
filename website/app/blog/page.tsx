import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { InstallCta } from "@/components/install-cta";
import { getAllPosts } from "@/lib/blog";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/blog"].title,
  description: siteMeta["/blog"].description,
};

const CATEGORY_LABELS: Record<string, string> = {
  Guide: "دليل",
  "Case Study": "حالة استخدام",
  Technical: "تقني",
  Tutorial: "شرح",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <PageShell>
      <header className="section-gap max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--fg)] mb-3">
          المدونة
        </h1>
        <p className="text-[var(--fg-muted)]">
          مقالات عن المحتوى العربي، اللهجات، RTL، وحالات استخدام حقيقية لمهارة
          العربية.
        </p>
      </header>

      <div className="flex flex-wrap gap-2 mb-8">
        <span className="rounded-full bg-[var(--brand)] text-[var(--bg)] px-4 py-1.5 text-sm font-medium">
          الكل
        </span>
        {categories.map((cat) => (
          <span
            key={cat}
            className="rounded-full border border-[var(--border)] px-4 py-1.5 text-sm text-[var(--fg-muted)]"
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </span>
        ))}
      </div>

      <div className="space-y-8 section-gap">
        {posts.map((post) => (
          <article key={post.slug} className="card">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--fg-muted)] mb-3">
              <span>{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readTime}</span>
              <span className="rounded-full border border-[var(--border)] px-2 py-0.5">
                {CATEGORY_LABELS[post.category] ?? post.category}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              <Link
                href={`/blog/posts/${post.slug}`}
                className="text-[var(--fg)] hover:text-[var(--brand)] transition-colors"
              >
                {post.titleAr ?? post.title}
              </Link>
            </h2>
            <p className="text-[var(--fg-muted)] text-sm mb-4 leading-relaxed">
              {post.description}
            </p>
            <Link
              href={`/blog/posts/${post.slug}`}
              className="text-sm text-[var(--brand)] hover:underline"
            >
              اقرأ المقال ←
            </Link>
          </article>
        ))}
      </div>

      <InstallCta
        heading="جاهز تجرّب على مشروعك؟"
        sub="ثبّت المهارة وطبّق اللي قرأته."
      />
    </PageShell>
  );
}
