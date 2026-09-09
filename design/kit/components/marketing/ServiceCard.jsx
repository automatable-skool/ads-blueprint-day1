import React from "react";
import { Icon } from "../core/Icon.jsx";
import { Card } from "../core/Card.jsx";
import { MediaFrame } from "./MediaFrame.jsx";

export function ServiceCard({ icon = "wrench", title, description, price, href = "#", onClick, image, imageLabel = "Photo", style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Card
      as="a" href={href} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "grid", gap: "var(--space-4)", textDecoration: "none", alignContent: "start",
        transition: "var(--transition-surface), border-color var(--dur-fast) var(--ease-standard)",
        boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
        borderColor: hover ? "var(--line-strong)" : "var(--line-hairline)",
        transform: hover ? "translateY(-2px)" : "none",
        ...style
      }}
    >
      {image === undefined ? (
        <span style={{ width: 40, height: 40, display: "grid", placeItems: "center", borderRadius: "var(--radius-sm)", background: "var(--surface-sunken)" }}>
          <Icon name={icon} size={20} color="var(--text-strong)" />
        </span>
      ) : (
        <span style={{ position: "relative", display: "block", marginBottom: "var(--space-1)" }}>
          <MediaFrame src={image || undefined} label={imageLabel} ratio="16 / 9" radius="var(--radius-sm)" />
          <span style={{ position: "absolute", left: 10, bottom: 10, width: 34, height: 34, display: "grid", placeItems: "center", borderRadius: "var(--radius-sm)", background: "var(--surface-card)", boxShadow: "var(--shadow-sm)" }}>
            <Icon name={icon} size={17} color="var(--text-strong)" />
          </span>
        </span>
      )}
      <h3 style={{ font: "var(--type-h4)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)", margin: 0 }}>{title}</h3>
      {description ? <p style={{ font: "var(--type-body-sm)", color: "var(--text-body)", margin: 0 }}>{description}</p> : null}
      <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "var(--space-2)" }}>
        {price ? <span style={{ font: "var(--weight-semibold) var(--size-body-sm)/1 var(--font-core)", color: "var(--text-accent)" }}>{price}</span> : <span />}
        <Icon name="arrow-right" size={17} color="var(--text-brand)" style={{ transform: hover ? "translateX(3px)" : "none", transition: "transform var(--dur-fast) var(--ease-standard)" }} />
      </span>
    </Card>
  );
}
