import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Separator"),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <p style={{ margin: 0 }}>Profile</p>
      <Separator style={{ margin: "12px 0" }} />
      <p style={{ margin: 0 }}>Settings</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, height: 24 }}>
      <span>Blog</span>
      <Separator orientation="vertical" />
      <span>Docs</span>
    </div>
  ),
};
