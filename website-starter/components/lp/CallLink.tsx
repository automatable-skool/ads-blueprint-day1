"use client";
// The click-to-call button. Before the phone dials, it fires the stashed
// keyword and gclid to the webhook, so one real number still tells you which
// keyword rang the phone. No number pools, no per-page numbers.
import { Button, type ButtonProps } from "@/components/kit/Button";
import { readSource } from "@/lib/source";

export function CallLink({ phone, label, variant = "tertiary", size = "md", fullWidth, style }: {
  phone: string; label?: string; variant?: ButtonProps["variant"]; size?: ButtonProps["size"];
  fullWidth?: boolean; style?: React.CSSProperties;
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
  return (
    <Button href={tel} onClick={fire} variant={variant} size={size} fullWidth={fullWidth} style={style} ariaLabel={`Call ${phone}`}>
      {label ?? `Call ${phone}`}
    </Button>
  );
}
