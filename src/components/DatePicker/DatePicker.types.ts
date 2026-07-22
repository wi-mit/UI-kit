import type { InputHTMLAttributes } from "react";

export type DatePickerProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  label?: string;
  hint?: string;
  error?: string;
  fullWidth?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};
