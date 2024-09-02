import type { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  stories: [
    "../projects/rss-reader/src/app/**/*.mdx",
    "../projects/rss-reader/src/app/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
      },
    },
    "@storybook/addon-themes",
  ],

  framework: {
    name: "@storybook/angular",
    options: {},
  },

  docs: {},
};

export default config;
