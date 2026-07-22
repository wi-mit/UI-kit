import type { Preview } from "@storybook/react";
import { useEffect, useState, type ReactNode } from "react";
import { ThemeProvider } from "../src/theme";
import {
  applyStorybookTheme,
  STORYBOOK_THEME_EVENT,
  type ColorMode,
} from "../src/docs/storybookTheme";
import "../src/styles/tokens.css";
import "./docs.css";

function ThemeSync({
  theme: globalTheme,
  children,
}: {
  theme: ColorMode;
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<ColorMode>(globalTheme);

  useEffect(() => {
    setTheme(globalTheme);
    applyStorybookTheme(globalTheme);
  }, [globalTheme]);

  useEffect(() => {
    const onTheme = (event: Event) => {
      const next = (event as CustomEvent<ColorMode>).detail;
      if (next === "light" || next === "dark") {
        setTheme(next);
        applyStorybookTheme(next, { notify: false });
      }
    };

    window.addEventListener(STORYBOOK_THEME_EVENT, onTheme);
    return () => window.removeEventListener(STORYBOOK_THEME_EVENT, onTheme);
  }, []);

  return (
    <ThemeProvider key={theme} defaultTheme={theme} storageKey={false}>
      <div
        data-theme={theme}
        className={theme === "dark" ? "dark" : "light"}
        style={{
          minHeight: "100%",
          padding: 8,
          background: "var(--ui-color-surface)",
          color: "var(--ui-color-text)",
          fontFamily: "var(--ui-font-sans)",
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      disable: true,
    },
    docs: {
      canvas: {
        withToolbar: false,
        sourceState: "shown",
      },
      toc: {
        headingSelector: "h2",
        title: "On This Page",
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
    options: {
      storySort: {
        order: ["Components"],
      },
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Light / Dark color mode",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as ColorMode) ?? "light";
      return (
        <ThemeSync theme={theme}>
          <Story />
        </ThemeSync>
      );
    },
  ],
};

export default preview;
