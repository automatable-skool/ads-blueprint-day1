// THE ONE FILE TO EDIT FIRST.
// Every page reads from here - /api-setup asks the questions and fills it in.

export const site = {
  name: "Your Business Name",
  tagline: "What you do, in one plain sentence",
  // GHL inbound webhook - /service-page collects this and writes it here.
  leadWebhook: null as string | null,
  phone: "(555) 555-5555",
  email: "hello@example.com",
  address: "123 Main St, Your City",
  city: "Your City",
  url: "https://example.com", // your live domain - used by sitemap + metadata

  // ⛔ THE GOOGLE ADS API REVIEWER OPENS YOUR SITE AND LOOKS FOR THREE THINGS:
  // an About page with real background, a physical address, and a privacy policy with
  // real detail. These fields are what fill them. Every page shows a red NOT READY
  // banner until they hold real values - a site with the banner up fails the review.
  founded: "",            // "2011" - the year the business started trading
  owner: "",              // "Dana Whitfield" - who runs it, named on the About page
  story: "",              // 2-3 plain sentences: why it started, who it serves, what is different
  credentials: [] as string[],  // "Licensed electrician, EC-44821", "Fully insured to $5M"
  legalEntity: "",        // "Whitfield Electrical Ltd" - the registered name, for the footer
  // "bold" for trades and home services, "calm" for professional services.
  // /api-setup asks which one and writes it here.
  style: "bold" as "bold" | "calm",
  legalName: "",          // alias used by the footer and /accessibility
  bookingUrl: "",  // GHL calendar embed, shown on /thank-you when set

  // Your services - each becomes a card on the homepage.
  // The SEO Blueprint's /build-website turns these into full service pages.
  services: [
    { name: "Service One", slug: "service-one", blurb: "One line on what this is." },
    { name: "Service Two", slug: "service-two", blurb: "One line on what this is." },
    { name: "Service Three", slug: "service-three", blurb: "One line on what this is." },
  ],

  // Google Ads sitelinks. Written here at build time, while the value of each
  // page is fresh - /write-ads reads them rather than inventing them months later.
  // Titles max 25 characters, each description line max 35.
  sitelinks: [
    { title: "Get a Quote",  url: "/quote",    lines: ["Reply in 30 minutes", "No obligation"] },
    { title: "Our Services", url: "/services", lines: ["Everything we do", "Fixed pricing"] },
    { title: "Reviews",      url: "/reviews",  lines: ["Real customer reviews", "See what they say"] },
    { title: "Pricing",      url: "/pricing",  lines: ["What jobs cost", "No surprise fees"] },
    { title: "About Us",     url: "/about",    lines: ["Family owned", "Licensed + insured"] },
    { title: "Contact",      url: "/contact",  lines: ["Call or email us", "Open 7 days"] },
  ],
};
