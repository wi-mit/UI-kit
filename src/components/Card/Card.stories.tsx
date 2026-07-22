import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Button } from "../Button";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Card"),
    },
  },
  args: {
    title: "Project overview",
    description: "Track progress and upcoming milestones.",
    children: "Content goes here.",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithFooter: Story = {
  args: {
    footer: (
      <>
        <Button size="sm" variant="secondary">
          Cancel
        </Button>
        <Button size="sm">Continue</Button>
      </>
    ),
  },
};
