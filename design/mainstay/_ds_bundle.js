/* @ds-bundle: {"format":4,"namespace":"MainstayDesignSystem_eaeaf9","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Dialog","sourcePath":"components/core/Dialog.jsx"},{"name":"ICON_PATHS","sourcePath":"components/core/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Toast","sourcePath":"components/core/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/core/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"CTABanner","sourcePath":"components/marketing/CTABanner.jsx"},{"name":"FAQItem","sourcePath":"components/marketing/FAQItem.jsx"},{"name":"PricingCard","sourcePath":"components/marketing/PricingCard.jsx"},{"name":"QuoteForm","sourcePath":"components/marketing/QuoteForm.jsx"},{"name":"SectionHeading","sourcePath":"components/marketing/SectionHeading.jsx"},{"name":"ServiceCard","sourcePath":"components/marketing/ServiceCard.jsx"},{"name":"Stars","sourcePath":"components/marketing/Stars.jsx"},{"name":"StatBlock","sourcePath":"components/marketing/StatBlock.jsx"},{"name":"TestimonialCard","sourcePath":"components/marketing/TestimonialCard.jsx"},{"name":"TrustBar","sourcePath":"components/marketing/TrustBar.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"b4b4f77e4dbd","components/core/Button.jsx":"2ae3fda2f5f5","components/core/Card.jsx":"89664ff58b28","components/core/Dialog.jsx":"b6bcc172cb72","components/core/Icon.jsx":"e45f08d3518b","components/core/IconButton.jsx":"48a6079e787f","components/core/Tabs.jsx":"3c2c929bf116","components/core/Tag.jsx":"27d037749af0","components/core/Toast.jsx":"5a3642a4542d","components/core/Tooltip.jsx":"0b37505e3b8c","components/forms/Checkbox.jsx":"8ffee1b48028","components/forms/Input.jsx":"b636c61421e7","components/forms/Radio.jsx":"8c3d6d1eb51e","components/forms/Select.jsx":"934fc0f87786","components/forms/Switch.jsx":"53afbe765f0b","components/forms/Textarea.jsx":"a20767b777ee","components/marketing/CTABanner.jsx":"2dbd6148daa0","components/marketing/FAQItem.jsx":"0dd16b9a5196","components/marketing/PricingCard.jsx":"b82c013d0388","components/marketing/QuoteForm.jsx":"4d605f9f7748","components/marketing/SectionHeading.jsx":"ade8267d2a95","components/marketing/ServiceCard.jsx":"4d93c95ebca9","components/marketing/Stars.jsx":"26305dc57d10","components/marketing/StatBlock.jsx":"963275310cfa","components/marketing/TestimonialCard.jsx":"8e547df030a5","components/marketing/TrustBar.jsx":"18a2b23b945f","components/navigation/SiteFooter.jsx":"31022b9976bd","components/navigation/SiteHeader.jsx":"6e25d6515017","ui_kits/website/ContactScreen.jsx":"8175c4d09438","ui_kits/website/HomeScreen.jsx":"722963ee2731","ui_kits/website/PricingScreen.jsx":"2542a6b4d677","ui_kits/website/ServicesScreen.jsx":"21caaa390d4f","ui_kits/website/shared.jsx":"694f611f8ddd"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MainstayDesignSystem_eaeaf9 = window.MainstayDesignSystem_eaeaf9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-card{display:block;background:var(--surface-card);border-radius:var(--radius-card);border:var(--border-w) solid var(--border-subtle);transition:var(--transition-card);text-decoration:none;color:inherit}
.ms-card--elevated{box-shadow:var(--shadow-card);border-color:transparent}
.ms-card--sunken{background:var(--surface-sunken);border-color:transparent}
.ms-card--accent{background:var(--surface-accent-soft);border-color:var(--accent-100)}
.ms-card--interactive{cursor:pointer}
.ms-card--interactive:hover{box-shadow:var(--shadow-card-hover);transform:translateY(-2px);border-color:var(--border-default)}
.ms-card--interactive:active{transform:translateY(0)}
.ms-card--interactive:focus-visible{outline:none;box-shadow:var(--shadow-ring-focus)}
.ms-card--p4{padding:var(--space-5)}
.ms-card--p5{padding:var(--space-7)}
.ms-card--p6{padding:var(--space-8)}
.ms-card--p0{padding:0}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-card-css")) {
  const el = document.createElement("style");
  el.id = "ms-card-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Card({
  children,
  variant = "outline",
  padding = "md",
  interactive = false,
  href,
  as,
  className = "",
  ...rest
}) {
  const pad = {
    none: "p0",
    sm: "p4",
    md: "p5",
    lg: "p6"
  }[padding] || "p5";
  const Tag = href ? "a" : as || "div";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    className: ["ms-card", "ms-card--" + variant, "ms-card--" + pad, interactive || href ? "ms-card--interactive" : "", className].filter(Boolean).join(" ")
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Icon paths extracted programmatically from the Lucide SVG files in assets/icons/.
// Lucide (ISC licence) is the system's icon set: 24x24 grid, 2px stroke, round caps/joins.
const ICON_PATHS = {
  "arrow-right": '<path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path>',
  "arrow-up-right": '<path d="M7 7h10v10"></path> <path d="M7 17 17 7"></path>',
  "badge-check": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path> <path d="m9 12 2 2 4-4"></path>',
  "briefcase": '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path> <rect width="20" height="14" x="2" y="6" rx="2"></rect>',
  "building-2": '<path d="M10 12h4"></path> <path d="M10 8h4"></path> <path d="M14 21v-3a2 2 0 0 0-4 0v3"></path> <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path> <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>',
  "calculator": '<rect width="16" height="20" x="4" y="2" rx="2"></rect> <line x1="8" x2="16" y1="6" y2="6"></line> <line x1="16" x2="16" y1="14" y2="18"></line> <path d="M16 10h.01"></path> <path d="M12 10h.01"></path> <path d="M8 10h.01"></path> <path d="M12 14h.01"></path> <path d="M8 14h.01"></path> <path d="M12 18h.01"></path> <path d="M8 18h.01"></path>',
  "calendar": '<path d="M8 2v3"></path> <path d="M16 2v3"></path> <rect x="3" y="3" width="18" height="18" rx="2"></rect> <path d="M3 9h18"></path>',
  "calendar-check": '<path d="M8 2v3"></path> <path d="M16 2v3"></path> <rect x="3" y="3" width="18" height="18" rx="2"></rect> <path d="M3 9h18"></path> <path d="m9 15 2 2 4-4"></path>',
  "check": '<path d="M20 6 9 17l-5-5"></path>',
  "chevron-down": '<path d="m6 9 6 6 6-6"></path>',
  "chevron-right": '<path d="m9 18 6-6-6-6"></path>',
  "circle-check": '<circle cx="12" cy="12" r="10"></circle> <path d="m9 12 2 2 4-4"></path>',
  "clock": '<circle cx="12" cy="12" r="10"></circle> <path d="M12 6v6l4 2"></path>',
  "credit-card": '<rect width="20" height="14" x="2" y="5" rx="2"></rect> <line x1="2" x2="22" y1="10" y2="10"></line>',
  "droplets": '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path> <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>',
  "file-text": '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path> <path d="M14 2v5a1 1 0 0 0 1 1h5"></path> <path d="M10 9H8"></path> <path d="M16 13H8"></path> <path d="M16 17H8"></path>',
  "hammer": '<path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"></path> <path d="m18 15 4-4"></path> <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"></path>',
  "hard-hat": '<path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"></path> <path d="M14 6a6 6 0 0 1 6 6v3"></path> <path d="M4 15v-3a6 6 0 0 1 6-6"></path> <rect x="2" y="15" width="20" height="4" rx="1"></rect>',
  "info": '<circle cx="12" cy="12" r="10"></circle> <path d="M12 16v-4"></path> <path d="M12 8h.01"></path>',
  "leaf": '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path> <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>',
  "loader": '<path d="M12 2v4"></path> <path d="m16.2 7.8 2.9-2.9"></path> <path d="M18 12h4"></path> <path d="m16.2 16.2 2.9 2.9"></path> <path d="M12 18v4"></path> <path d="m4.9 19.1 2.9-2.9"></path> <path d="M2 12h4"></path> <path d="m4.9 4.9 2.9 2.9"></path>',
  "mail": '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path> <rect x="2" y="4" width="20" height="16" rx="2"></rect>',
  "map-pin": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path> <circle cx="12" cy="10" r="3"></circle>',
  "menu": '<path d="M4 5h16"></path> <path d="M4 12h16"></path> <path d="M4 19h16"></path>',
  "message-square": '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>',
  "minus": '<path d="M5 12h14"></path>',
  "paint-roller": '<rect width="16" height="6" x="2" y="2" rx="2"></rect> <path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path> <rect width="4" height="6" x="8" y="16" rx="1"></rect>',
  "phone": '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>',
  "plug-zap": '<path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"></path> <path d="m2 22 3-3"></path> <path d="M7.5 13.5 10 11"></path> <path d="M10.5 16.5 13 14"></path> <path d="m18 3-4 4h6l-4 4"></path>',
  "plus": '<path d="M5 12h14"></path> <path d="M12 5v14"></path>',
  "quote": '<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path> <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>',
  "ruler": '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"></path> <path d="m14.5 12.5 2-2"></path> <path d="m11.5 9.5 2-2"></path> <path d="m8.5 6.5 2-2"></path> <path d="m17.5 15.5 2-2"></path>',
  "scale": '<path d="M12 3v18"></path> <path d="m19 8 3 8a5 5 0 0 1-6 0zV7"></path> <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"></path> <path d="m5 8 3 8a5 5 0 0 1-6 0zV7"></path> <path d="M7 21h10"></path>',
  "search": '<path d="m21 21-4.34-4.34"></path> <circle cx="11" cy="11" r="8"></circle>',
  "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path> <path d="m9 12 2 2 4-4"></path>',
  "star": '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>',
  "thermometer": '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>',
  "thumbs-up": '<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path> <path d="M7 10v12"></path>',
  "triangle-alert": '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path> <path d="M12 9v4"></path> <path d="M12 17h.01"></path>',
  "truck": '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path> <path d="M15 18H9"></path> <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path> <circle cx="17" cy="18" r="2"></circle> <circle cx="7" cy="18" r="2"></circle>',
  "user": '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path> <circle cx="12" cy="7" r="4"></circle>',
  "wrench": '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"></path>',
  "x": '<path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path>'
};
const ICON_NAMES = Object.keys(ICON_PATHS);
function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color = "currentColor",
  label,
  style,
  ...rest
}) {
  const d = ICON_PATHS[name];
  if (!d) return null;
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    role: label ? "img" : undefined,
    "aria-hidden": label ? undefined : true,
    "aria-label": label,
    style: {
      display: "block",
      flex: "none",
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: (label ? `<title>${label}</title>` : "") + d
    }
  }, rest));
}
Object.assign(__ds_scope, { ICON_PATHS, ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-badge{display:inline-flex;align-items:center;gap:6px;height:26px;padding-inline:10px;border-radius:var(--radius-pill);font:var(--fw-semibold) var(--fs-caption)/1 var(--font-core);border:var(--border-w) solid transparent;white-space:nowrap}
.ms-badge--lg{height:32px;padding-inline:14px;font-size:var(--fs-small)}
.ms-badge--soft.is-neutral{background:var(--n-100);color:var(--n-700)}
.ms-badge--soft.is-accent{background:var(--accent-50);color:var(--accent-700)}
.ms-badge--soft.is-success{background:var(--status-success-soft);color:var(--status-success)}
.ms-badge--soft.is-warning{background:var(--status-warning-soft);color:var(--status-warning)}
.ms-badge--soft.is-danger{background:var(--status-danger-soft);color:var(--status-danger)}
.ms-badge--soft.is-info{background:var(--status-info-soft);color:var(--status-info)}
.ms-badge--solid.is-neutral{background:var(--n-900);color:var(--n-0)}
.ms-badge--solid.is-accent{background:var(--accent-500);color:var(--n-0)}
.ms-badge--solid.is-success{background:var(--status-success);color:var(--n-0)}
.ms-badge--solid.is-warning{background:var(--status-warning);color:var(--n-0)}
.ms-badge--solid.is-danger{background:var(--status-danger);color:var(--n-0)}
.ms-badge--solid.is-info{background:var(--status-info);color:var(--n-0)}
.ms-badge--outline{background:var(--surface-card);border-color:var(--border-default);color:var(--text-body)}
.ms-badge--outline.is-accent{border-color:var(--accent-200);color:var(--accent-700)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-badge-css")) {
  const el = document.createElement("style");
  el.id = "ms-badge-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Badge({
  children,
  tone = "neutral",
  variant = "soft",
  size = "md",
  icon,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["ms-badge", "ms-badge--" + variant, "is-" + tone, size === "lg" ? "ms-badge--lg" : "", className].filter(Boolean).join(" ")
  }, rest), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === "lg" ? 16 : 14
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font:var(--type-button);letter-spacing:-0.01em;border:var(--border-w) solid transparent;border-radius:var(--radius-control);cursor:pointer;text-decoration:none;white-space:nowrap;transition:var(--transition-control);-webkit-tap-highlight-color:transparent}
.ms-btn:disabled,.ms-btn[aria-disabled="true"]{cursor:not-allowed;opacity:.45}
.ms-btn:not(:disabled):active{transform:scale(var(--press-scale))}
.ms-btn:focus-visible{outline:none;box-shadow:var(--shadow-ring-focus)}
.ms-btn--sm{height:var(--control-h-sm);padding-inline:var(--control-px-sm);font-size:var(--fs-small)}
.ms-btn--md{height:var(--control-h-md);padding-inline:var(--control-px-md)}
.ms-btn--lg{height:var(--control-h-lg);padding-inline:var(--control-px-lg);font-size:var(--fs-body-lg)}
.ms-btn--primary{background:var(--action-primary);color:var(--action-primary-text);box-shadow:var(--shadow-xs)}
.ms-btn--primary:not(:disabled):hover{background:var(--action-primary-hover)}
.ms-btn--primary:not(:disabled):active{background:var(--action-primary-press)}
.ms-btn--secondary{background:var(--action-secondary);color:var(--text-inverse)}
.ms-btn--secondary:not(:disabled):hover{background:var(--action-secondary-hover)}
.ms-btn--outline{background:var(--surface-card);color:var(--text-strong);border-color:var(--border-default)}
.ms-btn--outline:not(:disabled):hover{background:var(--n-50);border-color:var(--border-strong)}
.ms-btn--ghost{background:transparent;color:var(--text-strong)}
.ms-btn--ghost:not(:disabled):hover{background:var(--action-quiet-hover)}
.ms-btn--link{background:transparent;color:var(--text-link);height:auto;padding:0;border-radius:var(--radius-xs)}
.ms-btn--link:not(:disabled):hover{color:var(--text-link-hover);text-decoration:underline;text-underline-offset:3px}
.ms-btn--block{display:flex;width:100%}
.ms-btn__spin{animation:ms-btn-spin .9s linear infinite}
@keyframes ms-btn-spin{to{transform:rotate(360deg)}}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-button-css")) {
  const el = document.createElement("style");
  el.id = "ms-button-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth = false,
  loading = false,
  disabled = false,
  href,
  type = "button",
  className = "",
  ...rest
}) {
  const Tag = href ? "a" : "button";
  const iconSize = size === "lg" ? 22 : size === "sm" ? 16 : 18;
  const cls = ["ms-btn", "ms-btn--" + variant, "ms-btn--" + size, fullWidth ? "ms-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    href: href,
    type: href ? undefined : type,
    disabled: href ? undefined : disabled || loading,
    "aria-disabled": href && (disabled || loading) ? true : undefined,
    "aria-busy": loading || undefined
  }, rest), loading && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "loader",
    size: iconSize,
    className: "ms-btn__spin"
  }), !loading && iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: iconSize
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: iconSize
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-iconbtn{display:inline-flex;align-items:center;justify-content:center;border:var(--border-w) solid transparent;border-radius:var(--radius-control);background:transparent;color:var(--text-strong);cursor:pointer;transition:var(--transition-control)}
.ms-iconbtn:focus-visible{outline:none;box-shadow:var(--shadow-ring-focus)}
.ms-iconbtn:not(:disabled):active{transform:scale(var(--press-scale))}
.ms-iconbtn:disabled{opacity:.45;cursor:not-allowed}
.ms-iconbtn--sm{width:36px;height:36px}
.ms-iconbtn--md{width:44px;height:44px}
.ms-iconbtn--lg{width:52px;height:52px}
.ms-iconbtn--ghost:not(:disabled):hover{background:var(--action-quiet-hover)}
.ms-iconbtn--outline{border-color:var(--border-default);background:var(--surface-card)}
.ms-iconbtn--outline:not(:disabled):hover{background:var(--n-50);border-color:var(--border-strong)}
.ms-iconbtn--primary{background:var(--action-primary);color:var(--action-primary-text)}
.ms-iconbtn--primary:not(:disabled):hover{background:var(--action-primary-hover)}
.ms-iconbtn--round{border-radius:var(--radius-pill)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-iconbutton-css")) {
  const el = document.createElement("style");
  el.id = "ms-iconbutton-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  round = false,
  className = "",
  ...rest
}) {
  const iconSize = size === "lg" ? 24 : size === "sm" ? 18 : 20;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    className: ["ms-iconbtn", "ms-iconbtn--" + variant, "ms-iconbtn--" + size, round ? "ms-iconbtn--round" : "", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: iconSize
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Dialog.jsx
try { (() => {
const CSS = `
.ms-dialog__scrim{position:fixed;inset:0;z-index:60;background:rgba(17,19,18,.42);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:var(--space-7);animation:ms-dialog-in var(--dur-base) var(--ease-out)}
.ms-dialog{position:relative;width:100%;max-width:520px;background:var(--surface-card);border-radius:var(--radius-xl);box-shadow:var(--shadow-lg);padding:var(--space-8);animation:ms-dialog-rise var(--dur-base) var(--ease-out)}
.ms-dialog--wide{max-width:760px}
.ms-dialog__close{position:absolute;top:14px;right:14px}
.ms-dialog__title{font:var(--type-h3);letter-spacing:var(--ls-heading);color:var(--text-strong);padding-right:36px}
.ms-dialog__desc{margin-top:var(--space-3);color:var(--text-body)}
.ms-dialog__body{margin-top:var(--space-6)}
.ms-dialog__footer{display:flex;justify-content:flex-end;gap:var(--space-4);margin-top:var(--space-8)}
@keyframes ms-dialog-in{from{opacity:0}to{opacity:1}}
@keyframes ms-dialog-rise{from{opacity:0;transform:translateY(8px) scale(.99)}to{opacity:1;transform:none}}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-dialog-css")) {
  const el = document.createElement("style");
  el.id = "ms-dialog-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md"
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === "Escape" && onClose && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "ms-dialog__scrim",
    onClick: e => e.target === e.currentTarget && onClose && onClose()
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": typeof title === "string" ? title : undefined,
    className: "ms-dialog" + (size === "lg" ? " ms-dialog--wide" : "")
  }, onClose && /*#__PURE__*/React.createElement("span", {
    className: "ms-dialog__close"
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    size: "sm",
    onClick: onClose
  })), title && /*#__PURE__*/React.createElement("div", {
    className: "ms-dialog__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "ms-dialog__desc"
  }, description), children && /*#__PURE__*/React.createElement("div", {
    className: "ms-dialog__body"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "ms-dialog__footer"
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-tabs{display:flex;gap:var(--space-3);border-bottom:var(--border-w) solid var(--border-subtle)}
.ms-tabs__tab{position:relative;background:none;border:0;padding:12px 4px 14px;font:var(--fw-semibold) var(--fs-body)/1 var(--font-core);color:var(--text-muted);cursor:pointer;transition:color var(--dur-fast) var(--ease-out)}
.ms-tabs__tab+.ms-tabs__tab{margin-left:var(--space-6)}
.ms-tabs__tab:hover{color:var(--text-strong)}
.ms-tabs__tab[aria-selected="true"]{color:var(--text-strong)}
.ms-tabs__tab[aria-selected="true"]::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--accent-500);border-radius:2px}
.ms-tabs__tab:focus-visible{outline:none;box-shadow:var(--shadow-ring-focus);border-radius:var(--radius-xs)}
.ms-tabs--pill{border:0;gap:var(--space-2);background:var(--surface-muted);padding:4px;border-radius:var(--radius-pill);display:inline-flex}
.ms-tabs--pill .ms-tabs__tab{padding:9px 18px;border-radius:var(--radius-pill);margin:0!important;font-size:var(--fs-small)}
.ms-tabs--pill .ms-tabs__tab[aria-selected="true"]{background:var(--surface-card);box-shadow:var(--shadow-xs)}
.ms-tabs--pill .ms-tabs__tab[aria-selected="true"]::after{display:none}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-tabs-css")) {
  const el = document.createElement("style");
  el.id = "ms-tabs-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = "underline",
  className = "",
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id);
  const active = value !== undefined ? value : internal;
  const select = id => {
    if (value === undefined) setInternal(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    className: ["ms-tabs", variant === "pill" ? "ms-tabs--pill" : "", className].filter(Boolean).join(" ")
  }, rest), items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    role: "tab",
    type: "button",
    "aria-selected": active === it.id,
    className: "ms-tabs__tab",
    onClick: () => select(it.id)
  }, it.label)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-tag{display:inline-flex;align-items:center;gap:6px;height:32px;padding-inline:12px;border-radius:var(--radius-sm);background:var(--surface-card);border:var(--border-w) solid var(--border-subtle);color:var(--text-body);font:var(--fw-medium) var(--fs-small)/1 var(--font-core);transition:var(--transition-control)}
