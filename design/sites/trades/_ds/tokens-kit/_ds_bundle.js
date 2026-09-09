/* @ds-bundle: {"format":4,"namespace":"GoodworkDesignSystem_fee824","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"ICONS","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Toast","sourcePath":"components/feedback/Alert.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Input.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"AvatarCluster","sourcePath":"components/marketing/AvatarCluster.jsx"},{"name":"ContactBar","sourcePath":"components/marketing/ContactBar.jsx"},{"name":"FAQItem","sourcePath":"components/marketing/FAQItem.jsx"},{"name":"HoursTable","sourcePath":"components/marketing/HoursTable.jsx"},{"name":"MediaFrame","sourcePath":"components/marketing/MediaFrame.jsx"},{"name":"PlanCard","sourcePath":"components/marketing/PlanCard.jsx"},{"name":"ProcessSteps","sourcePath":"components/marketing/ProcessSteps.jsx"},{"name":"PromoBar","sourcePath":"components/marketing/PromoBar.jsx"},{"name":"Rating","sourcePath":"components/marketing/Rating.jsx"},{"name":"ServiceCard","sourcePath":"components/marketing/ServiceCard.jsx"},{"name":"StatBand","sourcePath":"components/marketing/StatBand.jsx"},{"name":"StatBlock","sourcePath":"components/marketing/StatBlock.jsx"},{"name":"TrustRow","sourcePath":"components/marketing/StatBlock.jsx"},{"name":"TestimonialCard","sourcePath":"components/marketing/TestimonialCard.jsx"},{"name":"StepIndicator","sourcePath":"components/navigation/StepIndicator.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"a77bc727b8f3","components/core/Button.jsx":"ddb961528fcf","components/core/Card.jsx":"175b9f5e825c","components/core/Icon.jsx":"fed9f354da4f","components/core/IconButton.jsx":"b35a6f1bb011","components/core/Tag.jsx":"7762cae33ebf","components/feedback/Alert.jsx":"fc327a1ada9c","components/feedback/Dialog.jsx":"cfa57cb9d847","components/feedback/Tooltip.jsx":"92eaa2db04dd","components/forms/Checkbox.jsx":"0dfa005acdda","components/forms/Input.jsx":"35ae81cb87de","components/forms/Radio.jsx":"3788a1044bf1","components/forms/Select.jsx":"f30d58456a8e","components/forms/Switch.jsx":"fddfa3c01668","components/marketing/AvatarCluster.jsx":"ce241a271067","components/marketing/ContactBar.jsx":"05fc134c5e0f","components/marketing/FAQItem.jsx":"a333c7f650bc","components/marketing/HoursTable.jsx":"f2ad9f7369d5","components/marketing/MediaFrame.jsx":"f5696c47038b","components/marketing/PlanCard.jsx":"7dad925eaab8","components/marketing/ProcessSteps.jsx":"71c14012022f","components/marketing/PromoBar.jsx":"c71dda8f2979","components/marketing/Rating.jsx":"4805f8bea567","components/marketing/ServiceCard.jsx":"c75cdbf54b74","components/marketing/StatBand.jsx":"d80795643f9d","components/marketing/StatBlock.jsx":"f9b7813eb236","components/marketing/TestimonialCard.jsx":"4642d15e6319","components/navigation/StepIndicator.jsx":"622433ed3a39","components/navigation/Tabs.jsx":"2f38485f8ad6","ui_kits/jobs_app/AppShell.jsx":"c25733bcab31","ui_kits/jobs_app/Screens.jsx":"6354c9c85b99","ui_kits/website/BookingFlow.jsx":"e0155a44a317","ui_kits/website/Chrome.jsx":"6df45636f012","ui_kits/website/Sections.jsx":"f60bfd245141","ui_kits/website_studio/StudioChrome.jsx":"9a7ab7439331","ui_kits/website_studio/StudioSections.jsx":"b07a848e6b38"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GoodworkDesignSystem_fee824 = window.GoodworkDesignSystem_fee824 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  neutral: {
    background: "var(--ink-100)",
    color: "var(--text-body)"
  },
  brand: {
    background: "var(--surface-brand-soft)",
    color: "var(--text-brand)"
  },
  accent: {
    background: "var(--surface-accent-soft)",
    color: "var(--text-accent)"
  },
  positive: {
    background: "var(--status-positive-bg)",
    color: "var(--status-positive)"
  },
  caution: {
    background: "var(--status-caution-bg)",
    color: "var(--status-caution)"
  },
  critical: {
    background: "var(--status-critical-bg)",
    color: "var(--status-critical)"
  },
  info: {
    background: "var(--status-info-bg)",
    color: "var(--status-info)"
  }
};
function Badge({
  children,
  tone = "neutral",
  dot = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "4px 10px",
      borderRadius: "var(--radius-badge)",
      font: "var(--type-label)",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      ...tones[tone],
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor"
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  font: "var(--type-button)",
  letterSpacing: "0.005em",
  borderRadius: "var(--radius-control)",
  border: "var(--border-hairline) solid transparent",
  cursor: "pointer",
  textDecoration: "none",
  transition: "var(--transition-control), transform var(--dur-instant) var(--ease-standard)",
  whiteSpace: "nowrap",
  userSelect: "none"
};
const sizes = {
  sm: {
    minHeight: "var(--control-h-sm)",
    padding: "var(--pad-control-sm)",
    fontSize: "13px"
  },
  md: {
    minHeight: "var(--control-h)",
    padding: "var(--pad-control)"
  },
  lg: {
    minHeight: "var(--control-h-lg)",
    padding: "var(--pad-control-lg)",
    fontSize: "var(--size-body)"
  }
};
const variants = {
  primary: {
    background: "var(--surface-brand)",
    color: "var(--text-inverse)",
    borderColor: "var(--blue-800)"
  },
  accent: {
    background: "var(--surface-accent)",
    color: "var(--text-on-accent)",
    borderColor: "var(--accent-900)"
  },
  secondary: {
    background: "var(--surface-card)",
    color: "var(--text-strong)",
    borderColor: "var(--line-strong)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-brand)",
    borderColor: "transparent"
  },
  danger: {
    background: "var(--critical-500)",
    color: "var(--text-inverse)",
    borderColor: "var(--critical-600)"
  }
};
const hovers = {
  primary: {
    background: "var(--blue-600)"
  },
  accent: {
    background: "var(--accent-700)"
  },
  secondary: {
    background: "var(--ink-50)",
    borderColor: "var(--ink-400)"
  },
  ghost: {
    background: "var(--surface-brand-soft)"
  },
  danger: {
    background: "var(--critical-600)"
  }
};
function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  href,
  iconLeft,
  iconRight,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = href ? "a" : "button";
  const css = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(hover && !disabled ? hovers[variant] : null),
    ...(press && !disabled ? {
      transform: "translateY(var(--press-translate))",
      boxShadow: "var(--shadow-inset-press)"
    } : null),
    ...(disabled ? {
      opacity: 0.45,
      cursor: "not-allowed"
    } : null),
    width: block ? "100%" : undefined,
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    type: href ? undefined : type,
    onClick: disabled ? undefined : onClick,
    "aria-disabled": disabled || undefined,
    disabled: !href && disabled ? true : undefined,
    style: css,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  children,
  padding = "md",
  elevation = "sm",
  accent = false,
  as = "div",
  style,
  ...rest
}) {
  const Tag = as;
  const pads = {
    none: 0,
    sm: "var(--space-5)",
    md: "var(--pad-card)",
    lg: "var(--pad-card-lg)"
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      background: "var(--surface-card)",
      border: "var(--border-hairline) solid var(--line-hairline)",
      borderRadius: "var(--radius-card)",
      padding: pads[padding],
      boxShadow: elevation === "none" ? "none" : `var(--shadow-${elevation})`,
      borderTop: accent ? "3px solid var(--surface-accent)" : undefined,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Icon set: Lucide (lucide.dev, ISC). Inner markup copied verbatim from
// lucide-icons/lucide@main icons/*.svg; the same files live in assets/icons/.
const ICONS = {
  "arrow-right": "<path d=\"M5 12h14\"></path> <path d=\"m12 5 7 7-7 7\"></path>",
  "arrow-up-right": "<path d=\"M7 7h10v10\"></path> <path d=\"M7 17 17 7\"></path>",
  "badge-check": "<path d=\"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z\"></path> <path d=\"m9 12 2 2 4-4\"></path>",
  "calendar-check": "<path d=\"M8 2v3\"></path> <path d=\"M16 2v3\"></path> <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"></rect> <path d=\"M3 9h18\"></path> <path d=\"m9 15 2 2 4-4\"></path>",
  "calendar": "<path d=\"M8 2v3\"></path> <path d=\"M16 2v3\"></path> <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"></rect> <path d=\"M3 9h18\"></path>",
  "camera": "<path d=\"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z\"></path> <circle cx=\"12\" cy=\"13\" r=\"3\"></circle>",
  "check": "<path d=\"M20 6 9 17l-5-5\"></path>",
  "chevron-down": "<path d=\"m6 9 6 6 6-6\"></path>",
  "chevron-left": "<path d=\"m15 18-6-6 6-6\"></path>",
  "chevron-right": "<path d=\"m9 18 6-6-6-6\"></path>",
  "circle-check": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle> <path d=\"m9 12 2 2 4-4\"></path>",
  "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle> <path d=\"M12 6v6l4 2\"></path>",
  "credit-card": "<rect width=\"20\" height=\"14\" x=\"2\" y=\"5\" rx=\"2\"></rect> <line x1=\"2\" x2=\"22\" y1=\"10\" y2=\"10\"></line>",
  "external-link": "<path d=\"M15 3h6v6\"></path> <path d=\"M10 14 21 3\"></path> <path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path>",
  "file-text": "<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"></path> <path d=\"M14 2v5a1 1 0 0 0 1 1h5\"></path> <path d=\"M10 9H8\"></path> <path d=\"M16 13H8\"></path> <path d=\"M16 17H8\"></path>",
  "hammer": "<path d=\"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9\"></path> <path d=\"m18 15 4-4\"></path> <path d=\"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5\"></path>",
  "image": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\"></rect> <circle cx=\"9\" cy=\"9\" r=\"2\"></circle> <path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\"></path>",
  "info": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle> <path d=\"M12 16v-4\"></path> <path d=\"M12 8h.01\"></path>",
  "leaf": "<path d=\"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z\"></path> <path d=\"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12\"></path>",
  "mail": "<path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\"></path> <rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"></rect>",
  "map-pin": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"></path> <circle cx=\"12\" cy=\"10\" r=\"3\"></circle>",
  "menu": "<path d=\"M4 5h16\"></path> <path d=\"M4 12h16\"></path> <path d=\"M4 19h16\"></path>",
  "message-square": "<path d=\"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z\"></path>",
  "minus": "<path d=\"M5 12h14\"></path>",
  "paintbrush": "<path d=\"m14.622 17.897-10.68-2.913\"></path> <path d=\"M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z\"></path> <path d=\"M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15\"></path>",
  "phone": "<path d=\"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384\"></path>",
  "plus": "<path d=\"M5 12h14\"></path> <path d=\"M12 5v14\"></path>",
  "quote": "<path d=\"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\"></path> <path d=\"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\"></path>",
  "search": "<path d=\"m21 21-4.34-4.34\"></path> <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>",
  "shield-check": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"></path> <path d=\"m9 12 2 2 4-4\"></path>",
  "sparkles": "<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"></path> <path d=\"M20 2v4\"></path> <path d=\"M22 4h-4\"></path> <circle cx=\"4\" cy=\"20\" r=\"2\"></circle>",
  "star": "<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\"></path>",
  "thumbs-up": "<path d=\"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z\"></path> <path d=\"M7 10v12\"></path>",
  "triangle-alert": "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"></path> <path d=\"M12 9v4\"></path> <path d=\"M12 17h.01\"></path>",
  "truck": "<path d=\"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2\"></path> <path d=\"M15 18H9\"></path> <path d=\"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14\"></path> <circle cx=\"17\" cy=\"18\" r=\"2\"></circle> <circle cx=\"7\" cy=\"18\" r=\"2\"></circle>",
  "user": "<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\"></path> <circle cx=\"12\" cy=\"7\" r=\"4\"></circle>",
  "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"></path> <path d=\"M16 3.128a4 4 0 0 1 0 7.744\"></path> <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"></path> <circle cx=\"9\" cy=\"7\" r=\"4\"></circle>",
  "wrench": "<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z\"></path>",
  "x": "<path d=\"M18 6 6 18\"></path> <path d=\"m6 6 12 12\"></path>",
  "zap": "<path d=\"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z\"></path>"
};
function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  color = "currentColor",
  label,
  style,
  ...rest
}) {
  const inner = ICONS[name];
  if (!inner) {
    if (typeof console !== "undefined") console.warn("Icon: unknown name " + name);
    return null;
  }
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    role: label ? "img" : "presentation",
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    style: {
      display: "block",
      flex: "none",
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: inner
    }
  }, rest));
}
Object.assign(__ds_scope, { ICONS, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: 30,
  md: 38,
  lg: 46
};
const glyph = {
  sm: 16,
  md: 18,
  lg: 20
};
function IconButton({
  name,
  label,
  size = "md",
  variant = "secondary",
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const tone = {
    secondary: {
      background: "var(--surface-card)",
      border: "var(--border-hairline) solid var(--line-strong)",
      color: "var(--text-strong)"
    },
    ghost: {
      background: "transparent",
      border: "var(--border-hairline) solid transparent",
      color: "var(--text-body)"
    },
    brand: {
      background: "var(--surface-brand)",
      border: "var(--border-hairline) solid var(--blue-800)",
      color: "var(--text-inverse)"
    }
  }[variant];
  const hoverTone = {
    secondary: {
      background: "var(--ink-50)"
    },
    ghost: {
      background: "var(--ink-100)"
    },
    brand: {
      background: "var(--blue-600)"
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: sizes[size],
      height: sizes[size],
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-control)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "var(--transition-control)",
      opacity: disabled ? 0.45 : 1,
      ...tone,
      ...(hover && !disabled ? hoverTone : null),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: glyph[size]
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  children,
  icon,
  onRemove,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "5px 10px",
      border: "var(--border-hairline) solid var(--line-hairline)",
      background: "var(--surface-card)",
      borderRadius: "var(--radius-control)",
      font: "var(--type-body-sm)",
      color: "var(--text-body)",
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14,
    color: "var(--text-muted)"
  }) : null, children, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Remove",
    onClick: onRemove,
    style: {
      border: 0,
      background: "none",
      padding: 0,
      cursor: "pointer",
      color: "var(--text-faint)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 13
  })) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const tones = {
  positive: {
    icon: "circle-check",
    color: "var(--status-positive)",
    bg: "var(--status-positive-bg)"
  },
  caution: {
    icon: "triangle-alert",
    color: "var(--status-caution)",
    bg: "var(--status-caution-bg)"
  },
  critical: {
    icon: "triangle-alert",
    color: "var(--status-critical)",
    bg: "var(--status-critical-bg)"
  },
  info: {
    icon: "info",
    color: "var(--status-info)",
    bg: "var(--status-info-bg)"
  }
};
function Alert({
  tone = "info",
  title,
  children,
  style
}) {
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      gap: "var(--space-4)",
      padding: "var(--space-5)",
      background: t.bg,
      border: `var(--border-hairline) solid ${t.color}`,
      borderRadius: "var(--radius-card)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 18,
    color: t.color,
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "3px"
    }
  }, title ? /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-semibold) var(--size-body-sm)/1.4 var(--font-core)",
      color: "var(--text-strong)"
    }
  }, title) : null, children ? /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-body)"
    }
  }, children) : null));
}
function Toast({
  tone = "positive",
  message,
  action,
  onClose,
  style
}) {
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      padding: "12px 14px",
      background: "var(--surface-inverse)",
      color: "var(--text-inverse)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-lg)",
      font: "var(--type-body-sm)",
      maxWidth: 420,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 17,
    color: tone === "positive" ? "var(--blue-300)" : "var(--ink-300)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, message), action, onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Dismiss",
    onClick: onClose,
    style: {
      background: "none",
      border: 0,
      cursor: "pointer",
      color: "var(--ink-300)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 15
  })) : null);
}
Object.assign(__ds_scope, { Alert, Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open = true,
  title,
  description,
  children,
  footer,
  onClose,
  width = 480
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title,
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--surface-overlay)",
      backdropFilter: "var(--overlay-blur)",
      display: "grid",
      placeItems: "center",
      padding: "var(--space-7)",
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface-card)",
      borderRadius: "var(--radius-sheet)",
      boxShadow: "var(--shadow-lg)",
      border: "var(--border-hairline) solid var(--line-hairline)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--space-5)",
      padding: "var(--space-7) var(--space-7) var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "6px"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h3)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)",
      margin: 0
    }
  }, description) : null), onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Close",
    onClick: onClose,
    style: {
      marginLeft: "auto",
      background: "none",
      border: 0,
      cursor: "pointer",
      color: "var(--text-faint)",
      display: "flex",
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 18
  })) : null), children ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--space-7) var(--space-7)",
      font: "var(--type-body)",
      color: "var(--text-body)"
    }
  }, children) : null, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "var(--space-3)",
      padding: "var(--space-5) var(--space-7)",
      borderTop: "var(--border-hairline) solid var(--line-hairline)",
      background: "var(--ink-50)"
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  children,
  placement = "top",
  style
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...pos,
      whiteSpace: "nowrap",
      pointerEvents: "none",
      padding: "5px 9px",
      borderRadius: "var(--radius-xs)",
      background: "var(--surface-inverse)",
      color: "var(--text-inverse)",
      font: "var(--type-caption)",
      boxShadow: "var(--shadow-md)",
      opacity: show ? 1 : 0,
      transition: "opacity var(--dur-fast) var(--ease-standard)",
      zIndex: 20
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  const controlled = checked !== undefined;
  const [on, setOn] = React.useState(!!defaultChecked);
  const value = controlled ? checked : on;
  const toggle = () => {
    if (disabled) return;
    if (!controlled) setOn(!value);
    onChange && onChange(!value);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      font: "var(--type-body)",
      color: "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: value,
    onChange: toggle,
    disabled: disabled,
    style: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 19,
      height: 19,
      flex: "none",
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-xs)",
      transition: "var(--transition-control)",
      background: value ? "var(--surface-brand)" : "var(--surface-card)",
      border: `var(--border-strong) solid ${value ? "var(--blue-700)" : "var(--line-strong)"}`
    }
  }, value ? /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "13",
    height: "13",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })) : null), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const fieldShell = {
  width: "100%",
  minHeight: "var(--control-h)",
  padding: "var(--pad-control)",
  font: "var(--type-body)",
  color: "var(--text-strong)",
  background: "var(--surface-card)",
  border: "var(--border-hairline) solid var(--line-strong)",
  borderRadius: "var(--radius-input)",
  transition: "var(--transition-control)",
  outline: "none"
};
function Field({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      display: "grid",
      gap: "6px",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--status-critical)"
    }
  }, " *") : null) : null, children, error ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--status-critical)"
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, hint) : null);
}
function Input({
  invalid = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...fieldShell,
      borderColor: invalid ? "var(--status-critical)" : focus ? "var(--line-brand)" : "var(--line-strong)",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      ...style
    }
  }, rest));
}
function Textarea({
  rows = 4,
  invalid = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...fieldShell,
      minHeight: "auto",
      lineHeight: "var(--lh-body)",
      resize: "vertical",
      borderColor: invalid ? "var(--status-critical)" : focus ? "var(--line-brand)" : "var(--line-strong)",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Field, Input, Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      font: "var(--type-body)",
      color: "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: () => onChange && onChange(value),
    style: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 19,
      height: 19,
      flex: "none",
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      background: "var(--surface-card)",
      transition: "var(--transition-control)",
      border: `var(--border-strong) solid ${checked ? "var(--blue-700)" : "var(--line-strong)"}`
    }
  }, checked ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: "var(--surface-brand)"
    }
  }) : null), label);
}
function RadioGroup({
  name,
  options = [],
  value,
  onChange,
  direction = "vertical",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: direction === "vertical" ? "column" : "row",
      gap: direction === "vertical" ? "var(--space-4)" : "var(--space-6)",
      ...style
    }
  }, options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement(Radio, {
      key: v,
      name: name,
      value: v,
      label: l,
      checked: value === v,
      onChange: onChange
    });
  }));
}
Object.assign(__ds_scope, { Radio, RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  options = [],
  placeholder,
  invalid = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      minHeight: "var(--control-h)",
      padding: "var(--pad-control)",
      paddingRight: "38px",
      font: "var(--type-body)",
      color: "var(--text-strong)",
      background: "var(--surface-card)",
      border: `var(--border-hairline) solid ${invalid ? "var(--status-critical)" : focus ? "var(--line-brand)" : "var(--line-strong)"}`,
      borderRadius: "var(--radius-input)",
      boxShadow: focus ? "var(--ring-focus)" : "none",
      appearance: "none",
      outline: "none",
      transition: "var(--transition-control)"
    }
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder) : null, options.map(o => {
    const value = typeof o === "string" ? o : o.value;
    const label = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, label);
  })), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "16",
    height: "16",
    fill: "none",
    stroke: "var(--text-muted)",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: 13,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style
}) {
  const controlled = checked !== undefined;
  const [on, setOn] = React.useState(!!defaultChecked);
  const value = controlled ? checked : on;
  const toggle = () => {
    if (disabled) return;
    if (!controlled) setOn(!value);
    onChange && onChange(!value);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      font: "var(--type-body)",
      color: "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": value,
    onClick: toggle,
    disabled: disabled,
    style: {
      width: 40,
      height: 23,
      padding: 2,
      flex: "none",
      cursor: "inherit",
      borderRadius: "var(--radius-pill)",
      transition: "var(--transition-control)",
      background: value ? "var(--surface-brand)" : "var(--ink-200)",
      border: `var(--border-hairline) solid ${value ? "var(--blue-800)" : "var(--line-strong)"}`,
      display: "flex",
      justifyContent: value ? "flex-end" : "flex-start",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 17,
      height: 17,
      borderRadius: "50%",
      background: "var(--white)",
      boxShadow: "var(--shadow-xs)"
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/marketing/AvatarCluster.jsx
try { (() => {
/* Overlapping avatar cluster + rating line — the social-proof chip that sits under
   or over a hero. No photography ships with the template, so avatars render as
   tinted initial discs until real headshots are supplied via `src`. */
