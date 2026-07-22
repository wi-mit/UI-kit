import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Input"),
    },
  },
  args: {
    label: "Email",
    placeholder: "you@company.com",
    fullWidth: true,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: "Enter a valid email address",
  },
};
