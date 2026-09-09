"use client";
// The calm template's enquiry form, wired up.
//
// The template ships this form as static markup with no name attributes and no
// submit handler, so on an ads page it would take a lead and drop it. Every
// style below is copied verbatim from `app/calm/page.tsx` - the uppercase
// tracked label, the sunken fill, the brand-blue full-width button. Nothing
// here is a new look; the only additions are the plumbing the template has
// none of: the stashed gclid and keyword riding along as hidden fields, the
// honeypot, the SMS consent line, the post to /api/lead and the redirect to
// /thank-you where the conversion tag fires.
import { useEffect, useState } from "react";
import { readSource, type LeadSource } from "@/lib/source";

const HIDDEN_KEYS: (keyof LeadSource)[] = [
  "gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "keyword", "campaign", "adgroup", "matchtype", "device", "network", "creative", "landing_page", "referrer", "landed_at",
];

const LABEL: React.CSSProperties = {
  font: "var(--type-label)", letterSpacing: "var(--track-label)",
  textTransform: "uppercase", color: "var(--text-muted)",
};
const FIELD: React.CSSProperties = {
  width: "100%", minHeight: "var(--control-h)", padding: "var(--pad-control)",
  font: "var(--type-body)", color: "var(--text-strong)", background: "var(--surface-sunken)",
  borderColor: "var(--line-hairline)", borderRadius: "var(--radius-input)",
  transition: "var(--transition-control)", outline: "none", boxShadow: "none",
};
const BUTTON: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
  font: "var(--type-button)", letterSpacing: "0.005em", borderRadius: "var(--radius-control)",
  borderColor: "transparent", cursor: "pointer", textDecoration: "none",
  transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)",
  whiteSpace: "nowrap", minHeight: "var(--control-h)", padding: "var(--pad-control)",
  background: "var(--surface-brand)", color: "var(--text-inverse)", width: "100%",
};
const CAPTION: React.CSSProperties = { font: "var(--type-caption)", color: "var(--text-muted)" };

// The revenue question is the real qualifier: $25,000 a month is the only hard
// gate, so a lead under it can be routed rather than called.
const REVENUE = ["$25K-$50K", "$50K-$100K", "$100K-$250K", "$250K+", "Under $25K"];

function Field({ label, name, required, type = "text", placeholder, help, inputMode, autoComplete }: {
  label: string; name: string; required?: boolean; type?: string; placeholder?: string;
  help?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; autoComplete?: string;
}) {
  return (
    <label style={{ display: "grid", gap: "6px" }}>
      <span style={LABEL}>{label}{required && <span style={{ color: "var(--status-critical)" }}> *</span>}</span>
      <input
        name={name} type={type} required={required} placeholder={placeholder}
        inputMode={inputMode} autoComplete={autoComplete} style={FIELD}
      />
      {help && <span style={CAPTION}>{help}</span>}
    </label>
  );
}

export function CalmLeadForm({ business, phone, page }: { business: string; phone: string; page: string }) {
  const [source, setSource] = useState<LeadSource>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => { setSource(readSource()); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // With JS we post in the background and show a friendly error if the
    // webhook is down. Without JS the plain POST below still works.
    e.preventDefault();
    if (busy) return;
    setBusy(true); setFailed(false);
    try {
      const res = await fetch("/api/lead", { method: "POST", body: new FormData(e.currentTarget), redirect: "manual" });
      if (res.ok || res.type === "opaqueredirect" || res.status === 0) {
        window.location.assign("/thank-you");
        return;
      }
      setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form method="post" action="/api/lead" onSubmit={onSubmit} style={{ display: "grid", gap: "var(--space-5)" }}>
      <Field label="Your name" name="name" required placeholder="First and last" autoComplete="name" />
      <Field label="Phone" name="phone" type="tel" required placeholder="So we can call you back" inputMode="tel" autoComplete="tel" />
      <Field label="Email" name="email" type="email" required placeholder="Where the graded audit goes" inputMode="email" autoComplete="email" />
      <Field label="Your website" name="website" type="url" placeholder="https://" inputMode="url" autoComplete="url"
        help="The audit grades this site. Leave it blank if you do not have one yet." />

      <label style={{ display: "grid", gap: "6px" }}>
        <span style={LABEL}>Monthly revenue</span>
        <select name="revenue" defaultValue="" style={FIELD}>
          <option value="">Choose one</option>
          {REVENUE.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </label>

      {/* Honeypot. Humans never see it; bots fill it and get quietly dropped. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="company_fax">Fax</label>
        <input id="company_fax" name="company_fax" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start", ...CAPTION }}>
        <input type="checkbox" name="sms_consent" value="yes" style={{ marginTop: 2, width: 16, height: 16, flex: "none" }} />
        <span>{business} may text me about my request. Msg and data rates may apply. Reply STOP to cancel, HELP for help.</span>
      </label>

      {HIDDEN_KEYS.map((k) => <input key={k} type="hidden" name={k} value={source[k] ?? ""} />)}
      <input type="hidden" name="page" value={page} />

      <button type="submit" disabled={busy} style={{ ...BUTTON, opacity: busy ? 0.5 : 1 }}>
        {busy ? "Sending" : "Get my free graded audit"}
      </button>

      {failed && (
        <span role="alert" style={{ ...CAPTION, color: "var(--status-critical)" }}>
          That did not send. Call {phone} and we will take it over the phone.
        </span>
      )}
      <span style={{ ...CAPTION, textAlign: "center" }}>
        No spam, no list. Your details go to us and nobody else. <a href="/privacy-policy">Privacy policy</a>.
      </span>
    </form>
  );
}

// The click-to-call link, in the template's pill. Before the phone dials it
// fires the stashed keyword and gclid to the webhook, so one real number still
// tells you which keyword rang the phone. No number pools, no per-page numbers.
export function CalmCallLink({ phone, label, style, className }: {
  phone: string; label?: string; style?: React.CSSProperties; className?: string;
}) {
  const tel = "tel:" + phone.replace(/[^+\d]/g, "");
  const fire = () => {
    try {
      const payload = { ...readSource(), event: "call_click", phone, page: window.location.pathname };
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      if (!navigator.sendBeacon("/api/lead", blob)) {
        fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), keepalive: true }).catch(() => {});
      }
    } catch {
      // Never block the call because tracking hiccuped.
    }
  };
  // data-wcm-number marks the places where the number itself is printed, so
  // Google's snippet rewrites the label and the href together. A custom label
  // ("Call us") is left alone; only its href is swapped.
  return (
    <a href={tel} className={className} onClick={fire} aria-label={`Call ${phone}`} style={style} {...(!label || label.includes(phone) ? { "data-wcm-number": "" } : {})}>
      {label ?? `Call ${phone}`}
    </a>
  );
}
