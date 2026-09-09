import * as React from "react";

/**
 * Sticky site header: ink contact strip, wordmark, nav, phone number and CTA.
 */
export interface SiteHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  /** Business name rendered as type — this system ships no logo mark. */
  brand?: string;
  /** Optional second word rendered in clay. */
  brandAccent?: string;
  links?: { label: string; href: string }[];
  /** href of the current page, for the active state. */
  activeHref?: string;
  phone?: string;
  ctaLabel?: React.ReactNode;
  onCta?: () => void;
  /** Intercepts nav clicks — used by the UI kit's click-through. */
  onNavigate?: (href: string) => void;
  /** Left text in the ink strip. */
  note?: string;
  /** Right text in the ink strip. */
  hours?: string;
  className?: string;
}

export declare function SiteHeader(props: SiteHeaderProps): JSX.Element;
