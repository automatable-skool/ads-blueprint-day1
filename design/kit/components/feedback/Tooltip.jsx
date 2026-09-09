import React from "react";

export function Tooltip({ label, children, placement = "top", style }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    right: { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
  }[placement];
  return (
    <span style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      {children}
      <span role="tooltip" style={{
        position: "absolute", ...pos, whiteSpace: "nowrap", pointerEvents: "none",
        padding: "5px 9px", borderRadius: "var(--radius-xs)", background: "var(--surface-inverse)",
        color: "var(--text-inverse)", font: "var(--type-caption)", boxShadow: "var(--shadow-md)",
        opacity: show ? 1 : 0, transition: "opacity var(--dur-fast) var(--ease-standard)", zIndex: 20
      }}>{label}</span>
    </span>
  );
}
