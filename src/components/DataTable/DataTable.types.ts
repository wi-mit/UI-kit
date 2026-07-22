import type { ReactNode } from "react";
import type { TableColumn } from "../Table";

export type DataTableColumn<T> = TableColumn<T> & {
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
};

export type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFilter?: (row: T, query: string) => boolean;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectedKeysChange?: (keys: string[]) => void;
  emptyMessage?: ReactNode;
  className?: string;
};
