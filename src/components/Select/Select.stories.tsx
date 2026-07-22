import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Select"),
    },
  },
  args: {
    label: "Country",
    placeholder: "Select a country",
    fullWidth: true,
    options: [
      { value: "ae", label: "United Arab Emirates" },
      { value: "sa", label: "Saudi Arabia" },
      { value: "eg", label: "Egypt" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: "Please select a country" },
};
