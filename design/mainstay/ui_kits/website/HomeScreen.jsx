const { Button, Icon, Badge, Card, SectionHeading, TrustBar, Stars, ServiceCard, TestimonialCard, StatBlock, FAQItem, CTABanner, QuoteForm, Tabs } = window.MainstayDesignSystem_eaeaf9;

function HomeScreen({ go }) {
  const [audience, setAudience] = React.useState("home");
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "var(--surface-page)", paddingBlock: "clamp(40px,5vw,72px) var(--section-y)" }}>
        <div className="ms-container" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: "var(--space-13)", alignItems: "start" }}>
          <div>
            <Badge tone="accent" icon="clock" size="lg">Same-day slots available</Badge>
            <h1 style={{ font: "var(--type-display)", letterSpacing: "var(--ls-display)", color: "var(--text-strong)", marginTop: "var(--space-6)", maxWidth: "14ch" }}>
              Fixed today, not next week.
            </h1>
            <p style={{ font: "var(--type-lead)", color: "var(--text-body)", marginTop: "var(--space-6)", maxWidth: "46ch" }}>
              Plumbing, heating, electrical and the professional services that go with owning property — one local team, one number, prices agreed before we start.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", marginTop: "var(--space-8)" }}>
              <Button size="lg" iconRight="arrow-right" onClick={() => go("#contact")}>Get a free quote</Button>
              <Button size="lg" variant="outline" iconLeft="phone" href="tel:5550182244">(555) 018 2244</Button>
            </div>
            <div style={{ marginTop: "var(--space-8)" }}>
              <TrustBar items={[
                { label: "Licensed & insured", icon: "shield-check" },
                { label: "No call-out fee", icon: "circle-check" },
                { label: "Family-run since 2009", icon: "badge-check" }
              ]} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)", marginTop: "var(--space-8)", paddingTop: "var(--space-7)", borderTop: "1px solid var(--border-subtle)" }}>
              <Stars rating={5} size={18} label="4.9 average from 312 local reviews" />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Services */}
      <Section tone="sunken" id="services">
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-6)" }}>
          <SectionHeading eyebrow="What we do" title="One number for every job around the property"
            lead="Trades and professional services under one roof, so you're not chasing four different people." />
          <Tabs variant="pill" value={audience} onChange={setAudience}
            items={[{ id: "home", label: "Homeowners" }, { id: "business", label: "Businesses" }, { id: "landlord", label: "Landlords" }]} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-5)", marginTop: "var(--space-9)" }}>
          {SERVICES.map((s) => <ServiceCard key={s.title} {...s} href="#services" cta="See details" />)}
        </div>
        <div style={{ marginTop: "var(--space-8)" }}>
          <Button variant="outline" iconRight="arrow-right" onClick={() => go("#pricing")}>See prices for every service</Button>
        </div>
      </Section>

      {/* Proof */}
      <Section>
        <StatBlock bordered stats={[
          { value: "17 yrs", label: "Trading in the county" },
          { value: "6,400+", label: "Jobs completed" },
          { value: "62 min", label: "Average response time" },
          { value: "4.9★", label: "312 verified reviews" }
        ]} />
      </Section>

      {/* How it works */}
      <Section tone="page" py="0">
        <div style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: "var(--space-13)", alignItems: "center", paddingBottom: "var(--section-y)" }}>
          <Photo label="Photo — an engineer at a customer's door, van in the background" height={380} />
          <div>
            <SectionHeading eyebrow="How it works" title="Three steps, no surprises" />
            <div style={{ marginTop: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-7)" }}>
              {[
                { n: "01", t: "Tell us what's wrong", d: "Call, or send the form. It takes about a minute." },
                { n: "02", t: "Get a fixed price", d: "We quote before any work starts. Parts and labour, one number." },
                { n: "03", t: "We fix it", d: "Same-day where we can, or a two-hour arrival window you choose." }
              ].map((s) => (
                <div key={s.n} style={{ display: "flex", gap: "var(--space-6)" }}>
                  <span style={{ font: "700 var(--fs-h4)/1 var(--font-core)", color: "var(--accent-500)", letterSpacing: "-0.02em", minWidth: 34 }}>{s.n}</span>
                  <span>
                    <span style={{ display: "block", font: "600 var(--fs-h4)/1.3 var(--font-core)", color: "var(--text-strong)" }}>{s.t}</span>
                    <span style={{ display: "block", font: "var(--type-body)", color: "var(--text-body)", marginTop: 4, maxWidth: "44ch" }}>{s.d}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Reviews */}
      <Section tone="sunken" id="reviews">
        <SectionHeading eyebrow="Reviews" title="What people in the county say" align="center" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-5)", marginTop: "var(--space-9)" }}>
          {REVIEWS.map((r) => <TestimonialCard key={r.name} {...r} />)}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: ".8fr 1.2fr", gap: "var(--space-13)" }}>
          <SectionHeading eyebrow="Questions" title="Before you book" lead="Anything else, just ask when you call." />
          <div>
            {[
              ["Do you charge a call-out fee?", "No. Quotes are free, and the price we agree before starting is the price you pay."],
              ["How quickly can you come out?", "Most jobs booked before 11am are done the same day. Emergencies are prioritised."],
              ["Are you licensed and insured?", "Yes — fully licensed trades, $2m public liability, and every engineer is DBS checked."],
              ["Which areas do you cover?", "Ashbourne, Redhill, Carlow, Kingsmoor and everywhere within about 20 miles."],
              ["How do I pay?", "Card, bank transfer or cash on completion. Businesses can be invoiced on 14-day terms."]
            ].map(([q, a], i) => <FAQItem key={q} question={q} answer={a} defaultOpen={i === 0} />)}
          </div>
        </div>
      </Section>

      <Section tone="page" py="0">
        <div style={{ paddingBottom: "var(--section-y)" }}>
          <CTABanner tone="ink" title="Need someone today?" lead="Tell us what's wrong and we'll call you back within the hour."
            primaryLabel="Get a free quote" secondaryLabel="Call (555) 018 2244" primaryHref="#contact" secondaryHref="tel:5550182244" />
        </div>
      </Section>
    </div>
  );
}
Object.assign(window, { HomeScreen });
