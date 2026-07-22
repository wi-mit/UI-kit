import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Alert"),
    },
  },
  args: {
    title: "Heads up",
    children: "You can add components with a single CLI command.",
    variant: "info",
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Saved",
    children: "Your changes were saved successfully.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Check permissions",
    children: "Some actions may be restricted for this role.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    title: "Action failed",
    children: "Please try again or contact support.",
  },
};
