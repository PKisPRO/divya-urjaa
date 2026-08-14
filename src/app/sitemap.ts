import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/urjaa-deepak", priority: 0.9 },
    { path: "/our-story", priority: 0.8 },
    { path: "/artisans", priority: 0.8 },
    { path: "/impact", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
