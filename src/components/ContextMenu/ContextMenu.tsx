import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "@/utils/cx";
import type { ContextMenuProps } from "./ContextMenu.types";
import styles from "./ContextMenu.module.css";

type Point = { x: number; y: number };

export function ContextMenu({ items, children, className }: ContextMenuProps) {
  const [point, setPoint] = useState<Point | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!point) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPoint(null);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setPoint(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [point]);

  return (
    <div
      className={cx(styles.root, className)}
      onContextMenu={(event) => {
        event.preventDefault();
        setPoint({ x: event.clientX, y: event.clientY });
      }}
    >
      {children}
      {point && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              className={styles.menu}
              style={{ left: point.x, top: point.y }}
            >
              {items.map((item) =>
                item.separator ? (
                  <div key={item.key} className={styles.separator} role="separator" />
                ) : (
                  <button
                    key={item.key}
                    type="button"
                    role="menuitem"
                    className={cx(styles.item, item.danger && styles.danger)}
                    disabled={item.disabled}
                    onClick={() => {
                      item.onSelect?.();
                      setPoint(null);
                    }}
                  >
                    <span>{item.label}</span>
                    {item.shortcut ? (
                      <span className={styles.shortcut}>{item.shortcut}</span>
                    ) : null}
                  </button>
                ),
              )}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

ContextMenu.displayName = "ContextMenu";
