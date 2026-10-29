import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://guardianway.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
