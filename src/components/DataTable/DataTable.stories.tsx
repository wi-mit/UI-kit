import type { Meta, StoryObj } from "@storybook/react";
import { createDocsPage } from "@/docs";
import { Badge } from "../Badge";
import { DataTable } from "./DataTable";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited";
};

const data: User[] = [
  {
    id: "1",
    name: "Aisha Khan",
    email: "aisha@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Omar Ali",
    email: "omar@example.com",
    role: "Editor",
    status: "invited",
  },
  {
    id: "3",
    name: "Sara Noor",
    email: "sara@example.com",
    role: "Viewer",
    status: "active",
  },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      page: createDocsPage("DataTable"),
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data,
    rowKey: (row) => row.id,
    selectable: true,
    columns: [
      {
        key: "name",
        header: "Name",
        sortable: true,
        sortValue: (row) => row.name,
        render: (row) => row.name,
      },
      {
        key: "email",
        header: "Email",
        sortable: true,
        sortValue: (row) => row.email,
        render: (row) => row.email,
      },
      {
        key: "role",
        header: "Role",
        render: (row) => row.role,
      },
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
