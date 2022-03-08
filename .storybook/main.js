module.exports = {
  core: {
    builder: 'webpack5',
  },
  'stories': [
    '../projects/rss-reader/src/app/**/*.stories.mdx',
    '../projects/rss-reader/src/app/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  'addons': [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false
      }
    },
    'storybook-addon-themes'
  ]
};
