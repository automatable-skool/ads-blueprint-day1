"use client";
// Fires the form conversion on /thank-you page load - never on a button click.
// /landing-page fills NEXT_PUBLIC_GADS_ID and NEXT_PUBLIC_GADS_FORM_LABEL in
// website/.env.local; until then this renders nothing and fires nothing.
import { useEffect } from "react";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
}

export function ConversionTag() {
  useEffect(() => {
    const adsId = process.env.NEXT_PUBLIC_GADS_ID;
    const label = process.env.NEXT_PUBLIC_GADS_FORM_LABEL;
    if (!window.gtag || !adsId || !label) return;
    window.gtag("event", "conversion", { send_to: `${adsId}/${label}` });
    window.gtag("event", "generate_lead", { method: "landing_page_form" });
  }, []);
  return null;
}
