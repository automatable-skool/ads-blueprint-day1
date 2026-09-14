const { Button, Icon, Badge, Card, SectionHeading, ServiceCard, Tag, TrustBar, CTABanner, FAQItem } = window.MainstayDesignSystem_eaeaf9;

function ServicesScreen({ go }) {
  const [filter, setFilter] = React.useState("All");
  const groups = { All: SERVICES, Trades: SERVICES.slice(0, 6), Professional: SERVICES.slice(6) };
  const list = groups[filter] || SERVICES;
  return (
    <div>
      <section style={{ background: "var(--surface-sunken)", paddingBlock: "var(--space-11) var(--space-10)" }}>
        <div className="ms-container">
          <SectionHeading eyebrow="Services" title="Everything we cover" as="h1"
            lead="Eight service lines, one team, one invoice. Prices shown are typical starting points — you get a fixed quote before work begins." />
          <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-8)" }}>
            {Object.keys(groups).map((g) => (
              <Tag key={g} selected={filter === g} onSelect={() => setFilter(g)}>{g}</Tag>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBlock: "var(--section-y)" }}>
        <div className="ms-container" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "var(--space-5)" }}>
          {list.map((s) => <ServiceCard key={s.title} {...s} href="#services" cta="What's included" />)}
        </div>
      </section>

      <section style={{ background: "var(--surface-sunken)", paddingBlock: "var(--section-y)" }}>
        <div className="ms-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-13)", alignItems: "center" }}>
          <div>
            <SectionHeading eyebrow="Emergency cover" title="Out of hours, still answered"
              lead="Burst pipe at midnight, no power on a Sunday — the phone rings through to an on-call engineer, not a voicemail." />
            <div style={{ marginTop: "var(--space-7)" }}>
              <TrustBar items={[{ label: "24/7 phone line", icon: "phone" }, { label: "90-minute target arrival", icon: "clock" }, { label: "Flat $210 night rate", icon: "credit-card" }]} />
            </div>
            <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-8)" }}>
              <Button size="lg" iconLeft="phone" href="tel:5550182244">Call the emergency line</Button>
              <Button size="lg" variant="outline" onClick={() => go("#contact")}>Book a normal slot</Button>
            </div>
          </div>
          <Photo label="Photo — night callout, engineer with a head torch under a sink" height={340} />
        </div>
      </section>

      <section style={{ paddingBlock: "var(--section-y)" }}>
        <div className="ms-container" style={{ display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: "var(--space-13)" }}>
          <SectionHeading eyebrow="Service detail" title="What a typical visit includes" />
          <div>
            {[
              ["Is the quote really fixed?", "Yes. If the job turns out to be bigger, we stop and re-quote before continuing — you always approve the number first."],
              ["Do you supply parts?", "We carry common parts on the van. Anything ordered in is charged at cost plus 10%, shown on the quote."],
              ["What's your guarantee?", "12 months on labour, plus whatever the manufacturer gives on parts."]
            ].map(([q, a], i) => <FAQItem key={q} question={q} answer={a} defaultOpen={i === 0} />)}
          </div>
        </div>
      </section>

      <div className="ms-container" style={{ paddingBottom: "var(--section-y)" }}>
        <CTABanner tone="accent" title="Not sure which service you need?" lead="Describe the problem and we'll tell you who to send."
          primaryLabel="Get a free quote" primaryHref="#contact" secondaryLabel="Call (555) 018 2244" secondaryHref="tel:5550182244" />
      </div>
    </div>
  );
}
Object.assign(window, { ServicesScreen });
