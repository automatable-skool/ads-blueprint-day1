import * as React from "react";
/** Photo slot. Renders a labelled placeholder until a real src is supplied. */
export interface MediaFrameProps {
  src?: string;
  alt?: string;
  /** Placeholder caption, e.g. "Van & crew". */
  label?: string;
  /** CSS aspect-ratio, default "4 / 3". */
  ratio?: string;
  radius?: string;
  /** Applies the bottom-up green scrim for text over photography. */
  overlay?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function MediaFrame(props: MediaFrameProps): JSX.Element;
