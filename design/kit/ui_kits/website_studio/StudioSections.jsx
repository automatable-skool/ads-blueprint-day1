const { Button, Icon, Badge, Card, Tag, MediaFrame, AvatarCluster, ProcessSteps, StatBlock, TestimonialCard, FAQItem, PlanCard, Field, Input, Textarea, Select } = window.GoodworkDesignSystem_fee824;

/* Calm page style: white throughout, centred hero, generous whitespace,
   one accent, photography doing the talking. */

function Eyebrow({ icon, children, align = "left" }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 7, width: "fit-content",
      justifySelf: align === "center" ? "center" : "start", alignSelf: align === "center" ? "center" : "start",
      font: "var(--type-label)", letterSpacing: "var(--track-label)", textTransform: "uppercase", color: "var(--text-brand)"
    }}>
      {icon ? <Icon name={icon} size={14} color="var(--text-brand)" /> : null}{children}
    </span>
  );
}

function StudioHero({ onEnquire }) {
  return (
    <section style={{ padding: "var(--space-12) 0 var(--space-10)" }}>
      <div className="gw-container" style={{ display: "grid", gap: "var(--space-7)", justifyItems: "center", textAlign: "center", maxWidth: 880 }}>
        <Eyebrow icon="sparkles" align="center">Weddings · Portraits · Editorial</Eyebrow>
        <h1 style={{ font: "var(--type-display)", letterSpacing: "var(--track-display)", color: "var(--text-strong)", margin: 0, maxWidth: "22ch" }}>
          The day, remembered the way it felt
        </h1>
        <p style={{ font: "var(--type-body-lg)", color: "var(--text-muted)", margin: 0, maxWidth: "52ch" }}>
          A two-person studio in Hamilton. We shoot quietly, hand back every usable frame, and never make you pose for a photo you wouldn't hang up.
        </p>
        <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", justifyContent: "center" }}>
          <Button variant="primary" size="lg" onClick={onEnquire} iconRight={<Icon name="arrow-right" size={17} />}>Check your date</Button>
          <Button variant="secondary" size="lg" href="#work">See the work</Button>
        </div>
        <AvatarCluster people={["DR", "MT", "PS", "AO"]} rating="4.9" label="118 verified reviews · Google" style={{ marginTop: "var(--space-2)" }} />
      </div>
      <div className="gw-container" style={{ marginTop: "var(--space-9)" }}>
        <MediaFrame ratio="21 / 9" label="Signature frame" radius="var(--radius-media)" />
      </div>
    </section>
  );
}

