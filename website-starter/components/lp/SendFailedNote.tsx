"use client";
// Shown on /contact when a no-JS form post could not reach the webhook.
import { useEffect, useState } from "react";

export function SendFailedNote({ phone }: { phone: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(new URLSearchParams(window.location.search).get("sent") === "failed"); }, []);
  if (!show) return null;
  return (
    <p role="alert" style={{ margin: "0 0 var(--space-xl)", padding: "var(--space-lg)", borderRadius: "var(--radius-md)", background: "var(--color-warning)", color: "var(--color-warning-content)" }}>
      Your form did not send. Sorry about that. Call {phone} or email us and we will sort it by hand.
    </p>
  );
}
