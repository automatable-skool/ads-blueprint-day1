import * as React from "react";

/**
 * Inline Lucide glyph. The only icon primitive in the system — never paste raw SVG into a screen.
 */
export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, "name" | "color"> {
  /** Lucide icon name, e.g. "phone", "star", "shield-check". See ICON_NAMES. */
  name: IconName;
  /** Pixel box. 16 inline with small text, 20 default, 24 in buttons, 28+ for feature marks. */
  size?: number;
  /** Stroke width. 2 is the brand default; 1.75 for sizes above 32. */
  strokeWidth?: number;
  /** Stroke colour. Defaults to currentColor. */
  color?: string;
  /** Accessible label. Omit for decorative icons (renders aria-hidden). */
  label?: string;
}

export type IconName = "arrow-right" | "arrow-up-right" | "badge-check" | "briefcase" | "building-2" | "calculator" | "calendar" | "calendar-check" | "check" | "chevron-down" | "chevron-right" | "circle-check" | "clock" | "credit-card" | "droplets" | "file-text" | "hammer" | "hard-hat" | "info" | "leaf" | "loader" | "mail" | "map-pin" | "menu" | "message-square" | "minus" | "paint-roller" | "phone" | "plug-zap" | "plus" | "quote" | "ruler" | "scale" | "search" | "shield-check" | "star" | "thermometer" | "thumbs-up" | "triangle-alert" | "truck" | "user" | "wrench" | "x";
export declare const ICON_PATHS: Record<IconName, string>;
export declare const ICON_NAMES: IconName[];
export declare function Icon(props: IconProps): JSX.Element | null;
