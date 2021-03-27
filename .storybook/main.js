const path = require('path');

try {
  require('../.jest-test-results.json');
  console.warn(`[Storybook Jest config] Found "/.jest-test-results.json". \nStories will display the latest Jest test results. \nRunning "yarn:test" in parallel of storybook will keep Storybook up-to-date with the latest test result.`);
} catch (e) {
  console.warn(`[Storybook Jest config] The test results file couldn't be found in "/.jest-test-results.json". \nStories will not display Jest test results. \nRunning "yarn test:generate-output" prior to running storybook will fix this.`);
}

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    /**
     * The Storybook Links addon can be used to create links that navigate between stories in Storybook.
     *
     * @see https://www.npmjs.com/package/@storybook/addon-links
     */
    '@storybook/addon-links',

    /**
     * Present including "essential" Storybook addons, such as:
     *
     * - Actions - Storybook Addon Actions can be used to display data received by event handlers in Storybook.
     *    It's where the action you do are being logged.
     *
     * - Backgrounds - Storybook Addon Backgrounds can be used to change background colors inside the preview in Storybook.
     *
     * - Controls - Controls gives you a graphical UI to interact with a component's arguments dynamically, without needing to code.
     *    It creates an addon panel next to your component examples ("stories"), so you can edit them live.
     *
     * - Docs - Storybook Docs transforms your Storybook stories into world-class component documentation.
     *    - DocsPage: Out of the box, all your stories get a DocsPage. DocsPage is a zero-config aggregation
     *      of your component stories, text descriptions, docgen comments, props tables, and code examples into clean, readable pages.
     *    - MDX: If you want more control, MDX allows you to write long-form markdown documentation and stories in one file.
     *      You can also use it to write pure documentation pages and embed them inside your Storybook alongside your stories.
     *
     * - Viewport - Storybook Viewport Addon allows your stories to be displayed in different sizes and layouts in Storybook.
     *    This helps build responsive components inside of Storybook.
     *
     * - Toolbars - The Toolbars addon controls global story rendering options from Storybook's toolbar UI. It's a general purpose addon that can be used to:
     *    - set a theme for your components
     *    - set your components' internationalization (i18n) locale
     *    - configure just about anything in Storybook that makes use of a global variable
     *
     * @see https://storybook.js.org/addons/essentials
     * @see https://github.com/storybookjs/storybook/tree/master/addons/essentials
     * @see https://github.com/storybookjs/storybook/tree/next/addons/actions
     * @see https://github.com/storybookjs/storybook/tree/next/addons/backgrounds
     * @see https://github.com/storybookjs/storybook/tree/next/addons/controls
     * @see https://github.com/storybookjs/storybook/tree/next/addons/docs
     * @see https://github.com/storybookjs/storybook/tree/next/addons/viewport
     * @see https://github.com/storybookjs/storybook/tree/next/addons/toolbars
     *
     * You can disable addons you don't want through configuration.
     * @see https://github.com/storybookjs/storybook/tree/master/addons/essentials#disabling-addons
     */
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: true,
        backgrounds: true,
        controls: true,
        docs: true,
        viewport: true,
        toolbars: true,
      },
    },

    /**
     * This storybook addon can be helpful to make your UI components more accessible.
     *
     * Adds an "Accessibility" tab.
     *
     * @see https://www.npmjs.com/package/@storybook/addon-a11y
     */
    '@storybook/addon-a11y',

    // ------------------- Non official addons below ------------------

    /**
     * Brings Jest results in storybook.
     *
     * @see https://github.com/storybookjs/storybook/tree/master/addons/jest
     */
    '@storybook/addon-jest',

    /**
     * A storybook addon to help better understand and debug performance for React components.
     *
     * Adds a "Performance" tab.
     *
     * @see https://github.com/atlassian-labs/storybook-addon-performance
     */
    'storybook-addon-performance/register',

    /**
     * Offers suggestions on how you can improve the HTML, CSS and UX of your components to be more mobile-friendly.
     *
     * Adds a "Mobile" tab.
     *
     * @see https://github.com/aholachek/storybook-mobile
     */
    'storybook-mobile',

    /**
     * A Storybook addon that embed Figma, websites, PDF or images in the addon panel.
     *
     * Adds a "Design" tab.
     *
     * @see https://github.com/pocka/storybook-addon-designs
     */
    'storybook-addon-designs',
  ],

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
        alias: {
          ...config.resolve.alias,
          /**
           * Map our module path aliases, so that Storybook can understand modules loaded using "@/common" and load the proper file.
           * Required, or Storybook will fail to import dependencies from Stories.
           *
           * XXX The below list must match `tsconfig.json:compilerOptions.paths`, so the Next.js app and Storybook resolve all aliases the same way.
           *  The paths mapping must also match the `jsconfig.json:compilerOptions.paths` file, which is necessary for WebStorm to understand them for .js files.
           *
           * @see https://nextjs.org/docs/advanced-features/module-path-aliases
           * @see https://intellij-support.jetbrains.com/hc/en-us/community/posts/360003361399/comments/360002636080
           */
          '@/app': path.resolve(__dirname, '../src/app'),
          '@/common': path.resolve(__dirname, '../src/common'),
          '@/components': path.resolve(__dirname, '../src/common/components'),
          '@/utils': path.resolve(__dirname, '../src/common/utils'),
          '@/layouts': path.resolve(__dirname, '../src/layouts'),
          '@/modules': path.resolve(__dirname, '../src/modules'),
          '@/pages': path.resolve(__dirname, '../src/pages'),
        },
      },
    };
  },
};
