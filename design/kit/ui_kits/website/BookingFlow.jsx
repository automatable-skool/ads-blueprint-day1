const { Dialog, Button, Field, Input, Textarea, Select, RadioGroup, Checkbox, StepIndicator, Alert, Icon } = window.GoodworkDesignSystem_fee824;

const STEPS = ["Job", "Details", "Time", "Confirm"];

function BookingFlow({ open, onClose, onDone }) {
  const [step, setStep] = React.useState(0);
  const [job, setJob] = React.useState("Furnace not heating");
  const [when, setWhen] = React.useState("Morning (8–12)");
  React.useEffect(() => { if (open) setStep(0); }, [open]);
  if (!open) return null;

  const body = [
    (
      <div key="job" style={{ display: "grid", gap: "var(--space-5)" }}>
        <Field label="What's going on?">
          <RadioGroup name="job" value={job} onChange={setJob}
            options={["Furnace not heating", "AC not cooling", "Annual tune-up", "New system quote", "Something else"]} />
        </Field>
        <Checkbox label="It's an emergency — no heat or no cooling right now" />
      </div>
    ),
    (
      <div key="details" style={{ display: "grid", gap: "var(--space-5)" }}>
        <Field label="Name" required><Input placeholder="Dana Reyes" /></Field>
        <Field label="Phone" hint="We only call about this job" required><Input type="tel" placeholder="(905) 555-0142" /></Field>
        <Field label="Address"><Input placeholder="88 Locke St S, Hamilton" /></Field>
        <Field label="Anything we should know?"><Textarea rows={3} placeholder="Furnace clicks but won't fire. Two-storey, unit in the basement." /></Field>
      </div>
    ),
    (
      <div key="time" style={{ display: "grid", gap: "var(--space-5)" }}>
        <Field label="Day"><Select options={["Thursday 20 Aug", "Friday 21 Aug", "Saturday 22 Aug", "First available"]} /></Field>
        <Field label="Time window"><RadioGroup name="when" value={when} onChange={setWhen} options={["Morning (8–12)", "Afternoon (12–5)", "Evening (5–8)"]} /></Field>
        <Alert tone="caution" title="Storm backlog">Same-day slots are full until Friday. Emergencies still get dispatched today.</Alert>
      </div>
    ),
    (
      <div key="confirm" style={{ display: "grid", gap: "var(--space-4)" }}>
        <Alert tone="info" title="Nothing is charged today">A tech confirms by text within 15 minutes. Diagnostic is $89, waived if you go ahead with the repair.</Alert>
        <div style={{ display: "grid", gap: "10px", padding: "var(--space-5)", background: "var(--surface-sunken)", borderRadius: "var(--radius-card)", font: "var(--type-body-sm)" }}>
          {[["Job", job], ["When", "Thursday 20 Aug · " + when], ["Where", "88 Locke St S, Hamilton"], ["Contact", "Dana Reyes · (905) 555-0142"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: "var(--space-5)" }}>
              <span style={{ width: 74, color: "var(--text-muted)" }}>{k}</span>
              <strong style={{ color: "var(--text-strong)", fontWeight: "var(--weight-semibold)" }}>{v}</strong>
            </div>
          ))}
        </div>
      </div>
    )
  ][step];

  const last = step === STEPS.length - 1;
  return (
    <Dialog open title="Book a visit" description="Four short steps — no card needed." width={560} onClose={onClose}
      footer={<>
        <Button variant="secondary" onClick={() => (step === 0 ? onClose() : setStep(step - 1))}>{step === 0 ? "Cancel" : "Back"}</Button>
        <Button variant="accent" iconRight={last ? undefined : <Icon name="arrow-right" size={16} />}
          onClick={() => (last ? onDone(when) : setStep(step + 1))}>{last ? "Book it" : "Continue"}</Button>
      </>}>
      <div style={{ display: "grid", gap: "var(--space-6)" }}>
        <StepIndicator steps={STEPS} current={step} />
        {body}
      </div>
    </Dialog>
  );
}

Object.assign(window, { BookingFlow });
