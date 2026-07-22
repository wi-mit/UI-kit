import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Avatar"),
    },
  },
  args: {
    fallback: "Sara Ahmed",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Fallback: Story = {};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/100?img=32",
    alt: "Sara Ahmed",
  },
};

export const Large: Story = {
  args: { size: "lg", fallback: "Omar" },
};
