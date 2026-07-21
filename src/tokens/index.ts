export const colors = {
  primary: "#0f766e",
  primaryHover: "#0d9488",
  primaryFg: "#ffffff",
  danger: "#b42318",
  dangerHover: "#912018",
  dangerFg: "#ffffff",
  success: "#067647",
  warning: "#b54708",
  text: "#111827",
  textMuted: "#6b7280",
  border: "#e5e7eb",
  surface: "#ffffff",
  surfaceMuted: "#f9fafb",
  surfaceHover: "#f3f4f6",
  focus: "#14b8a6",
} as const;

export const space = {
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  8: "2rem",
} as const;

export const radius = {
  md: "0.5rem",
  lg: "0.75rem",
  full: "9999px",
} as const;

export const font = {
  sans: '"IBM Plex Sans", "Segoe UI", sans-serif',
  size: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
  },
} as const;
