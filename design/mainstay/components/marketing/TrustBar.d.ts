import * as React from "react";

/**
 * Inline row of reassurance points placed directly under a hero or form.
 */
export interface TrustBarProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  /** Strings, or {label, icon} for a specific glyph. */
  items: (string | { label: string; icon?: string })[];
  align?: "left" | "center";
  className?: string;
}

export declare function TrustBar(props: TrustBarProps): JSX.Element;
