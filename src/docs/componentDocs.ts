import type { ApiProp } from "./DocsBlocks";

export type ComponentDocMeta = {
  name: string;
  cliName: string;
  description: string;
  importCode: string;
  exampleCode: string;
  manualFiles: string[];
  api: Array<{
    name: string;
    description: string;
    props: ApiProp[];
  }>;
};

const uiImport = (names: string) =>
  `import { ${names} } from "@/components/ui/${names.split(",")[0].trim()}"`;

export const componentDocs: Record<string, ComponentDocMeta> = {
  Alert: {
    name: "Alert",
    cliName: "alert",
    description: "Displays a callout for user attention.",
    importCode: uiImport("Alert"),
    exampleCode: `<Alert variant="info" title="Heads up!">
  You can add components and dependencies to your app using the CLI.
</Alert>`,
    manualFiles: [
      "src/components/ui/Alert/Alert.tsx",
      "src/components/ui/Alert/Alert.types.ts",
      "src/components/ui/Alert/Alert.module.css",
      "src/components/ui/Alert/index.ts",
      "src/styles/tokens.css",
      "src/lib/utils.ts",
    ],
    api: [
      {
        name: "Alert",
        description: "The `Alert` component displays a callout for user attention.",
        props: [
          {
            prop: "variant",
            type: '"info" | "success" | "warning" | "danger"',
            defaultValue: '"info"',
          },
          { prop: "title", type: "ReactNode", defaultValue: "-" },
          { prop: "children", type: "ReactNode", defaultValue: "-" },
          { prop: "className", type: "string", defaultValue: "-" },
        ],
      },
    ],
  },
  Button: {
    name: "Button",
    cliName: "button",
    description: "Triggers an action or event.",
    importCode: uiImport("Button"),
    exampleCode: `<Button variant="primary" size="md">
  Continue
</Button>`,
    manualFiles: [
      "src/components/ui/Button/Button.tsx",
      "src/components/ui/Button/Button.types.ts",
      "src/components/ui/Button/Button.module.css",
      "src/components/ui/Button/index.ts",
    ],
    api: [
      {
        name: "Button",
        description: "The `Button` component renders a styled button.",
        props: [
          {
            prop: "variant",
            type: '"primary" | "secondary" | "ghost" | "danger"',
            defaultValue: '"primary"',
          },
          {
            prop: "size",
            type: '"sm" | "md" | "lg"',
            defaultValue: '"md"',
          },
          { prop: "loading", type: "boolean", defaultValue: "false" },
          { prop: "fullWidth", type: "boolean", defaultValue: "false" },
          { prop: "leftIcon", type: "ReactNode", defaultValue: "-" },
          { prop: "rightIcon", type: "ReactNode", defaultValue: "-" },
          { prop: "children", type: "ReactNode", defaultValue: "-" },
        ],
      },
    ],
  },
  Badge: {
    name: "Badge",
    cliName: "badge",
    description: "Displays a compact status label.",
    importCode: uiImport("Badge"),
    exampleCode: `<Badge variant="success">Active</Badge>`,
    manualFiles: [
      "src/components/ui/Badge/Badge.tsx",
      "src/components/ui/Badge/Badge.types.ts",
      "src/components/ui/Badge/Badge.module.css",
      "src/components/ui/Badge/index.ts",
    ],
    api: [
      {
        name: "Badge",
        description: "The `Badge` component shows a short status pill.",
        props: [
          {
            prop: "variant",
            type: '"neutral" | "success" | "warning" | "danger"',
            defaultValue: '"neutral"',
          },
          { prop: "children", type: "ReactNode", defaultValue: "-" },
          { prop: "className", type: "string", defaultValue: "-" },
        ],
      },
    ],
  },
  Card: {
    name: "Card",
    cliName: "card",
    description: "Groups related content in a surface.",
    importCode: uiImport("Card"),
    exampleCode: `<Card title="Account" description="Manage your profile details.">
  Card body content
</Card>`,
    manualFiles: [
      "src/components/ui/Card/Card.tsx",
      "src/components/ui/Card/Card.types.ts",
      "src/components/ui/Card/Card.module.css",
      "src/components/ui/Card/index.ts",
    ],
    api: [
      {
        name: "Card",
        description: "The `Card` component wraps content in a bordered surface.",
        props: [
          { prop: "title", type: "ReactNode", defaultValue: "-" },
          { prop: "description", type: "ReactNode", defaultValue: "-" },
          { prop: "footer", type: "ReactNode", defaultValue: "-" },
          { prop: "children", type: "ReactNode", defaultValue: "-" },
        ],
      },
    ],
  },
  Input: {
    name: "Input",
    cliName: "input",
    description: "Captures single-line text input.",
    importCode: uiImport("Input"),
    exampleCode: `<Input label="Email" placeholder="you@example.com" fullWidth />`,
    manualFiles: [
      "src/components/ui/Input/Input.tsx",
      "src/components/ui/Input/Input.types.ts",
      "src/components/ui/Input/Input.module.css",
      "src/components/ui/Input/index.ts",
    ],
    api: [
      {
        name: "Input",
        description: "The `Input` component renders a labeled text field.",
        props: [
          { prop: "label", type: "string", defaultValue: "-" },
          { prop: "hint", type: "string", defaultValue: "-" },
          { prop: "error", type: "string", defaultValue: "-" },
          { prop: "fullWidth", type: "boolean", defaultValue: "false" },
        ],
      },
    ],
  },
  Textarea: {
    name: "Textarea",
    cliName: "textarea",
    description: "Captures multi-line text input.",
    importCode: uiImport("Textarea"),
    exampleCode: `<Textarea label="Notes" placeholder="Write something…" fullWidth />`,
    manualFiles: [
      "src/components/ui/Textarea/Textarea.tsx",
      "src/components/ui/Textarea/Textarea.types.ts",
      "src/components/ui/Textarea/Textarea.module.css",
      "src/components/ui/Textarea/index.ts",
    ],
    api: [
      {
        name: "Textarea",
        description: "The `Textarea` component renders a multi-line field.",
        props: [
          { prop: "label", type: "string", defaultValue: "-" },
          { prop: "hint", type: "string", defaultValue: "-" },
          { prop: "error", type: "string", defaultValue: "-" },
          { prop: "fullWidth", type: "boolean", defaultValue: "false" },
        ],
      },
    ],
  },
  Select: {
    name: "Select",
    cliName: "select",
    description: "Lets users choose one option from a list.",
    importCode: uiImport("Select"),
    exampleCode: `<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { value: "ae", label: "United Arab Emirates" },
    { value: "sa", label: "Saudi Arabia" },
  ]}
  fullWidth
/>`,
    manualFiles: [
      "src/components/ui/Select/Select.tsx",
      "src/components/ui/Select/Select.types.ts",
      "src/components/ui/Select/Select.module.css",
      "src/components/ui/Select/index.ts",
    ],
    api: [
      {
        name: "Select",
        description: "The `Select` component renders a native select field.",
        props: [
          { prop: "options", type: "SelectOption[]", defaultValue: "-" },
          { prop: "label", type: "string", defaultValue: "-" },
          { prop: "placeholder", type: "string", defaultValue: "-" },
          { prop: "hint", type: "string", defaultValue: "-" },
          { prop: "error", type: "string", defaultValue: "-" },
          { prop: "fullWidth", type: "boolean", defaultValue: "false" },
        ],
      },
    ],
  },
  Checkbox: {
    name: "Checkbox",
    cliName: "checkbox",
    description: "Lets users toggle a binary or indeterminate option.",
    importCode: uiImport("Checkbox"),
    exampleCode: `<Checkbox
  label="Accept terms"
  description="You agree to our terms of service."
/>`,
    manualFiles: [
      "src/components/ui/Checkbox/Checkbox.tsx",
      "src/components/ui/Checkbox/Checkbox.types.ts",
      "src/components/ui/Checkbox/Checkbox.module.css",
      "src/components/ui/Checkbox/index.ts",
    ],
    api: [
      {
        name: "Checkbox",
        description: "The `Checkbox` component renders an accessible checkbox.",
        props: [
          { prop: "label", type: "ReactNode", defaultValue: "-" },
          { prop: "description", type: "ReactNode", defaultValue: "-" },
          { prop: "indeterminate", type: "boolean", defaultValue: "false" },
        ],
      },
    ],
  },
  Switch: {
    name: "Switch",
    cliName: "switch",
    description: "Toggles a setting on or off.",
    importCode: uiImport("Switch"),
    exampleCode: `<Switch label="Email notifications" defaultChecked />`,
    manualFiles: [
      "src/components/ui/Switch/Switch.tsx",
      "src/components/ui/Switch/Switch.types.ts",
      "src/components/ui/Switch/Switch.module.css",
      "src/components/ui/Switch/index.ts",
    ],
    api: [
      {
        name: "Switch",
        description: "The `Switch` component renders an accessible toggle.",
        props: [
          { prop: "checked", type: "boolean", defaultValue: "-" },
          { prop: "defaultChecked", type: "boolean", defaultValue: "false" },
          { prop: "onCheckedChange", type: "(checked: boolean) => void", defaultValue: "-" },
          { prop: "label", type: "ReactNode", defaultValue: "-" },
          { prop: "description", type: "ReactNode", defaultValue: "-" },
        ],
      },
    ],
  },
  Label: {
    name: "Label",
    cliName: "label",
    description: "Labels a form control.",
    importCode: uiImport("Label"),
    exampleCode: `<Label htmlFor="email" required>
  Email
</Label>`,
    manualFiles: [
      "src/components/ui/Label/Label.tsx",
      "src/components/ui/Label/Label.types.ts",
      "src/components/ui/Label/Label.module.css",
      "src/components/ui/Label/index.ts",
    ],
    api: [
      {
        name: "Label",
        description: "The `Label` component renders a form label.",
        props: [
          { prop: "required", type: "boolean", defaultValue: "false" },
          { prop: "children", type: "ReactNode", defaultValue: "-" },
          { prop: "htmlFor", type: "string", defaultValue: "-" },
        ],
      },
    ],
  },
  Avatar: {
    name: "Avatar",
    cliName: "avatar",
    description: "Displays a user image or fallback initials.",
    importCode: uiImport("Avatar"),
    exampleCode: `<Avatar fallback="Sara Ahmed" size="md" />`,
    manualFiles: [
      "src/components/ui/Avatar/Avatar.tsx",
      "src/components/ui/Avatar/Avatar.types.ts",
      "src/components/ui/Avatar/Avatar.module.css",
      "src/components/ui/Avatar/index.ts",
    ],
    api: [
      {
        name: "Avatar",
        description: "The `Avatar` component shows an image or initials.",
        props: [
          { prop: "src", type: "string", defaultValue: "-" },
          { prop: "alt", type: "string", defaultValue: '""' },
          { prop: "fallback", type: "string", defaultValue: "-" },
          { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"' },
        ],
      },
    ],
  },
  Skeleton: {
    name: "Skeleton",
    cliName: "skeleton",
    description: "Shows a loading placeholder.",
    importCode: uiImport("Skeleton"),
    exampleCode: `<Skeleton width={240} height={14} />`,
    manualFiles: [
      "src/components/ui/Skeleton/Skeleton.tsx",
      "src/components/ui/Skeleton/Skeleton.types.ts",
      "src/components/ui/Skeleton/Skeleton.module.css",
      "src/components/ui/Skeleton/index.ts",
    ],
    api: [
      {
        name: "Skeleton",
        description: "The `Skeleton` component renders a shimmer placeholder.",
        props: [
          { prop: "width", type: "string | number", defaultValue: '"100%"' },
          { prop: "height", type: "string | number", defaultValue: '"1rem"' },
          { prop: "rounded", type: '"md" | "lg" | "full"', defaultValue: '"md"' },
        ],
      },
    ],
  },
  Separator: {
    name: "Separator",
    cliName: "separator",
    description: "Visually separates content.",
    importCode: uiImport("Separator"),
    exampleCode: `<Separator />`,
    manualFiles: [
      "src/components/ui/Separator/Separator.tsx",
      "src/components/ui/Separator/Separator.types.ts",
      "src/components/ui/Separator/Separator.module.css",
      "src/components/ui/Separator/index.ts",
    ],
    api: [
      {
        name: "Separator",
        description: "The `Separator` component draws a horizontal or vertical rule.",
        props: [
          {
            prop: "orientation",
            type: '"horizontal" | "vertical"',
            defaultValue: '"horizontal"',
          },
          { prop: "decorative", type: "boolean", defaultValue: "true" },
        ],
      },
    ],
  },
  Dialog: {
    name: "Dialog",
    cliName: "dialog",
    description: "Displays content in a modal overlay.",
    importCode: `import { Dialog } from "@/components/ui/Dialog"
import { Button } from "@/components/ui/Button"`,
    exampleCode: `<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Confirm action"
  description="This will apply the selected changes."
  footer={<Button onClick={() => setOpen(false)}>Confirm</Button>}
>
  Are you sure you want to continue?
</Dialog>`,
    manualFiles: [
      "src/components/ui/Dialog/Dialog.tsx",
      "src/components/ui/Dialog/Dialog.types.ts",
      "src/components/ui/Dialog/Dialog.module.css",
      "src/components/ui/Dialog/index.ts",
      "src/lib/useControllableOpen.ts",
    ],
    api: [
      {
        name: "Dialog",
        description: "The `Dialog` component renders a modal dialog.",
        props: [
          { prop: "open", type: "boolean", defaultValue: "-" },
          { prop: "defaultOpen", type: "boolean", defaultValue: "false" },
          { prop: "onOpenChange", type: "(open: boolean) => void", defaultValue: "-" },
          { prop: "title", type: "ReactNode", defaultValue: "-" },
          { prop: "description", type: "ReactNode", defaultValue: "-" },
          { prop: "children", type: "ReactNode", defaultValue: "-" },
          { prop: "footer", type: "ReactNode", defaultValue: "-" },
        ],
      },
    ],
  },
  Table: {
    name: "Table",
    cliName: "table",
    description: "Displays structured tabular data.",
    importCode: uiImport("Table"),
    exampleCode: `<Table
  columns={[
    { key: "name", header: "Name", render: (row) => row.name },
    { key: "role", header: "Role", render: (row) => row.role },
  ]}
  data={rows}
  rowKey={(row) => row.id}
/>`,
    manualFiles: [
      "src/components/ui/Table/Table.tsx",
      "src/components/ui/Table/Table.types.ts",
      "src/components/ui/Table/Table.module.css",
      "src/components/ui/Table/index.ts",
    ],
    api: [
      {
        name: "Table",
        description: "The `Table` component renders data rows from column definitions.",
        props: [
          { prop: "columns", type: "TableColumn<T>[]", defaultValue: "-" },
          { prop: "data", type: "T[]", defaultValue: "-" },
          { prop: "rowKey", type: "(row: T) => string", defaultValue: "-" },
          { prop: "emptyMessage", type: "string", defaultValue: "-" },
          { prop: "caption", type: "string", defaultValue: "-" },
        ],
      },
    ],
  },
  DataTable: {
    name: "DataTable",
    cliName: "data-table",
    description: "Powerful table with search, sorting, and row selection.",
    importCode: uiImport("DataTable"),
    exampleCode: `<DataTable
  columns={columns}
  data={rows}
  rowKey={(row) => row.id}
  selectable
/>`,
    manualFiles: [
      "src/components/ui/DataTable/DataTable.tsx",
      "src/components/ui/DataTable/DataTable.types.ts",
      "src/components/ui/DataTable/DataTable.module.css",
      "src/components/ui/DataTable/index.ts",
    ],
    api: [
      {
        name: "DataTable",
        description: "The `DataTable` component adds search, sort, and selection on top of tabular data.",
        props: [
          { prop: "columns", type: "DataTableColumn<T>[]", defaultValue: "-" },
          { prop: "data", type: "T[]", defaultValue: "-" },
          { prop: "rowKey", type: "(row: T) => string", defaultValue: "-" },
          { prop: "searchable", type: "boolean", defaultValue: "true" },
          { prop: "selectable", type: "boolean", defaultValue: "false" },
          { prop: "selectedKeys", type: "string[]", defaultValue: "-" },
          {
            prop: "onSelectedKeysChange",
            type: "(keys: string[]) => void",
            defaultValue: "-",
          },
        ],
      },
    ],
  },
  ContextMenu: {
    name: "ContextMenu",
    cliName: "context-menu",
    description: "Displays a menu on right click.",
    importCode: uiImport("ContextMenu"),
    exampleCode: `<ContextMenu
  items={[
    { key: "copy", label: "Copy", shortcut: "⌘C" },
    { key: "delete", label: "Delete", danger: true },
  ]}
>
  <div>Right click here</div>
</ContextMenu>`,
    manualFiles: [
      "src/components/ui/ContextMenu/ContextMenu.tsx",
      "src/components/ui/ContextMenu/ContextMenu.types.ts",
      "src/components/ui/ContextMenu/ContextMenu.module.css",
      "src/components/ui/ContextMenu/index.ts",
    ],
    api: [
      {
        name: "ContextMenu",
        description: "The `ContextMenu` component opens an action menu on right click.",
        props: [
          { prop: "items", type: "ContextMenuItem[]", defaultValue: "-" },
          { prop: "children", type: "ReactNode", defaultValue: "-" },
          { prop: "className", type: "string", defaultValue: "-" },
        ],
      },
    ],
  },
  DatePicker: {
    name: "DatePicker",
    cliName: "date-picker",
    description: "Lets users pick a date from a calendar.",
    importCode: uiImport("DatePicker"),
    exampleCode: `<DatePicker label="Start date" defaultValue="2026-07-22" fullWidth />`,
    manualFiles: [
      "src/components/ui/DatePicker/DatePicker.tsx",
      "src/components/ui/DatePicker/DatePicker.types.ts",
      "src/components/ui/DatePicker/DatePicker.module.css",
      "src/components/ui/DatePicker/index.ts",
    ],
    api: [
      {
        name: "DatePicker",
        description: "The `DatePicker` component combines a text field with a calendar popover.",
        props: [
          { prop: "label", type: "string", defaultValue: "-" },
          { prop: "value", type: "string", defaultValue: "-" },
          { prop: "defaultValue", type: "string", defaultValue: "-" },
          { prop: "onValueChange", type: "(value: string) => void", defaultValue: "-" },
          { prop: "error", type: "string", defaultValue: "-" },
          { prop: "fullWidth", type: "boolean", defaultValue: "false" },
        ],
      },
    ],
  },
  Direction: {
    name: "Direction",
    cliName: "direction",
    description: "Sets text direction for LTR or RTL layouts.",
    importCode: `import { Direction, DirectionProvider } from "@/components/ui/Direction"`,
    exampleCode: `<DirectionProvider dir="rtl">
  <Input label="الاسم" />
</DirectionProvider>`,
    manualFiles: [
      "src/components/ui/Direction/Direction.tsx",
      "src/components/ui/Direction/Direction.module.css",
      "src/components/ui/Direction/index.ts",
    ],
    api: [
      {
        name: "DirectionProvider",
        description: "The `DirectionProvider` sets `dir` for a subtree.",
        props: [
          { prop: "dir", type: '"ltr" | "rtl"', defaultValue: '"ltr"' },
          { prop: "children", type: "ReactNode", defaultValue: "-" },
        ],
      },
      {
        name: "Direction",
        description: "The `Direction` component applies `dir` on a wrapper element.",
        props: [
          { prop: "dir", type: '"ltr" | "rtl"', defaultValue: '"ltr"' },
          { prop: "children", type: "ReactNode", defaultValue: "-" },
        ],
      },
    ],
  },
  Drawer: {
    name: "Drawer",
    cliName: "drawer",
    description: "A panel that slides in from the side of the screen.",
    importCode: uiImport("Drawer"),
    exampleCode: `<Drawer
  open={open}
  onOpenChange={setOpen}
  title="Edit profile"
  description="Make changes to your profile here."
>
  Drawer content
</Drawer>`,
    manualFiles: [
      "src/components/ui/Drawer/Drawer.tsx",
      "src/components/ui/Drawer/Drawer.types.ts",
      "src/components/ui/Drawer/Drawer.module.css",
      "src/components/ui/Drawer/index.ts",
      "src/lib/useControllableOpen.ts",
    ],
    api: [
      {
        name: "Drawer",
        description: "The `Drawer` component renders a side panel overlay.",
        props: [
          { prop: "open", type: "boolean", defaultValue: "-" },
          { prop: "defaultOpen", type: "boolean", defaultValue: "false" },
          { prop: "onOpenChange", type: "(open: boolean) => void", defaultValue: "-" },
          { prop: "side", type: '"left" | "right"', defaultValue: '"right"' },
          { prop: "title", type: "ReactNode", defaultValue: "-" },
          { prop: "description", type: "ReactNode", defaultValue: "-" },
          { prop: "children", type: "ReactNode", defaultValue: "-" },
          { prop: "footer", type: "ReactNode", defaultValue: "-" },
        ],
      },
    ],
  },
  Theme: {
    name: "Theme",
    cliName: "theme",
    description: "Light and dark mode provider for the UI kit.",
    importCode: `import { ThemeProvider, useTheme } from "@mit-wi/ui"
import "@mit-wi/ui/styles.css"`,
    exampleCode: `<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>`,
    manualFiles: [
      "src/theme/ThemeProvider.tsx",
      "src/theme/index.ts",
      "src/styles/tokens.css",
    ],
    api: [
      {
        name: "ThemeProvider",
        description:
          "The `ThemeProvider` applies light/dark tokens and persists the preference.",
        props: [
          {
            prop: "defaultTheme",
            type: '"light" | "dark" | "system"',
            defaultValue: '"system"',
          },
          {
            prop: "storageKey",
            type: "string",
            defaultValue: '"uae-ui-theme"',
          },
          { prop: "children", type: "ReactNode", defaultValue: "-" },
        ],
      },
      {
        name: "useTheme",
        description:
          "The `useTheme` hook returns `{ theme, preference, setTheme, toggleTheme }`.",
        props: [
          { prop: "theme", type: '"light" | "dark"', defaultValue: "-" },
          {
            prop: "preference",
            type: '"light" | "dark" | "system"',
            defaultValue: "-",
          },
          {
            prop: "setTheme",
            type: "(preference) => void",
            defaultValue: "-",
          },
          { prop: "toggleTheme", type: "() => void", defaultValue: "-" },
        ],
      },
    ],
  },
};
