import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { ContextMenu } from "./ContextMenu";

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("ContextMenu"),
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Basic: Story = {
  render: () => (
    <ContextMenu
      items={[
        { key: "back", label: "Back", shortcut: "⌘[" },
        { key: "forward", label: "Forward", shortcut: "⌘]", disabled: true },
        { key: "sep-1", label: "", separator: true },
        { key: "reload", label: "Reload", shortcut: "⌘R" },
        {
          key: "delete",
          label: "Delete",
          danger: true,
          onSelect: () => undefined,
        },
      ]}
    >
      <div
        style={{
          width: 280,
          height: 140,
          display: "grid",
          placeItems: "center",
          border: "1px dashed #d4d4d8",
          borderRadius: 12,
          color: "#71717a",
          fontSize: 14,
        }}
      >
        Right click here
      </div>
    </ContextMenu>
  ),
};
