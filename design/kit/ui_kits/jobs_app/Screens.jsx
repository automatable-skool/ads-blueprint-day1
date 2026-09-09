const { Tabs, Card, Badge, Button, Icon, Rating, Alert, Switch, Field, Select, Input, Textarea, Checkbox, StatBlock, MediaFrame } = window.GoodworkDesignSystem_fee824;

const JOBS = [
  { id: "J-1042", time: "8:00–10:00", customer: "Dana Reyes", address: "88 Locke St S", type: "Furnace not heating", tech: "Kenny M.", status: "positive", statusLabel: "On the way", value: "$185 diag", plan: true },
  { id: "J-1043", time: "9:30–11:30", customer: "Marcus Tran", address: "42 Cross St, Dundas", type: "AC install — day 2", tech: "James P.", status: "info", statusLabel: "In progress", value: "$6,420", plan: false },
  { id: "J-1044", time: "12:00–14:00", customer: "Priya Shah", address: "17 Barton St E", type: "Annual tune-up", tech: "Unassigned", status: "caution", statusLabel: "Needs a tech", value: "$129", plan: true },
  { id: "J-1045", time: "14:30–16:30", customer: "Ada Olsen", address: "9 Freeman Pl, Burlington", type: "No cooling — 2nd visit", tech: "Kenny M.", status: "critical", statusLabel: "Callback", value: "Warranty", plan: false },
  { id: "J-1046", time: "17:00–19:00", customer: "Ben Whitlock", address: "204 Mohawk Rd W", type: "Quote — heat pump", tech: "James P.", status: "neutral", statusLabel: "Booked", value: "Estimate", plan: false }
];

