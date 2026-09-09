import * as React from "react";

/**
 * Grid tile describing one service, with an icon mark, optional price and link.
 */
export interface ServiceCardProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  /** Lucide icon name for the service mark. */
  icon?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** e.g. "From $89 · fixed price". */
  price?: React.ReactNode;
  cta?: React.ReactNode;
  /** Makes the whole card a link with hover lift. */
  href?: string;
  className?: string;
}

export declare function ServiceCard(props: ServiceCardProps): JSX.Element;
