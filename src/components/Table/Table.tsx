import { cx } from "@/utils/cx";
import type { TableProps } from "./Table.types";
import styles from "./Table.module.css";

export function Table<T>({
  columns,
  data,
  rowKey,
  emptyMessage = "No data",
  caption,
  className,
  ...rest
}: TableProps<T>) {
  return (
    <div className={styles.wrapper}>
      <table className={cx(styles.root, className)} {...rest}>
        {caption ? <caption className={styles.caption}>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width, textAlign: column.align ?? "left" }}
                scope="col"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className={styles.empty} colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={rowKey(row)}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{ textAlign: column.align ?? "left" }}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

Table.displayName = "Table";
