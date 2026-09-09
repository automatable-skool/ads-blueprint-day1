import * as React from "react";

/**
 * Site footer with contact block, link columns and legal line.
 */
export interface SiteFooterProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  brand?: string;
  brandAccent?: string;
  blurb?: string;
  phone?: string;
  email?: string;
  address?: string;
  columns?: { title: string; links: { label: string; href?: string }[] }[];
  legal?: React.ReactNode;
  /** Optional right-side line, e.g. an accreditation number. */
  licence?: React.ReactNode;
  className?: string;
}

export declare function SiteFooter(props: SiteFooterProps): JSX.Element;
