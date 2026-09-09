/* Calm page style — chrome. Restrained white header, one accent, no promo bar. */
const { Button, Icon, Badge } = window.GoodworkDesignSystem_fee824;

const STUDIO_NAV = ["Work", "Services", "About", "Journal", "Contact"];

function StudioHeader({ route, onNavigate, onEnquire }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,.92)", backdropFilter: "var(--overlay-blur)", borderBottom: "var(--border-hairline) solid var(--line-hairline)" }}>
      <div className="gw-container" style={{ display: "flex", alignItems: "center", gap: "var(--space-7)", height: 76 }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("home"); }} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: 30, height: 30, borderRadius: "var(--radius-sm)", background: "var(--surface-inverse)", display: "grid", placeItems: "center" }}>
            <Icon name="camera" size={16} color="var(--white)" />
          </span>
          <span style={{ font: "var(--weight-black) 19px/1 var(--font-core)", letterSpacing: "-0.03em", color: "var(--text-strong)" }}>Halden &amp; Reyes</span>
        </a>
        <nav style={{ display: "flex", gap: "var(--space-3)", marginLeft: "auto" }}>
          {STUDIO_NAV.map((n) => {
            const key = n.toLowerCase();
            const on = route === key;
            return (
              <a key={n} href={"#" + key} onClick={(e) => { e.preventDefault(); onNavigate(key); }}
                style={{
                  font: "var(--weight-semibold) var(--size-body-sm)/1 var(--font-core)", textDecoration: "none",
                  padding: "8px 14px", borderRadius: "var(--radius-control)",
                  background: on ? "var(--surface-sunken)" : "transparent",
                  color: on ? "var(--text-strong)" : "var(--text-muted)"
                }}>{n}</a>
            );
          })}
        </nav>
        <Button variant="primary" onClick={onEnquire} iconRight={<Icon name="arrow-right" size={16} />}>Enquire</Button>
      </div>
    </header>
  );
}

function StudioFooter() {
  const col = (title, items) => (
    <div style={{ display: "grid", gap: "9px", alignContent: "start" }}>
      <span className="gw-label" style={{ color: "var(--ink-400)" }}>{title}</span>
      {items.map((i) => <span key={i} style={{ font: "var(--type-body-sm)", color: "var(--ink-200)" }}>{i}</span>)}
    </div>
  );
  return (
    <footer style={{ background: "var(--surface-inverse)", color: "var(--ink-200)" }}>
      <div className="gw-container" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: "var(--space-9)", padding: "var(--space-10) var(--gutter)" }}>
        <div style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
          <strong style={{ font: "var(--weight-black) 21px/1 var(--font-core)", letterSpacing: "-0.03em", color: "var(--white)" }}>Halden &amp; Reyes</strong>
          <p style={{ font: "var(--type-body-sm)", margin: 0, maxWidth: "34ch" }}>Wedding and portrait photography in Hamilton and the Niagara region. Booking 2027 dates now.</p>
          <div style={{ display: "flex", gap: "var(--space-3)" }}><Badge tone="accent">Booking 2027</Badge></div>
        </div>
        {col("Work", ["Weddings", "Portraits", "Editorial", "Print shop"])}
        {col("Studio", ["About us", "Pricing", "Journal", "Reviews"])}
        <div style={{ display: "grid", gap: "9px", alignContent: "start" }}>
          <span className="gw-label" style={{ color: "var(--ink-400)" }}>Contact</span>
          <a href="mailto:studio@haldenreyes.example" style={{ color: "var(--white)", font: "var(--type-body-sm)" }}>studio@haldenreyes.example</a>
          <a href="tel:9055550188" style={{ color: "var(--ink-300)", font: "var(--type-body-sm)" }}>(905) 555-0188</a>
          <span style={{ font: "var(--type-body-sm)" }}>By appointment · James St N</span>
        </div>
      </div>
      <div className="gw-container" style={{ display: "flex", gap: "var(--space-6)", padding: "var(--space-5) var(--gutter)", borderTop: "1px solid rgba(255,255,255,.14)", font: "var(--type-caption)", color: "var(--ink-400)" }}>
        <span>© 2026 Halden &amp; Reyes</span><span>Privacy</span><span>Terms</span>
        <span style={{ marginLeft: "auto" }}>Built with the Goodwork template · calm style</span>
      </div>
    </footer>
  );
}

Object.assign(window, { StudioHeader, StudioFooter, STUDIO_NAV });
