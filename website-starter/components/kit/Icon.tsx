// Lucide glyphs, copied from the Goodwork kit's assets/icons. One primitive for every icon.
//
// Kit rule, verbatim: "All icons render through <Icon name="..." />. Never inline a hand-drawn
// SVG, never use an icon font, never use emoji or Unicode glyphs (checkmark, star, arrow) as
// icons." 1.75px stroke at every size. currentColor by default.
import type { CSSProperties } from "react";

const ICONS: Record<string, string> = {
  "message-square": `<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>`,
  "users": `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>  <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>  <circle cx="9" cy="7" r="4"></circle>`,
  "camera": `<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path>  <circle cx="12" cy="13" r="3"></circle>`,
  "search": `<path d="m21 21-4.34-4.34"></path>  <circle cx="11" cy="11" r="8"></circle>`,
  "zap": `<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"></path>`,
  "clock": `<circle cx="12" cy="12" r="10"></circle>  <path d="M12 6v6l4 2"></path>`,
  "thumbs-up": `<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path>  <path d="M7 10v12"></path>`,
  "mail": `<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>  <rect x="2" y="4" width="20" height="16" rx="2"></rect>`,
  "user": `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>  <circle cx="12" cy="7" r="4"></circle>`,
  "play": `<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>`,
  "image": `<rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>  <circle cx="9" cy="9" r="2"></circle>  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>`,
  "star": `<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>`,
  "quote": `<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>  <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>`,
  "arrow-right": `<path d="M5 12h14"></path>  <path d="m12 5 7 7-7 7"></path>`,
  "map-pin": `<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>  <circle cx="12" cy="10" r="3"></circle>`,
  "check": `<path d="M20 6 9 17l-5-5"></path>`,
  "shield-check": `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>  <path d="m9 12 2 2 4-4"></path>`,
  "sparkles": `<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>  <path d="M20 2v4"></path>  <path d="M22 4h-4"></path>  <circle cx="4" cy="20" r="2"></circle>`,
  "circle-check": `<circle cx="12" cy="12" r="10"></circle>  <path d="m9 12 2 2 4-4"></path>`,
  "phone": `<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>`,
  "calendar-check": `<path d="M8 2v3"></path>  <path d="M16 2v3"></path>  <rect x="3" y="3" width="18" height="18" rx="2"></rect>  <path d="M3 9h18"></path>  <path d="m9 15 2 2 4-4"></path>`,
  "file-text": `<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>  <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>  <path d="M10 9H8"></path>  <path d="M16 13H8"></path>  <path d="M16 17H8"></path>`,
  "badge-check": `<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>  <path d="m9 12 2 2 4-4"></path>`
};

export type IconName = keyof typeof ICONS;

export function Icon({ name, size = 16, color = "currentColor", strokeWidth = 1.75, style }: {
  name: string; size?: number; color?: string; strokeWidth?: number; style?: CSSProperties;
}) {
  const inner = ICONS[name];
  if (!inner) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" style={style} dangerouslySetInnerHTML={{ __html: inner }} />
  );
}
