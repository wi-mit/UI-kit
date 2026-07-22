import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Button } from "../Button";
import { Input } from "../Input";
import { Drawer } from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      page: createDocsPage("Drawer"),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Right: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          title="Edit profile"
          description="Make changes to your profile here."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </>
          }
        >
          <Input label="Name" defaultValue="Sara Ahmed" fullWidth />
        </Drawer>
      </>
    );
  },
};

export const Left: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open left drawer</Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          side="left"
          title="Filters"
          description="Narrow down your results."
        >
          Filter controls go here.
        </Drawer>
      </>
    );
  },
};
