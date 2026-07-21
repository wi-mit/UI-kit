import type { HTMLAttributes, ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  width?: string | number;
  align?: "left" | "center" | "right";
}

export interface TableProps<T> extends HTMLAttributes<HTMLTableElement> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  emptyMessage?: ReactNode;
  caption?: ReactNode;
}
