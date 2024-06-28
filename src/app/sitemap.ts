import { ROUTE } from "@/constants/route";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const hostedURL = process.env.HOST_URL || "https://example.com";

  const sitemaps: MetadataRoute.Sitemap = Object.keys(ROUTE).map((key) => ({
    url: `${hostedURL}${(ROUTE as any)[key]}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));

  return sitemaps;
}
