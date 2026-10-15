import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://veloracleaningstatenisland.com";
  const staticPages = ["", "/services", "/about", "/faq", "/testimonials", "/contact", "/quote", "/privacy-policy"];
  return [
    ...staticPages.map((path) => ({
      url: `${base}${path || "/"}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...services.map((s) => ({
      url: `${base}/${s.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...areas.map((a) => ({
      url: `${base}/${a.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
