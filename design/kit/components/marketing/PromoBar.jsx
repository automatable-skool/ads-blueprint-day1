import React from "react";
import { Icon } from "../core/Icon.jsx";

export function PromoBar({ message, ctaLabel, href = "#", onClick, style }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap",
      padding: "10px var(--gutter)", background: "var(--surface-accent)", color: "var(--text-on-accent)",
      font: "var(--weight-bold) var(--size-body-sm)/1.3 var(--font-core)", textAlign: "center", ...style
    }}>
      <span>{message}</span>
      {ctaLabel ? (
        <a href={href} onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--text-on-accent)", textDecorationThickness: 2, textUnderlineOffset: 3 }}>
          {ctaLabel}<Icon name="arrow-right" size={15} strokeWidth={2.25} />
        </a>
      ) : null}
    </div>
  );
}
