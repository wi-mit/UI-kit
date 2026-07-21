import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "neutral" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}