function Schedule({ tab, onTab, selected, onSelect }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: "var(--space-7)", alignItems: "start" }}>
      <div style={{ display: "grid", gap: "var(--space-5)" }}>
        <Tabs value={tab} onChange={onTab} tabs={[
          { value: "today", label: "Today", icon: "calendar" },
          { value: "week", label: "This week", icon: "calendar-check" },
          { value: "unassigned", label: "Unassigned", icon: "triangle-alert" }
        ]} />
        {tab === "unassigned" ? <Alert tone="caution" title="One job has no tech">J-1044 at 12:00 still needs assigning. Kenny has a 90-minute gap after J-1042.</Alert> : null}
        <div style={{ display: "grid", gap: "var(--space-4)" }}>
          {(tab === "unassigned" ? JOBS.filter((j) => j.tech === "Unassigned") : JOBS).map((j) => {
            const on = j.id === selected;
            return (
              <Card key={j.id} padding="sm" onClick={() => onSelect(j.id)}
                style={{ cursor: "pointer", display: "grid", gridTemplateColumns: "84px 1fr auto", gap: "var(--space-5)", alignItems: "center", borderColor: on ? "var(--line-brand)" : "var(--line-hairline)", boxShadow: on ? "var(--shadow-md)" : "var(--shadow-sm)" }}>
                <div style={{ display: "grid", gap: 2 }}>
                  <strong style={{ font: "var(--weight-bold) var(--size-body-sm)/1.2 var(--font-core)", color: "var(--text-strong)" }}>{j.time.split("–")[0]}</strong>
                  <span style={{ font: "var(--type-caption)", color: "var(--text-muted)" }}>{j.time.split("–")[1]}</span>
                </div>
                <div style={{ display: "grid", gap: 3, minWidth: 0 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <strong style={{ font: "var(--weight-bold) var(--size-body)/1.2 var(--font-core)", color: "var(--text-strong)" }}>{j.customer}</strong>
                    {j.plan ? <Badge tone="brand">Club</Badge> : null}
                  </span>
                  <span style={{ font: "var(--type-body-sm)", color: "var(--text-body)" }}>{j.type}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "var(--type-caption)", color: "var(--text-muted)" }}>
                    <Icon name="map-pin" size={13} />{j.address} · <Icon name="user" size={13} />{j.tech}
                  </span>
                </div>
                <div style={{ display: "grid", gap: 6, justifyItems: "end" }}>
                  <Badge tone={j.status} dot={j.status !== "neutral"}>{j.statusLabel}</Badge>
                  <span style={{ font: "var(--weight-semibold) var(--size-body-sm)/1 var(--font-core)", color: "var(--text-strong)" }}>{j.value}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <JobDetail job={JOBS.find((j) => j.id === selected) || JOBS[0]} />
    </div>
  );
}

function JobDetail({ job }) {
  return (
    <Card padding="md" style={{ display: "grid", gap: "var(--space-5)", position: "sticky", top: 0 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)" }}>
        <div style={{ display: "grid", gap: 3 }}>
          <span style={{ font: "var(--type-label)", letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-muted)" }}>{job.id}</span>
          <h2 style={{ font: "var(--type-h3)", margin: 0 }}>{job.type}</h2>
        </div>
        <Badge tone={job.status} style={{ marginLeft: "auto" }}>{job.statusLabel}</Badge>
      </div>
      <MediaFrame ratio="16 / 9" label="Equipment photo" />
      <div style={{ display: "grid", gap: "10px", font: "var(--type-body-sm)" }}>
        {[["Customer", job.customer], ["Address", job.address], ["Window", job.time], ["Tech", job.tech], ["Value", job.value]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: "var(--space-5)", borderBottom: "var(--border-hairline) solid var(--line-hairline)", paddingBottom: 8 }}>
            <span style={{ width: 78, color: "var(--text-muted)" }}>{k}</span>
            <strong style={{ color: "var(--text-strong)", fontWeight: "var(--weight-semibold)" }}>{v}</strong>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--space-6)" }}>
        <StatBlock value="3" label="past jobs" icon="check" />
        <StatBlock value="4.9" label="left us this rating" icon="star" />
      </div>
      <Switch label="Text the customer on the way" defaultChecked />
      <div style={{ display: "flex", gap: "var(--space-3)" }}>
        <Button variant="primary" block>Open work order</Button>
        <Button variant="secondary" iconLeft={<Icon name="phone" size={16} />}>Call</Button>
      </div>
    </Card>
  );
}

function QuoteBuilder({ onSend }) {
  const lines = [
    { item: "Heat pump — 3 ton, inverter", qty: 1, price: "$5,240" },
    { item: "Line set & pad", qty: 1, price: "$480" },
    { item: "Labour — 2 techs, 1 day", qty: 1, price: "$1,120" },
    { item: "Comfort Club — first year", qty: 1, price: "$0" }
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "var(--space-7)", alignItems: "start" }}>
      <Card padding="md" style={{ display: "grid", gap: "var(--space-5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <h2 style={{ font: "var(--type-h3)", margin: 0 }}>Quote Q-2291 · Ben Whitlock</h2>
          <Badge tone="caution" style={{ marginLeft: "auto" }}>Draft</Badge>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", font: "var(--type-body-sm)" }}>
          <thead>
            <tr>{["Item", "Qty", "Price"].map((h, i) => (
              <th key={h} style={{ textAlign: i === 0 ? "left" : "right", padding: "0 0 8px", font: "var(--type-label)", letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-muted)", borderBottom: "var(--border-hairline) solid var(--line-hairline)" }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.item} style={{ borderBottom: "var(--border-hairline) solid var(--line-hairline)" }}>
                <td style={{ padding: "11px 0", color: "var(--text-strong)" }}>{l.item}</td>
                <td style={{ padding: "11px 0", textAlign: "right", color: "var(--text-muted)" }}>{l.qty}</td>
                <td style={{ padding: "11px 0", textAlign: "right", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)" }}>{l.price}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2" style={{ padding: "14px 0", font: "var(--weight-bold) var(--size-body)/1 var(--font-core)", color: "var(--text-strong)" }}>Total incl. HST</td>
              <td style={{ padding: "14px 0", textAlign: "right", font: "var(--weight-black) 22px/1 var(--font-core)", letterSpacing: "var(--track-heading)", color: "var(--text-strong)" }}>$7,728</td>
            </tr>
          </tbody>
        </table>
        <Field label="Note to customer"><Textarea rows={3} defaultValue="Includes removal of the old unit and 0% financing over 24 months if you'd like it." /></Field>
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          <Button variant="accent" onClick={onSend} iconLeft={<Icon name="mail" size={16} />}>Send quote</Button>
          <Button variant="secondary">Save draft</Button>
        </div>
      </Card>
      <Card padding="md" style={{ display: "grid", gap: "var(--space-5)" }}>
        <h3 style={{ font: "var(--type-h4)", fontWeight: "var(--weight-bold)", margin: 0 }}>Options</h3>
        <Field label="Valid until"><Select options={["7 days", "14 days", "30 days"]} /></Field>
        <Field label="Deposit"><Input defaultValue="$500" /></Field>
        <Checkbox label="Offer 0% financing" defaultChecked />
        <Checkbox label="Include Comfort Club first year free" defaultChecked />
        <Alert tone="info" title="Ben opened your last quote twice">Follow up by phone if there's no answer in two days.</Alert>
      </Card>
    </div>
  );
}

function Placeholder({ view }) {
  return (
    <Card padding="lg" style={{ display: "grid", gap: "var(--space-4)", justifyItems: "start" }}>
      <Icon name="file-text" size={22} color="var(--text-faint)" />
      <h2 style={{ font: "var(--type-h3)", margin: 0 }}>{view} isn't part of this kit</h2>
      <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: 0, maxWidth: "56ch" }}>
        The template covers dispatch and quoting. Customers, invoices and messages are left deliberately blank rather than invented — build them against the real product they belong to.
      </p>
    </Card>
  );
}

Object.assign(window, { Schedule, JobDetail, QuoteBuilder, Placeholder, JOBS });
