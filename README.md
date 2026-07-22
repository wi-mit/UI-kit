# @uae-wi/ui

React UI kit with Storybook docs and a **shadcn-style CLI** so you can add only the components you need.

## Component list

### Available now

| Component | CLI name | Purpose |
|-----------|----------|---------|
| Button | `button` | Actions / CTAs |
| Badge | `badge` | Status labels |
| Card | `card` | Content containers |
| Input | `input` | Text fields |
| Textarea | `textarea` | Multi-line text |
| Select | `select` | Native select |
| Checkbox | `checkbox` | Multi-select options |
| Switch | `switch` | On/off toggles |
| Label | `label` | Form labels |
| Alert | `alert` | Inline feedback |
| Avatar | `avatar` | User image / initials |
| Skeleton | `skeleton` | Loading placeholders |
| Separator | `separator` | Dividers |
| Context Menu | `context-menu` | Right-click action menu |
| Data Table | `data-table` | Searchable/sortable table |
| Date Picker | `date-picker` | Calendar date field |
| Dialog | `dialog` | Modal overlays |
| Direction | `direction` | LTR / RTL direction helper |
| Drawer | `drawer` | Side panel overlay |
| Table | `table` | Data tables |

### Planned next

Tabs, Toast, Tooltip, Dropdown Menu, Pagination, Accordion, Progress, Radio Group

---

## Two ways to use

### A) shadcn-style (recommended) — copy only what you need

Adds source files into **your** project (you own and can edit them).

#### 1. Init once in the consumer app

From your other React project:

```bash
# Local (before publish) — run from the consumer project:
node ../UI-kit/cli/index.js init

# After publish:
npx @uae-wi/ui init
```

This creates:

- `components.json`
- `src/styles/tokens.css`
- `src/lib/utils.ts`

#### 2. Add only the components you need

```bash
# Local:
node ../UI-kit/cli/index.js add button
node ../UI-kit/cli/index.js add alert badge dialog

# After publish:
npx @uae-wi/ui add button
npx @uae-wi/ui add alert badge dialog
```

List everything:

```bash
node ../UI-kit/cli/index.js list
# or
npx @uae-wi/ui list
```

#### 3. Import tokens once

In your app entry (`main.tsx` / `App.tsx`):

```tsx
import "./styles/tokens.css";
```

#### 4. Use the component

```tsx
import { Button } from "./components-wi/ui/Button";
import { Badge } from "./components-wi/ui/Badge";

export function Example() {
  return (
    <>
      <Button variant="primary">Save</Button>
      <Badge variant="success">Active</Badge>
    </>
  );
}
```

Default output folders (from `components.json`):

```text
src/components-wi/ui/<Component>/
src/lib/utils.ts
src/styles/tokens.css
```

---

### B) Full package install — import from `@uae-wi/ui`

Installs the whole library (all components).

#### Local path (while developing)

In the other project `package.json`:

```json
{
  "dependencies": {
    "@uae-wi/ui": "file:../UI-kit"
  }
}
```

```bash
# in UI-kit
npm run build

# in other project
npm install
```

#### Usage

```tsx
import "@uae-wi/ui/styles.css";
import { Button, Badge, Dialog } from "@uae-wi/ui";

export function Example() {
  return (
    <>
      <Button>Save</Button>
      <Badge variant="success">Active</Badge>
    </>
  );
}
```

---

## Component docs (Storybook)

Each component has a **Docs** tab styled like shadcn:

1. Live preview  
2. **Installation** — Command (`npx @uae-wi/ui add …`) / Manual  
3. **Usage** — import + example code  
4. **API Reference** — props table  

Open Storybook → pick a component (e.g. Alert) → click **Docs**.

```bash
npm run dev
# http://localhost:6006/?path=/docs/components-alert--docs
```

---

## Develop this kit

```bash
npm install
npm run dev          # Storybook → http://localhost:6006
npm run build        # Build library dist/
npm run typecheck
npm test
```

CLI helpers from this repo:

```bash
npm run cli -- list
npm run cli -- help
```

---

## Example: add Button like shadcn

```bash
# in your app
npx @uae-wi/ui init
npx @uae-wi/ui add button
```

Then:

```tsx
import "./styles/tokens.css";
import { Button } from "./components-wi/ui/Button";

<Button variant="primary" size="md">Continue</Button>
```

---

## Requirements

- Node 18+
- React 18+
- CSS Modules support (Vite / Next.js / CRA with CSS modules)

---

## Project structure

```text
UI-kit/
  src/components/     # Component source + stories
  src/styles/         # Design tokens
  src/utils/          # Shared helpers (cx)
  cli/                # shadcn-style CLI
  registry/           # Component registry map
  .storybook/         # Storybook config
```
