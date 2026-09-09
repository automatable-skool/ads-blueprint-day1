import * as React from "react";
/** Native select with brand chevron — job type, time slot, service area. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: Array<string | { value: string; label: string }>;
  placeholder?: string;
  invalid?: boolean;
}
export declare function Select(props: SelectProps): JSX.Element;
