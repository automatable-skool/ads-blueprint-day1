// The terms page the OAuth consent screen asks for (and basic site hygiene).
// A COMPLETE set of plain-language terms rendered from lib/site.config.ts.
// Lives in the footer, never the main nav.

import type { Metadata } from "next";
import { site } from "@/lib/site.config";
import { legalName } from "@/lib/site-ready";
import { Shell } from "@/components/site/Chrome";

export const metadata: Metadata = {
  title: "Terms",
  robots: { index: false, follow: true },
  alternates: { canonical: "/terms" },
};

const wrap: React.CSSProperties = {
  maxWidth: "var(--container-text, 720px)",
  margin: "0 auto",
  paddingInline: "var(--gutter, 24px)",
};
const h2: React.CSSProperties = { font: "var(--type-h3)", color: "var(--text-strong)", margin: "32px 0 10px" };

const BUILD_DATE = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function Page() {
  return (
    <Shell>
      <main style={{ padding: "80px 0 96px" }}>
        <div style={wrap}>
          <h1 style={{ margin: "0 0 8px" }}>Terms of use</h1>
          <p style={{ color: "var(--text-muted)", margin: "0 0 24px" }}>
            {legalName()} · Last updated {BUILD_DATE}
          </p>

          <p>
            These terms cover your use of this website, operated by {legalName()} of {site.address}. By using the site
            you accept them. They are deliberately written in plain language.
          </p>

          <h2 style={h2}>What this site is</h2>
          <p>
            An information and contact point for {site.name}. Content here - service descriptions, guidance, any pricing
            indications - is general information, not a binding quote. The price and scope of actual work is what we
            agree together in writing before the work starts.
          </p>

          <h2 style={h2}>Enquiries</h2>
          <p>
            Sending an enquiry through this site or calling us does not create a contract or an obligation on either
            side. It is a request for us to get in touch, and we will. How we handle the details you send is covered by
            our <a href="/privacy-policy" style={{ color: "var(--text-link)" }}>privacy policy</a>.
          </p>

          <h2 style={h2}>Our content</h2>
          <p>
            The text and images on this site belong to {legalName()} or are used with permission. Do not republish them
            as your own. You are welcome to link to any page.
          </p>

          <h2 style={h2}>Accuracy and availability</h2>
          <p>
            We keep the site accurate and up to date, but we do not guarantee it is error-free or always available, and
            we are not liable for loss caused by relying on general information here rather than advice we give you
            directly for your specific situation.
          </p>

          <h2 style={h2}>Changes and contact</h2>
          <p>
            We may update these terms; the current version is always this page, dated above. Anything unclear, ask:{" "}
            <a href={`mailto:${site.email}`} style={{ color: "var(--text-link)" }}>{site.email}</a> or {site.phone}.
          </p>
        </div>
      </main>
    </Shell>
  );
}
