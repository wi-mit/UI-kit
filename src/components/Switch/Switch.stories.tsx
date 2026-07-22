import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Switch"),
    },
  },
  args: {
    label: "Email notifications",
    description: "Receive updates about your account.",
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const On: Story = {
  args: { defaultChecked: true },
};
