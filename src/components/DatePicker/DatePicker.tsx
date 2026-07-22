import { forwardRef, useEffect, useId, useMemo, useRef, useState } from "react";
import { cx } from "@/utils/cx";
import type { DatePickerProps } from "./DatePicker.types";
import styles from "./DatePicker.module.css";

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseIso(value?: string) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker(
    {
      label,
      hint,
      error,
      fullWidth = false,
      className,
      id,
      disabled,
      value,
      defaultValue = "",
      onValueChange,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const hintId = `${fieldId}-hint`;
    const errorId = `${fieldId}-error`;
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState(defaultValue);
    const selected = isControlled ? value : internal;
    const [open, setOpen] = useState(false);
    const selectedDate = parseIso(selected);
    const [view, setView] = useState(
      () => selectedDate ?? new Date(),
    );
    const rootRef = useRef<HTMLLabelElement>(null);

    useEffect(() => {
      if (!open) return;
      const onPointerDown = (event: MouseEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
      };
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };
      window.addEventListener("mousedown", onPointerDown);
      window.addEventListener("keydown", onKeyDown);
      return () => {
        window.removeEventListener("mousedown", onPointerDown);
        window.removeEventListener("keydown", onKeyDown);
      };
    }, [open]);

    const days = useMemo(() => {
      const year = view.getFullYear();
      const month = view.getMonth();
      const first = new Date(year, month, 1);
      const startOffset = first.getDay();
      const total = new Date(year, month + 1, 0).getDate();
      const cells: Array<Date | null> = [];
      for (let i = 0; i < startOffset; i += 1) cells.push(null);
      for (let day = 1; day <= total; day += 1) {
        cells.push(new Date(year, month, day));
      }
      return cells;
    }, [view]);

    const setValue = (next: string) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };

    const todayIso = toIsoDate(new Date());
    const monthLabel = view.toLocaleString(undefined, {
      month: "long",
      year: "numeric",
    });

    return (
      <label
        ref={rootRef}
        className={cx(styles.root, fullWidth && styles.fullWidth, className)}
        htmlFor={fieldId}
      >
        {label ? <span className={styles.label}>{label}</span> : null}
        <span className={styles.fieldWrap}>
          <input
            ref={ref}
            id={fieldId}
            type="text"
            inputMode="numeric"
            placeholder="YYYY-MM-DD"
            className={cx(styles.field, Boolean(error) && styles.invalid)}
            disabled={disabled}
            value={selected}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              [hint ? hintId : null, error ? errorId : null]
                .filter(Boolean)
                .join(" ") || undefined
            }
            {...rest}
            onChange={(event) => setValue(event.target.value)}
            onFocus={(event) => {
              setOpen(true);
              rest.onFocus?.(event);
            }}
          />
          <span className={styles.icon} aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="5"
                width="18"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M3 9h18M8 3v4M16 3v4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          {open && !disabled ? (
            <div className={styles.popover} role="dialog" aria-label="Choose date">
              <div className={styles.calendarHeader}>
                <button
                  type="button"
                  className={styles.navBtn}
                  aria-label="Previous month"
                  onClick={() =>
                    setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
                  }
                >
                  ‹
                </button>
                <span className={styles.monthLabel}>{monthLabel}</span>
                <button
                  type="button"
                  className={styles.navBtn}
                  aria-label="Next month"
                  onClick={() =>
                    setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
                  }
                >
                  ›
                </button>
              </div>
              <div className={styles.weekdays}>
                {WEEKDAYS.map((day) => (
                  <span key={day} className={styles.weekday}>
                    {day}
                  </span>
                ))}
              </div>
              <div className={styles.grid}>
                {days.map((day, index) => {
                  if (!day) {
                    return <span key={`empty-${index}`} />;
                  }
                  const iso = toIsoDate(day);
                  const isSelected = selected === iso;
                  const isToday = todayIso === iso;
                  return (
                    <button
                      key={iso}
                      type="button"
                      className={cx(
                        styles.day,
                        isSelected && styles.selected,
                        !isSelected && isToday && styles.today,
                      )}
                      onClick={() => {
                        setValue(iso);
                        setOpen(false);
                      }}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </span>
        {hint && !error ? (
          <span id={hintId} className={styles.hint}>
            {hint}
          </span>
        ) : null}
        {error ? (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        ) : null}
      </label>
    );
  },
);

DatePicker.displayName = "DatePicker";