function StudioProof() {
  const logos = ["Bridal Lane", "Niagara Weds", "Field & Vow", "The Sunday Post", "Hamilton Life"];
  return (
    <section style={{ padding: "0 0 var(--section-y-sm)" }}>
      <div className="gw-container" style={{ display: "grid", gap: "var(--space-6)", justifyItems: "center" }}>
        <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>Featured in</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-9)", justifyContent: "center" }}>
          {logos.map((l) => (
            <span key={l} style={{ font: "var(--weight-bold) 17px/1 var(--font-core)", letterSpacing: "-0.02em", color: "var(--ink-600)" }}>{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioWork() {
  const shots = [
    { label: "Elopement · Dundas Peak", ratio: "3 / 4" },
    { label: "Reception · Cotton Factory", ratio: "3 / 4" },
    { label: "Portrait · studio", ratio: "3 / 4" },
    { label: "Ceremony · Ancaster", ratio: "3 / 4" }
  ];
  return (
    <section id="work" style={{ padding: "0 0 var(--section-y-sm)" }}>
      <div className="gw-container">
        <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-7)", marginBottom: "var(--space-7)" }}>
          <div style={{ display: "grid", gap: "var(--space-4)" }}>
            <Eyebrow icon="image">Selected work</Eyebrow>
            <h2 style={{ margin: 0 }}>Recent days</h2>
          </div>
          <Button variant="ghost" href="#work" iconRight={<Icon name="arrow-up-right" size={16} />} style={{ marginLeft: "auto" }}>Full portfolio</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-5)" }}>
          {shots.map((s) => <MediaFrame key={s.label} ratio={s.ratio} label={s.label} />)}
        </div>
      </div>
    </section>
  );
}

function StudioServices({ onEnquire }) {
  const items = [
    { icon: "camera", title: "Full-day wedding", body: "Ten hours, two photographers, every usable frame delivered in three weeks.", price: "From $3,400" },
    { icon: "sparkles", title: "Elopement", body: "Three hours for the ceremony and the golden hour after it.", price: "From $1,650" },
    { icon: "user", title: "Portraits", body: "Studio or on location. Families, couples, headshots for work.", price: "From $420" }
  ];
  return (
    <section id="services" style={{ padding: "0 0 var(--section-y-sm)" }}>
      <div className="gw-container">
        <div style={{ display: "grid", gap: "var(--space-4)", marginBottom: "var(--space-7)" }}>
          <Eyebrow icon="camera">What we offer</Eyebrow>
          <h2 style={{ margin: 0 }}>Three ways to book us</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-6)" }}>
          {items.map((s, i) => (
            <Card key={s.title} padding="md" accent={i === 0} style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
              <span style={{ width: 38, height: 38, borderRadius: "var(--radius-sm)", background: "var(--surface-sunken)", display: "grid", placeItems: "center" }}>
                <Icon name={s.icon} size={19} color="var(--text-strong)" />
              </span>
              <h3 style={{ font: "var(--type-h3)", margin: 0 }}>{s.title}</h3>
              <p style={{ font: "var(--type-body-sm)", color: "var(--text-body)", margin: 0 }}>{s.body}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "var(--space-4)", borderTop: "var(--border-hairline) solid var(--line-hairline)" }}>
                <strong style={{ font: "var(--weight-bold) var(--size-body-sm)/1 var(--font-core)", color: "var(--text-strong)" }}>{s.price}</strong>
                <Button variant="ghost" size="sm" onClick={onEnquire} iconRight={<Icon name="arrow-right" size={15} />}>Enquire</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioProcess() {
  const steps = [
    { title: "Say hello", body: "Tell us the date and the venue. We reply within a day with availability and a price." },
    { title: "Meet, properly", body: "A coffee or a video call, so nobody is a stranger on the morning." },
    { title: "The day itself", body: "We stay out of the way. You will barely notice us working." },
    { title: "Your gallery", body: "Every usable frame, colour-graded, in three weeks. Yours to print forever." }
  ];
  return (
    <section style={{ padding: "0 0 var(--section-y-sm)" }}>
      <div className="gw-container" style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: "var(--space-10)", alignItems: "center" }}>
        <MediaFrame ratio="4 / 5" label="Us, working" />
        <div style={{ display: "grid", gap: "var(--space-6)" }}>
          <div style={{ display: "grid", gap: "var(--space-4)" }}>
            <Eyebrow icon="circle-check">How it works</Eyebrow>
            <h2 style={{ margin: 0 }}>Four steps, no surprises</h2>
          </div>
          <ProcessSteps steps={steps} layout="rows" />
        </div>
      </div>
    </section>
  );
}

function StudioWords() {
  return (
    <section style={{ padding: "var(--section-y-sm) 0", background: "var(--surface-sunken)" }}>
      <div className="gw-container">
        <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-7)", marginBottom: "var(--space-7)" }}>
          <div style={{ display: "grid", gap: "var(--space-4)" }}>
            <Eyebrow icon="quote">Kind words</Eyebrow>
            <h2 style={{ margin: 0 }}>What couples said afterwards</h2>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "var(--space-8)" }}>
            <StatBlock value="140+" label="weddings shot" />
            <StatBlock value="3 wks" label="average delivery" />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-6)" }}>
          <TestimonialCard rating={5} quote="We forgot they were there, which is exactly what we wanted." name="Dana &amp; Ravi" detail="Cotton Factory · June 2026" source="Google" />
          <TestimonialCard rating={5} quote="Six hundred photos, and not one where I look like I'm being told to smile." name="Marcus T." detail="Elopement · Dundas Peak" source="Google" />
          <TestimonialCard rating={5} quote="They handled our families with more patience than we did." name="Priya S." detail="Ancaster · September 2026" source="Instagram" />
        </div>
      </div>
    </section>
  );
}

