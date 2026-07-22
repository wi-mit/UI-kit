import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Checkbox"),
    },
  },
  args: {
    label: "Accept terms",
    description: "You agree to our terms of service.",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: "Select all" },
};
