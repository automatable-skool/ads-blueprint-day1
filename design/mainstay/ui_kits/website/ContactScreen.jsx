const { Button, Icon, Badge, Card, SectionHeading, Input, Textarea, Select, Radio, Checkbox, Switch, Toast, Dialog, TrustBar, Stars, Tooltip } = window.MainstayDesignSystem_eaeaf9;

function ContactScreen({ go }) {
  const [step, setStep] = React.useState(1);
  const [slot, setSlot] = React.useState("am");
  const [confirmed, setConfirmed] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);

  return (
    <div>
      <section style={{ paddingBlock: "var(--space-11) var(--section-y)" }}>
        <div className="ms-container" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: "var(--space-13)", alignItems: "start" }}>
          <div>
            <SectionHeading eyebrow="Book a visit" as="h1" title="Two minutes, then we'll call to confirm"
              lead="Or skip the form entirely and ring (555) 018 2244 — a person answers, seven days a week." />

            <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-8)", alignItems: "center" }}>
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <span style={{
                    width: 28, height: 28, borderRadius: "var(--radius-pill)", display: "flex", alignItems: "center", justifyContent: "center",
                    font: "600 13px/1 var(--font-core)",
                    background: step >= n ? "var(--accent-500)" : "var(--n-100)",
                    color: step >= n ? "#fff" : "var(--text-muted)"
                  }}>{n}</span>
                  {n < 3 && <span style={{ flex: 1, height: 1, background: step > n ? "var(--accent-300)" : "var(--border-subtle)" }} />}
                </React.Fragment>
              ))}
            </div>

            <Card variant="elevated" padding="lg" style={{ marginTop: "var(--space-7)" }}>
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                  <h3>What do you need?</h3>
                  <Select label="Service" placeholder="Choose a service" options={SERVICES.map((s) => s.title)} required />
                  <Textarea label="Describe the job" rows={3} placeholder="Radiator upstairs is cold at the top…" />
                  <Checkbox label="This is an emergency" description="We'll call you straight back instead of emailing." />
                  <Button size="lg" iconRight="arrow-right" onClick={() => setStep(2)}>Choose a time</Button>
                </div>
              )}
              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                  <h3>When suits you?</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                    <Radio card name="slot" label="Morning" description="8am – 12pm · 3 slots left" checked={slot === "am"} onChange={() => setSlot("am")} />
                    <Radio card name="slot" label="Afternoon" description="12pm – 5pm · 1 slot left" checked={slot === "pm"} onChange={() => setSlot("pm")} />
                    <Radio card name="slot" label="Evening" description="5pm – 8pm · +$40" checked={slot === "eve"} onChange={() => setSlot("eve")} />
                    <Radio card name="slot" label="Next available" description="We'll ring with the earliest" checked={slot === "any"} onChange={() => setSlot("any")} />
                  </div>
                  <Switch label="Text me when the engineer is on the way" defaultChecked />
                  <div style={{ display: "flex", gap: "var(--space-4)" }}>
                    <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                    <Button size="lg" iconRight="arrow-right" onClick={() => setStep(3)} style={{ flex: 1 }}>Add your details</Button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                  <h3>Where are we coming?</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)" }}>
                    <Input label="Name" placeholder="Jane Whitfield" required />
                    <Input label="Phone" icon="phone" placeholder="(555) 018 2244" required />
                  </div>
                  <Input label="Address" icon="map-pin" placeholder="14 Foundry Row, Ashbourne" required />
                  <Input label="Email" icon="mail" placeholder="jane@example.com" hint="For the quote and receipt only." />
                  <div style={{ display: "flex", gap: "var(--space-4)" }}>
                    <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                    <Button size="lg" onClick={() => setConfirmed(true)} style={{ flex: 1 }} iconRight="circle-check">Confirm booking</Button>
                  </div>
                </div>
              )}
            </Card>

            {confirmed && (
              <div style={{ marginTop: "var(--space-6)" }}>
                <Toast tone="success" title="Booking request sent"
                  message="We'll call you within the hour to confirm the slot and give you a fixed price."
                  onDismiss={() => setConfirmed(false)} />
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <Card padding="lg">
              <h3 style={{ marginBottom: "var(--space-5)" }}>Reach us directly</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                {[
                  ["phone", "(555) 018 2244", "Answered 7am–8pm, 7 days"],
                  ["mail", "hello@mainstay.co", "Replies within one business hour"],
                  ["map-pin", "14 Foundry Row, Ashbourne", "Yard open Mon–Fri, 8am–4pm"],
                  ["message-square", "Text or WhatsApp", "Send a photo of the problem"]
                ].map(([icon, title, sub]) => (
                  <div key={title} style={{ display: "flex", gap: "var(--space-4)" }}>
                    <Icon name={icon} size={19} color="var(--accent-500)" style={{ marginTop: 2 }} />
                    <span>
                      <span style={{ display: "block", font: "600 var(--fs-body)/1.3 var(--font-core)", color: "var(--text-strong)" }}>{title}</span>
                      <span style={{ display: "block", font: "var(--type-small)", color: "var(--text-muted)" }}>{sub}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "var(--space-6)" }}>
                <Button variant="outline" fullWidth iconLeft="calendar" onClick={() => setDialog(true)}>Request a callback instead</Button>
              </div>
            </Card>

            <Card variant="sunken" padding="lg">
              <span className="ms-eyebrow">Areas covered</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", marginTop: "var(--space-5)" }}>
                {AREAS.map((a) => (
                  <span key={a} style={{ font: "500 var(--fs-small)/1 var(--font-core)", color: "var(--text-body)", background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-pill)", padding: "8px 12px" }}>{a}</span>
                ))}
              </div>
              <div style={{ marginTop: "var(--space-6)" }}>
                <Photo label="Map — service radius around the county" height={150} radius="var(--radius-md)" />
              </div>
            </Card>

            <Card padding="lg">
              <Stars rating={5} label="4.9 · 312 reviews" />
              <p style={{ font: "var(--type-small)", color: "var(--text-body)", marginTop: "var(--space-4)" }}>
                “Booked online at eight in the morning, engineer here by eleven, invoice matched the quote exactly.”
              </p>
              <p style={{ font: "var(--type-small)", color: "var(--text-muted)", marginTop: "var(--space-3)" }}>Ellen M. · Peveril</p>
            </Card>
          </div>
        </div>
      </section>

      <Dialog open={dialog} onClose={() => setDialog(false)} title="Request a callback"
        description="Leave a number and we'll ring you back — usually within 20 minutes during opening hours."
        footer={<><Button variant="ghost" onClick={() => setDialog(false)}>Cancel</Button><Button onClick={() => setDialog(false)}>Request call</Button></>}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)" }}>
          <Input label="Name" placeholder="Jane Whitfield" />
          <Input label="Phone" icon="phone" placeholder="(555) 018 2244" />
        </div>
      </Dialog>
    </div>
  );
}
Object.assign(window, { ContactScreen });
