import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/blog";

const BASE = "https://arabic-skill.vercel.app";

const STATIC_ROUTES = [
  "/",
  "/features",
  "/install",
  "/commands",
  "/tutorials",
  "/examples",
  "/about",
  "/docs",
  "/blog",
  "/newsletter",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const blogEntries = getAllPostSlugs().map((slug) => ({
    url: `${BASE}/blog/posts/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
