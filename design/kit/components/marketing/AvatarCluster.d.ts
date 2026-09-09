import * as React from "react";
/** Overlapping avatars plus a rating line — the social-proof chip in a hero. */
export interface AvatarClusterProps {
  /** Initials strings, or objects with a real headshot: { initials, src }. */
  people?: Array<string | { initials: string; src?: string }>;
  /** Displayed rating, e.g. "4.9". */
  rating?: string | number;
  /** Review count, rendered as "182 verified reviews" when no label is given. */
  count?: number;
  /** Overrides the count line, e.g. "700+ verified Google reviews". */
  label?: string;
  /** "on-brand" for use on a blue band. */
  tone?: "default" | "on-brand";
  /** Avatar diameter in px, default 34. */
  size?: number;
  style?: React.CSSProperties;
}
export declare function AvatarCluster(props: AvatarClusterProps): JSX.Element;