function StudioPricing({ onEnquire }) {
  return (
    <section style={{ padding: "var(--section-y-sm) 0 0" }}>
      <div className="gw-container">
        <div style={{ display: "grid", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
          <Eyebrow icon="badge-check">Membership</Eyebrow>
          <h2 style={{ margin: 0 }}>The album club</h2>
        </div>
        <PlanCard price="$59" period="per month" footnote="Cancel anytime."
          title="A printed album every year"
          description="For families who keep meaning to print the photos and never do. We choose, you approve, it arrives."
          perks={["Annual 40-page album", "Two portrait sessions", "Priority booking", "20% off prints"]}
          action={<Button variant="accent" onClick={onEnquire}>Join the club</Button>} />
      </div>
    </section>
  );
}

function StudioQuestions() {
  const qs = [
    { question: "How far ahead should we book?", answer: "Most couples book nine to twelve months out. Peak Saturdays in June and September go first, but we keep two dates a month open for short notice." },
    { question: "Do you travel?", answer: "Anywhere in southern Ontario at no extra cost. Further afield, we add travel at cost and tell you the number before you commit." },
    { question: "How many photos do we get?", answer: "Every usable frame — usually 500 to 800 for a full day. No drip-feeding, no upsell to unlock the rest." },
    { question: "What if it rains?", answer: "We shoot anyway, and some of our favourite frames are wet ones. We carry umbrellas and a backup plan for every venue." }
  ];
  return (
    <section id="about" style={{ padding: "var(--section-y-sm) 0 0" }}>
      <div className="gw-container" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "var(--space-10)", alignItems: "start" }}>
        <div style={{ display: "grid", gap: "var(--space-5)" }}>
          <Eyebrow icon="message-square">Questions</Eyebrow>
          <h2 style={{ margin: 0 }}>Before you enquire</h2>
          <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: 0 }}>Anything we haven't covered, just ask. We answer email properly, not with a template.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
            {["Hamilton", "Niagara", "Toronto", "Prince Edward County"].map((a) => <Tag key={a} icon="map-pin">{a}</Tag>)}
          </div>
        </div>
        <div>{qs.map((q, i) => <FAQItem key={q.question} {...q} defaultOpen={i === 0} />)}</div>
      </div>
    </section>
  );
}

function EnquiryField({ label, icon, required, children, span }) {
  return (
    <label style={{ display: "grid", gap: 6, gridColumn: span ? "1 / -1" : "auto", minWidth: 0 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "var(--weight-semibold) 13px/1.2 var(--font-core)", color: "var(--text-strong)" }}>
        {icon ? <Icon name={icon} size={14} color="var(--text-brand)" /> : null}
        {label}{required ? <span style={{ color: "var(--text-brand)" }}>*</span> : null}
      </span>
      {children}
    </label>
  );
}

function FilledInput({ as = "input", ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const Tag = as;
  return (
    <Tag
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{
        width: "100%", minWidth: 0, font: "var(--type-body)", color: "var(--text-strong)",
        padding: as === "textarea" ? "11px 14px" : "0 14px",
        height: as === "textarea" ? "auto" : "var(--control-h)",
        lineHeight: as === "textarea" ? "var(--lh-body)" : undefined,
        resize: as === "textarea" ? "vertical" : undefined,
        background: focus ? "var(--surface-card)" : "var(--ink-50)",
        border: `var(--border-hairline) solid ${focus ? "var(--line-brand)" : "var(--line-hairline)"}`,
        borderRadius: "var(--radius-control)", outline: "none",
        boxShadow: focus ? "0 0 0 3px var(--blue-100)" : "none",
        transition: "var(--transition-control)"
      }}
      {...rest}
    />
  );
}

function ChoiceChips({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
      {options.map((o) => {
        const on = o === value;
        return (
          <button key={o} type="button" onClick={() => onChange(o)}
            style={{
              padding: "9px 14px", borderRadius: "var(--radius-control)", cursor: "pointer",
              font: `${on ? "var(--weight-bold)" : "var(--weight-medium)"} var(--size-body-sm)/1 var(--font-core)`,
              background: on ? "var(--surface-brand)" : "var(--ink-50)",
              color: on ? "var(--white)" : "var(--text-body)",
              border: `var(--border-hairline) solid ${on ? "var(--surface-brand)" : "var(--line-hairline)"}`,
              transition: "var(--transition-control)"
            }}>{o}</button>
        );
      })}
    </div>
  );
}

