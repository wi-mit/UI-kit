import type { HTMLAttributes, ReactNode } from "react";

export type DialogProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export type DialogContentProps = HTMLAttributes<HTMLDivElement>;
