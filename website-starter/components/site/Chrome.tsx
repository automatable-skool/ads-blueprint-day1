// Shared header, footer and the red not-ready banner for the five trust pages
// (/, /about, /contact, /privacy-policy, /terms). Everything renders from
// lib/site.config.ts - no page carries its own copy of the business facts.

import { site } from "@/lib/site.config";
import { legalName, missingFields } from "@/lib/site-ready";

const wrap: React.CSSProperties = {
  maxWidth: "var(--container-max, 1140px)",
  margin: "0 auto",
  paddingInline: "var(--gutter, 24px)",
};

/** Red banner listing every config field still holding a placeholder. Renders on
 *  EVERY page, in every environment, until the config is real - a site showing
 *  this banner cannot pass review, and that is the point. */
export function NotReadyBanner() {
  const missing = missingFields();
  if (missing.length === 0) return null;
  return (
    <div style={{ background: "var(--critical-600, #b3261e)", color: "#fff", padding: "16px var(--gutter, 24px)" }}>
      <div style={wrap}>
        <p style={{ margin: 0, font: "var(--weight-bold) var(--size-body)/1.4 var(--font-core, system-ui)" }}>
          NOT READY FOR GOOGLE&rsquo;S REVIEW - fill lib/site.config.ts. Still placeholder:
        </p>
        <ul style={{ margin: "8px 0 0", paddingLeft: 20, font: "var(--type-body-sm, 14px/1.5 system-ui)" }}>
          {missing.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header style={{ background: "var(--surface-card)", borderBottom: "var(--border-hairline, 1px) solid var(--line-hairline)" }}>
      <div style={{ ...wrap, display: "flex", alignItems: "center", gap: "var(--space-5, 24px)", height: 74 }}>
        <a href="/" style={{ textDecoration: "none", display: "grid", gap: 2 }}>
          <span style={{ font: "var(--weight-black) 21px/1 var(--font-core)", letterSpacing: "-0.03em", color: "var(--text-strong)" }}>
            {site.name}
          </span>
          <span className="gw-label">{site.city}</span>
        </a>
        <nav style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "var(--space-5, 24px)" }}>
          <a href="/about" style={{ color: "var(--text-body)", textDecoration: "none" }}>About</a>
          <a href="/contact" style={{ color: "var(--text-body)", textDecoration: "none" }}>Contact</a>
          <a
            href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 18px",
              borderRadius: "var(--radius-control, 8px)",
              background: site.style === "bold" ? "var(--surface-accent)" : "var(--surface-brand)",
              color: "var(--text-on-accent, #fff)",
              font: "var(--weight-bold) var(--size-body-sm)/1 var(--font-core)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {site.style === "bold" ? `Call ${site.phone}` : site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--surface-inverse, #1a1a19)", color: "var(--ink-200, #d6d5d2)", marginTop: 0 }}>
      <div style={{ ...wrap, padding: "40px 24px", display: "grid", gap: 12 }}>
        <p style={{ margin: 0, font: "var(--weight-bold) var(--size-body)/1.4 var(--font-core)", color: "#fff" }}>
          {site.name}
        </p>
        <p style={{ margin: 0 }}>{site.address}</p>
        <p style={{ margin: 0 }}>
          <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} style={{ color: "inherit" }}>{site.phone}</a>
          {" · "}
          <a href={`mailto:${site.email}`} style={{ color: "inherit" }}>{site.email}</a>
        </p>
        <p style={{ margin: 0, font: "var(--type-body-sm, 14px/1.5 system-ui)", color: "var(--ink-400, #a3a29e)" }}>
          &copy; {new Date().getFullYear()} {legalName()} · <a href="/privacy-policy" style={{ color: "inherit" }}>Privacy policy</a> ·{" "}
          <a href="/terms" style={{ color: "inherit" }}>Terms</a>
        </p>
      </div>
    </footer>
  );
}

/** Page shell every trust page uses: banner, header, content, footer. */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--surface-page)" }}>
      <NotReadyBanner />
      <SiteHeader />
      <div style={{ flex: 1 }}>{children}</div>
      <SiteFooter />
    </div>
  );
}
