import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Badge } from "../Badge";
import { Table } from "./Table";

type User = {
  id: string;
  name: string;
  role: string;
  status: "active" | "invited";
};

const data: User[] = [
  { id: "1", name: "Aisha Khan", role: "Admin", status: "active" },
  { id: "2", name: "Omar Ali", role: "Editor", status: "invited" },
  { id: "3", name: "Sara Noor", role: "Viewer", status: "active" },
];

const meta: Meta<typeof Table<User>> = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: createDocsPage("Table"),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

export const Default: Story = {
  args: {
    data,
    rowKey: (row) => row.id,
    columns: [
      { key: "name", header: "Name", render: (row) => row.name },
      { key: "role", header: "Role", render: (row) => row.role },
      {
        key: "status",
        header: "Status",
        render: (row) => (
          <Badge variant={row.status === "active" ? "success" : "warning"}>
            {row.status}
          </Badge>
        ),
      },
    ],
  },
};
