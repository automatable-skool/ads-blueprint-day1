"use client";
// The one form. Four fields, labels above, tel input, SMS consent unchecked,
// the stashed source riding along as hidden fields. Posts to /api/lead, which
// forwards to the GoHighLevel webhook and sends the visitor to /thank-you.
import { useEffect, useState } from "react";
import { Button } from "@/components/kit/Button";
import { Input } from "@/components/kit/Input";
import { readSource, type LeadSource } from "@/lib/source";

const HIDDEN_KEYS: (keyof LeadSource)[] = [
  "gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "keyword", "campaign", "adgroup", "matchtype", "device", "network", "creative", "landing_page", "referrer", "landed_at",
];

export function LeadForm({ business, phone, buttonLabel = "Get My Free Graded Audit", idSuffix = "" }: {
  business: string; phone: string; buttonLabel?: string; idSuffix?: string;
}) {
  const [source, setSource] = useState<LeadSource>({});
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => { setSource(readSource()); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Progressive: with JS we post in the background and show a friendly error
    // if the webhook is down. Without JS the plain POST below still works.
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

  const id = (n: string) => n + idSuffix;
  return (
    <form method="post" action="/api/lead" onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      <Input label="Your name" name="name" id={id("name")} autoComplete="name" required placeholder="First and last" />
      <Input label="Phone" name="phone" id={id("phone")} type="tel" inputMode="tel" autoComplete="tel" required placeholder="So we can call you back" />
      <Input label="Email" name="email" id={id("email")} type="email" inputMode="email" autoComplete="email" required placeholder="Where the graded audit goes" />
      <Input label="Your website" name="website" id={id("website")} type="url" inputMode="url" autoComplete="url" placeholder="https://" helpText="The audit grades this site. Leave it blank if you do not have one yet." />

      {/* Honeypot. Humans never see it; bots fill it and get quietly dropped. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor={id("company_fax")}>Fax</label>
        <input id={id("company_fax")} name="company_fax" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label style={{ display: "flex", gap: "var(--space-sm)", alignItems: "flex-start", fontSize: "var(--text-caption)", lineHeight: "var(--lh-caption)", color: "var(--text-body)" }}>
        <input type="checkbox" name="sms_consent" value="yes" style={{ marginTop: 2, width: 16, height: 16, flex: "none" }} />
        <span>{business} may text me about my request. Msg and data rates may apply. Reply STOP to cancel, HELP for help.</span>
      </label>

      {HIDDEN_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} value={source[k] ?? ""} />
      ))}
      <input type="hidden" name="page" value={typeof window === "undefined" ? "" : window.location.pathname} />

      <Button type="submit" variant="primary" size="lg" fullWidth disabled={busy}>{busy ? "Sending" : buttonLabel}</Button>

      {failed && (
        <p role="alert" style={{ margin: 0, fontSize: "var(--text-body-sm)", lineHeight: "var(--lh-body-sm)", color: "var(--color-negative-darkest)" }}>
          That did not send. Call {phone} and we will take it over the phone.
        </p>
      )}
      <p style={{ margin: 0, fontSize: "var(--text-caption)", lineHeight: "var(--lh-caption)", color: "var(--text-mute)" }}>
        No spam, no list. Your details go to us and nobody else. <a href="/privacy-policy">Privacy policy</a>.
      </p>
    </form>
  );
}
