import type { MetadataRoute } from "next";
import { site } from "@/lib/site.config";

export const dynamic = "force-static";

// The sitemap mirrors the pages that are actually BUILT, nothing more.
// /api-setup builds the trust site: "" and /about. When /standard-pages
// builds /services, /quote, /reviews and /pricing it adds them here - a sitemap
// entry pointing at a stub hands Google's reviewer a placeholder page.
// DELIBERATELY EXCLUDED: /thank-you (must never be indexed - it would
// wreck your conversion count) and the legal pages (no search value).
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about"];
  return pages.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    priority: path === "" ? 1 : 0.8,
  }));
}