.ms-tag--selectable{cursor:pointer}
.ms-tag--selectable:hover{border-color:var(--border-strong);color:var(--text-strong)}
.ms-tag--selected{background:var(--accent-50);border-color:var(--accent-300);color:var(--accent-700)}
.ms-tag__x{display:inline-flex;margin-right:-4px;padding:4px;border:0;background:none;color:inherit;opacity:.6;cursor:pointer;border-radius:var(--radius-xs)}
.ms-tag__x:hover{opacity:1;background:rgba(17,19,18,.06)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-tag-css")) {
  const el = document.createElement("style");
  el.id = "ms-tag-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Tag({
  children,
  icon,
  selected = false,
  onSelect,
  onRemove,
  className = "",
  ...rest
}) {
  const selectable = Boolean(onSelect);
  const Tag_ = selectable ? "button" : "span";
  return /*#__PURE__*/React.createElement(Tag_, _extends({
    type: selectable ? "button" : undefined,
    onClick: onSelect,
    "aria-pressed": selectable ? selected : undefined,
    className: ["ms-tag", selectable ? "ms-tag--selectable" : "", selected ? "ms-tag--selected" : "", className].filter(Boolean).join(" ")
  }, rest), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ms-tag__x",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 13
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-toast{display:flex;gap:var(--space-4);align-items:flex-start;width:100%;max-width:420px;background:var(--surface-card);border:var(--border-w) solid var(--border-subtle);border-radius:var(--radius-md);box-shadow:var(--shadow-lg);padding:var(--space-5)}
.ms-toast__icon{margin-top:1px}
.ms-toast.is-success .ms-toast__icon{color:var(--status-success)}
.ms-toast.is-danger .ms-toast__icon{color:var(--status-danger)}
.ms-toast.is-warning .ms-toast__icon{color:var(--status-warning)}
.ms-toast.is-info .ms-toast__icon{color:var(--status-info)}
.ms-toast__title{font:var(--fw-semibold) var(--fs-body)/1.35 var(--font-core);color:var(--text-strong)}
.ms-toast__msg{margin-top:3px;font:var(--type-small);color:var(--text-body)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-toast-css")) {
  const el = document.createElement("style");
  el.id = "ms-toast-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
const TONE_ICON = {
  success: "circle-check",
  danger: "triangle-alert",
  warning: "triangle-alert",
  info: "info"
};
function Toast({
  tone = "success",
  title,
  message,
  onDismiss,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    className: ["ms-toast", "is-" + tone, className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ms-toast__icon"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: TONE_ICON[tone] || "info",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "ms-toast__title"
  }, title), message && /*#__PURE__*/React.createElement("div", {
    className: "ms-toast__msg"
  }, message)), onDismiss && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Dismiss",
    size: "sm",
    onClick: onDismiss
  }));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Toast.jsx", error: String((e && e.message) || e) }); }

