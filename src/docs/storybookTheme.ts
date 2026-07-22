export type ColorMode = "light" | "dark";

export const STORYBOOK_THEME_EVENT = "uae-ui-storybook-theme";
const STORAGE_KEY = "uae-ui-storybook-theme";

export function readStorybookTheme(): ColorMode {
  if (typeof document === "undefined") return "light";
  const fromDom = document.documentElement.dataset.theme;
  if (fromDom === "dark" || fromDom === "light") return fromDom;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "dark" ? "dark" : "light";
}

export function applyStorybookTheme(theme: ColorMode, options?: { notify?: boolean }) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  document.body.style.background = "var(--ui-color-surface)";
  document.body.style.color = "var(--ui-color-text)";
  window.localStorage.setItem(STORAGE_KEY, theme);

  if (options?.notify !== false) {
    window.dispatchEvent(
      new CustomEvent<ColorMode>(STORYBOOK_THEME_EVENT, { detail: theme }),
    );
  }
}