function StudioEnquiry({ onSubmit }) {
  const [plan, setPlan] = React.useState("Full-day wedding");
  return (
    <section id="contact" style={{ padding: "var(--section-y-sm) 0" }}>
      <div className="gw-container" style={{ display: "grid", gridTemplateColumns: "minmax(0,.85fr) minmax(0,1.15fr)", gap: "var(--space-10)", alignItems: "start" }}>
        <div style={{ display: "grid", gap: "var(--space-5)" }}>
          <Eyebrow icon="mail">Enquire</Eyebrow>
          <h2 style={{ margin: 0, maxWidth: "18ch" }}>Check your date</h2>
          <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: 0, maxWidth: "42ch" }}>Tell us the date and roughly what you're planning. You'll hear back within a day, from one of us, not an assistant.</p>
          <AvatarCluster people={["DR", "MT", "PS"]} rating="4.9" label="118 couples, 118 replies within a day" />
          <MediaFrame ratio="4 / 3" label="Studio, James St N" />
        </div>
        <Card padding="none" elevation="md" style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", padding: "var(--space-6) var(--space-7)", borderBottom: "var(--border-hairline) solid var(--line-hairline)", background: "var(--surface-tint)" }}>
            <span style={{ width: 38, height: 38, flex: "none", borderRadius: "var(--radius-sm)", background: "var(--surface-brand)", display: "grid", placeItems: "center" }}>
              <Icon name="calendar-check" size={19} color="var(--white)" />
            </span>
            <span style={{ display: "grid", gap: 1 }}>
              <strong style={{ font: "var(--type-h4)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>Tell us about your day</strong>
              <span style={{ font: "var(--type-body-sm)", color: "var(--text-muted)" }}>Two minutes. No obligation.</span>
            </span>
            <Badge tone="positive" dot style={{ marginLeft: "auto" }}>2027 open</Badge>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)", padding: "var(--space-7)" }}>
            <EnquiryField label="Your names" icon="user" required span><FilledInput placeholder="Dana &amp; Ravi" /></EnquiryField>
            <EnquiryField label="Email" icon="mail" required><FilledInput type="email" placeholder="dana@example.com" /></EnquiryField>
            <EnquiryField label="Phone" icon="phone"><FilledInput type="tel" placeholder="(905) 555-0188" /></EnquiryField>
            <EnquiryField label="Date" icon="calendar"><FilledInput placeholder="12 June 2027" /></EnquiryField>
            <EnquiryField label="Guests" icon="users"><FilledInput placeholder="About 80" /></EnquiryField>
            <EnquiryField label="What are you planning?" icon="camera" span>
              <ChoiceChips value={plan} onChange={setPlan} options={["Full-day wedding", "Elopement", "Portraits", "Something else"]} />
            </EnquiryField>
            <EnquiryField label="Anything else?" icon="message-square" span>
              <FilledInput as="textarea" rows={3} placeholder="Ceremony at 2pm in Ancaster, reception at the Cotton Factory." />
            </EnquiryField>
          </div>
          <div style={{ display: "grid", gap: "var(--space-4)", padding: "var(--space-6) var(--space-7)", borderTop: "var(--border-hairline) solid var(--line-hairline)", background: "var(--ink-50)" }}>
            <Button variant="primary" size="lg" block onClick={onSubmit} iconRight={<Icon name="arrow-right" size={17} />}>Send enquiry</Button>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--space-5)" }}>
              {["Reply within a day", "No deposit to hold a date", "We answer, not a bot"].map((t) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, font: "var(--type-caption)", color: "var(--text-muted)" }}>
                  <Icon name="check" size={13} color="var(--status-positive)" strokeWidth={2.5} />{t}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

Object.assign(window, { Eyebrow, StudioHero, StudioProof, StudioWork, StudioServices, StudioProcess, StudioWords, StudioPricing, StudioQuestions, StudioEnquiry });