// components/core/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-tt{position:relative;display:inline-flex}
.ms-tt__bubble{position:absolute;z-index:40;left:50%;transform:translateX(-50%);background:var(--surface-inverse);color:var(--text-inverse);font:var(--fw-medium) var(--fs-caption)/1.35 var(--font-core);padding:7px 10px;border-radius:var(--radius-sm);box-shadow:var(--shadow-md);max-width:220px;text-align:center;pointer-events:none;opacity:0;transition:opacity var(--dur-fast) var(--ease-out)}
.ms-tt__bubble--top{bottom:calc(100% + 8px)}
.ms-tt__bubble--bottom{top:calc(100% + 8px)}
.ms-tt.is-open .ms-tt__bubble{opacity:1}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-tooltip-css")) {
  const el = document.createElement("style");
  el.id = "ms-tooltip-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Tooltip({
  children,
  content,
  placement = "top",
  className = "",
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["ms-tt", open ? "is-open" : "", className].filter(Boolean).join(" "),
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false)
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    className: "ms-tt__bubble ms-tt__bubble--" + placement
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-check{display:inline-flex;align-items:flex-start;gap:10px;cursor:pointer;min-height:var(--tap-min);padding:11px 0}
.ms-check input{position:absolute;opacity:0;width:0;height:0}
.ms-check__box{flex:none;width:20px;height:20px;margin-top:1px;border:var(--border-w-strong) solid var(--border-strong);border-radius:var(--radius-xs);background:var(--surface-card);display:flex;align-items:center;justify-content:center;color:transparent;transition:var(--transition-control)}
.ms-check:hover .ms-check__box{border-color:var(--n-600)}
.ms-check input:checked+.ms-check__box{background:var(--accent-500);border-color:var(--accent-500);color:var(--n-0)}
.ms-check input:focus-visible+.ms-check__box{box-shadow:var(--shadow-ring-focus)}
.ms-check input:disabled+.ms-check__box{background:var(--surface-muted);border-color:var(--border-default)}
.ms-check__text{font:var(--type-small);color:var(--text-body)}
.ms-check__text b{display:block;font:var(--fw-medium) var(--fs-body)/1.4 var(--font-core);color:var(--text-strong)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-checkbox-css")) {
  const el = document.createElement("style");
  el.id = "ms-checkbox-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["ms-check", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ms-check__box"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    strokeWidth: 3
  })), /*#__PURE__*/React.createElement("span", {
    className: "ms-check__text"
  }, description ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, label), description) : label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-field{display:flex;flex-direction:column;gap:6px;width:100%}