function AvatarCluster({
  people = [],
  rating,
  count,
  label,
  tone = "default",
  size = 34,
  style
}) {
  const onBrand = tone === "on-brand";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-4)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    }
  }, people.map((p, i) => {
    const initials = typeof p === "string" ? p : p.initials;
    const src = typeof p === "string" ? null : p.src;
    return /*#__PURE__*/React.createElement("span", {
      key: initials + i,
      title: initials,
      style: {
        width: size,
        height: size,
        borderRadius: "50%",
        marginLeft: i ? -size * 0.32 : 0,
        border: `2px solid ${onBrand ? "var(--surface-brand)" : "var(--surface-card)"}`,
        background: src ? `center/cover url(${src})` : "var(--surface-sunken)",
        color: "var(--text-body)",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        font: "var(--weight-bold) 11px/1 var(--font-core)",
        zIndex: people.length - i
      }
    }, src ? null : initials);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      gap: 2
    }
  }, rating !== undefined ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "star",
    size: 14,
    strokeWidth: 1.5,
    color: onBrand ? "var(--star-on-brand)" : "var(--star-filled)",
    style: {
      fill: onBrand ? "var(--star-on-brand)" : "var(--star-filled)"
    }
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-bold) var(--size-body-sm)/1 var(--font-core)",
      color: onBrand ? "var(--white)" : "var(--text-strong)"
    }
  }, rating)) : null, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      color: onBrand ? "var(--blue-100)" : "var(--text-muted)"
    }
  }, label) : null, count !== undefined && !label ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      color: onBrand ? "var(--blue-100)" : "var(--text-muted)"
    }
  }, count, " verified reviews") : null));
}
Object.assign(__ds_scope, { AvatarCluster });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/AvatarCluster.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ContactBar.jsx
try { (() => {
function ContactBar({
  phone,
  email,
  area,
  hours,
  tone = "brand",
  style
}) {
  const dark = tone === "brand";
  const items = [phone && {
    icon: "phone",
    text: phone,
    href: "tel:" + phone.replace(/[^\d+]/g, "")
  }, email && {
    icon: "mail",
    text: email,
    href: "mailto:" + email
  }, area && {
    icon: "map-pin",
    text: area
  }, hours && {
    icon: "clock",
    text: hours
  }].filter(Boolean);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "var(--space-7)",
      padding: "10px var(--gutter)",
      font: "var(--type-body-sm)",
      background: dark ? "var(--surface-brand)" : "var(--surface-sunken)",
      color: dark ? "var(--blue-100)" : "var(--text-body)",
      ...style
    }
  }, items.map(i => {
    const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: i.icon,
      size: 15,
      color: dark ? "var(--blue-200)" : "var(--text-muted)"
    }), i.text);
    return i.href ? /*#__PURE__*/React.createElement("a", {
      key: i.text,
      href: i.href,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        color: "inherit",
        textDecoration: "none"
      }
    }, inner) : /*#__PURE__*/React.createElement("span", {
      key: i.text,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "7px"
      }
    }, inner);
  }));
}
Object.assign(__ds_scope, { ContactBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ContactBar.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FAQItem.jsx
try { (() => {
function FAQItem({
  question,
  answer,
  defaultOpen = false,
  style
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "var(--border-hairline) solid var(--line-hairline)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-expanded": open,
    onClick: () => setOpen(!open),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      padding: "var(--space-5) 0",
      background: "none",
      border: 0,
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: "var(--weight-semibold) var(--size-body-lg)/1.4 var(--font-core)",
      color: "var(--text-strong)"
    }
  }, question), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18,
    color: "var(--text-muted)",
    style: {
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform var(--dur-base) var(--ease-standard)"
    }
  })), open ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      margin: 0,
      padding: "0 0 var(--space-6)",
      maxWidth: "var(--container-text)"
    }
  }, answer) : null);
}
Object.assign(__ds_scope, { FAQItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/FAQItem.jsx", error: String((e && e.message) || e) }); }

// components/marketing/HoursTable.jsx
try { (() => {
function HoursTable({
  rows = [],
  todayIndex,
  tone = "light",
  style
}) {
  const onBrand = tone === "on-brand";
  return /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      font: "var(--type-body-sm)",
      color: onBrand ? "inherit" : "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => {
    const today = i === todayIndex;
    return /*#__PURE__*/React.createElement("tr", {
      key: r.day,
      style: {
        borderBottom: `var(--border-hairline) solid ${onBrand ? "rgba(255,255,255,.18)" : "var(--line-hairline)"}`,
        background: today ? onBrand ? "rgba(255,255,255,.10)" : "var(--surface-accent-soft)" : "transparent"
      }
    }, /*#__PURE__*/React.createElement("th", {
      scope: "row",
      style: {
        textAlign: "left",
        padding: "9px 10px",
        font: today ? "var(--weight-semibold) var(--size-body-sm)/1.4 var(--font-core)" : "var(--type-body-sm)",
        color: onBrand ? "var(--white)" : "var(--text-strong)"
      }
    }, r.day), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: "right",
        padding: "9px 10px",
        color: r.hours === "Closed" ? onBrand ? "rgba(255,255,255,.55)" : "var(--text-faint)" : "inherit"
      }
    }, r.hours));
  })));
}
Object.assign(__ds_scope, { HoursTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/HoursTable.jsx", error: String((e && e.message) || e) }); }

// components/marketing/MediaFrame.jsx
try { (() => {
/* Photo slot. This design system ships no photography, so MediaFrame renders a
   labelled placeholder until a real `src` is supplied. */
function MediaFrame({
  src,
  alt = "",
  label = "Photo",
  ratio = "4 / 3",
  radius = "var(--radius-media)",
  overlay = false,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: ratio,
      borderRadius: radius,
      overflow: "hidden",
      background: "var(--ink-100)",
      border: "var(--border-hairline) solid var(--line-hairline)",
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "grid",
      placeItems: "center",
      gap: "8px",
      alignContent: "center",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "image",
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase"
    }
  }, label)), overlay ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-media)"
    }
  }) : null, children ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0
    }
  }, children) : null);
}
Object.assign(__ds_scope, { MediaFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/MediaFrame.jsx", error: String((e && e.message) || e) }); }

// components/marketing/PlanCard.jsx
try { (() => {
function PlanCard({
  price,
  period = "per month",
  title,
  description,
  perks = [],
  footnote,
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: ".72fr 1.28fr",
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      border: "var(--border-hairline) solid var(--line-hairline)",
      boxShadow: "var(--shadow-sm)",
      background: "var(--surface-card)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-brand-deep)",
      color: "var(--white)",
      display: "grid",
      alignContent: "center",
      justifyItems: "center",
      gap: "2px",
      padding: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-black) 34px/1 var(--font-core)",
      letterSpacing: "var(--track-display)"
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--blue-200)"
    }
  }, period), footnote ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      color: "var(--blue-300)",
      marginTop: 6,
      textAlign: "center"
    }
  }, footnote) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-7)",
      display: "grid",
      gap: "var(--space-4)",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h3)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-body)",
      margin: 0
    }
  }, description) : null, /*#__PURE__*/React.createElement("ul", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-4) var(--space-6)",
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, perks.map(p => /*#__PURE__*/React.createElement("li", {
    key: p,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      font: "var(--weight-semibold) var(--size-body-sm)/1.3 var(--font-core)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 15,
    strokeWidth: 2.5,
    color: "var(--blue-600)"
  }), p))), action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)"
    }
  }, action) : null));
}
Object.assign(__ds_scope, { PlanCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/PlanCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ProcessSteps.jsx
try { (() => {
/* Numbered "how it works" steps. layout="cards" gives each step a photo slot
   (the bold page style); layout="rows" is a compact numbered list (the calm style). */
function ProcessSteps({
  steps = [],
  layout = "cards",
  style
}) {
  if (layout === "rows") {
    return /*#__PURE__*/React.createElement("ol", {
      style: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "grid",
        gap: "var(--space-5)",
        ...style
      }
    }, steps.map((s, i) => /*#__PURE__*/React.createElement("li", {
      key: s.title,
      style: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "var(--space-5)",
        alignItems: "start",
        paddingBottom: "var(--space-5)",
        borderBottom: i < steps.length - 1 ? "var(--border-hairline) solid var(--line-hairline)" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--weight-black) 20px/1 var(--font-core)",
        letterSpacing: "var(--track-heading)",
        color: "var(--text-muted)",
        width: 28
      }
    }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "grid",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        font: "var(--type-h4)",
        color: "var(--text-strong)"
      }
    }, s.title), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-body-sm)",
        color: "var(--text-body)"
      }
    }, s.body)))));
  }
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "grid",
      gridTemplateColumns: `repeat(${Math.max(steps.length, 1)}, 1fr)`,
      gap: "var(--space-5)",
      ...style
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s.title,
    style: {
      display: "grid",
      gap: "var(--space-4)",
      padding: "var(--space-5)",
      background: "var(--surface-card)",
      border: "var(--border-hairline) solid var(--line-hairline)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: "var(--radius-sm)",
      background: "var(--accent-800)",
      color: "var(--white)",
      display: "grid",
      placeItems: "center",
      font: "var(--weight-black) 12px/1 var(--font-core)"
    }
  }, String(i + 1).padStart(2, "0")), s.badge ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      background: "var(--surface-sunken)",
      color: "var(--text-body)",
      padding: "3px 8px",
      borderRadius: "var(--radius-pill)"
    }
  }, s.badge) : null), s.image !== undefined ? /*#__PURE__*/React.createElement(__ds_scope.MediaFrame, {
    ratio: "16 / 10",
    label: s.imageLabel || "Photo",
    radius: "var(--radius-sm)"
  }) : null, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--type-h4)",
      color: "var(--text-strong)"
    }
  }, s.title), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-body)"
    }
  }, s.body))));
}
Object.assign(__ds_scope, { ProcessSteps });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ProcessSteps.jsx", error: String((e && e.message) || e) }); }

