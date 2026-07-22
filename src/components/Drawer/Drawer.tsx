import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { useControllableOpen } from "@/hooks/useControllableOpen";
import { cx } from "@/utils/cx";
import type { DrawerProps } from "./Drawer.types";
import styles from "./Drawer.module.css";

export function Drawer({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  children,
  footer,
  side = "right",
  className,
}: DrawerProps) {
  const [open, setOpen] = useControllableOpen(
    controlledOpen,
    onOpenChange,
    defaultOpen,
  );
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cx(styles.panel, styles[side], className)}
      >
        <div className={styles.header}>
          <div>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className={styles.description}>
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            className={styles.close}
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        {children ? <div className={styles.body}>{children}</div> : null}
        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}

Drawer.displayName = "Drawer";
