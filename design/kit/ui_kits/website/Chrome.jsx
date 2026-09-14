/* Website kit — chrome: promo bar, sticky nav, footer.
   Loaded as a classic Babel script, so components attach to window. */
const { Button, Icon, IconButton, PromoBar, HoursTable, Badge } = window.GoodworkDesignSystem_fee824;

const NAV = ["Heating", "Cooling", "Comfort Club", "Reviews", "About"];

function SiteHeader({ route, onNavigate, onBook }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 30 }}>
      <PromoBar message="Furnace or AC trouble? Upfront pricing in 60 seconds." ctaLabel="Get my estimate" onClick={(e) => { e.preventDefault(); onBook(); }} />
      <div style={{ background: "var(--surface-card)", borderBottom: "var(--border-hairline) solid var(--line-hairline)" }}>
        <div className="gw-container" style={{ display: "flex", alignItems: "center", gap: "var(--space-7)", height: 74 }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); }} style={{ textDecoration: "none", display: "grid", gap: 2 }}>
            <span style={{ font: "var(--weight-black) 21px/1 var(--font-core)", letterSpacing: "-0.03em", color: "var(--text-strong)" }}>Northside</span>
            <span style={{ font: "var(--type-label)", letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>Heating &amp; Cooling</span>
          </a>
          <nav style={{ display: "flex", gap: "var(--space-6)", marginLeft: "var(--space-6)" }}>
            {NAV.map((n) => {
              const key = n.toLowerCase().replace(/\s/g, "-");
              const on = route === key;
              return (
                <a key={n} href={"#" + key} onClick={(e) => { e.preventDefault(); onNavigate(key); }}
                  style={{ font: "var(--weight-semibold) var(--size-body-sm)/1 var(--font-core)", textDecoration: "none", color: on ? "var(--text-strong)" : "var(--text-body)", borderBottom: `2px solid ${on ? "var(--surface-brand)" : "transparent"}`, paddingBottom: 4 }}>{n}</a>
              );
            })}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)", marginLeft: "auto" }}>
            <a href="tel:9055550142" style={{ font: "var(--type-phone)", fontSize: 18, color: "var(--text-strong)", textDecoration: "none" }}>(905) 555-0142</a>
            <Button variant="accent" onClick={onBook}>Book instantly</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  const col = (title, items) => (
    <div style={{ display: "grid", gap: "9px", alignContent: "start" }}>
      <span className="gw-label" style={{ color: "var(--ink-400)" }}>{title}</span>
      {items.map((i) => <span key={i} style={{ font: "var(--type-body-sm)", color: "var(--ink-200)" }}>{i}</span>)}
    </div>
  );
  return (
    <footer style={{ background: "var(--accent-900)", color: "var(--ink-200)" }}>
      <div className="gw-container" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "var(--space-9)", padding: "var(--space-10) var(--gutter)" }}>
        <div style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
          <strong style={{ font: "var(--weight-black) 22px/1 var(--font-core)", letterSpacing: "-0.03em", color: "var(--white)" }}>Northside</strong>
          <p style={{ font: "var(--type-body-sm)", margin: 0, maxWidth: "36ch" }}>Family-run since 2011. We answer the phone, quote before we start, and clean up after ourselves.</p>
          <div style={{ display: "flex", gap: "var(--space-3)", marginTop: 2 }}><Badge tone="accent">Licence #PL-40218</Badge><Badge tone="neutral">$2M insured</Badge></div>
        </div>
        {col("Heating", ["Furnace repair", "Furnace install", "Heat pumps", "Mini-splits"])}
        {col("Cooling", ["AC repair", "AC install", "Maintenance plans", "Air quality"])}
        <div style={{ display: "grid", gap: "10px", alignContent: "start" }}>
          <span className="gw-label" style={{ color: "var(--ink-400)" }}>Contact</span>
          <a href="tel:9055550142" style={{ color: "var(--white)", font: "var(--type-phone)", fontSize: 19, textDecoration: "none" }}>(905) 555-0142</a>
          <a href="mailto:book@northsidehvac.example" style={{ color: "var(--blue-300)", font: "var(--type-body-sm)" }}>book@northsidehvac.example</a>
          <span style={{ font: "var(--type-body-sm)" }}>1188 Barton St E, Hamilton, ON</span>
          <HoursTable todayIndex={0} tone="on-brand" rows={[{ day: "Mon–Fri", hours: "7am–7pm" }, { day: "Saturday", hours: "8am–4pm" }, { day: "Sunday", hours: "Emergencies" }]} style={{ color: "var(--ink-200)", marginTop: 4 }} />
        </div>
      </div>
      <div className="gw-container" style={{ display: "flex", gap: "var(--space-6)", padding: "var(--space-5) var(--gutter)", borderTop: "1px solid rgba(255,255,255,.14)", font: "var(--type-caption)", color: "var(--ink-400)" }}>
        <span>© 2026 Northside Heating &amp; Cooling · Licence #PL-40218</span><span>Privacy</span><span>Terms</span>
        <span style={{ marginLeft: "auto" }}>Built with the Goodwork template</span>
      </div>
    </footer>
  );
}

Object.assign(window, { SiteHeader, SiteFooter, NAV });