// components/marketing/PromoBar.jsx
try { (() => {
function PromoBar({
  message,
  ctaLabel,
  href = "#",
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      flexWrap: "wrap",
      padding: "10px var(--gutter)",
      background: "var(--surface-accent)",
      color: "var(--text-on-accent)",
      font: "var(--weight-bold) var(--size-body-sm)/1.3 var(--font-core)",
      textAlign: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", null, message), ctaLabel ? /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      color: "var(--text-on-accent)",
      textDecorationThickness: 2,
      textUnderlineOffset: 3
    }
  }, ctaLabel, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 15,
    strokeWidth: 2.25
  })) : null);
}
Object.assign(__ds_scope, { PromoBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/PromoBar.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Rating.jsx
try { (() => {
/* Stars use their own tokens, not the accent — the accent is too light to read on white.
   Pass tone="on-brand" when the rating sits on a blue band. */
function Rating({
  value = 5,
  count,
  size = 16,
  showValue = false,
  tone = "default",
  style
}) {
  const full = Math.round(value);
  const onBrand = tone === "on-brand";
  const filled = onBrand ? "var(--star-on-brand)" : "var(--star-filled)";
  const empty = onBrand ? "rgba(255,255,255,.42)" : "var(--star-empty)";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: "2px"
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    key: i,
    name: "star",
    size: size,
    strokeWidth: 1.5,
    color: i < full ? filled : empty,
    style: {
      fill: i < full ? filled : "transparent"
    }
  }))), showValue ? /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-semibold) var(--size-body-sm)/1 var(--font-core)",
      color: onBrand ? "var(--white)" : "var(--text-strong)"
    }
  }, value.toFixed(1)) : null, count !== undefined ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: onBrand ? "var(--blue-100)" : "var(--text-muted)"
    }
  }, "(", count, " reviews)") : null);
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Rating.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ServiceCard.jsx
try { (() => {
function ServiceCard({
  icon = "wrench",
  title,
  description,
  price,
  href = "#",
  onClick,
  image,
  imageLabel = "Photo",
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    as: "a",
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "grid",
      gap: "var(--space-4)",
      textDecoration: "none",
      alignContent: "start",
      transition: "var(--transition-surface), border-color var(--dur-fast) var(--ease-standard)",
      boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
      borderColor: hover ? "var(--line-strong)" : "var(--line-hairline)",
      transform: hover ? "translateY(-2px)" : "none",
      ...style
    }
  }, image === undefined ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20,
    color: "var(--text-strong)"
  })) : /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block",
      marginBottom: "var(--space-1)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MediaFrame, {
    src: image || undefined,
    label: imageLabel,
    ratio: "16 / 9",
    radius: "var(--radius-sm)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 10,
      bottom: 10,
      width: 34,
      height: 34,
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 17,
    color: "var(--text-strong)"
  }))), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h4)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-strong)",
      margin: 0
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-body)",
      margin: 0
    }
  }, description) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "var(--space-2)"
    }
  }, price ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-semibold) var(--size-body-sm)/1 var(--font-core)",
      color: "var(--text-accent)"
    }
  }, price) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 17,
    color: "var(--text-brand)",
    style: {
      transform: hover ? "translateX(3px)" : "none",
      transition: "transform var(--dur-fast) var(--ease-standard)"
    }
  })));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/StatBand.jsx
