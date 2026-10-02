import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stelwallet.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // wallet dashboard/transactions are user-specific, nothing useful to index
      disallow: "/app/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
