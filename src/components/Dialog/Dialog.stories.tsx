import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Button } from "../Button";
import { Dialog } from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      page: createDocsPage("Dialog"),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Confirm action"
          description="This will apply the selected changes."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          Are you sure you want to continue?
        </Dialog>
      </>
    );
  },
};