.ms-field__label{font:var(--fw-semibold) var(--fs-small)/1.3 var(--font-core);color:var(--text-strong)}
.ms-field__req{color:var(--accent-600);margin-left:2px}
.ms-field__hint{font:var(--fw-regular) var(--fs-caption)/1.45 var(--font-core);color:var(--text-muted)}
.ms-field__error{font:var(--fw-medium) var(--fs-caption)/1.45 var(--font-core);color:var(--status-danger)}
.ms-control{width:100%;height:var(--control-h-md);padding:0 14px;background:var(--surface-card);color:var(--text-strong);border:var(--border-w) solid var(--border-default);border-radius:var(--radius-control);transition:var(--transition-control)}
.ms-control::placeholder{color:var(--n-400)}
.ms-control:hover:not(:disabled){border-color:var(--border-strong)}
.ms-control:focus{outline:none;border-color:var(--accent-500);box-shadow:var(--shadow-ring-focus)}
.ms-control:disabled{background:var(--surface-muted);color:var(--text-muted);cursor:not-allowed}
.ms-control--lg{height:var(--control-h-lg);padding-inline:16px;font-size:var(--fs-body-lg)}
.ms-control--sm{height:var(--control-h-sm);font-size:var(--fs-small)}
.ms-control--invalid,.ms-control--invalid:hover{border-color:var(--status-danger)}
.ms-control--invalid:focus{box-shadow:0 0 0 3px rgba(179,38,30,.18)}
.ms-control--icon{padding-left:42px}
.ms-inputwrap{position:relative;display:flex;align-items:center}
.ms-inputwrap__icon{position:absolute;left:14px;color:var(--text-muted);pointer-events:none}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-field-css")) {
  const el = document.createElement("style");
  el.id = "ms-field-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Input({
  label,
  hint,
  error,
  icon,
  size = "md",
  required = false,
  id,
  className = "",
  ...rest
}) {
  const autoId = React.useId ? React.useId() : "ms-input";
  const inputId = id || autoId;
  return /*#__PURE__*/React.createElement("div", {
    className: ["ms-field", className].filter(Boolean).join(" ")
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "ms-field__label",
    htmlFor: inputId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "ms-field__req"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "ms-inputwrap"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "ms-inputwrap__icon"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  })), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    required: required,
    "aria-invalid": error ? true : undefined,
    className: ["ms-control", "ms-control--" + size, icon ? "ms-control--icon" : "", error ? "ms-control--invalid" : ""].filter(Boolean).join(" ")
  }, rest))), error ? /*#__PURE__*/React.createElement("span", {
    className: "ms-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ms-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-radio{display:inline-flex;align-items:flex-start;gap:10px;cursor:pointer;min-height:var(--tap-min);padding:11px 0}
.ms-radio input{position:absolute;opacity:0;width:0;height:0}
.ms-radio__dot{flex:none;width:20px;height:20px;margin-top:1px;border:var(--border-w-strong) solid var(--border-strong);border-radius:var(--radius-pill);background:var(--surface-card);display:flex;align-items:center;justify-content:center;transition:var(--transition-control)}
.ms-radio__dot::after{content:"";width:8px;height:8px;border-radius:var(--radius-pill);background:var(--n-0);transform:scale(0);transition:transform var(--dur-fast) var(--ease-out)}
.ms-radio:hover .ms-radio__dot{border-color:var(--n-600)}
.ms-radio input:checked+.ms-radio__dot{background:var(--accent-500);border-color:var(--accent-500)}
.ms-radio input:checked+.ms-radio__dot::after{transform:scale(1)}
.ms-radio input:focus-visible+.ms-radio__dot{box-shadow:var(--shadow-ring-focus)}
.ms-radio__text{font:var(--type-small);color:var(--text-body)}
.ms-radio__text b{display:block;font:var(--fw-medium) var(--fs-body)/1.4 var(--font-core);color:var(--text-strong)}
.ms-radio--card{padding:14px 16px;border:var(--border-w) solid var(--border-subtle);border-radius:var(--radius-control);background:var(--surface-card);width:100%}
.ms-radio--card:hover{border-color:var(--border-default)}
.ms-radio--card:has(input:checked){border-color:var(--accent-400);background:var(--accent-50)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-radio-css")) {
  const el = document.createElement("style");
  el.id = "ms-radio-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Radio({
  label,
  description,
  name,
  value,
  checked,
  defaultChecked,
  onChange,
  disabled,
  card = false,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["ms-radio", card ? "ms-radio--card" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ms-radio__dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ms-radio__text"
  }, description ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, label), description) : label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-field{display:flex;flex-direction:column;gap:6px;width:100%}
.ms-field__label{font:var(--fw-semibold) var(--fs-small)/1.3 var(--font-core);color:var(--text-strong)}
.ms-field__req{color:var(--accent-600);margin-left:2px}
.ms-field__hint{font:var(--fw-regular) var(--fs-caption)/1.45 var(--font-core);color:var(--text-muted)}
.ms-field__error{font:var(--fw-medium) var(--fs-caption)/1.45 var(--font-core);color:var(--status-danger)}
.ms-control{width:100%;height:var(--control-h-md);padding:0 14px;background:var(--surface-card);color:var(--text-strong);border:var(--border-w) solid var(--border-default);border-radius:var(--radius-control);transition:var(--transition-control)}
.ms-control:hover:not(:disabled){border-color:var(--border-strong)}
.ms-control:focus{outline:none;border-color:var(--accent-500);box-shadow:var(--shadow-ring-focus)}
.ms-control--lg{height:var(--control-h-lg);padding-inline:16px;font-size:var(--fs-body-lg)}
.ms-control--sm{height:var(--control-h-sm);font-size:var(--fs-small)}
.ms-control--invalid{border-color:var(--status-danger)}
.ms-control--icon{padding-left:42px}
.ms-selectwrap{position:relative;display:flex;align-items:center}
.ms-selectwrap__chev{position:absolute;right:12px;color:var(--text-muted);pointer-events:none}
.ms-select{appearance:none;-webkit-appearance:none;padding-right:38px;cursor:pointer}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-select-css")) {
  const el = document.createElement("style");
  el.id = "ms-select-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Select({
  label,
  hint,
  error,
  options = [],
  placeholder,
  size = "md",
  required = false,
  id,
  className = "",
  ...rest
}) {
  const autoId = React.useId ? React.useId() : "ms-select";
  const fieldId = id || autoId;
  return /*#__PURE__*/React.createElement("div", {
    className: ["ms-field", className].filter(Boolean).join(" ")
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "ms-field__label",
    htmlFor: fieldId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "ms-field__req"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "ms-selectwrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    required: required,
    "aria-invalid": error ? true : undefined,
    className: ["ms-control", "ms-select", "ms-control--" + size, error ? "ms-control--invalid" : ""].filter(Boolean).join(" ")
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const opt = typeof o === "string" ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    className: "ms-selectwrap__chev"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18
  }))), error ? /*#__PURE__*/React.createElement("span", {
    className: "ms-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ms-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-switch{display:inline-flex;align-items:center;gap:12px;cursor:pointer;min-height:var(--tap-min)}
.ms-switch input{position:absolute;opacity:0;width:0;height:0}
.ms-switch__track{flex:none;width:44px;height:26px;border-radius:var(--radius-pill);background:var(--n-300);padding:3px;transition:background-color var(--dur-base) var(--ease-out)}
.ms-switch__knob{display:block;width:20px;height:20px;border-radius:var(--radius-pill);background:var(--n-0);box-shadow:var(--shadow-xs);transition:transform var(--dur-base) var(--ease-out)}
.ms-switch input:checked+.ms-switch__track{background:var(--accent-500)}
.ms-switch input:checked+.ms-switch__track .ms-switch__knob{transform:translateX(18px)}
.ms-switch input:focus-visible+.ms-switch__track{box-shadow:var(--shadow-ring-focus)}
.ms-switch input:disabled+.ms-switch__track{opacity:.5}
.ms-switch__label{font:var(--fw-medium) var(--fs-body)/1.4 var(--font-core);color:var(--text-strong)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-switch-css")) {
  const el = document.createElement("style");
  el.id = "ms-switch-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ["ms-switch", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ms-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ms-switch__knob"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "ms-switch__label"
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-field{display:flex;flex-direction:column;gap:6px;width:100%}
.ms-field__label{font:var(--fw-semibold) var(--fs-small)/1.3 var(--font-core);color:var(--text-strong)}
.ms-field__req{color:var(--accent-600);margin-left:2px}
.ms-field__hint{font:var(--fw-regular) var(--fs-caption)/1.45 var(--font-core);color:var(--text-muted)}
.ms-field__error{font:var(--fw-medium) var(--fs-caption)/1.45 var(--font-core);color:var(--status-danger)}
.ms-textarea{width:100%;min-height:120px;padding:12px 14px;background:var(--surface-card);color:var(--text-strong);border:var(--border-w) solid var(--border-default);border-radius:var(--radius-control);font:var(--type-body);resize:vertical;transition:var(--transition-control)}
.ms-textarea::placeholder{color:var(--n-400)}
.ms-textarea:hover:not(:disabled){border-color:var(--border-strong)}
.ms-textarea:focus{outline:none;border-color:var(--accent-500);box-shadow:var(--shadow-ring-focus)}
.ms-textarea--invalid{border-color:var(--status-danger)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-textarea-css")) {
  const el = document.createElement("style");
  el.id = "ms-textarea-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Textarea({
  label,
  hint,
  error,
  rows = 4,
  required = false,
  id,
  className = "",
  ...rest
}) {
  const autoId = React.useId ? React.useId() : "ms-textarea";
  const fieldId = id || autoId;
  return /*#__PURE__*/React.createElement("div", {
    className: ["ms-field", className].filter(Boolean).join(" ")
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "ms-field__label",
    htmlFor: fieldId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "ms-field__req"
  }, "*")), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    required: required,
    "aria-invalid": error ? true : undefined,
    className: ["ms-textarea", error ? "ms-textarea--invalid" : ""].filter(Boolean).join(" ")
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    className: "ms-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ms-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/marketing/CTABanner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-cta{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-8);padding:var(--space-10) var(--space-10);border-radius:var(--radius-xl);background:var(--surface-sunken)}
.ms-cta--accent{background:var(--accent-50)}
.ms-cta--ink{background:var(--surface-inverse)}
.ms-cta--ink .ms-cta__title{color:var(--text-inverse)}
.ms-cta--ink .ms-cta__lead{color:rgba(255,255,255,.72)}
.ms-cta__title{font:var(--type-h2);letter-spacing:var(--ls-heading);color:var(--text-strong);max-width:22ch}
.ms-cta__lead{margin-top:var(--space-4);font:var(--type-lead);color:var(--text-body);max-width:46ch}
.ms-cta__actions{display:flex;flex-wrap:wrap;gap:var(--space-4)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-cta-css")) {
  const el = document.createElement("style");
  el.id = "ms-cta-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function CTABanner({
  title,
  lead,
  primaryLabel = "Get a free quote",
  primaryHref,
  secondaryLabel,
  secondaryHref,
  tone = "sunken",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({
    className: ["ms-cta", "ms-cta--" + tone, className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "ms-cta__title"
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    className: "ms-cta__lead"
  }, lead)), /*#__PURE__*/React.createElement("div", {
    className: "ms-cta__actions"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    href: primaryHref,
    iconRight: "arrow-right"
  }, primaryLabel), secondaryLabel && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    variant: tone === "ink" ? "ghost" : "outline",
    href: secondaryHref,
    style: tone === "ink" ? {
      color: "var(--text-inverse)",
      borderColor: "var(--border-inverse)"
    } : undefined
  }, secondaryLabel)));
}
Object.assign(__ds_scope, { CTABanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/CTABanner.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FAQItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-faq{border-bottom:var(--border-w) solid var(--border-subtle)}
.ms-faq__q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:var(--space-5);padding:var(--space-6) 0;background:none;border:0;text-align:left;cursor:pointer;font:var(--fw-semibold) var(--fs-body-lg)/1.4 var(--font-core);letter-spacing:-0.01em;color:var(--text-strong)}
.ms-faq__q:hover{color:var(--accent-600)}
.ms-faq__chev{flex:none;color:var(--text-muted);transition:transform var(--dur-base) var(--ease-out)}
.ms-faq.is-open .ms-faq__chev{transform:rotate(180deg)}
.ms-faq__a{overflow:hidden;max-height:0;transition:max-height var(--dur-slow) var(--ease-out)}
.ms-faq.is-open .ms-faq__a{max-height:420px}
.ms-faq__a-inner{padding-bottom:var(--space-6);font:var(--type-body);color:var(--text-body);max-width:60ch}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-faq-css")) {
  const el = document.createElement("style");
  el.id = "ms-faq-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function FAQItem({
  question,
  answer,
  defaultOpen = false,
  open,
  onToggle,
  className = "",
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open !== undefined ? open : internal;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ms-faq", isOpen ? "is-open" : "", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ms-faq__q",
    "aria-expanded": isOpen,
    onClick: () => {
      if (open === undefined) setInternal(!isOpen);
      onToggle && onToggle(!isOpen);
    }
  }, question, /*#__PURE__*/React.createElement("span", {
    className: "ms-faq__chev"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ms-faq__a"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-faq__a-inner"
  }, answer)));
}
Object.assign(__ds_scope, { FAQItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/FAQItem.jsx", error: String((e && e.message) || e) }); }

// components/marketing/PricingCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-price{display:flex;flex-direction:column;gap:var(--space-5);padding:var(--space-8);background:var(--surface-card);border:var(--border-w) solid var(--border-subtle);border-radius:var(--radius-card)}
.ms-price--featured{border-color:var(--accent-300);box-shadow:var(--shadow-md)}
.ms-price__head{display:flex;align-items:center;justify-content:space-between;gap:var(--space-4)}
.ms-price__name{font:var(--fw-semibold) var(--fs-h4)/1.2 var(--font-core);color:var(--text-strong)}
.ms-price__amount{font:var(--fw-bold) var(--fs-h1)/1 var(--font-core);letter-spacing:var(--ls-display);color:var(--text-strong)}
.ms-price__unit{font:var(--fw-medium) var(--fs-small)/1 var(--font-core);color:var(--text-muted);margin-left:6px}
.ms-price__note{font:var(--type-small);color:var(--text-body)}
.ms-price__list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--space-4)}
.ms-price__list li{display:flex;gap:10px;font:var(--type-small);color:var(--text-body)}
.ms-price__list svg{color:var(--accent-500);margin-top:2px}
.ms-price__foot{margin-top:auto;padding-top:var(--space-3)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-pricing-css")) {
  const el = document.createElement("style");
  el.id = "ms-pricing-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function PricingCard({
  name,
  amount,
  unit,
  note,
  features = [],
  featured = false,
  badge,
  ctaLabel = "Book this",
  ctaHref,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ms-price", featured ? "ms-price--featured" : "", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "ms-price__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ms-price__name"
  }, name), badge && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "accent",
    variant: "soft"
  }, badge)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ms-price__amount"
  }, amount), unit && /*#__PURE__*/React.createElement("span", {
    className: "ms-price__unit"
  }, unit)), note && /*#__PURE__*/React.createElement("p", {
    className: "ms-price__note"
  }, note), /*#__PURE__*/React.createElement("ul", {
    className: "ms-price__list"
  }, features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16,
    strokeWidth: 2.5
  }), f))), /*#__PURE__*/React.createElement("div", {
    className: "ms-price__foot"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    fullWidth: true,
    variant: featured ? "primary" : "outline",
    href: ctaHref
  }, ctaLabel)));
}
Object.assign(__ds_scope, { PricingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/PricingCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/QuoteForm.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-quote{display:flex;flex-direction:column;gap:var(--space-5);padding:var(--space-8);background:var(--surface-card);border:var(--border-w) solid var(--border-subtle);border-radius:var(--radius-lg);box-shadow:var(--shadow-md)}
.ms-quote__title{font:var(--fw-semibold) var(--fs-h3)/1.25 var(--font-core);letter-spacing:var(--ls-heading);color:var(--text-strong)}
.ms-quote__sub{margin-top:6px;font:var(--type-small);color:var(--text-muted)}
.ms-quote__row{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5)}
.ms-quote__note{display:flex;align-items:center;gap:8px;font:var(--fw-regular) var(--fs-caption)/1.4 var(--font-core);color:var(--text-muted)}
.ms-quote__done{display:flex;flex-direction:column;align-items:center;gap:var(--space-4);text-align:center;padding:var(--space-8) 0}
.ms-quote__done svg{color:var(--status-success)}
@media (max-width:560px){.ms-quote__row{grid-template-columns:1fr}}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-quoteform-css")) {
  const el = document.createElement("style");
  el.id = "ms-quoteform-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function QuoteForm({
  title = "Get a free quote",
  subtitle = "We reply within one business hour, 7am–6pm.",
  services = ["Emergency repair", "Installation", "Servicing & maintenance", "Something else"],
  submitLabel = "Request my quote",
  footnote = "No call-out fee. No obligation.",
  onSubmit,
  className = "",
  ...rest
}) {
  const [sent, setSent] = React.useState(false);
  if (sent) {
    return /*#__PURE__*/React.createElement("div", _extends({
      className: ["ms-quote", className].filter(Boolean).join(" ")
    }, rest), /*#__PURE__*/React.createElement("div", {
      className: "ms-quote__done"
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "circle-check",
      size: 40
    }), /*#__PURE__*/React.createElement("div", {
      className: "ms-quote__title"
    }, "Request received"), /*#__PURE__*/React.createElement("p", {
      className: "ms-quote__sub"
    }, "We'll call you back shortly to confirm a time.")));
  }
  return /*#__PURE__*/React.createElement("form", _extends({
    className: ["ms-quote", className].filter(Boolean).join(" "),
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
      onSubmit && onSubmit(e);
    }
  }, rest), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ms-quote__title"
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    className: "ms-quote__sub"
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    className: "ms-quote__row"
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    label: "Name",
    placeholder: "Jane Whitfield",
    required: true
  }), /*#__PURE__*/React.createElement(__ds_scope.Input, {
    label: "Phone",
    type: "tel",
    placeholder: "(555) 018 2244",
    required: true
  })), /*#__PURE__*/React.createElement(__ds_scope.Select, {
    label: "What do you need?",
    options: services,
    placeholder: "Choose a service",
    required: true
  }), /*#__PURE__*/React.createElement(__ds_scope.Textarea, {
    label: "Tell us about the job",
    rows: 3,
    placeholder: "Kitchen tap has been dripping for a week\u2026"
  }), /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    label: "Send me an SMS confirmation",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "submit",
    size: "lg",
    fullWidth: true,
    iconRight: "arrow-right"
  }, submitLabel), footnote && /*#__PURE__*/React.createElement("span", {
    className: "ms-quote__note"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "shield-check",
    size: 15
  }), footnote));
}
Object.assign(__ds_scope, { QuoteForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/QuoteForm.jsx", error: String((e && e.message) || e) }); }

// components/marketing/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-sh{display:flex;flex-direction:column;gap:var(--space-4);max-width:640px}
.ms-sh--center{align-items:center;text-align:center;margin-inline:auto}
.ms-sh__eyebrow{font:var(--type-eyebrow);letter-spacing:var(--ls-label);text-transform:uppercase;color:var(--text-accent)}
.ms-sh__title{font:var(--type-h2);letter-spacing:var(--ls-heading);color:var(--text-strong)}
.ms-sh__lead{font:var(--type-lead);color:var(--text-body)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-sectionheading-css")) {
  const el = document.createElement("style");
  el.id = "ms-sectionheading-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as = "h2",
  className = "",
  ...rest
}) {
  const Title = as;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ms-sh", align === "center" ? "ms-sh--center" : "", className].filter(Boolean).join(" ")
  }, rest), eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "ms-sh__eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement(Title, {
    className: "ms-sh__title"
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    className: "ms-sh__lead"
  }, lead));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-service{display:flex;flex-direction:column;gap:var(--space-4);padding:var(--space-7);background:var(--surface-card);border:var(--border-w) solid var(--border-subtle);border-radius:var(--radius-card);text-decoration:none;color:inherit;transition:var(--transition-card)}
