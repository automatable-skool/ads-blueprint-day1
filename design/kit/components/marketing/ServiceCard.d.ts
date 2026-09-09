import * as React from "react";
/**
 * Linked card for one service or package — the main building block of a services grid.
 */
export interface ServiceCardProps {
  /** Lucide icon name for the service. */
  icon?: string;
  title?: string;
  description?: string;
  /** Short price line, e.g. "From $120". */
  price?: string;
  href?: string;
  /** Set (even to "") to swap the icon tile for a 16:9 photo slot at the top of the card. */
  image?: string;
  /** Placeholder caption for that slot, e.g. "Furnace swap". */
  imageLabel?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function ServiceCard(props: ServiceCardProps): JSX.Element;
