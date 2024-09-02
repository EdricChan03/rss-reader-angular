/* eslint-disable @typescript-eslint/naming-convention */
import { moduleMetadata } from "@storybook/angular";
import type { Meta, StoryObj } from "@storybook/angular";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ArticleCardModule } from "./article-card.module";
import { ArticleCardComponent } from "./article-card.component";

export default {
  title: "Components/Article Card",
  component: ArticleCardComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, ArticleCardModule],
    }),
    (story) => ({
      ...story(),
      template: `<div style="width: 350px">${story().template}</div>`,
    }),
  ],
  parameters: {
    layout: "centered",
  },
} as Meta;

type Story = StoryObj<ArticleCardComponent>;

export const WithArticle: Story = {
  args: {
    article: {
      title: "Example article",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing " +
        "elit. Sed congue odio at tortor elementum iaculis. " +
        "Vivamus tristique risus vitae sapien placerat rhoncus. " +
        "Quisque ut gravida nibh. Donec finibus tortor sed libero " +
        "pharetra tempus. Donec mattis maximus ligula, pellentesque " +
        "dictum nunc tempor et. Nam convallis mattis lorem, sit amet " +
        "interdum neque.",
      link: "https://example.com",
    },
  },
};

export const WithImage: Story = {
  args: {
    article: {
      title: "Example article with image",
      thumbnail: "https://place-hold.it/1600x900&fontsize=60",
    },
  },
};
