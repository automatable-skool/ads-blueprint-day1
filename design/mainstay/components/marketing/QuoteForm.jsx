import React from "react";
import { Input } from "../forms/Input.jsx";
import { Textarea } from "../forms/Textarea.jsx";
import { Select } from "../forms/Select.jsx";
import { Checkbox } from "../forms/Checkbox.jsx";
import { Button } from "../core/Button.jsx";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.ms-quote{display:flex;flex-direction:column;gap:var(--space-5);padding:var(--space-8);background:var(--surface-card);border:var(--border-w) solid var(--border-subtle);border-radius:var(--radius-lg);box-shadow:var(--shadow-md)}
.ms-quote__title{font:var(--fw-semibold) var(--fs-h3)/1.25 var(--font-core);letter-spacing:var(--ls-heading);color:var(--text-strong)}
.ms-quote__sub{margin-top:6px;font:var(--type-small);color:var(--text-muted)}
.ms-quote__row{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5)}
.ms-quote__note{display:flex;align-items:center;gap:8px;font:var(--fw-regular) var(--fs-caption)/1.4 var(--font-core);color:var(--text-muted)}
.ms-quote__done{display:flex;flex-direction:column;align-items:center;gap:var(--space-4);text-align:center;padding:var(--space-8) 0}
.ms-quote__done svg{color:var(--status-success)}
@media (max-width:560px){.ms-quote__row{grid-template-columns:1fr}}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-quoteform-css")) {
  const el = document.createElement("style"); el.id = "ms-quoteform-css"; el.textContent = __css; document.head.appendChild(el);
}

export function QuoteForm({
  title = "Get a free quote",
  subtitle = "We reply within one business hour, 7am–6pm.",
  services = ["Emergency repair", "Installation", "Servicing & maintenance", "Something else"],
  submitLabel = "Request my quote",
  footnote = "No call-out fee. No obligation.",
  onSubmit, className = "", ...rest
}) {
  const [sent, setSent] = React.useState(false);
  if (sent) {
    return (
      <div className={["ms-quote", className].filter(Boolean).join(" ")} {...rest}>
        <div className="ms-quote__done">
          <Icon name="circle-check" size={40} />
          <div className="ms-quote__title">Request received</div>
          <p className="ms-quote__sub">We'll call you back shortly to confirm a time.</p>
        </div>
      </div>
    );
  }
  return (
    <form
      className={["ms-quote", className].filter(Boolean).join(" ")}
      onSubmit={(e) => { e.preventDefault(); setSent(true); onSubmit && onSubmit(e); }}
      {...rest}
    >
      <div>
        <div className="ms-quote__title">{title}</div>
        {subtitle && <p className="ms-quote__sub">{subtitle}</p>}
      </div>
      <div className="ms-quote__row">
        <Input label="Name" placeholder="Jane Whitfield" required />
        <Input label="Phone" type="tel" placeholder="(555) 018 2244" required />
      </div>
      <Select label="What do you need?" options={services} placeholder="Choose a service" required />
      <Textarea label="Tell us about the job" rows={3} placeholder="Kitchen tap has been dripping for a week…" />
      <Checkbox label="Send me an SMS confirmation" defaultChecked />
      <Button type="submit" size="lg" fullWidth iconRight="arrow-right">{submitLabel}</Button>
      {footnote && <span className="ms-quote__note"><Icon name="shield-check" size={15} />{footnote}</span>}
    </form>
  );
}
