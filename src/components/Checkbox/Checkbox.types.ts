import type { InputHTMLAttributes, ReactNode } from "react";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  label?: ReactNode;
  description?: ReactNode;
  indeterminate?: boolean;
};