a.ms-service:hover{box-shadow:var(--shadow-card-hover);transform:translateY(-2px);border-color:var(--border-default)}
.ms-service__icon{width:44px;height:44px;border-radius:var(--radius-md);background:var(--accent-50);color:var(--accent-600);display:flex;align-items:center;justify-content:center}
.ms-service__title{font:var(--fw-semibold) var(--fs-h4)/1.3 var(--font-core);letter-spacing:var(--ls-heading);color:var(--text-strong)}
.ms-service__body{font:var(--type-small);color:var(--text-body)}
.ms-service__meta{margin-top:auto;padding-top:var(--space-4);display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);border-top:var(--border-w) solid var(--border-subtle)}
.ms-service__price{font:var(--fw-semibold) var(--fs-small)/1 var(--font-core);color:var(--text-strong)}
.ms-service__cta{display:inline-flex;align-items:center;gap:6px;font:var(--fw-semibold) var(--fs-small)/1 var(--font-core);color:var(--text-link)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-servicecard-css")) {
  const el = document.createElement("style");
  el.id = "ms-servicecard-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function ServiceCard({
  icon = "wrench",
  title,
  description,
  price,
  cta = "Learn more",
  href,
  className = "",
  ...rest
}) {
  const Tag = href ? "a" : "div";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    className: ["ms-service", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ms-service__icon"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22
  })), /*#__PURE__*/React.createElement("span", {
    className: "ms-service__title"
  }, title), description && /*#__PURE__*/React.createElement("span", {
    className: "ms-service__body"
  }, description), (price || href) && /*#__PURE__*/React.createElement("span", {
    className: "ms-service__meta"
  }, price && /*#__PURE__*/React.createElement("span", {
    className: "ms-service__price"
  }, price), href && /*#__PURE__*/React.createElement("span", {
    className: "ms-service__cta"
  }, cta, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 15
  }))));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Stars.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-stars{display:inline-flex;align-items:center;gap:2px}
.ms-stars__on{color:var(--star-filled)}
.ms-stars__off{color:var(--star-empty)}
.ms-stars__label{margin-left:8px;font:var(--fw-medium) var(--fs-small)/1 var(--font-core);color:var(--text-body)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-stars-css")) {
  const el = document.createElement("style");
  el.id = "ms-stars-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function Stars({
  rating = 5,
  size = 16,
  label,
  className = "",
  ...rest
}) {
  const full = Math.round(rating);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["ms-stars", className].filter(Boolean).join(" "),
    "aria-label": label || rating + " out of 5"
  }, rest), [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: i < full ? "ms-stars__on" : "ms-stars__off"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: i < full ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
  })))), label && /*#__PURE__*/React.createElement("span", {
    className: "ms-stars__label"
  }, label));
}
Object.assign(__ds_scope, { Stars });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Stars.jsx", error: String((e && e.message) || e) }); }

// components/marketing/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:var(--space-8)}
.ms-stats--bordered{border-top:var(--border-w) solid var(--border-subtle);border-bottom:var(--border-w) solid var(--border-subtle);padding-block:var(--space-8)}
.ms-stat__value{font:var(--fw-bold) var(--fs-h1)/1 var(--font-core);letter-spacing:var(--ls-display);color:var(--text-strong)}
.ms-stat__label{margin-top:8px;font:var(--type-small);color:var(--text-muted)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-statblock-css")) {
  const el = document.createElement("style");
  el.id = "ms-statblock-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function StatBlock({
  stats = [],
  bordered = false,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ms-stats", bordered ? "ms-stats--bordered" : "", className].filter(Boolean).join(" ")
  }, rest), stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-stat__value"
  }, s.value), /*#__PURE__*/React.createElement("div", {
    className: "ms-stat__label"
  }, s.label))));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/marketing/TestimonialCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  const el = document.createElement("style");
  el.id = "ms-testimonial-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function TestimonialCard({
  quote,
  name,
  meta,
  rating = 5,
  variant = "outline",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    className: ["ms-testimonial", variant === "sunken" ? "ms-testimonial--sunken" : "", className].filter(Boolean).join(" ")
  }, rest), rating ? /*#__PURE__*/React.createElement(__ds_scope.Stars, {
    rating: rating
  }) : null, /*#__PURE__*/React.createElement("blockquote", {
    className: "ms-testimonial__quote"
  }, quote), /*#__PURE__*/React.createElement("figcaption", {
    className: "ms-testimonial__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ms-testimonial__initial"
  }, (name || "?").trim().charAt(0)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "ms-testimonial__name",
    style: {
      display: "block"
    }
  }, name), meta && /*#__PURE__*/React.createElement("span", {
    className: "ms-testimonial__meta"
  }, meta))));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/TrustBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-trust{display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-5) var(--space-9)}
