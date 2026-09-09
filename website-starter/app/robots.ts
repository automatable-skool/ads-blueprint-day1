import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";

export const dynamic = "force-static";

// Search engines AND AI crawlers allowed - AI answers are a traffic source, not a threat.
// /proposal/ is disallowed: client proposals carry pricing and must never be indexed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/proposal/", "/thank-you"] },
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"], allow: "/", disallow: ["/proposal/"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
