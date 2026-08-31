import type { MetadataRoute } from "next";

import { site } from "@/content/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The admin endpoints are token-protected, but there is no reason to
        // advertise them to crawlers.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
