import type { ReactNode } from "react";

export type DrawerSide = "left" | "right";

export type DrawerProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  side?: DrawerSide;
  className?: string;
};
