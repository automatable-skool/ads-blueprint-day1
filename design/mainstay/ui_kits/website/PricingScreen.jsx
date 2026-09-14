const { Button, Icon, Badge, Card, SectionHeading, PricingCard, Tabs, TrustBar, FAQItem, CTABanner, Stars } = window.MainstayDesignSystem_eaeaf9;

function PricingScreen({ go }) {
  const [mode, setMode] = React.useState("visit");
  return (
    <div>
      <section style={{ paddingBlock: "var(--space-11) var(--space-9)" }}>
        <div className="ms-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-7)" }}>
          <SectionHeading align="center" eyebrow="Pricing" as="h1" title="Prices published, not negotiated"
            lead="Most local trades won't put a number on a website. Here are ours." />
          <Tabs variant="pill" value={mode} onChange={setMode}
            items={[{ id: "visit", label: "Per visit" }, { id: "plan", label: "Care plan" }]} />
        </div>
      </section>

      <section style={{ paddingBottom: "var(--section-y)" }}>
        <div className="ms-container" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-6)", alignItems: "start" }}>
          {mode === "visit" ? (
            <React.Fragment>
              <PricingCard name="Standard callout" amount="$149" unit="/ visit" note="Weekdays, 8am–5pm."
                features={["Arrival window you choose", "First hour of labour", "Parts under $25 included", "12-month labour guarantee"]}
                ctaLabel="Book a visit" ctaHref="#contact" />
              <PricingCard featured badge="Most booked" name="Same-day priority" amount="$189" unit="/ visit" note="Booked before 11am, done that day."
                features={["Front of the queue", "Two-hour arrival window", "First hour of labour", "Text when the engineer leaves"]}
                ctaLabel="Book same-day" ctaHref="#contact" />
              <PricingCard name="Out of hours" amount="$210" unit="/ visit" note="Evenings, weekends and holidays."
                features={["24/7 answered line", "90-minute target arrival", "Emergency make-safe", "Follow-up quote free"]}
                ctaLabel="Call the night line" ctaHref="tel:5550182244" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <PricingCard name="Home cover" amount="$19" unit="/ month" note="For a single home."
                features={["Annual boiler service", "No callout charge", "15% off all labour", "Priority booking"]} ctaLabel="Start cover" ctaHref="#contact" />
              <PricingCard featured badge="Best value" name="Landlord cover" amount="$32" unit="/ month" note="Per rented property."
                features={["Gas safety certificate", "Annual electrical check", "Compliance reminders", "Tenant booking line"]} ctaLabel="Start cover" ctaHref="#contact" />
              <PricingCard name="Business cover" amount="From $95" unit="/ month" note="Shops, offices and sites."
                features={["Named account manager", "4-hour response SLA", "Monthly invoicing", "Out-of-hours included"]} ctaLabel="Talk to us" ctaHref="#contact" />
            </React.Fragment>
          )}
        </div>
        <div className="ms-container" style={{ marginTop: "var(--space-9)" }}>
          <TrustBar align="center" items={[{ label: "No call-out fee on quotes", icon: "circle-check" }, { label: "Fixed price before we start", icon: "shield-check" }, { label: "Card, transfer or invoice", icon: "credit-card" }]} />
        </div>
      </section>

      <section style={{ background: "var(--surface-sunken)", paddingBlock: "var(--section-y)" }}>
        <div className="ms-container" style={{ display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: "var(--space-13)" }}>
          <SectionHeading eyebrow="Small print" title="What affects the price" />
          <div>
            {[
              ["Are materials included?", "Parts under $25 are included in the callout. Anything larger is quoted at cost plus 10% before we fit it."],
              ["Do you charge per hour after the first?", "$65 per additional hour on weekdays, $95 out of hours, billed in 30-minute blocks."],
              ["Is there a cancellation fee?", "No, as long as you tell us before the engineer sets off."]
            ].map(([q, a], i) => <FAQItem key={q} question={q} answer={a} defaultOpen={i === 0} />)}
          </div>
        </div>
      </section>

      <div className="ms-container" style={{ paddingBlock: "var(--section-y)" }}>
        <CTABanner title="Get an exact number for your job" lead="Send a couple of details and we'll come back with a fixed price."
          primaryLabel="Get a free quote" primaryHref="#contact" secondaryLabel="Call (555) 018 2244" secondaryHref="tel:5550182244" />
      </div>
    </div>
  );
}
Object.assign(window, { PricingScreen });
