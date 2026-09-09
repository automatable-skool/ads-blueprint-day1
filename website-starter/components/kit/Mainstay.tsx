"use client";
// Mainstay's marketing components, ported from design/mainstay/components/marketing/*.jsx.
//
// Ported, not reinterpreted: the class names, the markup and the props are the kit's. The only
// change is that the kit injects its CSS at runtime and a Next app ships it as a stylesheet
// (app/mainstay-components.css), so the styles are identical but arrive with the page.
//
// Jono, 2 September 2026: the first pass swapped Mainstay's TOKENS onto Goodwork's components,
// which looked like Mainstay but was built like Goodwork. This is the component layer.
import { useState, type CSSProperties, type ReactNode } from "react";
import { Icon } from "./Icon";

export function SectionHeading({ eyebrow, title, lead, align = "left", as: Title = "h2" }: {
  eyebrow?: string; title: ReactNode; lead?: ReactNode; align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={["ms-sh", align === "center" ? "ms-sh--center" : ""].filter(Boolean).join(" ")}>
      {eyebrow && <span className="ms-sh__eyebrow">{eyebrow}</span>}
      <Title className="ms-sh__title">{title}</Title>
      {lead && <p className="ms-sh__lead">{lead}</p>}
    </div>
  );
}

export function TrustBar({ items = [], align = "left" }: {
  items?: (string | { label: string; icon?: string })[]; align?: "left" | "center";
}) {
  return (
    <div className={["ms-trust", align === "center" ? "ms-trust--center" : ""].filter(Boolean).join(" ")}>
      {items.map((it, i) => {
        const item = typeof it === "string" ? { label: it, icon: "circle-check" } : it;
        return (
          <span key={i} className="ms-trust__item">
            <Icon name={item.icon || "circle-check"} size={18} />{item.label}
          </span>
        );
      })}
    </div>
  );
}

export function Stars({ rating = 5, size = 16, label }: { rating?: number; size?: number; label?: string }) {
  const full = Math.round(rating);
  return (
    <span className="ms-stars" aria-label={label || `${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={i < full ? "ms-stars__on" : "ms-stars__off"}>
          <Icon name="star" size={size} style={{ display: "block", fill: i < full ? "currentColor" : "none" }} strokeWidth={2} />
        </span>
      ))}
      {label && <span className="ms-stars__label">{label}</span>}
    </span>
  );
}

export function StatBlock({ stats = [], bordered = false }: {
  stats?: { value: string; label: string }[]; bordered?: boolean;
}) {
  return (
    <div className={["ms-stats", bordered ? "ms-stats--bordered" : ""].filter(Boolean).join(" ")}>
      {stats.map((s, i) => (
        <div key={i}>
          <div className="ms-stat__value">{s.value}</div>
          <div className="ms-stat__label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function ServiceCard({ icon = "wrench", title, description, price, cta = "Learn more", href }: {
  icon?: string; title: string; description?: string; price?: string; cta?: string; href?: string;
}) {
  const Tag = (href ? "a" : "div") as "a";
  return (
    <Tag href={href} className="ms-service">
      <span className="ms-service__icon"><Icon name={icon} size={22} /></span>
      <span className="ms-service__title">{title}</span>
      {description && <span className="ms-service__body">{description}</span>}
      {(price || href) && (
        <span className="ms-service__meta">
          {price && <span className="ms-service__price">{price}</span>}
          {href && <span className="ms-service__cta">{cta}<Icon name="arrow-right" size={15} /></span>}
        </span>
      )}
    </Tag>
  );
}

export function TestimonialCard({ quote, name, meta, rating = 5, variant = "outline" }: {
  quote: string; name: string; meta?: string; rating?: number; variant?: "outline" | "sunken";
}) {
  return (
    <figure className={["ms-testimonial", variant === "sunken" ? "ms-testimonial--sunken" : ""].filter(Boolean).join(" ")}>
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

export function FAQItem({ question, answer, defaultOpen = false }: {
  question: string; answer: ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={["ms-faq", open ? "is-open" : ""].filter(Boolean).join(" ")}>
      <button type="button" className="ms-faq__q" aria-expanded={open} onClick={() => setOpen(!open)}>
        {question}
        <span className="ms-faq__chev"><Icon name="chevron-down" size={20} /></span>
      </button>
      <div className="ms-faq__a"><div className="ms-faq__a-inner">{answer}</div></div>
    </div>
  );
}

export function CTABanner({ title, lead, primaryLabel = "Get a free quote", primaryHref, secondaryLabel, secondaryHref, tone = "sunken" }: {
  title: string; lead?: string; primaryLabel?: string; primaryHref?: string;
  secondaryLabel?: string; secondaryHref?: string; tone?: "sunken" | "accent" | "ink";
}) {
  return (
    <section className={`ms-cta ms-cta--${tone}`}>
      <div>
        <h2 className="ms-cta__title">{title}</h2>
        {lead && <p className="ms-cta__lead">{lead}</p>}
      </div>
      <div className="ms-cta__actions">
        {primaryHref && <a href={primaryHref} className="ms-btn ms-btn--primary" data-l>{primaryLabel}</a>}
        {secondaryHref && <a href={secondaryHref} className="ms-btn ms-btn--outline">{secondaryLabel}</a>}
      </div>
    </section>
  );
}

/** The kit's photo slot: a labelled placeholder until a real src is supplied. */
export function Figure({ src, alt = "", label = "Photo", ratio = "4 / 3", children, style }: {
  src?: string; alt?: string; label?: string; ratio?: string; children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="ms-figure" style={{ aspectRatio: ratio, ...style }}>
      {src ? <img src={src} alt={alt} /> : <span className="ms-figure__label"><Icon name="image" size={22} />{label}</span>}
      {children}
    </div>
  );
}
