const { Icon, IconButton, Badge, Button, Tooltip } = window.GoodworkDesignSystem_fee824;

const SIDEBAR = [
  { key: "schedule", label: "Schedule", icon: "calendar" },
  { key: "quotes", label: "Quotes", icon: "file-text" },
  { key: "customers", label: "Customers", icon: "users" },
  { key: "invoices", label: "Invoices", icon: "credit-card" },
  { key: "messages", label: "Messages", icon: "message-square" }
];

function AppShell({ view, onView, children, onNew }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "236px 1fr", minHeight: "100vh", background: "var(--surface-sunken)" }}>
      <aside style={{ background: "var(--accent-900)", color: "var(--ink-200)", display: "grid", gridTemplateRows: "auto 1fr auto", padding: "var(--space-6) var(--space-5)" }}>
        <div style={{ display: "grid", gap: 2, padding: "0 var(--space-3) var(--space-7)" }}>
          <strong style={{ font: "var(--weight-black) 19px/1 var(--font-core)", letterSpacing: "-0.03em", color: "var(--white)" }}>Northside</strong>
          <span style={{ font: "var(--type-label)", letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--blue-300)" }}>Dispatch</span>
        </div>
        <nav style={{ display: "grid", gap: "4px", alignContent: "start" }}>
          {SIDEBAR.map((s) => {
            const on = s.key === view;
            return (
              <button key={s.key} type="button" onClick={() => onView(s.key)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", border: 0, cursor: "pointer",
                  borderRadius: "var(--radius-sm)", textAlign: "left", transition: "var(--transition-control)",
                  background: on ? "var(--surface-brand)" : "transparent",
                  color: on ? "var(--white)" : "var(--ink-200)",
                  font: `${on ? "var(--weight-bold)" : "var(--weight-medium)"} var(--size-body-sm)/1 var(--font-core)`
                }}>
                <Icon name={s.icon} size={17} />{s.label}
                {s.key === "quotes" ? <span style={{ marginLeft: "auto", background: "var(--accent-800)", color: "var(--text-on-accent)", borderRadius: "var(--radius-pill)", padding: "2px 7px", font: "var(--type-label)" }}>3</span> : null}
              </button>
            );
          })}
        </nav>
        <div style={{ display: "grid", gap: "var(--space-4)" }}>
          <Button variant="primary" block onClick={onNew} iconLeft={<Icon name="plus" size={16} />}>New job</Button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,.14)" }}>
            <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--surface-brand)", display: "grid", placeItems: "center", font: "var(--type-label)", color: "var(--white)" }}>KM</span>
            <span style={{ display: "grid" }}>
              <strong style={{ font: "var(--weight-semibold) var(--size-body-sm)/1.2 var(--font-core)", color: "var(--white)" }}>Kenny M.</strong>
              <span style={{ font: "var(--type-caption)", color: "var(--blue-300)" }}>Owner</span>
            </span>
          </div>
        </div>
      </aside>
      <main style={{ display: "grid", gridTemplateRows: "auto 1fr", minWidth: 0 }}>
        <header style={{ display: "flex", alignItems: "center", gap: "var(--space-5)", padding: "var(--space-5) var(--space-8)", background: "var(--surface-card)", borderBottom: "var(--border-hairline) solid var(--line-hairline)" }}>
          <div style={{ display: "grid", gap: 2 }}>
            <h1 style={{ font: "var(--type-h3)", margin: 0 }}>{SIDEBAR.find((s) => s.key === view).label}</h1>
            <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>Thursday 20 August · 6 techs on the road</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <Badge tone="positive" dot>All techs checked in</Badge>
            <Tooltip label="Search"><IconButton name="search" label="Search" variant="ghost" /></Tooltip>
            <Tooltip label="Print run sheet"><IconButton name="file-text" label="Print run sheet" variant="ghost" /></Tooltip>
          </div>
        </header>
        <div style={{ padding: "var(--space-7) var(--space-8)", overflow: "auto" }}>{children}</div>
      </main>
    </div>
  );
}

Object.assign(window, { AppShell, SIDEBAR });
