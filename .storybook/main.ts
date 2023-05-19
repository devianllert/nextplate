import path from 'path';

import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    /**
     * This storybook addon can be helpful to make your UI components more accessible.
     *
     * Adds an "Accessibility" tab.
     *
     * @see https://www.npmjs.com/package/@storybook/addon-a11y
     */
    '@storybook/addon-a11y',

    /**
     * Brings Jest results in storybook.
     *
     * @see https://github.com/storybookjs/storybook/tree/master/addons/jest
     */
    '@storybook/addon-jest',
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  /**
   * Customize webpack configuration for Storybook.
   *
   * This doesn't affect the Next.js application, only the Storybook compilation.
   *
   * @param config
   * @see https://storybook.js.org/docs/react/configure/overview#configure-your-storybook-project
   */
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
          stream: false,
          zlib: false,
        },
        alias: {
          ...config.resolve?.alias,

          /**
           * Map our module path aliases, so that Storybook can understand modules loaded using "@/shared" and load the proper file.
           * Required, or Storybook will fail to import dependencies from Stories.
           *
           * Note: The below list must match `tsconfig.json:compilerOptions.paths`, so the Next.js app and Storybook resolve all aliases the same way.
           *  The paths mapping must also match the `jsconfig.json:compilerOptions.paths` file, which is necessary for WebStorm to understand them for .js files.
           *
           * @see https://nextjs.org/docs/advanced-features/module-path-aliases
           * @see https://intellij-support.jetbrains.com/hc/en-us/community/posts/360003361399/comments/360002636080
           */
          '@/app': path.resolve(__dirname, '../src/app'),
          '@/shared': path.resolve(__dirname, '../src/shared'),
          '@/components': path.resolve(__dirname, '../src/shared/components'),
          '@/lib': path.resolve(__dirname, '../src/shared/lib'),
          '@/layouts': path.resolve(__dirname, '../src/widgets/layouts'),
          '@/widgets': path.resolve(__dirname, '../src/widgets'),
          '@/features': path.resolve(__dirname, '../src/features'),
          '@/entities': path.resolve(__dirname, '../src/entities'),
          '@/pages': path.resolve(__dirname, '../src/pages'),
        },
      },
    };
  },
};

export default config;
