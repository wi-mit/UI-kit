import type { ButtonHTMLAttributes, ReactNode } from "react";

export type SwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: ReactNode;
  description?: ReactNode;
};
