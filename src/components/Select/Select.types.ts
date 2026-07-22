import type { ReactNode, SelectHTMLAttributes } from "react";

export type SelectOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> & {
  label?: string;
  hint?: string;
  error?: string;
  fullWidth?: boolean;
  options: SelectOption[];
  placeholder?: string;
};
