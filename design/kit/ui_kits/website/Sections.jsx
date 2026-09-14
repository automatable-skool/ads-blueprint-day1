const { Button, Icon, Badge, Card, Tag, MediaFrame, TrustRow, StatBand, ServiceCard, PlanCard, Rating, TestimonialCard, FAQItem, AvatarCluster, ProcessSteps } = window.GoodworkDesignSystem_fee824;

function Eyebrow({ icon, children }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, width: "fit-content", justifySelf: "start",
      font: "var(--type-label)", letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-brand)" }}>
      {icon ? <Icon name={icon} size={14} color="var(--text-brand)" /> : null}{children}
    </span>
  );
}

function Hero({ onBook }) {
  return (
    <section style={{ background: "var(--surface-brand)" }}>
      <div className="gw-container" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: "var(--space-10)", alignItems: "center", padding: "var(--space-11) var(--gutter)" }}>
        <div style={{ display: "grid", gap: "var(--space-5)", justifyItems: "start" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.28)", borderRadius: "var(--radius-pill)", padding: "6px 14px", font: "var(--type-label)", letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--white)" }}>
            <Icon name="zap" size={14} color="var(--white)" /> Same-day emergency call-outs
          </span>
          <h1 style={{ font: "var(--type-display)", letterSpacing: "var(--track-display)", color: "var(--white)", margin: 0, maxWidth: "19ch" }}>
            Winter doesn't quit. Neither do we.
          </h1>
          <p style={{ font: "var(--type-body-lg)", color: "var(--blue-100)", margin: 0, maxWidth: "46ch" }}>
            Furnaces, AC, heat pumps and mini-splits. Repaired, maintained and installed by a crew that knows the neighbourhood. Same-day service, upfront pricing.
          </p>
          <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", alignItems: "center", marginTop: "var(--space-2)" }}>
            <Button variant="accent" size="lg" onClick={onBook}>Book instantly</Button>
            <Button variant="secondary" size="lg" href="#services">See what we do</Button>
          </div>
          <AvatarCluster people={["KM", "JP", "LB", "DR"]} rating="4.9" label="2,500+ verified Google reviews" tone="on-brand" style={{ marginTop: "var(--space-2)" }} />
          <TrustRow items={["Licensed & insured", "Upfront fixed pricing", "No overtime fees"]} iconColor="var(--blue-200)" style={{ marginTop: "var(--space-2)", color: "var(--blue-100)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.35fr) minmax(0,1fr)", gridTemplateRows: "auto auto", gap: "var(--space-4)" }}>
          <span style={{ position: "relative", gridRow: "span 2", display: "block", minWidth: 0 }}>
            <MediaFrame ratio="4 / 3" label="Crew & van" style={{ height: "100%", aspectRatio: "auto", background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.22)" }} />
            <span style={{ position: "absolute", left: 14, bottom: 14, display: "grid", gap: 1, padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "var(--surface-card)", boxShadow: "var(--shadow-lg)" }}>
              <strong style={{ font: "var(--weight-black) 20px/1 var(--font-core)", letterSpacing: "var(--track-heading)", color: "var(--text-strong)" }}>Under 2 hrs</strong>
              <span style={{ font: "var(--type-caption)", color: "var(--text-muted)" }}>average emergency response</span>
            </span>
          </span>
          <MediaFrame ratio="1 / 1" label="On the job" style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.22)" }} />
          <MediaFrame ratio="1 / 1" label="Finished install" style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.22)" }} />
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <StatBand items={[
      { value: "14+", label: "years in the trade", icon: "badge-check" },
      { value: "1,400+", label: "jobs completed", icon: "check" },
      { value: "4.9", label: "across 2,500 reviews", icon: "star" },
      { value: "24/7", label: "emergency service", icon: "clock" }
    ]} tone="plain" />
  );
}

function Services({ onBook }) {
  const items = [
    { icon: "zap", title: "Furnace repair & install", description: "When it drops to 10°F overnight, you need a furnace that doesn't tap out.", price: "From $185", image: "", imageLabel: "Furnace swap" },
    { icon: "wrench", title: "AC repair & install", description: "Summers hit different. We keep you cold when it actually counts.", price: "From $149", image: "", imageLabel: "Condenser install" },
    { icon: "leaf", title: "Indoor air quality", description: "Dust, allergens, and that smell you can't quite place.", price: "From $240", image: "", imageLabel: "Filtration unit" },
    { icon: "shield-check", title: "Maintenance plans", description: "The cheapest repair is the one you never need. Twice a year, zero drama.", price: "$34.99 / month", image: "", imageLabel: "Tune-up visit" },
    { icon: "truck", title: "Heat pumps & mini-splits", description: "Ductless comfort for additions, garages and stubborn back rooms.", price: "Quoted per job", image: "", imageLabel: "Mini-split" },
    { icon: "credit-card", title: "0% financing", description: "Spread a new system over 24 months with approved credit.", price: "24 months", image: "", imageLabel: "Paperwork" }
  ];
  return (
    <section id="services" style={{ padding: "var(--section-y-sm) 0", background: "var(--surface-card)" }}>
      <div className="gw-container">
        <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-7)", marginBottom: "var(--space-7)" }}>
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <Eyebrow icon="wrench">What we do</Eyebrow>
            <h2 style={{ margin: 0 }}>Heat it. Cool it. Fix it.</h2>
          </div>
          <Button variant="ghost" href="#services" iconRight={<Icon name="arrow-right" size={16} />} style={{ marginLeft: "auto" }}>See all services</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-6)" }}>
          {items.map((s) => <ServiceCard key={s.title} {...s} onClick={(e) => { e.preventDefault(); onBook(); }} />)}
        </div>
      </div>
    </section>
  );
}

