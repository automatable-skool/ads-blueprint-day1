import React from "react";
import { Icon } from "../core/Icon.jsx";

export function ContactBar({ phone, email, area, hours, tone = "brand", style }) {
  const dark = tone === "brand";
  const items = [
    phone && { icon: "phone", text: phone, href: "tel:" + phone.replace(/[^\d+]/g, "") },
    email && { icon: "mail", text: email, href: "mailto:" + email },
    area && { icon: "map-pin", text: area },
    hours && { icon: "clock", text: hours }
  ].filter(Boolean);
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-7)",
      padding: "10px var(--gutter)", font: "var(--type-body-sm)",
      background: dark ? "var(--surface-brand)" : "var(--surface-sunken)",
      color: dark ? "var(--blue-100)" : "var(--text-body)", ...style
    }}>
      {items.map((i) => {
        const inner = (<><Icon name={i.icon} size={15} color={dark ? "var(--blue-200)" : "var(--text-muted)"} />{i.text}</>);
        return i.href
          ? <a key={i.text} href={i.href} style={{ display: "inline-flex", alignItems: "center", gap: "7px", color: "inherit", textDecoration: "none" }}>{inner}</a>
          : <span key={i.text} style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>{inner}</span>;
      })}
    </div>
  );
}
