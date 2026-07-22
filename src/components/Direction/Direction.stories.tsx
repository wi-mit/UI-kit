import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Button } from "../Button";
import { Input } from "../Input";
import { Direction, DirectionProvider } from "./Direction";

const meta: Meta<typeof Direction> = {
  title: "Components/Direction",
  component: Direction,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Direction"),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Direction>;

export const Ltr: Story = {
  render: () => (
    <Direction dir="ltr">
      <div style={{ display: "grid", gap: 12, width: 280 }}>
        <Input label="Name" defaultValue="Sara Ahmed" fullWidth />
        <Button>Save</Button>
      </div>
    </Direction>
  ),
};

export const Rtl: Story = {
  render: () => (
    <DirectionProvider dir="rtl">
      <div style={{ display: "grid", gap: 12, width: 280 }}>
        <Input label="الاسم" defaultValue="سارة أحمد" fullWidth />
        <Button>حفظ</Button>
      </div>
    </DirectionProvider>
  ),
};
