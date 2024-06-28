import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const hostedURL = process.env.HOST_URL || "https://example.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${hostedURL}/sitemap.xml`,
    host: hostedURL,
  };
}
