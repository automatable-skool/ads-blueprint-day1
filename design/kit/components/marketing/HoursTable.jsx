import React from "react";

export function HoursTable({ rows = [], todayIndex, tone = "light", style }) {
  const onBrand = tone === "on-brand";
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", font: "var(--type-body-sm)", color: onBrand ? "inherit" : "var(--text-body)", ...style }}>
      <tbody>
        {rows.map((r, i) => {
          const today = i === todayIndex;
          return (
            <tr key={r.day} style={{ borderBottom: `var(--border-hairline) solid ${onBrand ? "rgba(255,255,255,.18)" : "var(--line-hairline)"}`, background: today ? (onBrand ? "rgba(255,255,255,.10)" : "var(--surface-accent-soft)") : "transparent" }}>
              <th scope="row" style={{ textAlign: "left", padding: "9px 10px", font: today ? "var(--weight-semibold) var(--size-body-sm)/1.4 var(--font-core)" : "var(--type-body-sm)", color: onBrand ? "var(--white)" : "var(--text-strong)" }}>{r.day}</th>
              <td style={{ textAlign: "right", padding: "9px 10px", color: r.hours === "Closed" ? (onBrand ? "rgba(255,255,255,.55)" : "var(--text-faint)") : "inherit" }}>{r.hours}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
