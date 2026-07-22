import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("DatePicker"),
    },
  },
  args: {
    label: "Start date",
    fullWidth: true,
    defaultValue: "2026-07-22",
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: "Please choose a valid date" },
};
