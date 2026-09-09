import React from "react";
import { Stars } from "./Stars.jsx";

const CSS = `
.ms-testimonial{display:flex;flex-direction:column;gap:var(--space-5);padding:var(--space-7);background:var(--surface-card);border:var(--border-w) solid var(--border-subtle);border-radius:var(--radius-card)}
.ms-testimonial--sunken{background:var(--surface-sunken);border-color:transparent}
.ms-testimonial__quote{font:var(--fw-medium) var(--fs-body-lg)/1.55 var(--font-core);letter-spacing:-0.01em;color:var(--text-strong)}
.ms-testimonial__foot{display:flex;align-items:center;gap:var(--space-4);margin-top:auto}
.ms-testimonial__initial{width:38px;height:38px;flex:none;border-radius:var(--radius-pill);background:var(--n-100);color:var(--n-700);display:flex;align-items:center;justify-content:center;font:var(--fw-semibold) var(--fs-small)/1 var(--font-core)}
.ms-testimonial__name{font:var(--fw-semibold) var(--fs-small)/1.3 var(--font-core);color:var(--text-strong)}
.ms-testimonial__meta{font:var(--fw-regular) var(--fs-caption)/1.3 var(--font-core);color:var(--text-muted)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-testimonial-css")) {
  const el = document.createElement("style"); el.id = "ms-testimonial-css"; el.textContent = __css; document.head.appendChild(el);
}

export function TestimonialCard({ quote, name, meta, rating = 5, variant = "outline", className = "", ...rest }) {
  return (
    <figure className={["ms-testimonial", variant === "sunken" ? "ms-testimonial--sunken" : "", className].filter(Boolean).join(" ")} {...rest}>
      {rating ? <Stars rating={rating} /> : null}
      <blockquote className="ms-testimonial__quote">{quote}</blockquote>
      <figcaption className="ms-testimonial__foot">
        <span className="ms-testimonial__initial">{(name || "?").trim().charAt(0)}</span>
        <span>
          <span className="ms-testimonial__name" style={{ display: "block" }}>{name}</span>
          {meta && <span className="ms-testimonial__meta">{meta}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