.ms-trust--center{justify-content:center}
.ms-trust__item{display:inline-flex;align-items:center;gap:9px;font:var(--fw-medium) var(--fs-small)/1.2 var(--font-core);color:var(--text-body)}
.ms-trust__item svg{color:var(--accent-500)}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-trustbar-css")) {
  const el = document.createElement("style");
  el.id = "ms-trustbar-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function TrustBar({
  items = [],
  align = "left",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ms-trust", align === "center" ? "ms-trust--center" : "", className].filter(Boolean).join(" ")
  }, rest), items.map((it, i) => {
    const item = typeof it === "string" ? {
      label: it,
      icon: "circle-check"
    } : it;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      className: "ms-trust__item"
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: item.icon || "circle-check",
      size: 18
    }), item.label);
  }));
}
Object.assign(__ds_scope, { TrustBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/TrustBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-footer{background:var(--surface-sunken);border-top:var(--border-w) solid var(--border-subtle);padding-block:var(--space-11) var(--space-8)}
.ms-footer__in{max-width:var(--container-max);margin-inline:auto;padding-inline:var(--gutter)}
.ms-footer__grid{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:var(--space-9)}
.ms-footer__brand{font:var(--fw-bold) 1.25rem/1 var(--font-core);letter-spacing:-0.035em;color:var(--text-strong)}
.ms-footer__brand em{font-style:normal;color:var(--accent-500)}
.ms-footer__blurb{margin-top:var(--space-4);font:var(--type-small);color:var(--text-body);max-width:34ch}
.ms-footer__contact{margin-top:var(--space-6);display:flex;flex-direction:column;gap:10px}
.ms-footer__contact a{display:inline-flex;align-items:center;gap:9px;font:var(--fw-medium) var(--fs-small)/1.3 var(--font-core);color:var(--text-strong);text-decoration:none}
.ms-footer__contact svg{color:var(--accent-500)}
.ms-footer__h{font:var(--type-eyebrow);letter-spacing:var(--ls-label);text-transform:uppercase;color:var(--text-muted)}
.ms-footer__list{margin-top:var(--space-5);display:flex;flex-direction:column;gap:12px}
.ms-footer__list a{font:var(--fw-regular) var(--fs-small)/1.3 var(--font-core);color:var(--text-body);text-decoration:none}
.ms-footer__list a:hover{color:var(--text-strong)}
.ms-footer__bottom{margin-top:var(--space-11);padding-top:var(--space-6);border-top:var(--border-w) solid var(--border-subtle);display:flex;flex-wrap:wrap;justify-content:space-between;gap:var(--space-4);font:var(--fw-regular) var(--fs-caption)/1.4 var(--font-core);color:var(--text-muted)}
@media (max-width:820px){.ms-footer__grid{grid-template-columns:1fr 1fr}}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-sitefooter-css")) {
  const el = document.createElement("style");
  el.id = "ms-sitefooter-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function SiteFooter({
  brand = "Mainstay",
  brandAccent,
  blurb = "Licensed trades and professional services for homes and businesses across the county. Family-run since 2009.",
  phone = "(555) 018 2244",
  email = "hello@mainstay.co",
  address = "14 Foundry Row, Ashbourne",
  columns = [],
  legal = "© 2026 Mainstay Services Ltd. Licence #TR-448201.",
  licence,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    className: ["ms-footer", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "ms-footer__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-footer__grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ms-footer__brand"
  }, brand, brandAccent && /*#__PURE__*/React.createElement("em", null, brandAccent)), /*#__PURE__*/React.createElement("p", {
    className: "ms-footer__blurb"
  }, blurb), /*#__PURE__*/React.createElement("div", {
    className: "ms-footer__contact"
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:" + phone.replace(/[^0-9+]/g, "")
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "phone",
    size: 16
  }), phone), /*#__PURE__*/React.createElement("a", {
    href: "mailto:" + email
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "mail",
    size: 16
  }), email), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "map-pin",
    size: 16
  }), address))), columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-footer__h"
  }, col.title), /*#__PURE__*/React.createElement("div", {
    className: "ms-footer__list"
  }, col.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href || "#"
  }, l.label)))))), /*#__PURE__*/React.createElement("div", {
    className: "ms-footer__bottom"
  }, /*#__PURE__*/React.createElement("span", null, legal), licence && /*#__PURE__*/React.createElement("span", null, licence))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.ms-header{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.86);backdrop-filter:saturate(160%) blur(12px);border-bottom:var(--border-w) solid var(--border-subtle)}
