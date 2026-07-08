import type { MetadataRoute } from "next";

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
  "/newsletter",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return STATIC_ROUTES.map((route) => ({
    url: `${BASE}${route === "/" ? "" : route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
