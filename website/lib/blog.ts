import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "app/blog/posts");
const SAFE_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type BlogPostMeta = {
  slug: string;
  title: string;
  titleAr?: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
};

function isSafeSlug(slug: string): boolean {
  return SAFE_SLUG_RE.test(slug);
}

function parseFrontmatter(raw: string): Record<string, string | string[]> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*"?(.+?)"?\s*$/);
    if (kv) data[kv[1]] = kv[2];
    const arr = line.match(/^keywords:\s*\[(.*)\]/);
    if (arr) {
      data.keywords = arr[1]
        .split(",")
        .map((s) => s.trim().replace(/^"|"$/g, ""));
    }
  }
  return data;
}

function metaFromFrontmatter(slug: string, fm: Record<string, string | string[]>): BlogPostMeta {
  return {
    slug,
    title: String(fm.title ?? slug),
    titleAr: fm.titleAr ? String(fm.titleAr) : undefined,
    description: String(fm.description ?? ""),
    author: String(fm.author ?? "MediaBubble"),
    date: String(fm.date ?? ""),
    readTime: String(fm.readTime ?? ""),
    category: String(fm.category ?? "Guide"),
    tags: Array.isArray(fm.keywords) ? fm.keywords : [],
  };
}

export function getAllPosts(): BlogPostMeta[] {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      if (!isSafeSlug(slug)) return null;
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const fm = parseFrontmatter(raw);
      return metaFromFrontmatter(slug, fm);
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): { meta: BlogPostMeta; body: string } | null {
  if (!isSafeSlug(slug)) return null;

  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  const resolved = path.resolve(file);
  if (!resolved.startsWith(`${path.resolve(POSTS_DIR)}${path.sep}`)) return null;
  if (!fs.existsSync(resolved)) return null;

  const raw = fs.readFileSync(resolved, "utf8");
  const body = raw.replace(/^---[\s\S]*?---\n/, "");
  const fm = parseFrontmatter(raw);
  return {
    meta: metaFromFrontmatter(slug, fm),
    body,
  };
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
