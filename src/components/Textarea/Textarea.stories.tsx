import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Textarea"),
    },
  },
  args: {
    label: "Description",
    placeholder: "Write a short description…",
    fullWidth: true,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: "Max 500 characters" },
};

export const WithError: Story = {
  args: { error: "Description is required" },
};
