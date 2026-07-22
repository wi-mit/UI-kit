import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Label"),
    },
  },
  args: {
    children: "Email",
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};
