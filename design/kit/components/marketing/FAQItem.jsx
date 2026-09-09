import React from "react";
import { Icon } from "../core/Icon.jsx";

export function FAQItem({ question, answer, defaultOpen = false, style }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={{ borderBottom: "var(--border-hairline) solid var(--line-hairline)", ...style }}>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: "var(--space-5)", padding: "var(--space-5) 0", background: "none", border: 0, cursor: "pointer", textAlign: "left" }}>
        <span style={{ flex: 1, font: "var(--weight-semibold) var(--size-body-lg)/1.4 var(--font-core)", color: "var(--text-strong)" }}>{question}</span>
        <Icon name="chevron-down" size={18} color="var(--text-muted)"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur-base) var(--ease-standard)" }} />
      </button>
      {open ? <p style={{ font: "var(--type-body)", color: "var(--text-body)", margin: 0, padding: "0 0 var(--space-6)", maxWidth: "var(--container-text)" }}>{answer}</p> : null}
    </div>
  );
}
