import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/Button";
import { createDocsPage } from "@/docs";
import { ThemeProvider, useTheme } from "@/theme";

function ThemeDemo() {
  const { theme, preference, setTheme, toggleTheme } = useTheme();
  return (
    <div style={{ display: "grid", gap: 12, minWidth: 280 }}>
      <p style={{ margin: 0, color: "var(--ui-color-text-muted)" }}>
        Active: <strong style={{ color: "var(--ui-color-text)" }}>{theme}</strong>{" "}
        (preference: {preference})
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button size="sm" variant="secondary" onClick={() => setTheme("light")}>
          Light
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setTheme("dark")}>
          Dark
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setTheme("system")}>
          System
        </Button>
        <Button size="sm" onClick={toggleTheme}>
          Toggle
        </Button>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Foundation/Theme",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Theme"),
    },
  },
};

export default meta;
type Story = StoryObj;

export const Switcher: Story = {
  render: () => (
    <ThemeProvider defaultTheme="light" storageKey="uae-ui-theme-demo">
      <ThemeDemo />
    </ThemeProvider>
  ),
};
