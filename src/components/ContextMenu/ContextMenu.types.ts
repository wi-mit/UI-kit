import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ContextMenuItem = {
  key: string;
  label: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
  onSelect?: () => void;
};

export type ContextMenuProps = {
  items: ContextMenuItem[];
  children: ReactNode;
  className?: string;
};

export type ContextMenuTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;
