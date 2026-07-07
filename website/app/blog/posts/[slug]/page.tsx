import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { MarkdownContent } from "@/components/markdown-content";
import { InstallCta } from "@/components/install-cta";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.titleAr ?? post.meta.title,
    description: post.meta.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageShell>
      <article className="max-w-3xl">
        <p className="text-sm text-[var(--fg-muted)] mb-4">
          <Link href="/blog" className="text-[var(--brand)] hover:underline">
            ← المدونة
          </Link>
        </p>
        <header className="mb-8">
          <div className="flex flex-wrap gap-3 text-xs text-[var(--fg-muted)] mb-3">
            <span>{post.meta.author}</span>
            <span>·</span>
            <time dateTime={post.meta.date}>{post.meta.date}</time>
            <span>·</span>
            <span>{post.meta.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--fg)] mb-3">
            {post.meta.titleAr ?? post.meta.title}
          </h1>
          <p className="text-[var(--fg-muted)]">{post.meta.description}</p>
        </header>
        <MarkdownContent content={post.body} />
      </article>
      <div className="mt-12">
        <InstallCta />
      </div>
    </PageShell>
  );
}
