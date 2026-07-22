import { useMemo, useState } from "react";
import { cx } from "@/utils/cx";
import type { DataTableProps } from "./DataTable.types";
import styles from "./DataTable.module.css";

type SortState = {
  key: string;
  direction: "asc" | "desc";
} | null;

export function DataTable<T>({
  columns,
  data,
  rowKey,
  searchable = true,
  searchPlaceholder = "Search…",
  searchFilter,
  selectable = false,
  selectedKeys,
  onSelectedKeysChange,
  emptyMessage = "No results.",
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortState>(null);
  const isSelectionControlled = selectedKeys !== undefined;
  const [uncontrolledSelected, setUncontrolledSelected] = useState<string[]>([]);
  const selected = isSelectionControlled ? selectedKeys : uncontrolledSelected;

  const setSelected = (keys: string[]) => {
    if (!isSelectionControlled) setUncontrolledSelected(keys);
    onSelectedKeysChange?.(keys);
  };

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return data;
    if (searchFilter) return data.filter((row) => searchFilter(row, normalized));
    return data.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(normalized),
    );
  }, [data, query, searchFilter]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const column = columns.find((item) => item.key === sort.key);
    if (!column) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const left = column.sortValue?.(a) ?? String(column.render(a));
      const right = column.sortValue?.(b) ?? String(column.render(b));
      if (left < right) return sort.direction === "asc" ? -1 : 1;
      if (left > right) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [columns, filtered, sort]);

  const allKeys = sorted.map((row) => rowKey(row));
  const allSelected =
    allKeys.length > 0 && allKeys.every((key) => selected.includes(key));

  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.toolbar}>
        {searchable ? (
          <input
            className={styles.search}
            value={query}
            placeholder={searchPlaceholder}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search table"
          />
        ) : (
          <span />
        )}
        <span className={styles.meta}>
          {sorted.length} row{sorted.length === 1 ? "" : "s"}
          {selectable && selected.length > 0 ? ` · ${selected.length} selected` : ""}
        </span>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {selectable ? (
                <th className={cx(styles.th, styles.checkboxCell)}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    aria-label="Select all rows"
                    onChange={(event) => {
                      setSelected(event.target.checked ? allKeys : []);
                    }}
                  />
                </th>
              ) : null}
              {columns.map((column) => {
                const active = sort?.key === column.key;
                return (
                  <th
                    key={column.key}
                    className={cx(styles.th, styles[column.align ?? "left"])}
                    style={{ width: column.width }}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        className={styles.sortBtn}
                        onClick={() => {
                          setSort((prev) => {
                            if (!prev || prev.key !== column.key) {
                              return { key: column.key, direction: "asc" };
                            }
                            if (prev.direction === "asc") {
                              return { key: column.key, direction: "desc" };
                            }
                            return null;
                          });
                        }}
                      >
                        {column.header}
                        <span aria-hidden>
                          {active ? (sort?.direction === "asc" ? "↑" : "↓") : "↕"}
                        </span>
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td
                  className={styles.empty}
                  colSpan={columns.length + (selectable ? 1 : 0)}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sorted.map((row) => {
                const key = rowKey(row);
                const isSelected = selected.includes(key);
                return (
                  <tr key={key}>
                    {selectable ? (
                      <td className={cx(styles.td, styles.checkboxCell)}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          aria-label={`Select row ${key}`}
                          onChange={(event) => {
                            setSelected(
                              event.target.checked
                                ? [...selected, key]
                                : selected.filter((item) => item !== key),
                            );
                          }}
                        />
                      </td>
                    ) : null}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cx(styles.td, styles[column.align ?? "left"])}
                      >
                        {column.render(row)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

DataTable.displayName = "DataTable";
