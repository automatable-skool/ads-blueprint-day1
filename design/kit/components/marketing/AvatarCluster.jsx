import React from "react";
import { Icon } from "../core/Icon.jsx";

/* Overlapping avatar cluster + rating line — the social-proof chip that sits under
   or over a hero. No photography ships with the template, so avatars render as
   tinted initial discs until real headshots are supplied via `src`. */
export function AvatarCluster({ people = [], rating, count, label, tone = "default", size = 34, style }) {
  const onBrand = tone === "on-brand";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-4)", ...style }}>
      <span style={{ display: "inline-flex" }}>
        {people.map((p, i) => {
          const initials = typeof p === "string" ? p : p.initials;
          const src = typeof p === "string" ? null : p.src;
          return (
            <span key={initials + i} title={initials}
              style={{
                width: size, height: size, borderRadius: "50%", marginLeft: i ? -size * 0.32 : 0,
                border: `2px solid ${onBrand ? "var(--surface-brand)" : "var(--surface-card)"}`,
                background: src ? `center/cover url(${src})` : "var(--surface-sunken)",
                color: "var(--text-body)", display: "grid", placeItems: "center", overflow: "hidden",
                font: "var(--weight-bold) 11px/1 var(--font-core)", zIndex: people.length - i
              }}>
              {src ? null : initials}
            </span>
          );
        })}
      </span>
      <span style={{ display: "grid", gap: 2 }}>
        {rating !== undefined ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <Icon name="star" size={14} strokeWidth={1.5}
              color={onBrand ? "var(--star-on-brand)" : "var(--star-filled)"}
              style={{ fill: onBrand ? "var(--star-on-brand)" : "var(--star-filled)" }} />
            <strong style={{ font: "var(--weight-bold) var(--size-body-sm)/1 var(--font-core)", color: onBrand ? "var(--white)" : "var(--text-strong)" }}>{rating}</strong>
          </span>
        ) : null}
        {label ? <span style={{ font: "var(--type-caption)", color: onBrand ? "var(--blue-100)" : "var(--text-muted)" }}>{label}</span> : null}
        {count !== undefined && !label ? <span style={{ font: "var(--type-caption)", color: onBrand ? "var(--blue-100)" : "var(--text-muted)" }}>{count} verified reviews</span> : null}
      </span>
    </span>
  );
}
