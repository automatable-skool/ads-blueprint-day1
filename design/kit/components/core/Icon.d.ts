import * as React from "react";
/** Lucide glyph, stroked in currentColor. The only icon primitive in the system. */
export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "name"> {
  /** Lucide icon name, e.g. "phone" | "wrench" | "star" (see ICONS keys). */
  name: string;
  /** Pixel box; use 16 inline, 20 in controls, 24+ for feature marks. Default 20. */
  size?: number;
  /** Default 1.75 — the brand stroke weight. */
  strokeWidth?: number;
  color?: string;
  /** Accessible label; omit for decorative icons. */
  label?: string;
}
export declare const ICONS: Record<string, string>;
export declare function Icon(props: IconProps): JSX.Element | null;
