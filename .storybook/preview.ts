import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

import { themes } from "@storybook/theming";
import type { Preview } from "@storybook/angular";
import { withThemeByClassName } from "@storybook/addon-themes";

const themeClasses = [
  "rose-red",
  "azure-blue",
  "magenta-violet",
  "cyan-orange",
];

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
      iframeHeight: "400px",
    },
    controls: { expanded: true },
  },
  decorators: [
    withThemeByClassName({
      themes: Object.fromEntries(themeClasses.map((c) => [c, c])),
      defaultTheme: "rose-red",
    }),
  ],
  tags: ["autodocs"],
};

export default preview;