try { (() => {
/** Full-width band of headline figures on the brand colour. */
function StatBand({
  items = [],
  tone = "tint",
  style
}) {
  const dark = tone === "brand";
  const bg = dark ? "var(--surface-brand)" : tone === "plain" ? "var(--surface-card)" : "var(--surface-tint)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      color: dark ? "var(--white)" : "var(--text-strong)",
      borderBottom: tone === "plain" ? "var(--border-hairline) solid var(--line-hairline)" : undefined,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${Math.max(items.length, 1)}, 1fr)`,
      gap: "var(--space-7)",
      padding: "var(--space-7) var(--gutter)"
    }
  }, items.map(i => /*#__PURE__*/React.createElement("div", {
    key: i.label,
    style: {
      display: "grid",
      gap: "3px"
    }
  }, i.icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: i.icon,
    size: 17,
    color: dark ? "var(--accent-800)" : "var(--blue-600)",
    style: {
      marginBottom: 3
    }
  }) : null, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-black) 30px/1 var(--font-core)",
      letterSpacing: "var(--track-display)"
    }
  }, i.value), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: dark ? "var(--blue-100)" : "var(--text-muted)"
    }
  }, i.label)))));
}
Object.assign(__ds_scope, { StatBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/StatBand.jsx", error: String((e && e.message) || e) }); }

// components/marketing/StatBlock.jsx
try { (() => {
function StatBlock({
  value,
  label,
  icon,
  align = "left",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "4px",
      justifyItems: align === "center" ? "center" : "start",
      textAlign: align,
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    color: "var(--text-accent)",
    style: {
      marginBottom: 2
    }
  }) : null, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-semibold) var(--size-h2)/1 var(--font-core)",
      letterSpacing: "var(--track-heading)",
      color: "var(--text-strong)"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, label));
}
function TrustRow({
  items = [],
  iconColor,
  style
}) {
  return /*#__PURE__*/React.createElement("ul", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-6)",
      listStyle: "none",
      margin: 0,
      padding: 0,
      color: "var(--text-body)",
      ...style
    }
  }, items.map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      font: "var(--type-body-sm)",
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "shield-check",
    size: 16,
    color: iconColor || "currentColor"
  }), t)));
}
Object.assign(__ds_scope, { StatBlock, TrustRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/marketing/TestimonialCard.jsx
try { (() => {
function TestimonialCard({
  quote,
  name,
  detail,
  rating = 5,
  source,
  style
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: "grid",
      gap: "var(--space-5)",
      padding: "var(--pad-card)",
      background: "var(--surface-card)",
      border: "var(--border-hairline) solid var(--line-hairline)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Rating, {
    value: rating,
    size: 15
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "quote",
    size: 18,
    color: "var(--ink-200)"
  })), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      font: "var(--type-body-lg)",
      color: "var(--text-strong)",
      textWrap: "pretty"
    }
  }, quote), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: "grid",
      gap: "2px",
      borderTop: "var(--border-hairline) solid var(--line-hairline)",
      paddingTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-semibold) var(--size-body-sm)/1.3 var(--font-core)",
      color: "var(--text-strong)"
    }
  }, name), detail ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, detail) : null, source ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-faint)"
    }
  }, "via ", source) : null));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// components/navigation/StepIndicator.jsx
try { (() => {
function StepIndicator({
  steps = [],
  current = 0,
  style
}) {
  return /*#__PURE__*/React.createElement("ol", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      listStyle: "none",
      margin: 0,
      padding: 0,
      ...style
    }
  }, steps.map((s, i) => {
    const done = i < current,
      on = i === current;
    return /*#__PURE__*/React.createElement("li", {
      key: s,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        flex: "none",
        font: "var(--type-label)",
        background: done ? "var(--surface-brand)" : on ? "var(--surface-accent)" : "var(--surface-card)",
        color: done ? "var(--text-inverse)" : on ? "var(--text-on-accent)" : "var(--text-faint)",
        border: `var(--border-hairline) solid ${done ? "var(--blue-800)" : on ? "var(--accent-900)" : "var(--line-hairline)"}`
      }
    }, done ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 13,
      strokeWidth: 2.5
    }) : i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        font: on || done ? "var(--weight-semibold) var(--size-body-sm)/1.2 var(--font-core)" : "var(--type-body-sm)",
        color: on || done ? "var(--text-strong)" : "var(--text-muted)"
      }
    }, s)), i < steps.length - 1 ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        height: 1,
        background: "var(--line-hairline)"
      }
    }) : null);
  }));
}
Object.assign(__ds_scope, { StepIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/StepIndicator.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  value,
  onChange,
  style
}) {
  const active = value ?? (typeof tabs[0] === "string" ? tabs[0] : tabs[0] && tabs[0].value);
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: "var(--space-6)",
      borderBottom: "var(--border-hairline) solid var(--line-hairline)",
      ...style
    }
  }, tabs.map(t => {
    const v = typeof t === "string" ? t : t.value;
    const l = typeof t === "string" ? t : t.label;
    const icon = typeof t === "string" ? null : t.icon;
    const on = v === active;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      type: "button",
      onClick: () => onChange && onChange(v),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "0 0 10px",
        background: "none",
        border: 0,
        borderBottom: `2px solid ${on ? "var(--surface-accent)" : "transparent"}`,
        marginBottom: "-1px",
        cursor: "pointer",
        transition: "var(--transition-control)",
        font: "var(--weight-semibold) var(--size-body-sm)/1.2 var(--font-core)",
        color: on ? "var(--text-strong)" : "var(--text-muted)"
      }
    }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: icon,
      size: 16
    }) : null, l);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/jobs_app/AppShell.jsx
try { (() => {
const {
  Icon,
  IconButton,
  Badge,
  Button,
  Tooltip
} = window.GoodworkDesignSystem_fee824;
const SIDEBAR = [{
  key: "schedule",
  label: "Schedule",
  icon: "calendar"
}, {
  key: "quotes",
  label: "Quotes",
  icon: "file-text"
}, {
  key: "customers",
  label: "Customers",
  icon: "users"
}, {
  key: "invoices",
  label: "Invoices",
  icon: "credit-card"
}, {
  key: "messages",
  label: "Messages",
  icon: "message-square"
}];
function AppShell({
  view,
  onView,
  children,
  onNew
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "236px 1fr",
      minHeight: "100vh",
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      background: "var(--blue-900)",
      color: "var(--blue-100)",
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      padding: "var(--space-6) var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 2,
      padding: "0 var(--space-3) var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-black) 19px/1 var(--font-core)",
      letterSpacing: "-0.03em",
      color: "var(--white)"
    }
  }, "Northside"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--blue-300)"
    }
  }, "Dispatch")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "grid",
      gap: "4px",
      alignContent: "start"
    }
  }, SIDEBAR.map(s => {
    const on = s.key === view;
    return /*#__PURE__*/React.createElement("button", {
      key: s.key,
      type: "button",
      onClick: () => onView(s.key),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        border: 0,
        cursor: "pointer",
        borderRadius: "var(--radius-sm)",
        textAlign: "left",
        transition: "var(--transition-control)",
        background: on ? "var(--blue-700)" : "transparent",
        color: on ? "var(--white)" : "var(--blue-100)",
        font: `${on ? "var(--weight-bold)" : "var(--weight-medium)"} var(--size-body-sm)/1 var(--font-core)`
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 17
    }), s.label, s.key === "quotes" ? /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        background: "var(--accent-800)",
        color: "var(--text-on-accent)",
        borderRadius: "var(--radius-pill)",
        padding: "2px 7px",
        font: "var(--type-label)"
      }
    }, "3") : null);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    block: true,
    onClick: onNew,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 16
    })
  }, "New job"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px 12px",
      borderTop: "1px solid rgba(255,255,255,.14)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: "var(--blue-700)",
      display: "grid",
      placeItems: "center",
      font: "var(--type-label)",
      color: "var(--white)"
    }
  }, "KM"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-semibold) var(--size-body-sm)/1.2 var(--font-core)",
      color: "var(--white)"
    }
  }, "Kenny M."), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      color: "var(--blue-300)"
    }
  }, "Owner"))))), /*#__PURE__*/React.createElement("main", {
    style: {
      display: "grid",
      gridTemplateRows: "auto 1fr",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      padding: "var(--space-5) var(--space-8)",
      background: "var(--surface-card)",
      borderBottom: "var(--border-hairline) solid var(--line-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-h3)",
      margin: 0
    }
  }, SIDEBAR.find(s => s.key === view).label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, "Thursday 20 August \xB7 6 techs on the road")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "positive",
    dot: true
  }, "All techs checked in"), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Search"
  }, /*#__PURE__*/React.createElement(IconButton, {
    name: "search",
    label: "Search",
    variant: "ghost"
  })), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Print run sheet"
  }, /*#__PURE__*/React.createElement(IconButton, {
    name: "file-text",
    label: "Print run sheet",
    variant: "ghost"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-7) var(--space-8)",
      overflow: "auto"
    }
  }, children)));
}
Object.assign(window, {
  AppShell,
  SIDEBAR
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/jobs_app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/jobs_app/Screens.jsx
try { (() => {
const {
  Tabs,
  Card,
  Badge,
  Button,
  Icon,
  Rating,
  Alert,
  Switch,
  Field,
  Select,
  Input,
  Textarea,
  Checkbox,
  StatBlock,
  MediaFrame
} = window.GoodworkDesignSystem_fee824;
const JOBS = [{
  id: "J-1042",
  time: "8:00–10:00",
  customer: "Dana Reyes",
  address: "88 Locke St S",
  type: "Furnace not heating",
  tech: "Kenny M.",
  status: "positive",
  statusLabel: "On the way",
  value: "$185 diag",
  plan: true
}, {
  id: "J-1043",
  time: "9:30–11:30",
  customer: "Marcus Tran",
  address: "42 Cross St, Dundas",
  type: "AC install — day 2",
  tech: "James P.",
  status: "info",
  statusLabel: "In progress",
  value: "$6,420",
  plan: false
}, {
  id: "J-1044",
  time: "12:00–14:00",
  customer: "Priya Shah",
  address: "17 Barton St E",
  type: "Annual tune-up",
  tech: "Unassigned",
  status: "caution",
  statusLabel: "Needs a tech",
  value: "$129",
  plan: true
}, {
  id: "J-1045",
  time: "14:30–16:30",
  customer: "Ada Olsen",
  address: "9 Freeman Pl, Burlington",
  type: "No cooling — 2nd visit",
  tech: "Kenny M.",
  status: "critical",
  statusLabel: "Callback",
  value: "Warranty",
  plan: false
}, {
  id: "J-1046",
  time: "17:00–19:00",
  customer: "Ben Whitlock",
  address: "204 Mohawk Rd W",
  type: "Quote — heat pump",
  tech: "James P.",
  status: "neutral",
  statusLabel: "Booked",
  value: "Estimate",
  plan: false
}];
function Schedule({
  tab,
  onTab,
  selected,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.55fr 1fr",
      gap: "var(--space-7)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: onTab,
    tabs: [{
      value: "today",
      label: "Today",
      icon: "calendar"
    }, {
      value: "week",
      label: "This week",
      icon: "calendar-check"
    }, {
      value: "unassigned",
      label: "Unassigned",
      icon: "triangle-alert"
    }]
  }), tab === "unassigned" ? /*#__PURE__*/React.createElement(Alert, {
    tone: "caution",
    title: "One job has no tech"
  }, "J-1044 at 12:00 still needs assigning. Kenny has a 90-minute gap after J-1042.") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, (tab === "unassigned" ? JOBS.filter(j => j.tech === "Unassigned") : JOBS).map(j => {
    const on = j.id === selected;
    return /*#__PURE__*/React.createElement(Card, {
      key: j.id,
      padding: "sm",
      onClick: () => onSelect(j.id),
      style: {
        cursor: "pointer",
        display: "grid",
        gridTemplateColumns: "84px 1fr auto",
        gap: "var(--space-5)",
        alignItems: "center",
        borderColor: on ? "var(--line-brand)" : "var(--line-hairline)",
        boxShadow: on ? "var(--shadow-md)" : "var(--shadow-sm)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        font: "var(--weight-bold) var(--size-body-sm)/1.2 var(--font-core)",
        color: "var(--text-strong)"
      }
    }, j.time.split("–")[0]), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-caption)",
        color: "var(--text-muted)"
      }
    }, j.time.split("–")[1])), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 3,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        font: "var(--weight-bold) var(--size-body)/1.2 var(--font-core)",
        color: "var(--text-strong)"
      }
    }, j.customer), j.plan ? /*#__PURE__*/React.createElement(Badge, {
      tone: "brand"
    }, "Club") : null), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-body-sm)",
        color: "var(--text-body)"
      }
    }, j.type), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        font: "var(--type-caption)",
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 13
    }), j.address, " \xB7 ", /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      size: 13
    }), j.tech)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 6,
        justifyItems: "end"
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: j.status,
      dot: j.status !== "neutral"
    }, j.statusLabel), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--weight-semibold) var(--size-body-sm)/1 var(--font-core)",
        color: "var(--text-strong)"
      }
    }, j.value)));
  }))), /*#__PURE__*/React.createElement(JobDetail, {
    job: JOBS.find(j => j.id === selected) || JOBS[0]
  }));
}
function JobDetail({
  job
}) {
  return /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    style: {
      display: "grid",
      gap: "var(--space-5)",
      position: "sticky",
      top: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, job.id), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h3)",
      margin: 0
    }
  }, job.type)), /*#__PURE__*/React.createElement(Badge, {
    tone: job.status,
    style: {
      marginLeft: "auto"
    }
  }, job.statusLabel)), /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "16 / 9",
    label: "Equipment photo"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "10px",
      font: "var(--type-body-sm)"
    }
  }, [["Customer", job.customer], ["Address", job.address], ["Window", job.time], ["Tech", job.tech], ["Value", job.value]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      gap: "var(--space-5)",
      borderBottom: "var(--border-hairline) solid var(--line-hairline)",
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 78,
      color: "var(--text-muted)"
    }
  }, k), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-strong)",
      fontWeight: "var(--weight-semibold)"
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "3",
    label: "past jobs",
    icon: "check"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "4.9",
    label: "left us this rating",
    icon: "star"
  })), /*#__PURE__*/React.createElement(Switch, {
    label: "Text the customer on the way",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true
  }, "Open work order"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 16
    })
  }, "Call")));
}
function QuoteBuilder({
  onSend
}) {
  const lines = [{
    item: "Heat pump — 3 ton, inverter",
    qty: 1,
    price: "$5,240"
  }, {
    item: "Line set & pad",
    qty: 1,
    price: "$480"
  }, {
    item: "Labour — 2 techs, 1 day",
    qty: 1,
    price: "$1,120"
  }, {
    item: "Comfort Club — first year",
    qty: 1,
    price: "$0"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr",
      gap: "var(--space-7)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h3)",
      margin: 0
    }
  }, "Quote Q-2291 \xB7 Ben Whitlock"), /*#__PURE__*/React.createElement(Badge, {
    tone: "caution",
    style: {
      marginLeft: "auto"
    }
  }, "Draft")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      font: "var(--type-body-sm)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ["Item", "Qty", "Price"].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: i === 0 ? "left" : "right",
      padding: "0 0 8px",
      font: "var(--type-label)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      borderBottom: "var(--border-hairline) solid var(--line-hairline)"
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, lines.map(l => /*#__PURE__*/React.createElement("tr", {
    key: l.item,
    style: {
      borderBottom: "var(--border-hairline) solid var(--line-hairline)"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 0",
      color: "var(--text-strong)"
    }
  }, l.item), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 0",
      textAlign: "right",
      color: "var(--text-muted)"
    }
  }, l.qty), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "11px 0",
      textAlign: "right",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-strong)"
    }
  }, l.price))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "2",
    style: {
      padding: "14px 0",
      font: "var(--weight-bold) var(--size-body)/1 var(--font-core)",
      color: "var(--text-strong)"
    }
  }, "Total incl. HST"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "14px 0",
      textAlign: "right",
      font: "var(--weight-black) 22px/1 var(--font-core)",
      letterSpacing: "var(--track-heading)",
      color: "var(--text-strong)"
    }
  }, "$7,728")))), /*#__PURE__*/React.createElement(Field, {
    label: "Note to customer"
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 3,
    defaultValue: "Includes removal of the old unit and 0% financing over 24 months if you'd like it."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    onClick: onSend,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 16
    })
  }, "Send quote"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Save draft"))), /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h4)",
      fontWeight: "var(--weight-bold)",
      margin: 0
    }
  }, "Options"), /*#__PURE__*/React.createElement(Field, {
    label: "Valid until"
  }, /*#__PURE__*/React.createElement(Select, {
    options: ["7 days", "14 days", "30 days"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Deposit"
  }, /*#__PURE__*/React.createElement(Input, {
    defaultValue: "$500"
  })), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Offer 0% financing",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Include Comfort Club first year free",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Alert, {
    tone: "info",
    title: "Ben opened your last quote twice"
  }, "Follow up by phone if there's no answer in two days.")));
}
function Placeholder({
  view
}) {
  return /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    style: {
      display: "grid",
      gap: "var(--space-4)",
      justifyItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 22,
    color: "var(--text-faint)"
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--type-h3)",
      margin: 0
    }
  }, view, " isn't part of this kit"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      margin: 0,
      maxWidth: "56ch"
    }
  }, "The template covers dispatch and quoting. Customers, invoices and messages are left deliberately blank rather than invented \u2014 build them against the real product they belong to."));
}
Object.assign(window, {
  Schedule,
  JobDetail,
  QuoteBuilder,
  Placeholder,
  JOBS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/jobs_app/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BookingFlow.jsx
try { (() => {
const {
  Dialog,
  Button,
  Field,
  Input,
  Textarea,
  Select,
  RadioGroup,
  Checkbox,
  StepIndicator,
  Alert,
  Icon
} = window.GoodworkDesignSystem_fee824;
const STEPS = ["Job", "Details", "Time", "Confirm"];
function BookingFlow({
  open,
  onClose,
  onDone
}) {
  const [step, setStep] = React.useState(0);
  const [job, setJob] = React.useState("Furnace not heating");
  const [when, setWhen] = React.useState("Morning (8–12)");
  React.useEffect(() => {
    if (open) setStep(0);
  }, [open]);
  if (!open) return null;
  const body = [/*#__PURE__*/React.createElement("div", {
    key: "job",
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "What's going on?"
  }, /*#__PURE__*/React.createElement(RadioGroup, {
    name: "job",
    value: job,
    onChange: setJob,
    options: ["Furnace not heating", "AC not cooling", "Annual tune-up", "New system quote", "Something else"]
  })), /*#__PURE__*/React.createElement(Checkbox, {
    label: "It's an emergency \u2014 no heat or no cooling right now"
  })), /*#__PURE__*/React.createElement("div", {
    key: "details",
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Name",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Dana Reyes"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Phone",
    hint: "We only call about this job",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    type: "tel",
    placeholder: "(905) 555-0142"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Address"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "88 Locke St S, Hamilton"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Anything we should know?"
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 3,
    placeholder: "Furnace clicks but won't fire. Two-storey, unit in the basement."
  }))), /*#__PURE__*/React.createElement("div", {
    key: "time",
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Day"
  }, /*#__PURE__*/React.createElement(Select, {
    options: ["Thursday 20 Aug", "Friday 21 Aug", "Saturday 22 Aug", "First available"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Time window"
  }, /*#__PURE__*/React.createElement(RadioGroup, {
    name: "when",
    value: when,
    onChange: setWhen,
    options: ["Morning (8–12)", "Afternoon (12–5)", "Evening (5–8)"]
  })), /*#__PURE__*/React.createElement(Alert, {
    tone: "caution",
    title: "Storm backlog"
  }, "Same-day slots are full until Friday. Emergencies still get dispatched today.")), /*#__PURE__*/React.createElement("div", {
    key: "confirm",
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    tone: "info",
    title: "Nothing is charged today"
  }, "A tech confirms by text within 15 minutes. Diagnostic is $89, waived if you go ahead with the repair."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "10px",
      padding: "var(--space-5)",
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-card)",
      font: "var(--type-body-sm)"
    }
  }, [["Job", job], ["When", "Thursday 20 Aug · " + when], ["Where", "88 Locke St S, Hamilton"], ["Contact", "Dana Reyes · (905) 555-0142"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 74,
      color: "var(--text-muted)"
    }
  }, k), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-strong)",
      fontWeight: "var(--weight-semibold)"
    }
  }, v)))))][step];
  const last = step === STEPS.length - 1;
  return /*#__PURE__*/React.createElement(Dialog, {
    open: true,
    title: "Book a visit",
    description: "Four short steps \u2014 no card needed.",
    width: 560,
    onClose: onClose,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => step === 0 ? onClose() : setStep(step - 1)
    }, step === 0 ? "Cancel" : "Back"), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      iconRight: last ? undefined : /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      }),
      onClick: () => last ? onDone(when) : setStep(step + 1)
    }, last ? "Book it" : "Continue"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(StepIndicator, {
    steps: STEPS,
    current: step
  }), body));
}
Object.assign(window, {
  BookingFlow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BookingFlow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
/* Website kit — chrome: promo bar, sticky nav, footer.
   Loaded as a classic Babel script, so components attach to window. */
const {
  Button,
  Icon,
  IconButton,
  PromoBar,
  HoursTable,
  Badge
} = window.GoodworkDesignSystem_fee824;
const NAV = ["Heating", "Cooling", "Comfort Club", "Reviews", "About"];
function SiteHeader({
  route,
  onNavigate,
  onBook
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement(PromoBar, {
    message: "Furnace or AC trouble? Upfront pricing in 60 seconds.",
    ctaLabel: "Get my estimate",
    onClick: e => {
      e.preventDefault();
      onBook();
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      borderBottom: "var(--border-hairline) solid var(--line-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-7)",
      height: 74
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    },
    style: {
      textDecoration: "none",
      display: "grid",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-black) 21px/1 var(--font-core)",
      letterSpacing: "-0.03em",
      color: "var(--text-strong)"
    }
  }, "Northside"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Heating & Cooling")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--space-6)",
      marginLeft: "var(--space-6)"
    }
  }, NAV.map(n => {
    const key = n.toLowerCase().replace(/\s/g, "-");
    const on = route === key;
    return /*#__PURE__*/React.createElement("a", {
      key: n,
      href: "#" + key,
      onClick: e => {
        e.preventDefault();
        onNavigate(key);
      },
      style: {
        font: "var(--weight-semibold) var(--size-body-sm)/1 var(--font-core)",
        textDecoration: "none",
        color: on ? "var(--text-strong)" : "var(--text-body)",
        borderBottom: `2px solid ${on ? "var(--surface-brand)" : "transparent"}`,
        paddingBottom: 4
      }
    }, n);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:9055550142",
    style: {
      font: "var(--type-phone)",
      fontSize: 18,
      color: "var(--text-strong)",
      textDecoration: "none"
    }
  }, "(905) 555-0142"), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    onClick: onBook
  }, "Book instantly")))));
}
function SiteFooter() {
  const col = (title, items) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "9px",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gw-label",
    style: {
      color: "var(--ink-400)"
    }
  }, title), items.map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      font: "var(--type-body-sm)",
      color: "var(--ink-200)"
    }
  }, i)));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--accent-900)",
      color: "var(--ink-200)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
      gap: "var(--space-9)",
      padding: "var(--space-10) var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-black) 22px/1 var(--font-core)",
      letterSpacing: "-0.03em",
      color: "var(--white)"
    }
  }, "Northside"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-sm)",
      margin: 0,
      maxWidth: "36ch"
    }
  }, "Family-run since 2011. We answer the phone, quote before we start, and clean up after ourselves."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, "Licence #PL-40218"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "$2M insured"))), col("Heating", ["Furnace repair", "Furnace install", "Heat pumps", "Mini-splits"]), col("Cooling", ["AC repair", "AC install", "Maintenance plans", "Air quality"]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "10px",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gw-label",
    style: {
      color: "var(--ink-400)"
    }
  }, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: "tel:9055550142",
    style: {
      color: "var(--white)",
      font: "var(--type-phone)",
      fontSize: 19,
      textDecoration: "none"
    }
  }, "(905) 555-0142"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:book@northsidehvac.example",
    style: {
      color: "var(--blue-300)",
      font: "var(--type-body-sm)"
    }
  }, "book@northsidehvac.example"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)"
    }
  }, "1188 Barton St E, Hamilton, ON"), /*#__PURE__*/React.createElement(HoursTable, {
    todayIndex: 0,
    tone: "on-brand",
    rows: [{
      day: "Mon–Fri",
      hours: "7am–7pm"
    }, {
      day: "Saturday",
      hours: "8am–4pm"
    }, {
      day: "Sunday",
      hours: "Emergencies"
    }],
    style: {
      color: "var(--ink-200)",
      marginTop: 4
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "flex",
      gap: "var(--space-6)",
      padding: "var(--space-5) var(--gutter)",
      borderTop: "1px solid rgba(255,255,255,.14)",
      font: "var(--type-caption)",
      color: "var(--ink-400)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Northside Heating & Cooling \xB7 Licence #PL-40218"), /*#__PURE__*/React.createElement("span", null, "Privacy"), /*#__PURE__*/React.createElement("span", null, "Terms"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, "Built with the Goodwork template")));
}
Object.assign(window, {
  SiteHeader,
  SiteFooter,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Icon,
  Badge,
  Card,
  Tag,
  MediaFrame,
  TrustRow,
  StatBand,
  ServiceCard,
  PlanCard,
  Rating,
  TestimonialCard,
  FAQItem,
  AvatarCluster,
  ProcessSteps
} = window.GoodworkDesignSystem_fee824;
function Hero({
  onBook
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-brand)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1.05fr .95fr",
      gap: "var(--space-10)",
      alignItems: "center",
      padding: "var(--space-11) var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)",
      justifyItems: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(255,255,255,.14)",
      border: "1px solid rgba(255,255,255,.28)",
      borderRadius: "var(--radius-pill)",
      padding: "6px 14px",
      font: "var(--type-label)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--white)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 14,
    color: "var(--white)"
  }), " Same-day emergency call-outs"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-display)",
      letterSpacing: "var(--track-display)",
      color: "var(--white)",
      margin: 0,
      maxWidth: "19ch"
    }
  }, "Winter doesn't quit. Neither do we."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-lg)",
      color: "var(--blue-100)",
      margin: 0,
      maxWidth: "46ch"
    }
  }, "Furnaces, AC, heat pumps and mini-splits. Repaired, maintained and installed by a crew that knows the neighbourhood. Same-day service, upfront pricing."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: onBook
  }, "Book instantly"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    href: "#services"
  }, "See what we do")), /*#__PURE__*/React.createElement(AvatarCluster, {
    people: ["KM", "JP", "LB", "DR"],
    rating: "4.9",
    label: "2,500+ verified Google reviews",
    tone: "on-brand",
    style: {
      marginTop: "var(--space-2)"
    }
  }), /*#__PURE__*/React.createElement(TrustRow, {
    items: ["Licensed & insured", "Upfront fixed pricing", "No overtime fees"],
    iconColor: "var(--blue-200)",
    style: {
      marginTop: "var(--space-2)",
      color: "var(--blue-100)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,1.35fr) minmax(0,1fr)",
      gridTemplateRows: "auto auto",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      gridRow: "span 2",
      display: "block",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "4 / 3",
    label: "Crew & van",
    style: {
      height: "100%",
      aspectRatio: "auto",
      background: "rgba(255,255,255,.08)",
      borderColor: "rgba(255,255,255,.22)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 14,
      bottom: 14,
      display: "grid",
      gap: 1,
      padding: "10px 14px",
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-black) 20px/1 var(--font-core)",
      letterSpacing: "var(--track-heading)",
      color: "var(--text-strong)"
    }
  }, "Under 2 hrs"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-muted)"
    }
  }, "average emergency response"))), /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "1 / 1",
    label: "On the job",
    style: {
      background: "rgba(255,255,255,.08)",
      borderColor: "rgba(255,255,255,.22)"
    }
  }), /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "1 / 1",
    label: "Finished install",
    style: {
      background: "rgba(255,255,255,.08)",
      borderColor: "rgba(255,255,255,.22)"
    }
  }))));
}
function Proof() {
  return /*#__PURE__*/React.createElement(StatBand, {
    items: [{
      value: "14+",
      label: "years in the trade",
      icon: "badge-check"
    }, {
      value: "1,400+",
      label: "jobs completed",
      icon: "check"
    }, {
      value: "4.9",
      label: "across 2,500 reviews",
      icon: "star"
    }, {
      value: "24/7",
      label: "emergency service",
      icon: "clock"
    }],
    tone: "plain"
  });
}
function Services({
  onBook
}) {
  const items = [{
    icon: "zap",
    title: "Furnace repair & install",
    description: "When it drops to 10°F overnight, you need a furnace that doesn't tap out.",
    price: "From $185",
    image: "",
    imageLabel: "Furnace swap"
  }, {
    icon: "wrench",
    title: "AC repair & install",
    description: "Summers hit different. We keep you cold when it actually counts.",
    price: "From $149",
    image: "",
    imageLabel: "Condenser install"
  }, {
    icon: "leaf",
    title: "Indoor air quality",
    description: "Dust, allergens, and that smell you can't quite place.",
    price: "From $240",
    image: "",
    imageLabel: "Filtration unit"
  }, {
    icon: "shield-check",
    title: "Maintenance plans",
    description: "The cheapest repair is the one you never need. Twice a year, zero drama.",
    price: "$34.99 / month",
    image: "",
    imageLabel: "Tune-up visit"
  }, {
    icon: "truck",
    title: "Heat pumps & mini-splits",
    description: "Ductless comfort for additions, garages and stubborn back rooms.",
    price: "Quoted per job",
    image: "",
    imageLabel: "Mini-split"
  }, {
    icon: "credit-card",
    title: "0% financing",
    description: "Spread a new system over 24 months with approved credit.",
    price: "24 months",
    image: "",
    imageLabel: "Paperwork"
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      padding: "var(--section-y-sm) 0",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: "var(--space-7)",
      marginBottom: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gw-label"
  }, "What we do"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Heat it. Cool it. Fix it.")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    href: "#services",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    }),
    style: {
      marginLeft: "auto"
    }
  }, "See all services")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-6)"
    }
  }, items.map(s => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: s.title
  }, s, {
    onClick: e => {
      e.preventDefault();
      onBook();
    }
  }))))));
}
function Club({
  onBook
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "comfort-club",
    style: {
      padding: "var(--section-y-sm) 0",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)",
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gw-label"
  }, "Membership"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Join the Comfort Club")), /*#__PURE__*/React.createElement(PlanCard, {
    price: "$34.99",
    period: "per month",
    footnote: "12 month minimum. Cancel anytime.",
    title: "Two tune-ups a year, and you skip the queue",
    description: "A tech who knows your system, priority booking when it matters, and 5% off every repair.",
    perks: ["2 tune-ups / year", "5% off repairs", "Same-day service", "No overtime fees"],
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      onClick: onBook
    }, "Join now")
  })));
}
function Process() {
  const steps = [{
    title: "You call, we answer",
    body: "No phone menus. Someone picks up, takes your details and books you in.",
    badge: "No robots",
    image: "",
    imageLabel: "On the phone"
  }, {
    title: "Honest diagnosis",
    body: "The tech explains the fault in plain English before touching a tool.",
    image: "",
    imageLabel: "Diagnosing"
  }, {
    title: "Upfront quote",
    body: "Parts and labour, in full, before any work starts. No surprise invoice.",
    badge: "Fixed price",
    image: "",
    imageLabel: "The quote"
  }, {
    title: "Fixed and cleaned up",
    body: "We test everything, tidy the space, and back the repair for a year.",
    image: "",
    imageLabel: "Finished"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--section-y-sm) 0",
      background: "var(--surface-tint)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)",
      marginBottom: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gw-label"
  }, "How it works"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Four steps, no runaround")), /*#__PURE__*/React.createElement(ProcessSteps, {
    steps: steps
  })));
}
function Gallery() {
  const shots = [{
    label: "Before · 1998 furnace",
    ratio: "4 / 3"
  }, {
    label: "After · new install",
    ratio: "4 / 3"
  }, {
    label: "Ductwork detail",
    ratio: "4 / 3"
  }, {
    label: "Mini-split, back room",
    ratio: "4 / 3"
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "our-work",
    style: {
      padding: "var(--section-y-sm) 0",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: "var(--space-7)",
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gw-label"
  }, "Our work"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Recent jobs around town")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    href: "#our-work",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    }),
    style: {
      marginLeft: "auto"
    }
  }, "See the full gallery")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "var(--space-5)"
    }
  }, shots.map(s => /*#__PURE__*/React.createElement(MediaFrame, {
    key: s.label,
    ratio: s.ratio,
    label: s.label
  })))));
}
function Crew() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-tint)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1.15fr .85fr",
      gap: "var(--space-10)",
      alignItems: "center",
      padding: "var(--space-10) var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "16 / 10",
    label: "The crew, 2026"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gw-label"
  }, "Who turns up"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Six techs, one van each, no subcontractors"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      margin: 0
    }
  }, "Everyone who knocks on your door works here. You get a name and a photo by text before they arrive."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-4)",
      marginTop: "var(--space-2)"
    }
  }, ["Kenny M.", "James P.", "Leah B."].map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: "grid",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "1 / 1",
    label: "Portrait",
    radius: "var(--radius-md)"
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-bold) var(--size-body-sm)/1.2 var(--font-core)",
      color: "var(--text-strong)"
    }
  }, n)))))));
}
function Areas() {
  const areas = ["Hamilton", "Dundas", "Ancaster", "Stoney Creek", "Burlington", "Waterdown", "Grimsby", "Binbrook"];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--section-y-sm) 0",
      background: "var(--surface-tint)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.4fr",
      gap: "var(--space-10)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gw-label"
  }, "Where we work"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Serving Hamilton & beyond"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      margin: 0
    }
  }, "If you're cold \u2014 or hot \u2014 we're on our way. Same rates across every area we cover.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-3)"
    }
  }, areas.map(a => /*#__PURE__*/React.createElement(Tag, {
    key: a,
    icon: "map-pin"
  }, a)))));
}
function Reviews() {
  return /*#__PURE__*/React.createElement("section", {
    id: "reviews",
    style: {
      padding: "var(--section-y-sm) 0",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: "var(--space-7)",
      marginBottom: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gw-label"
  }, "Reviews"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Neighbours say we're pretty good")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "grid",
      justifyItems: "end",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-black) 34px/1 var(--font-core)",
      letterSpacing: "var(--track-display)",
      color: "var(--text-strong)"
    }
  }, "4.9"), /*#__PURE__*/React.createElement(Rating, {
    value: 5,
    size: 15,
    count: 2500
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(TestimonialCard, {
    rating: 5,
    quote: "Came out the same evening and stayed until the heat was back on.",
    name: "Dana R.",
    detail: "Furnace repair \xB7 Westdale",
    source: "Google"
  }), /*#__PURE__*/React.createElement(TestimonialCard, {
    rating: 5,
    quote: "Quoted $340, charged $340. The basement was cleaner than they found it.",
    name: "Marcus T.",
    detail: "AC install \xB7 Dundas",
    source: "Google"
  }), /*#__PURE__*/React.createElement(TestimonialCard, {
    rating: 5,
    quote: "Kenny explained how to keep the unit running between visits. No upsell.",
    name: "Priya S.",
    detail: "AC tune-up \xB7 Stoney Creek",
    source: "Facebook"
  }))));
}
function Questions() {
  const qs = [{
    question: "Do you charge for quotes?",
    answer: "No. Quotes are free anywhere in our service area, and the price we quote is the price you pay."
  }, {
    question: "How fast can you get here in an emergency?",
    answer: "Under two hours on average within Hamilton. Call the number in the header and you'll speak to a person, not a queue."
  }, {
    question: "Are you licensed and insured?",
    answer: "Yes — Ontario licence #PL-40218 and $2M liability cover. We'll send both on request."
  }, {
    question: "Do you charge extra for evenings or weekends?",
    answer: "No overtime fees. Saturday and evening call-outs are billed at the same rate as weekdays."
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    style: {
      padding: "var(--section-y-sm) 0",
      background: "var(--surface-tint)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr",
      gap: "var(--space-10)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gw-label"
  }, "Questions"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Before you call"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      margin: 0
    }
  }, "Anything we haven't covered, ask on the phone \u2014 we'd rather answer it now than surprise you later."), /*#__PURE__*/React.createElement(Card, {
    padding: "sm",
    accent: true,
    style: {
      display: "grid",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--type-h4)",
      fontWeight: "var(--weight-bold)",
      color: "var(--text-strong)"
    }
  }, "Comfort Club members"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-body)"
    }
  }, "Priority booking and 5% off every repair."))), /*#__PURE__*/React.createElement("div", null, qs.map((q, i) => /*#__PURE__*/React.createElement(FAQItem, _extends({
    key: q.question
  }, q, {
    defaultOpen: i === 0
  }))))));
}
function ClosingCTA({
  onBook
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-brand)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-8)",
      padding: "var(--space-10) var(--gutter)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: "var(--white)",
      margin: 0
    }
  }, "Ready to stop sweating it?"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-lg)",
      color: "var(--blue-100)",
      margin: 0,
      maxWidth: "48ch"
    }
  }, "Book online in under a minute, or call and talk to someone who answers.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: onBook
  }, "Schedule instantly"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    href: "tel:9055550142",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 18
    })
  }, "(905) 555-0142"))));
}
Object.assign(window, {
  Hero,
  Proof,
  Services,
  Process,
  Gallery,
  Crew,
  Club,
  Areas,
  Reviews,
  Questions,
  ClosingCTA
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website_studio/StudioChrome.jsx
try { (() => {
/* Calm page style — chrome. Restrained white header, one accent, no promo bar. */
const {
  Button,
  Icon,
  Badge
} = window.GoodworkDesignSystem_fee824;
const STUDIO_NAV = ["Work", "Services", "About", "Journal", "Contact"];
function StudioHeader({
  route,
  onNavigate,
  onEnquire
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 30,
      background: "rgba(255,255,255,.92)",
      backdropFilter: "var(--overlay-blur)",
      borderBottom: "var(--border-hairline) solid var(--line-hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-7)",
      height: 76
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    },
    style: {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-inverse)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera",
    size: 16,
    color: "var(--white)"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--weight-black) 19px/1 var(--font-core)",
      letterSpacing: "-0.03em",
      color: "var(--text-strong)"
    }
  }, "Halden & Reyes")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      marginLeft: "auto"
    }
  }, STUDIO_NAV.map(n => {
    const key = n.toLowerCase();
    const on = route === key;
    return /*#__PURE__*/React.createElement("a", {
      key: n,
      href: "#" + key,
      onClick: e => {
        e.preventDefault();
        onNavigate(key);
      },
      style: {
        font: "var(--weight-semibold) var(--size-body-sm)/1 var(--font-core)",
        textDecoration: "none",
        padding: "8px 14px",
        borderRadius: "var(--radius-pill)",
        background: on ? "var(--surface-sunken)" : "transparent",
        color: on ? "var(--text-strong)" : "var(--text-muted)"
      }
    }, n);
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onEnquire,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Enquire")));
}
function StudioFooter() {
  const col = (title, items) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "9px",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gw-label",
    style: {
      color: "var(--ink-400)"
    }
  }, title), items.map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      font: "var(--type-body-sm)",
      color: "var(--ink-200)"
    }
  }, i)));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--surface-inverse)",
      color: "var(--ink-200)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
      gap: "var(--space-9)",
      padding: "var(--space-10) var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-black) 21px/1 var(--font-core)",
      letterSpacing: "-0.03em",
      color: "var(--white)"
    }
  }, "Halden & Reyes"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-sm)",
      margin: 0,
      maxWidth: "34ch"
    }
  }, "Wedding and portrait photography in Hamilton and the Niagara region. Booking 2027 dates now."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, "Booking 2027"))), col("Work", ["Weddings", "Portraits", "Editorial", "Print shop"]), col("Studio", ["About us", "Pricing", "Journal", "Reviews"]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "9px",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "gw-label",
    style: {
      color: "var(--ink-400)"
    }
  }, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:studio@haldenreyes.example",
    style: {
      color: "var(--white)",
      font: "var(--type-body-sm)"
    }
  }, "studio@haldenreyes.example"), /*#__PURE__*/React.createElement("a", {
    href: "tel:9055550188",
    style: {
      color: "var(--ink-300)",
      font: "var(--type-body-sm)"
    }
  }, "(905) 555-0188"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)"
    }
  }, "By appointment \xB7 James St N"))), /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "flex",
      gap: "var(--space-6)",
      padding: "var(--space-5) var(--gutter)",
      borderTop: "1px solid rgba(255,255,255,.14)",
      font: "var(--type-caption)",
      color: "var(--ink-400)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Halden & Reyes"), /*#__PURE__*/React.createElement("span", null, "Privacy"), /*#__PURE__*/React.createElement("span", null, "Terms"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, "Built with the Goodwork template \xB7 calm style")));
}
Object.assign(window, {
  StudioHeader,
  StudioFooter,
  STUDIO_NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website_studio/StudioChrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website_studio/StudioSections.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Button,
  Icon,
  Badge,
  Card,
  Tag,
  MediaFrame,
  AvatarCluster,
  ProcessSteps,
  StatBlock,
  TestimonialCard,
  FAQItem,
  PlanCard,
  Field,
  Input,
  Textarea,
  Select
} = window.GoodworkDesignSystem_fee824;

/* Calm page style: white throughout, centred hero, generous whitespace,
   one accent, photography doing the talking. */

function Eyebrow({
  icon,
  children,
  align = "left"
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      alignSelf: align === "center" ? "center" : "start",
      padding: "5px 12px",
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-sunken)",
      font: "var(--type-label)",
      letterSpacing: "var(--track-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, icon ? /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 13,
    color: "var(--text-accent)"
  }) : null, children);
}
function StudioHero({
  onEnquire
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-12) 0 var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "grid",
      gap: "var(--space-7)",
      justifyItems: "center",
      textAlign: "center",
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    icon: "sparkles",
    align: "center"
  }, "Weddings \xB7 Portraits \xB7 Editorial"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--type-display)",
      letterSpacing: "var(--track-display)",
      color: "var(--text-strong)",
      margin: 0,
      maxWidth: "22ch"
    }
  }, "The day, remembered the way it felt"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-lg)",
      color: "var(--text-muted)",
      margin: 0,
      maxWidth: "52ch"
    }
  }, "A two-person studio in Hamilton. We shoot quietly, hand back every usable frame, and never make you pose for a photo you wouldn't hang up."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onEnquire,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 17
    })
  }, "Check your date"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    href: "#work"
  }, "See the work")), /*#__PURE__*/React.createElement(AvatarCluster, {
    people: ["DR", "MT", "PS", "AO"],
    rating: "4.9",
    label: "118 verified reviews \xB7 Google",
    style: {
      marginTop: "var(--space-2)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      marginTop: "var(--space-9)"
    }
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "21 / 9",
    label: "Signature frame",
    radius: "var(--radius-media)"
  })));
}
function StudioProof() {
  const logos = ["Bridal Lane", "Niagara Weds", "Field & Vow", "The Sunday Post", "Hamilton Life"];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 0 var(--section-y-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "grid",
      gap: "var(--space-6)",
      justifyItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-muted)"
    }
  }, "Featured in"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-9)",
      justifyContent: "center"
    }
  }, logos.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      font: "var(--weight-bold) 17px/1 var(--font-core)",
      letterSpacing: "-0.02em",
      color: "var(--ink-600)"
    }
  }, l)))));
}
function StudioWork() {
  const shots = [{
    label: "Elopement · Dundas Peak",
    ratio: "3 / 4"
  }, {
    label: "Reception · Cotton Factory",
    ratio: "3 / 4"
  }, {
    label: "Portrait · studio",
    ratio: "3 / 4"
  }, {
    label: "Ceremony · Ancaster",
    ratio: "3 / 4"
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "work",
    style: {
      padding: "0 0 var(--section-y-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: "var(--space-7)",
      marginBottom: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Selected work"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Recent days")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    href: "#work",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 16
    }),
    style: {
      marginLeft: "auto"
    }
  }, "Full portfolio")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "var(--space-5)"
    }
  }, shots.map(s => /*#__PURE__*/React.createElement(MediaFrame, {
    key: s.label,
    ratio: s.ratio,
    label: s.label
  })))));
}
function StudioServices({
  onEnquire
}) {
  const items = [{
    icon: "camera",
    title: "Full-day wedding",
    body: "Ten hours, two photographers, every usable frame delivered in three weeks.",
    price: "From $3,400"
  }, {
    icon: "sparkles",
    title: "Elopement",
    body: "Three hours for the ceremony and the golden hour after it.",
    price: "From $1,650"
  }, {
    icon: "user",
    title: "Portraits",
    body: "Studio or on location. Families, couples, headshots for work.",
    price: "From $420"
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      padding: "0 0 var(--section-y-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)",
      marginBottom: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "What we offer"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Three ways to book us")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-6)"
    }
  }, items.map((s, i) => /*#__PURE__*/React.createElement(Card, {
    key: s.title,
    padding: "md",
    accent: i === 0,
    style: {
      display: "grid",
      gap: "var(--space-4)",
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-sunken)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 19,
    color: "var(--text-strong)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-h3)",
      margin: 0
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-sm)",
      color: "var(--text-body)",
      margin: 0
    }
  }, s.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: "var(--space-4)",
      borderTop: "var(--border-hairline) solid var(--line-hairline)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "var(--weight-bold) var(--size-body-sm)/1 var(--font-core)",
      color: "var(--text-strong)"
    }
  }, s.price), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: onEnquire,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 15
    })
  }, "Enquire")))))));
}
function StudioProcess() {
  const steps = [{
    title: "Say hello",
    body: "Tell us the date and the venue. We reply within a day with availability and a price."
  }, {
    title: "Meet, properly",
    body: "A coffee or a video call, so nobody is a stranger on the morning."
  }, {
    title: "The day itself",
    body: "We stay out of the way. You will barely notice us working."
  }, {
    title: "Your gallery",
    body: "Every usable frame, colour-graded, in three weeks. Yours to print forever."
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 0 var(--section-y-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "grid",
      gridTemplateColumns: ".9fr 1.1fr",
      gap: "var(--space-10)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "4 / 5",
    label: "Us, working"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "How it works"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Four steps, no surprises")), /*#__PURE__*/React.createElement(ProcessSteps, {
    steps: steps,
    layout: "rows"
  }))));
}
function StudioWords() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--section-y-sm) 0",
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: "var(--space-7)",
      marginBottom: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Kind words"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "What couples said afterwards")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "140+",
    label: "weddings shot"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "3 wks",
    label: "average delivery"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(TestimonialCard, {
    rating: 5,
    quote: "We forgot they were there, which is exactly what we wanted.",
    name: "Dana & Ravi",
    detail: "Cotton Factory \xB7 June 2026",
    source: "Google"
  }), /*#__PURE__*/React.createElement(TestimonialCard, {
    rating: 5,
    quote: "Six hundred photos, and not one where I look like I'm being told to smile.",
    name: "Marcus T.",
    detail: "Elopement \xB7 Dundas Peak",
    source: "Google"
  }), /*#__PURE__*/React.createElement(TestimonialCard, {
    rating: 5,
    quote: "They handled our families with more patience than we did.",
    name: "Priya S.",
    detail: "Ancaster \xB7 September 2026",
    source: "Instagram"
  }))));
}
function StudioPricing({
  onEnquire
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--section-y-sm) 0 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-4)",
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Membership"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "The album club")), /*#__PURE__*/React.createElement(PlanCard, {
    price: "$59",
    period: "per month",
    footnote: "Cancel anytime.",
    title: "A printed album every year",
    description: "For families who keep meaning to print the photos and never do. We choose, you approve, it arrives.",
    perks: ["Annual 40-page album", "Two portrait sessions", "Priority booking", "20% off prints"],
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      onClick: onEnquire
    }, "Join the club")
  })));
}
function StudioQuestions() {
  const qs = [{
    question: "How far ahead should we book?",
    answer: "Most couples book nine to twelve months out. Peak Saturdays in June and September go first, but we keep two dates a month open for short notice."
  }, {
    question: "Do you travel?",
    answer: "Anywhere in southern Ontario at no extra cost. Further afield, we add travel at cost and tell you the number before you commit."
  }, {
    question: "How many photos do we get?",
    answer: "Every usable frame — usually 500 to 800 for a full day. No drip-feeding, no upsell to unlock the rest."
  }, {
    question: "What if it rains?",
    answer: "We shoot anyway, and some of our favourite frames are wet ones. We carry umbrellas and a backup plan for every venue."
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    style: {
      padding: "var(--section-y-sm) 0 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.2fr",
      gap: "var(--space-10)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Questions"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Before you enquire"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      margin: 0
    }
  }, "Anything we haven't covered, just ask. We answer email properly, not with a template."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-3)"
    }
  }, ["Hamilton", "Niagara", "Toronto", "Prince Edward County"].map(a => /*#__PURE__*/React.createElement(Tag, {
    key: a,
    icon: "map-pin"
  }, a)))), /*#__PURE__*/React.createElement("div", null, qs.map((q, i) => /*#__PURE__*/React.createElement(FAQItem, _extends({
    key: q.question
  }, q, {
    defaultOpen: i === 0
  }))))));
}
function StudioEnquiry({
  onSubmit
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: "var(--section-y-sm) 0 var(--section-y-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-container",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-10)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Enquire"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      maxWidth: "18ch"
    }
  }, "Check your date"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-body)",
      margin: 0,
      maxWidth: "42ch"
    }
  }, "Tell us the date and roughly what you're planning. You'll hear back within a day, from one of us, not an assistant."), /*#__PURE__*/React.createElement(MediaFrame, {
    ratio: "4 / 3",
    label: "Studio, James St N"
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "lg",
    style: {
      display: "grid",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Your names",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Dana & Ravi"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "dana@example.com"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Date"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "text",
    placeholder: "12 June 2027"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "What are you planning?"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Choose one",
    options: ["Full-day wedding", "Elopement", "Portraits", "Something else"]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Anything else?"
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 3,
    placeholder: "Ceremony at 2pm in Ancaster, reception at the Cotton Factory."
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    onClick: onSubmit,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Send enquiry"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-caption)",
      color: "var(--text-muted)",
      textAlign: "center"
    }
  }, "We reply to every enquiry within one working day."))));
}
Object.assign(window, {
  Eyebrow,
  StudioHero,
  StudioProof,
  StudioWork,
  StudioServices,
  StudioProcess,
  StudioWords,
  StudioPricing,
  StudioQuestions,
  StudioEnquiry
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website_studio/StudioSections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ICONS = __ds_scope.ICONS;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.AvatarCluster = __ds_scope.AvatarCluster;

__ds_ns.ContactBar = __ds_scope.ContactBar;

__ds_ns.FAQItem = __ds_scope.FAQItem;

__ds_ns.HoursTable = __ds_scope.HoursTable;

__ds_ns.MediaFrame = __ds_scope.MediaFrame;

__ds_ns.PlanCard = __ds_scope.PlanCard;

__ds_ns.ProcessSteps = __ds_scope.ProcessSteps;

__ds_ns.PromoBar = __ds_scope.PromoBar;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.StatBand = __ds_scope.StatBand;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.TrustRow = __ds_scope.TrustRow;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

__ds_ns.StepIndicator = __ds_scope.StepIndicator;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
