import React from "react";
import { Icon } from "../core/Icon.jsx";

/* Stars use their own tokens, not the accent — the accent is too light to read on white.
   Pass tone="on-brand" when the rating sits on a blue band. */
export function Rating({ value = 5, count, size = 16, showValue = false, tone = "default", style }) {
  const full = Math.round(value);
  const onBrand = tone === "on-brand";
  const filled = onBrand ? "var(--star-on-brand)" : "var(--star-filled)";
  const empty = onBrand ? "rgba(255,255,255,.42)" : "var(--star-empty)";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", ...style }}>
      <span style={{ display: "inline-flex", gap: "2px" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Icon key={i} name="star" size={size} strokeWidth={1.5}
            color={i < full ? filled : empty}
            style={{ fill: i < full ? filled : "transparent" }} />
        ))}
      </span>
      {showValue ? <strong style={{ font: "var(--weight-semibold) var(--size-body-sm)/1 var(--font-core)", color: onBrand ? "var(--white)" : "var(--text-strong)" }}>{value.toFixed(1)}</strong> : null}
      {count !== undefined ? <span style={{ font: "var(--type-body-sm)", color: onBrand ? "var(--blue-100)" : "var(--text-muted)" }}>({count} reviews)</span> : null}
    </span>
  );
}
