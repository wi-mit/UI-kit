export const colors = {
  light: {
    primary: "#0d9488",
    primaryHover: "#0f766e",
    primarySoft: "#ccfbf1",
    primaryFg: "#ffffff",
    danger: "#e11d48",
    dangerHover: "#be123c",
    dangerSoft: "#ffe4e6",
    dangerFg: "#ffffff",
    success: "#059669",
    successHover: "#047857",
    successSoft: "#d1fae5",
    warning: "#d97706",
    warningHover: "#b45309",
    warningSoft: "#fef3c7",
    info: "#0284c7",
    infoSoft: "#e0f2fe",
    text: "#0f172a",
    textMuted: "#64748b",
    border: "#e2e8f0",
    borderStrong: "#cbd5e1",
    surface: "#ffffff",
    surfaceMuted: "#f8fafc",
    surfaceHover: "#f1f5f9",
    focus: "#2dd4bf",
  },
  dark: {
    primary: "#2dd4bf",
    primaryHover: "#5eead4",
    primarySoft: "rgb(45 212 191 / 16%)",
    primaryFg: "#042f2e",
    danger: "#fb7185",
    dangerHover: "#fda4af",
    dangerSoft: "rgb(251 113 133 / 16%)",
    dangerFg: "#4c0519",
    success: "#34d399",
    successHover: "#6ee7b7",
    successSoft: "rgb(52 211 153 / 16%)",
    warning: "#fbbf24",
    warningHover: "#fcd34d",
    warningSoft: "rgb(251 191 36 / 16%)",
    info: "#38bdf8",
    infoSoft: "rgb(56 189 248 / 16%)",
    text: "#f8fafc",
    textMuted: "#94a3b8",
    border: "#1e293b",
    borderStrong: "#334155",
    surface: "#0f172a",
    surfaceMuted: "#111827",
    surfaceHover: "#1e293b",
    focus: "#5eead4",
  },
} as const;

/** @deprecated Use `colors.light` — kept for compatibility */
export const lightColors = colors.light;

export const space = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  8: "2rem",
} as const;

export const radius = {
  sm: "0.2rem",
  md: "0.3rem",
  lg: "0.4rem",
  xl: "0.5rem",
  full: "9999px",
} as const;

export const shadow = {
  sm: "0 1px 2px rgb(15 23 42 / 6%)",
  md: "0 8px 24px rgb(15 23 42 / 8%)",
  lg: "0 18px 40px rgb(15 23 42 / 14%)",
  primary: "0 8px 20px rgb(13 148 136 / 28%)",
} as const;

export const font = {
  sans: 'Inter, "Segoe UI", system-ui, sans-serif',
  size: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "0.9375rem",
    lg: "1.125rem",
  },
} as const;