.ms-header__strip{background:var(--surface-inverse);color:rgba(255,255,255,.82);font:var(--fw-medium) var(--fs-caption)/1 var(--font-core)}
.ms-header__strip-in{display:flex;align-items:center;justify-content:space-between;gap:var(--space-6);height:38px;max-width:var(--container-max);margin-inline:auto;padding-inline:var(--gutter)}
.ms-header__strip span{display:inline-flex;align-items:center;gap:7px}
.ms-header__bar{display:flex;align-items:center;gap:var(--space-8);height:76px;max-width:var(--container-max);margin-inline:auto;padding-inline:var(--gutter)}
.ms-header__brand{font:var(--fw-bold) 1.3125rem/1 var(--font-core);letter-spacing:-0.035em;color:var(--text-strong);text-decoration:none;white-space:nowrap}
.ms-header__brand em{font-style:normal;color:var(--accent-500)}
.ms-header__nav{display:flex;align-items:center;gap:var(--space-7);margin-left:var(--space-4)}
.ms-header__link{font:var(--fw-medium) var(--fs-small)/1 var(--font-core);color:var(--text-body);text-decoration:none;padding:8px 0;transition:color var(--dur-fast) var(--ease-out)}
.ms-header__link:hover,.ms-header__link[aria-current="page"]{color:var(--text-strong)}
.ms-header__link[aria-current="page"]{font-weight:var(--fw-semibold)}
.ms-header__right{margin-left:auto;display:flex;align-items:center;gap:var(--space-5)}
.ms-header__phone{display:inline-flex;align-items:center;gap:8px;font:var(--fw-semibold) var(--fs-body)/1 var(--font-core);color:var(--text-strong);text-decoration:none}
.ms-header__phone svg{color:var(--accent-500)}
.ms-header__burger{display:none}
@media (max-width:900px){.ms-header__nav{display:none}.ms-header__burger{display:inline-flex}.ms-header__phone span{display:none}}
`;
const __css = CSS;
if (typeof document !== "undefined" && !document.getElementById("ms-siteheader-css")) {
  const el = document.createElement("style");
  el.id = "ms-siteheader-css";
  el.textContent = __css;
  document.head.appendChild(el);
}
function SiteHeader({
  brand = "Mainstay",
  brandAccent,
  links = [{
    label: "Services",
    href: "#"
  }, {
    label: "About",
    href: "#"
  }, {
    label: "Reviews",
    href: "#"
  }, {
    label: "Contact",
    href: "#"
  }],
  activeHref,
  phone = "(555) 018 2244",
  ctaLabel = "Get a free quote",
  onCta,
  onNavigate,
  note = "Same-day callouts · Licensed & insured",
  hours = "Mon–Sat, 7am–6pm",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    className: ["ms-header", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "ms-header__strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-header__strip-in"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "badge-check",
    size: 14
  }), note), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "clock",
    size: 14
  }), hours))), /*#__PURE__*/React.createElement("div", {
    className: "ms-header__bar"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ms-header__brand",
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate(links[0] && "#home");
    }
  }, brand, brandAccent && /*#__PURE__*/React.createElement("em", null, brandAccent)), /*#__PURE__*/React.createElement("nav", {
    className: "ms-header__nav"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href + l.label,
    className: "ms-header__link",
    href: l.href,
    "aria-current": activeHref === l.href ? "page" : undefined,
    onClick: e => {
      if (onNavigate) {
        e.preventDefault();
        onNavigate(l.href);
      }
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    className: "ms-header__right"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ms-header__phone",
    href: "tel:" + phone.replace(/[^0-9+]/g, "")
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "phone",
    size: 17
  }), /*#__PURE__*/React.createElement("span", null, phone)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    onClick: onCta
  }, ctaLabel), /*#__PURE__*/React.createElement("span", {
    className: "ms-header__burger"
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "menu",
    label: "Menu",
    variant: "outline"
  })))));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactScreen.jsx
try { (() => {
const {
  Button,
  Icon,
  Badge,
  Card,
  SectionHeading,
  Input,
  Textarea,
  Select,
  Radio,
  Checkbox,
  Switch,
  Toast,
  Dialog,
  TrustBar,
  Stars,
  Tooltip
} = window.MainstayDesignSystem_eaeaf9;
function ContactScreen({
  go
}) {
  const [step, setStep] = React.useState(1);
  const [slot, setSlot] = React.useState("am");
  const [confirmed, setConfirmed] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      paddingBlock: "var(--space-11) var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr .9fr",
      gap: "var(--space-13)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Book a visit",
    as: "h1",
    title: "Two minutes, then we'll call to confirm",
    lead: "Or skip the form entirely and ring (555) 018 2244 \u2014 a person answers, seven days a week."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      marginTop: "var(--space-8)",
      alignItems: "center"
    }
  }, [1, 2, 3].map(n => /*#__PURE__*/React.createElement(React.Fragment, {
    key: n
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "var(--radius-pill)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      font: "600 13px/1 var(--font-core)",
      background: step >= n ? "var(--accent-500)" : "var(--n-100)",
      color: step >= n ? "#fff" : "var(--text-muted)"
    }
  }, n), n < 3 && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: step > n ? "var(--accent-300)" : "var(--border-subtle)"
    }
  })))), /*#__PURE__*/React.createElement(Card, {
    variant: "elevated",
    padding: "lg",
    style: {
      marginTop: "var(--space-7)"
    }
  }, step === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("h3", null, "What do you need?"), /*#__PURE__*/React.createElement(Select, {
    label: "Service",
    placeholder: "Choose a service",
    options: SERVICES.map(s => s.title),
    required: true
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Describe the job",
    rows: 3,
    placeholder: "Radiator upstairs is cold at the top\u2026"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "This is an emergency",
    description: "We'll call you straight back instead of emailing."
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => setStep(2)
  }, "Choose a time")), step === 2 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("h3", null, "When suits you?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Radio, {
    card: true,
    name: "slot",
    label: "Morning",
    description: "8am \u2013 12pm \xB7 3 slots left",
    checked: slot === "am",
    onChange: () => setSlot("am")
  }), /*#__PURE__*/React.createElement(Radio, {
    card: true,
    name: "slot",
    label: "Afternoon",
    description: "12pm \u2013 5pm \xB7 1 slot left",
    checked: slot === "pm",
    onChange: () => setSlot("pm")
  }), /*#__PURE__*/React.createElement(Radio, {
    card: true,
    name: "slot",
    label: "Evening",
    description: "5pm \u2013 8pm \xB7 +$40",
    checked: slot === "eve",
    onChange: () => setSlot("eve")
  }), /*#__PURE__*/React.createElement(Radio, {
    card: true,
    name: "slot",
    label: "Next available",
    description: "We'll ring with the earliest",
    checked: slot === "any",
    onChange: () => setSlot("any")
  })), /*#__PURE__*/React.createElement(Switch, {
    label: "Text me when the engineer is on the way",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setStep(1)
  }, "Back"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => setStep(3),
    style: {
      flex: 1
    }
  }, "Add your details"))), step === 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("h3", null, "Where are we coming?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Jane Whitfield",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Phone",
    icon: "phone",
    placeholder: "(555) 018 2244",
    required: true
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Address",
    icon: "map-pin",
    placeholder: "14 Foundry Row, Ashbourne",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    icon: "mail",
    placeholder: "jane@example.com",
    hint: "For the quote and receipt only."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setStep(2)
  }, "Back"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => setConfirmed(true),
    style: {
      flex: 1
    },
    iconRight: "circle-check"
  }, "Confirm booking")))), confirmed && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: "Booking request sent",
    message: "We'll call you within the hour to confirm the slot and give you a fixed price.",
    onDismiss: () => setConfirmed(false)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      marginBottom: "var(--space-5)"
    }
  }, "Reach us directly"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, [["phone", "(555) 018 2244", "Answered 7am–8pm, 7 days"], ["mail", "hello@mainstay.co", "Replies within one business hour"], ["map-pin", "14 Foundry Row, Ashbourne", "Yard open Mon–Fri, 8am–4pm"], ["message-square", "Text or WhatsApp", "Send a photo of the problem"]].map(([icon, title, sub]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      display: "flex",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 19,
    color: "var(--accent-500)",
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "600 var(--fs-body)/1.3 var(--font-core)",
      color: "var(--text-strong)"
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-small)",
      color: "var(--text-muted)"
    }
  }, sub))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    fullWidth: true,
    iconLeft: "calendar",
    onClick: () => setDialog(true)
  }, "Request a callback instead"))), /*#__PURE__*/React.createElement(Card, {
    variant: "sunken",
    padding: "lg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ms-eyebrow"
  }, "Areas covered"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-3)",
      marginTop: "var(--space-5)"
    }
  }, AREAS.map(a => /*#__PURE__*/React.createElement("span", {
    key: a,
    style: {
      font: "500 var(--fs-small)/1 var(--font-core)",
      color: "var(--text-body)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-pill)",
      padding: "8px 12px"
    }
  }, a))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    label: "Map \u2014 service radius around the county",
    height: 150,
    radius: "var(--radius-md)"
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Stars, {
    rating: 5,
    label: "4.9 \xB7 312 reviews"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-body)",
      marginTop: "var(--space-4)"
    }
  }, "\u201CBooked online at eight in the morning, engineer here by eleven, invoice matched the quote exactly.\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-muted)",
      marginTop: "var(--space-3)"
    }
  }, "Ellen M. \xB7 Peveril"))))), /*#__PURE__*/React.createElement(Dialog, {
    open: dialog,
    onClose: () => setDialog(false),
    title: "Request a callback",
    description: "Leave a number and we'll ring you back \u2014 usually within 20 minutes during opening hours.",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setDialog(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => setDialog(false)
    }, "Request call"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Jane Whitfield"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Phone",
    icon: "phone",
    placeholder: "(555) 018 2244"
  }))));
}
Object.assign(window, {
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Icon,
  Badge,
  Card,
  SectionHeading,
  TrustBar,
  Stars,
  ServiceCard,
  TestimonialCard,
  StatBlock,
  FAQItem,
  CTABanner,
  QuoteForm,
  Tabs
} = window.MainstayDesignSystem_eaeaf9;
function HomeScreen({
  go
}) {
  const [audience, setAudience] = React.useState("home");
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-page)",
      paddingBlock: "clamp(40px,5vw,72px) var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1.05fr .95fr",
      gap: "var(--space-13)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    icon: "clock",
    size: "lg"
  }, "Same-day slots available"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-display)",
      letterSpacing: "var(--ls-display)",
      color: "var(--text-strong)",
      marginTop: "var(--space-6)",
      maxWidth: "14ch"
    }
  }, "Fixed today, not next week."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-lead)",
      color: "var(--text-body)",
      marginTop: "var(--space-6)",
      maxWidth: "46ch"
    }
  }, "Plumbing, heating, electrical and the professional services that go with owning property \u2014 one local team, one number, prices agreed before we start."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-4)",
      marginTop: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => go("#contact")
  }, "Get a free quote"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    iconLeft: "phone",
    href: "tel:5550182244"
  }, "(555) 018 2244")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(TrustBar, {
    items: [{
      label: "Licensed & insured",
      icon: "shield-check"
    }, {
      label: "No call-out fee",
      icon: "circle-check"
    }, {
      label: "Family-run since 2009",
      icon: "badge-check"
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      marginTop: "var(--space-8)",
      paddingTop: "var(--space-7)",
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(Stars, {
    rating: 5,
    size: 18,
    label: "4.9 average from 312 local reviews"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(QuoteForm, null)))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken",
    id: "services"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "What we do",
    title: "One number for every job around the property",
    lead: "Trades and professional services under one roof, so you're not chasing four different people."
  }), /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    value: audience,
    onChange: setAudience,
    items: [{
      id: "home",
      label: "Homeowners"
    }, {
      id: "business",
      label: "Businesses"
    }, {
      id: "landlord",
      label: "Landlords"
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--space-5)",
      marginTop: "var(--space-9)"
    }
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: s.title
  }, s, {
    href: "#services",
    cta: "See details"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    iconRight: "arrow-right",
    onClick: () => go("#pricing")
  }, "See prices for every service"))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(StatBlock, {
    bordered: true,
    stats: [{
      value: "17 yrs",
      label: "Trading in the county"
    }, {
      value: "6,400+",
      label: "Jobs completed"
    }, {
      value: "62 min",
      label: "Average response time"
    }, {
      value: "4.9★",
      label: "312 verified reviews"
    }]
  })), /*#__PURE__*/React.createElement(Section, {
    tone: "page",
    py: "0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: ".9fr 1.1fr",
      gap: "var(--space-13)",
      alignItems: "center",
      paddingBottom: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement(Photo, {
    label: "Photo \u2014 an engineer at a customer's door, van in the background",
    height: 380
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "How it works",
    title: "Three steps, no surprises"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-8)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-7)"
    }
  }, [{
    n: "01",
    t: "Tell us what's wrong",
    d: "Call, or send the form. It takes about a minute."
  }, {
    n: "02",
    t: "Get a fixed price",
    d: "We quote before any work starts. Parts and labour, one number."
  }, {
    n: "03",
    t: "We fix it",
    d: "Same-day where we can, or a two-hour arrival window you choose."
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      display: "flex",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "700 var(--fs-h4)/1 var(--font-core)",
      color: "var(--accent-500)",
      letterSpacing: "-0.02em",
      minWidth: 34
    }
  }, s.n), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "600 var(--fs-h4)/1.3 var(--font-core)",
      color: "var(--text-strong)"
    }
  }, s.t), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "var(--type-body)",
      color: "var(--text-body)",
      marginTop: 4,
      maxWidth: "44ch"
    }
  }, s.d)))))))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken",
    id: "reviews"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Reviews",
    title: "What people in the county say",
    align: "center"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--space-5)",
      marginTop: "var(--space-9)"
    }
  }, REVIEWS.map(r => /*#__PURE__*/React.createElement(TestimonialCard, _extends({
    key: r.name
  }, r))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: ".8fr 1.2fr",
      gap: "var(--space-13)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Questions",
    title: "Before you book",
    lead: "Anything else, just ask when you call."
  }), /*#__PURE__*/React.createElement("div", null, [["Do you charge a call-out fee?", "No. Quotes are free, and the price we agree before starting is the price you pay."], ["How quickly can you come out?", "Most jobs booked before 11am are done the same day. Emergencies are prioritised."], ["Are you licensed and insured?", "Yes — fully licensed trades, $2m public liability, and every engineer is DBS checked."], ["Which areas do you cover?", "Ashbourne, Redhill, Carlow, Kingsmoor and everywhere within about 20 miles."], ["How do I pay?", "Card, bank transfer or cash on completion. Businesses can be invoiced on 14-day terms."]].map(([q, a], i) => /*#__PURE__*/React.createElement(FAQItem, {
    key: q,
    question: q,
    answer: a,
    defaultOpen: i === 0
  }))))), /*#__PURE__*/React.createElement(Section, {
    tone: "page",
    py: "0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement(CTABanner, {
    tone: "ink",
    title: "Need someone today?",
    lead: "Tell us what's wrong and we'll call you back within the hour.",
    primaryLabel: "Get a free quote",
    secondaryLabel: "Call (555) 018 2244",
    primaryHref: "#contact",
    secondaryHref: "tel:5550182244"
  }))));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PricingScreen.jsx
try { (() => {
const {
  Button,
  Icon,
  Badge,
  Card,
  SectionHeading,
  PricingCard,
  Tabs,
  TrustBar,
  FAQItem,
  CTABanner,
  Stars
} = window.MainstayDesignSystem_eaeaf9;
function PricingScreen({
  go
}) {
  const [mode, setMode] = React.useState("visit");
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      paddingBlock: "var(--space-11) var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "Pricing",
    as: "h1",
    title: "Prices published, not negotiated",
    lead: "Most local trades won't put a number on a website. Here are ours."
  }), /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    value: mode,
    onChange: setMode,
    items: [{
      id: "visit",
      label: "Per visit"
    }, {
      id: "plan",
      label: "Care plan"
    }]
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      paddingBottom: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--space-6)",
      alignItems: "start"
    }
  }, mode === "visit" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PricingCard, {
    name: "Standard callout",
    amount: "$149",
    unit: "/ visit",
    note: "Weekdays, 8am\u20135pm.",
    features: ["Arrival window you choose", "First hour of labour", "Parts under $25 included", "12-month labour guarantee"],
    ctaLabel: "Book a visit",
    ctaHref: "#contact"
  }), /*#__PURE__*/React.createElement(PricingCard, {
    featured: true,
    badge: "Most booked",
    name: "Same-day priority",
    amount: "$189",
    unit: "/ visit",
    note: "Booked before 11am, done that day.",
    features: ["Front of the queue", "Two-hour arrival window", "First hour of labour", "Text when the engineer leaves"],
    ctaLabel: "Book same-day",
    ctaHref: "#contact"
  }), /*#__PURE__*/React.createElement(PricingCard, {
    name: "Out of hours",
    amount: "$210",
    unit: "/ visit",
    note: "Evenings, weekends and holidays.",
    features: ["24/7 answered line", "90-minute target arrival", "Emergency make-safe", "Follow-up quote free"],
    ctaLabel: "Call the night line",
    ctaHref: "tel:5550182244"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PricingCard, {
    name: "Home cover",
    amount: "$19",
    unit: "/ month",
    note: "For a single home.",
    features: ["Annual boiler service", "No callout charge", "15% off all labour", "Priority booking"],
    ctaLabel: "Start cover",
    ctaHref: "#contact"
  }), /*#__PURE__*/React.createElement(PricingCard, {
    featured: true,
    badge: "Best value",
    name: "Landlord cover",
    amount: "$32",
    unit: "/ month",
    note: "Per rented property.",
    features: ["Gas safety certificate", "Annual electrical check", "Compliance reminders", "Tenant booking line"],
    ctaLabel: "Start cover",
    ctaHref: "#contact"
  }), /*#__PURE__*/React.createElement(PricingCard, {
    name: "Business cover",
    amount: "From $95",
    unit: "/ month",
    note: "Shops, offices and sites.",
    features: ["Named account manager", "4-hour response SLA", "Monthly invoicing", "Out-of-hours included"],
    ctaLabel: "Talk to us",
    ctaHref: "#contact"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      marginTop: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement(TrustBar, {
    align: "center",
    items: [{
      label: "No call-out fee on quotes",
      icon: "circle-check"
    }, {
      label: "Fixed price before we start",
      icon: "shield-check"
    }, {
      label: "Card, transfer or invoice",
      icon: "credit-card"
    }]
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-sunken)",
      paddingBlock: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      display: "grid",
      gridTemplateColumns: ".8fr 1.2fr",
      gap: "var(--space-13)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Small print",
    title: "What affects the price"
  }), /*#__PURE__*/React.createElement("div", null, [["Are materials included?", "Parts under $25 are included in the callout. Anything larger is quoted at cost plus 10% before we fit it."], ["Do you charge per hour after the first?", "$65 per additional hour on weekdays, $95 out of hours, billed in 30-minute blocks."], ["Is there a cancellation fee?", "No, as long as you tell us before the engineer sets off."]].map(([q, a], i) => /*#__PURE__*/React.createElement(FAQItem, {
    key: q,
    question: q,
    answer: a,
    defaultOpen: i === 0
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      paddingBlock: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement(CTABanner, {
    title: "Get an exact number for your job",
    lead: "Send a couple of details and we'll come back with a fixed price.",
    primaryLabel: "Get a free quote",
    primaryHref: "#contact",
    secondaryLabel: "Call (555) 018 2244",
    secondaryHref: "tel:5550182244"
  })));
}
Object.assign(window, {
  PricingScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PricingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ServicesScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Icon,
  Badge,
  Card,
  SectionHeading,
  ServiceCard,
  Tag,
  TrustBar,
  CTABanner,
  FAQItem
} = window.MainstayDesignSystem_eaeaf9;
function ServicesScreen({
  go
}) {
  const [filter, setFilter] = React.useState("All");
  const groups = {
    All: SERVICES,
    Trades: SERVICES.slice(0, 6),
    Professional: SERVICES.slice(6)
  };
  const list = groups[filter] || SERVICES;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-sunken)",
      paddingBlock: "var(--space-11) var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Services",
    title: "Everything we cover",
    as: "h1",
    lead: "Eight service lines, one team, one invoice. Prices shown are typical starting points \u2014 you get a fixed quote before work begins."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      marginTop: "var(--space-8)"
    }
  }, Object.keys(groups).map(g => /*#__PURE__*/React.createElement(Tag, {
    key: g,
    selected: filter === g,
    onSelect: () => setFilter(g)
  }, g))))), /*#__PURE__*/React.createElement("section", {
    style: {
      paddingBlock: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--space-5)"
    }
  }, list.map(s => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: s.title
  }, s, {
    href: "#services",
    cta: "What's included"
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-sunken)",
      paddingBlock: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-13)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Emergency cover",
    title: "Out of hours, still answered",
    lead: "Burst pipe at midnight, no power on a Sunday \u2014 the phone rings through to an on-call engineer, not a voicemail."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement(TrustBar, {
    items: [{
      label: "24/7 phone line",
      icon: "phone"
    }, {
      label: "90-minute target arrival",
      icon: "clock"
    }, {
      label: "Flat $210 night rate",
      icon: "credit-card"
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      marginTop: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconLeft: "phone",
    href: "tel:5550182244"
  }, "Call the emergency line"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    onClick: () => go("#contact")
  }, "Book a normal slot"))), /*#__PURE__*/React.createElement(Photo, {
    label: "Photo \u2014 night callout, engineer with a head torch under a sink",
    height: 340
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      paddingBlock: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      display: "grid",
      gridTemplateColumns: ".8fr 1.2fr",
      gap: "var(--space-13)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Service detail",
    title: "What a typical visit includes"
  }), /*#__PURE__*/React.createElement("div", null, [["Is the quote really fixed?", "Yes. If the job turns out to be bigger, we stop and re-quote before continuing — you always approve the number first."], ["Do you supply parts?", "We carry common parts on the van. Anything ordered in is charged at cost plus 10%, shown on the quote."], ["What's your guarantee?", "12 months on labour, plus whatever the manufacturer gives on parts."]].map(([q, a], i) => /*#__PURE__*/React.createElement(FAQItem, {
    key: q,
    question: q,
    answer: a,
    defaultOpen: i === 0
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "ms-container",
    style: {
      paddingBottom: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement(CTABanner, {
    tone: "accent",
    title: "Not sure which service you need?",
    lead: "Describe the problem and we'll tell you who to send.",
    primaryLabel: "Get a free quote",
    primaryHref: "#contact",
    secondaryLabel: "Call (555) 018 2244",
    secondaryHref: "tel:5550182244"
  })));
}
Object.assign(window, {
  ServicesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ServicesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/shared.jsx
try { (() => {
const {
  Button,
  Icon,
  Badge,
  Card,
  SectionHeading,
  TrustBar,
  Stars
} = window.MainstayDesignSystem_eaeaf9;

// Neutral placeholder standing in for a real photograph. No stock imagery ships
// with this system — replace each Photo with the business's own picture.
function Photo({
  label,
  height = 320,
  radius = "var(--radius-lg)",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      borderRadius: radius,
      background: "var(--n-100)",
      border: "1px solid var(--border-subtle)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 20,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 13px/1.5 var(--font-core)",
      color: "var(--n-400)",
      maxWidth: "28ch"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 18,
    style: {
      margin: "0 auto 8px",
      opacity: .5
    }
  }), label));
}
function Section({
  children,
  tone = "page",
  id,
  py
}) {
  const bg = {
    page: "var(--surface-page)",
    sunken: "var(--surface-sunken)",
    accent: "var(--surface-accent-soft)"
  }[tone];
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      background: bg,
      paddingBlock: py || "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-container"
  }, children));
}
const SERVICES = [{
  icon: "droplets",
  title: "Plumbing",
  description: "Leaks, blockages, tap and bathroom fits.",
  price: "From $89"
}, {
  icon: "thermometer",
  title: "Heating & boilers",
  description: "Repairs, servicing and gas safety checks.",
  price: "From $120"
}, {
  icon: "plug-zap",
  title: "Electrical",
  description: "Faults, rewires, sockets and EV chargers.",
  price: "From $95"
}, {
  icon: "hammer",
  title: "Carpentry & repairs",
  description: "Doors, decking, flooring, general joinery.",
  price: "From $75"
}, {
  icon: "paint-roller",
  title: "Decorating",
  description: "Interior and exterior, day or fixed rate.",
  price: "From $240/day"
}, {
  icon: "leaf",
  title: "Grounds & drainage",
  description: "Gutters, drains, patios and clearance.",
  price: "From $110"
}, {
  icon: "scale",
  title: "Property legals",
  description: "Conveyancing and landlord compliance.",
  price: "Fixed fee"
}, {
  icon: "calculator",
  title: "Accounts & tax",
  description: "Bookkeeping and self-assessment for trades.",
  price: "From $60/mo"
}];
const REVIEWS = [{
  quote: "Called at nine, fixed by noon, and the price was the price. No fuss.",
  name: "Dana R.",
  meta: "Ashbourne · Boiler repair"
}, {
  quote: "They quoted three jobs, did two the same week and booked the third around my shifts.",
  name: "Marcus O.",
  meta: "Redhill · Electrical"
}, {
  quote: "Turned up when they said. Cleaned up after. That's all I want from a trade.",
  name: "Priya S.",
  meta: "Kingsmoor · Bathroom fit"
}, {
  quote: "Our office had a leak on a Sunday. Someone answered the phone and came out.",
  name: "Tom H.",
  meta: "Carlow · Commercial"
}];
const AREAS = ["Ashbourne", "Redhill", "Carlow", "Kingsmoor", "Peveril", "Great Hale", "Stanton", "Newbridge"];
Object.assign(window, {
  Photo,
  Section,
  SERVICES,
  REVIEWS,
  AREAS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.ICON_PATHS = __ds_scope.ICON_PATHS;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.CTABanner = __ds_scope.CTABanner;

__ds_ns.FAQItem = __ds_scope.FAQItem;

__ds_ns.PricingCard = __ds_scope.PricingCard;

__ds_ns.QuoteForm = __ds_scope.QuoteForm;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.Stars = __ds_scope.Stars;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

__ds_ns.TrustBar = __ds_scope.TrustBar;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
