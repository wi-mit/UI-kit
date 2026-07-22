import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Skeleton"),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Line: Story = {
  args: { width: 240, height: 14 },
};

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ width: 260, display: "grid", gap: 12 }}>
      <Skeleton height={120} rounded="lg" />
      <Skeleton width="70%" height={14} />
      <Skeleton width="90%" height={14} />
    </div>
  ),
};

export const Circle: Story = {
  args: { width: 48, height: 48, rounded: "full" },
};
