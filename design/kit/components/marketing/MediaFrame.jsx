import React from "react";
import { Icon } from "../core/Icon.jsx";

/* Photo slot. This design system ships no photography, so MediaFrame renders a
   labelled placeholder until a real `src` is supplied. */
export function MediaFrame({ src, alt = "", label = "Photo", ratio = "4 / 3", radius = "var(--radius-media)", overlay = false, children, style }) {
  return (
    <div style={{ position: "relative", aspectRatio: ratio, borderRadius: radius, overflow: "hidden", background: "var(--ink-100)", border: "var(--border-hairline) solid var(--line-hairline)", ...style }}>
      {src ? <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (
        <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", gap: "8px", alignContent: "center", color: "var(--text-faint)" }}>
          <Icon name="image" size={22} />
          <span style={{ font: "var(--type-label)", letterSpacing: "var(--track-label)", textTransform: "uppercase" }}>{label}</span>
        </span>
      )}
      {overlay ? <span style={{ position: "absolute", inset: 0, background: "var(--scrim-media)" }} /> : null}
      {children ? <div style={{ position: "absolute", inset: 0 }}>{children}</div> : null}
    </div>
  );
}