function Club({ onBook }) {
  return (
    <section id="comfort-club" style={{ padding: "var(--section-y-sm) 0", background: "var(--surface-card)" }}>
      <div className="gw-container">
        <div style={{ display: "grid", gap: "var(--space-2)", marginBottom: "var(--space-6)" }}>
          <Eyebrow icon="badge-check">Membership</Eyebrow>
          <h2 style={{ margin: 0 }}>Join the Comfort Club</h2>
        </div>
        <PlanCard price="$34.99" period="per month" footnote="12 month minimum. Cancel anytime."
          title="Two tune-ups a year, and you skip the queue"
          description="A tech who knows your system, priority booking when it matters, and 5% off every repair."
          perks={["2 tune-ups / year", "5% off repairs", "Same-day service", "No overtime fees"]}
          action={<Button variant="accent" onClick={onBook}>Join now</Button>} />
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { title: "You call, we answer", body: "No phone menus. Someone picks up, takes your details and books you in.", badge: "No robots", image: "", imageLabel: "On the phone" },
    { title: "Honest diagnosis", body: "The tech explains the fault in plain English before touching a tool.", image: "", imageLabel: "Diagnosing" },
    { title: "Upfront quote", body: "Parts and labour, in full, before any work starts. No surprise invoice.", badge: "Fixed price", image: "", imageLabel: "The quote" },
    { title: "Fixed and cleaned up", body: "We test everything, tidy the space, and back the repair for a year.", image: "", imageLabel: "Finished" }
  ];
  return (
    <section style={{ padding: "var(--section-y-sm) 0", background: "var(--surface-tint)" }}>
      <div className="gw-container">
        <div style={{ display: "grid", gap: "var(--space-2)", marginBottom: "var(--space-7)" }}>
          <Eyebrow icon="circle-check">How it works</Eyebrow>
          <h2 style={{ margin: 0 }}>Four steps, no runaround</h2>
        </div>
        <ProcessSteps steps={steps} />
      </div>
    </section>
  );
}

function Gallery() {
  const shots = [
    { label: "Before · 1998 furnace", ratio: "4 / 3" },
    { label: "After · new install", ratio: "4 / 3" },
    { label: "Ductwork detail", ratio: "4 / 3" },
    { label: "Mini-split, back room", ratio: "4 / 3" }
  ];
  return (
    <section id="our-work" style={{ padding: "var(--section-y-sm) 0", background: "var(--surface-card)" }}>
      <div className="gw-container">
        <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-7)", marginBottom: "var(--space-6)" }}>
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <Eyebrow icon="image">Our work</Eyebrow>
            <h2 style={{ margin: 0 }}>Recent jobs around town</h2>
          </div>
          <Button variant="ghost" href="#our-work" iconRight={<Icon name="arrow-right" size={16} />} style={{ marginLeft: "auto" }}>See the full gallery</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-5)" }}>
          {shots.map((s) => <MediaFrame key={s.label} ratio={s.ratio} label={s.label} />)}
        </div>
      </div>
    </section>
  );
}

