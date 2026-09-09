// The readiness gate for the five-page trust site /api-setup builds.
//
// Google's Basic Access review is done BY A HUMAN who opens the site. One
// placeholder value anywhere and the application dies. Every page calls
// missingFields() and screams red until the answer is empty - the site cannot
// quietly ship half-filled.

import { site } from "@/lib/site.config";

const PLACEHOLDER_VALUES: Array<[string, string, (s: typeof site) => boolean]> = [
  ["name", "still the shipped placeholder", (s) => !s.name || s.name === "Your Business Name"],
  ["tagline", "still the shipped placeholder", (s) => !s.tagline || s.tagline.startsWith("What you do")],
  ["phone", "still a 555 number", (s) => !s.phone || s.phone.includes("555")],
  ["email", "still @example.com", (s) => !s.email || s.email.endsWith("example.com")],
  ["address", "still 123 Main St", (s) => !s.address || s.address.startsWith("123 Main St")],
  ["city", "still Your City", (s) => !s.city || s.city === "Your City"],
  ["url", "still example.com", (s) => !s.url || s.url.includes("example.com")],
  ["founded", "empty - the year trading started", (s) => !s.founded],
  ["owner", "empty - a real name for the About page", (s) => !s.owner],
  ["story", "empty - 2-3 plain sentences on why the business exists", (s) => !s.story],
  [
    "services",
    "still Service One / Service Two",
    (s) => s.services.length === 0 || s.services.some((sv) => sv.name.startsWith("Service ")),
  ],
];

/** Field names still holding shipped placeholder values. Empty array = ready for review. */
export function missingFields(): string[] {
  return PLACEHOLDER_VALUES.filter(([, , bad]) => bad(site)).map(([field, why]) => `${field} - ${why}`);
}

export function siteReady(): boolean {
  return missingFields().length === 0;
}

/** The registered name for the footer and legal pages, falling back sensibly. */
export function legalName(): string {
  return site.legalEntity || site.legalName || site.name;
}
