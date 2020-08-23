
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

import { themes } from '@storybook/theming';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: themes.dark,
    iframeHeight: '400px'
  },
  controls: { expanded: true },
  themes: [
    {
      name: 'indigo-pink',
      class: 'indigo-pink',
      color: '#3f51b5',
      default: true
    },
    {
      name: 'deeppurple-amber',
      class: 'deeppurple-amber',
      color: '#673ab7'
    },
    {
      name: 'pink-bluegrey',
      class: 'pink-bluegrey',
      color: '#e91e63'
    },
    {
      name: 'purple-green',
      class: 'purple-green',
      color: '#9c27b0'
    }
  ]
}
