import type { HTMLAttributes, ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
};
