import * as React from "react";

/**
 * Horizontal view switcher — underline for page sections, pill for compact filters.
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onChange" | "onSubmit"> {
  items: { id: string; label: React.ReactNode }[];
  /** Controlled active id. Omit for uncontrolled use. */
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  variant?: "underline" | "pill";
  className?: string;
}

export declare function Tabs(props: TabsProps): JSX.Element;
