import type { Preview } from "@storybook/react";
import "../src/styles/tokens.css";
import "./docs.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    docs: {
      toc: {
        headingSelector: "h2, h3",
        title: "On This Page",
      },
    },
    options: {
      storySort: {
        order: ["Components"],
      },
    },
  },
};

export default preview;
