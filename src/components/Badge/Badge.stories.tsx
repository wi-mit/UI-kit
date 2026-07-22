import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Badge"),
    },
  },
  args: {
    children: "active",
    variant: "success",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Success: Story = {};

export const Warning: Story = {
  args: { variant: "warning", children: "invited" },
};
