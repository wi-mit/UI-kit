import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";

type ThemeContextValue = {
  theme: Theme;
  preference: ThemePreference;
  setTheme: (preference: ThemePreference) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "uae-ui-theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(preference: ThemePreference): Theme {
  return preference === "system" ? getSystemTheme() : preference;
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
}

export type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: ThemePreference;
  storageKey?: string | false;
  attribute?: "data-theme" | "class";
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    if (typeof window === "undefined" || storageKey === false) return defaultTheme;
    const stored = window.localStorage.getItem(storageKey) as ThemePreference | null;
    return stored ?? defaultTheme;
  });

  const theme = useMemo(() => resolveTheme(preference), [preference]);

  useEffect(() => {
    applyTheme(theme);
    if (storageKey !== false) {
      window.localStorage.setItem(storageKey, preference);
    }
  }, [theme, preference, storageKey]);

  useEffect(() => {
    if (preference !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(getSystemTheme());
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preference]);

  const setTheme = useCallback((next: ThemePreference) => {
    setPreference(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setPreference((prev) => {
      const current = resolveTheme(prev);
      return current === "dark" ? "light" : "dark";
    });
  }, []);

  const value = useMemo(
    () => ({ theme, preference, setTheme, toggleTheme }),
    [theme, preference, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