function Crew() {
  return (
    <section style={{ background: "var(--surface-tint)" }}>
      <div className="gw-container" style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: "var(--space-10)", alignItems: "center", padding: "var(--space-10) var(--gutter)" }}>
        <MediaFrame ratio="16 / 10" label="The crew, 2026" />
        <div style={{ display: "grid", gap: "var(--space-4)" }}>
          <Eyebrow icon="users">Who turns up</Eyebrow>
          <h2 style={{ margin: 0 }}>Six techs, one van each, no subcontractors</h2>
          <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: 0 }}>Everyone who knocks on your door works here. You get a name and a photo by text before they arrive.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-4)", marginTop: "var(--space-2)" }}>
            {["Kenny M.", "James P.", "Leah B."].map((n) => (
              <div key={n} style={{ display: "grid", gap: "8px" }}>
                <MediaFrame ratio="1 / 1" label="Portrait" radius="var(--radius-md)" />
                <strong style={{ font: "var(--weight-bold) var(--size-body-sm)/1.2 var(--font-core)", color: "var(--text-strong)" }}>{n}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Areas() {
  const areas = ["Hamilton", "Dundas", "Ancaster", "Stoney Creek", "Burlington", "Waterdown", "Grimsby", "Binbrook"];
  return (
    <section style={{ padding: "var(--section-y-sm) 0", background: "var(--surface-tint)" }}>
      <div className="gw-container" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "var(--space-10)", alignItems: "center" }}>
        <div style={{ display: "grid", gap: "var(--space-4)" }}>
          <Eyebrow icon="map-pin">Where we work</Eyebrow>
          <h2 style={{ margin: 0 }}>Serving Hamilton &amp; beyond</h2>
          <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: 0 }}>If you're cold — or hot — we're on our way. Same rates across every area we cover.</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
          {areas.map((a) => <Tag key={a} icon="map-pin">{a}</Tag>)}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" style={{ padding: "var(--section-y-sm) 0", background: "var(--surface-card)" }}>
      <div className="gw-container">
        <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-7)", marginBottom: "var(--space-7)" }}>
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <Eyebrow icon="quote">Reviews</Eyebrow>
            <h2 style={{ margin: 0 }}>Neighbours say we're pretty good</h2>
          </div>
          <div style={{ marginLeft: "auto", display: "grid", justifyItems: "end", gap: 4 }}>
            <strong style={{ font: "var(--weight-black) 34px/1 var(--font-core)", letterSpacing: "var(--track-display)", color: "var(--text-strong)" }}>4.9</strong>
            <Rating value={5} size={15} count={2500} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-6)" }}>
          <TestimonialCard rating={5} quote="Came out the same evening and stayed until the heat was back on." name="Dana R." detail="Furnace repair · Westdale" source="Google" />
          <TestimonialCard rating={5} quote="Quoted $340, charged $340. The basement was cleaner than they found it." name="Marcus T." detail="AC install · Dundas" source="Google" />
          <TestimonialCard rating={5} quote="Kenny explained how to keep the unit running between visits. No upsell." name="Priya S." detail="AC tune-up · Stoney Creek" source="Facebook" />
        </div>
      </div>
    </section>
  );
}

function Questions() {
  const qs = [
    { question: "Do you charge for quotes?", answer: "No. Quotes are free anywhere in our service area, and the price we quote is the price you pay." },
    { question: "How fast can you get here in an emergency?", answer: "Under two hours on average within Hamilton. Call the number in the header and you'll speak to a person, not a queue." },
    { question: "Are you licensed and insured?", answer: "Yes — Ontario licence #PL-40218 and $2M liability cover. We'll send both on request." },
    { question: "Do you charge extra for evenings or weekends?", answer: "No overtime fees. Saturday and evening call-outs are billed at the same rate as weekdays." }
  ];
  return (
    <section id="about" style={{ padding: "var(--section-y-sm) 0", background: "var(--surface-tint)" }}>
      <div className="gw-container" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "var(--space-10)", alignItems: "start" }}>
        <div style={{ display: "grid", gap: "var(--space-5)" }}>
          <Eyebrow icon="message-square">Questions</Eyebrow>
          <h2 style={{ margin: 0 }}>Before you call</h2>
          <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: 0 }}>Anything we haven't covered, ask on the phone — we'd rather answer it now than surprise you later.</p>
          <Card padding="sm" accent style={{ display: "grid", gap: 6 }}>
            <strong style={{ font: "var(--type-h4)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>Comfort Club members</strong>
            <span style={{ font: "var(--type-body-sm)", color: "var(--text-body)" }}>Priority booking and 5% off every repair.</span>
          </Card>
        </div>
        <div>{qs.map((q, i) => <FAQItem key={q.question} {...q} defaultOpen={i === 0} />)}</div>
      </div>
    </section>
  );
}

function ClosingCTA({ onBook }) {
  return (
    <section style={{ background: "var(--surface-brand)" }}>
      <div className="gw-container" style={{ display: "flex", alignItems: "center", gap: "var(--space-8)", padding: "var(--space-10) var(--gutter)", flexWrap: "wrap" }}>
        <div style={{ display: "grid", gap: "var(--space-3)" }}>
          <h2 style={{ color: "var(--white)", margin: 0 }}>Ready to stop sweating it?</h2>
          <p style={{ font: "var(--type-body-lg)", color: "var(--blue-100)", margin: 0, maxWidth: "48ch" }}>Book online in under a minute, or call and talk to someone who answers.</p>
        </div>
        <div style={{ display: "flex", gap: "var(--space-4)", marginLeft: "auto" }}>
          <Button variant="accent" size="lg" onClick={onBook}>Schedule instantly</Button>
          <Button variant="secondary" size="lg" href="tel:9055550142" iconLeft={<Icon name="phone" size={18} />}>(905) 555-0142</Button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Eyebrow, Hero, Proof, Services, Process, Gallery, Crew, Club, Areas, Reviews, Questions, ClosingCTA });
