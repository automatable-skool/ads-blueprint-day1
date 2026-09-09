// The privacy policy Google Ads REQUIRES for remarketing and most verticals.
// A COMPLETE policy rendered from lib/site.config.ts - business name, address
// and email fill in from config, the substance is already written. It covers
// the three things this repo actually does to visitors: the contact details
// they send, the Google tag /landing-page installs (conversion tracking +
// remarketing cookies), and the form data forwarded to the CRM.
// Lives in the footer, never the main nav.

import type { Metadata } from "next";
import { site } from "@/lib/site.config";
import { legalName } from "@/lib/site-ready";
import { Shell } from "@/components/site/Chrome";

export const metadata: Metadata = {
  title: "Privacy policy",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy-policy" },
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
          <h1 style={{ margin: "0 0 8px" }}>Privacy policy</h1>
          <p style={{ color: "var(--text-muted)", margin: "0 0 24px" }}>
            {legalName()} · Last updated {BUILD_DATE}
          </p>

          <p>
            This policy explains what {site.name} (&ldquo;we&rdquo;) collects from visitors to this website, what we do
            with it, and the choices you have. We are a {site.city} business located at {site.address}. Questions about
            anything here: <a href={`mailto:${site.email}`} style={{ color: "var(--text-link)" }}>{site.email}</a> or{" "}
            {site.phone}.
          </p>

          <h2 style={h2}>What we collect</h2>
          <p>
            When you call, email, or fill in a form on this site, we receive what you send us: typically your name, phone
            number, email address, and a description of the work you need. We do not ask for more than we need to respond
            to you, and we never collect payment details through this website.
          </p>

          <h2 style={h2}>How we use it</h2>
          <p>
            To respond to your enquiry, quote and schedule work, and follow up on jobs. Form submissions are delivered to
            the customer-management system we use to track enquiries, so your request does not get lost. We do not sell
            your information to anyone, and we do not share it with third parties except the service providers named below.
          </p>

          <h2 style={h2}>Cookies and advertising</h2>
          <p>
            This site uses Google&rsquo;s advertising tag. It sets cookies that let us measure which of our Google Ads
            bring visitors who contact us (conversion tracking) and, where enabled, show our ads to people who have
            visited this site before (remarketing). Google&rsquo;s use of this data is described in Google&rsquo;s own
            privacy policy at policies.google.com/privacy. You can opt out of personalised Google ads at
            adssettings.google.com, and you can block or delete cookies in your browser settings at any time - the site
            works fine without them.
          </p>

          <h2 style={h2}>Who we share data with</h2>
          <p>
            Google (advertising measurement, as above), our website host, and the customer-management platform that
            receives form submissions and enquiry details on our behalf. Each processes data only to provide its service
            to us. Beyond that, we disclose personal information only if the law requires it.
          </p>

          <h2 style={h2}>How long we keep it</h2>
          <p>
            Enquiry and customer records are kept for as long as we reasonably need them for quoting, warranty, tax and
            legal purposes, then deleted.
          </p>

          <h2 style={h2}>Your choices</h2>
          <p>
            You can ask us what personal information we hold about you, ask us to correct it, or ask us to delete it -
            email <a href={`mailto:${site.email}`} style={{ color: "var(--text-link)" }}>{site.email}</a> and we will
            action it. You can also opt out of any follow-up contact by saying so in any message or call.
          </p>

          <h2 style={h2}>Changes</h2>
          <p>
            If this policy changes, the new version is posted on this page with an updated date. Continued use of the
            site after a change means the current version applies.
          </p>
        </div>
      </main>
    </Shell>
  );
}
