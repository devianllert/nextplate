import { themes } from '@storybook/theming';
import { addDecorator } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import { withPerformance } from 'storybook-addon-performance';
import { I18nextProvider } from 'react-i18next';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { ThemeProvider, useColorMode } from 'theme-ui';
import i18n from './i18n';

import '@storybook/addon-console'; // Automatically forwards all logs in the "Actions" panel - See https://github.com/storybookjs/storybook-addon-console
import '@/app/components/MultiversalGlobalExternalStyles'; // Import the same 3rd party libraries global styles as the pages/_app.tsx (for UI consistency)
import { GlobalStyles } from '@/common/design/GlobalStyles';
import { ResetStyles } from '@/common/design/ResetStyles';
import { theme } from '@/common/design/themes';

/**
 * Story Global parameters for Storybook.
 *
 * Parameters are a set of static, named metadata about a story, typically used to control the behavior of Storybook features and addons.
 * Parameters are applied at the top-level and act as default values.
 *
 * XXX They can be overridden per component and per story.
 *  See https://storybook.js.org/docs/react/writing-stories/parameters#rules-of-parameter-inheritance
 *
 * @see https://storybook.js.org/docs/react/writing-stories/parameters Parameters documentation
 * @see https://github.com/storybookjs/storybook/blob/master/addons/actions/ADVANCED.md#configuration
 * @see https://storybook.js.org/docs/react/essentials/backgrounds#configuration
 *
 * Theme:
 * Configure Storybook theme, using dark by default.
 * You can customise this behavior per story using parameters.
 * Configuring the theme in "manager.js" didn't work out.
 * Also, the "Docs" section is better using the "normal" theme, for readability.
 *
 * @see https://storybook.js.org/docs/react/configure/theming#global-theming Global theming
 * @see https://storybook.js.org/docs/react/configure/theming#theming-docs Per story theming (parameter)
 * @see https://storybook.js.org/docs/react/configure/theming#create-a-theme-quickstart Creating your own theme
 */
export const parameters = {
  /**
   * Allow to use Next.js Router in Storybook stories.
   *
   * If you need to customise a component/story, then you should see https://github.com/lifeiscontent/storybook-addon-next-router#as-a-decorator-in-a-story
   * You'll need to specify the Router behavior per-story if the below default config doesn't suit you.
   *
   * @see https://github.com/lifeiscontent/storybook-addon-next-router#usage-in-previewjs
   */
  nextRouter: {
    Provider: RouterContext.Provider,
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`
    // @formatter:off Disables odd WebStorm formatting for next line
    push() {}, // defaults to using addon actions integration, can override any method in the router
    // @formatter:on
  },

  actions: {
    argTypesRegex: '^on[A-Z].*',

    /**
     * Since Controls is built on the same engine as Storybook Docs, it can also show property documentation alongside your controls using the expanded parameter (defaults to false).
     * We enable this for all stories by default.
     *
     * @see https://storybook.js.org/docs/react/essentials/controls#show-full-documentation-for-each-property
     */
    expanded: true,
  },

  /**
   * Configure stories argTypes for all stories.
   *
   * @deprecated Should not be used at the moment. See https://github.com/storybookjs/storybook/issues/11697
   * @see https://storybook.js.org/docs/react/essentials/controls
   */
  // argTypes: {},

  /**
   * Options.
   * Couldn't find centralized documentation about it.
   */
  options: {
    /**
     * @see https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
     */
    storySort: {
      method: 'alphabetical',
      order: [
        'App', // Should be first
        'Design System', // Should be second, if kept around
        'Storybook Examples', // Should be last, if kept around
      ],
    },
  },
  docs: {
    theme: themes.normal,
  },
};

/**
 * Storybook ships with toolbar items to control the viewport and background the story renders in.
 *
 * Below, we extend the native toolbar to add a few more options, such as i18n.
 * Those global types can then be used in decorators, for both global decorators and story decorators.
 *
 * @description toolbar.item Can be either an array of plain strings, or a MenuItem.
 *  See https://storybook.js.org/docs/react/essentials/toolbars-and-globals#advanced-usage
 *
 * @description toolbar.icon The icon the will be displayed in the top toolbar.
 *  See https://www.chromatic.com/component?appId=5a375b97f4b14f0020b0cda3&name=Basics%7CIcon&mode=interactive&buildNumber=13899
 *
 * @see https://storybook.js.org/docs/react/essentials/toolbars-and-globals
 */
// export const globalTypes = {
//   locale: {
//     name: 'Locale',
//     description: 'Global locale for components',
//     defaultValue: defaultLocale,
//     toolbar: {
//       icon: 'globe', // See https://www.chromatic.com/component?appId=5a375b97f4b14f0020b0cda3&name=Basics%7CIcon&mode=interactive&buildNumber=13899
//       items: supportedLocales.map((locale) => locale.name),
//     },
//   },
// };

/**
 * Decorators in .storybook/preview.js are useful to mock Stories.
 *
 * Like parameters, decorators can be defined globally, at the component level and for a single story (as we’ve seen).
 * All decorators, defined at all levels that apply to a story will run whenever that story is rendered, in the order:
 * - Global decorators, in the order they are defined
 * - Component decorators, in the order they are defined
 * - Story decorators, in the order they are defined.
 *
 * @see https://storybook.js.org/docs/react/writing-stories/decorators#context-for-mocking
 * @see https://storybook.js.org/docs/react/writing-stories/decorators#global-decorators
 */
export const decorators = [
  (Story, context) => {
    return (
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <ResetStyles />
          <GlobalStyles />

          <Toggler />

          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <Story />
          </div>
        </ThemeProvider>
      </I18nextProvider>
    );
  },
];

const Toggler = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
    >
      <button onClick={() => setColorMode(colorMode === 'dark' ? 'default' : 'dark')}>{colorMode}</button>
    </div>
  );
};

/**
 * Enables storybook-addon-performance for all stories by default.
 *
 * @see https://github.com/atlassian-labs/storybook-addon-performance#installation
 */
addDecorator(withPerformance);

/**
 * Configure Jest Storybook for all stories.
 *
 * Each story must define which test it's associated to, to show the associated tests results in the preview.
 * See https://github.com/storybookjs/storybook/tree/master/addons/jest#usage
 *
 * @see https://github.com/storybookjs/storybook/tree/master/addons/jest
 */
try {
  let testResults;
  testResults = require('../.jest-test-results.json');

  addDecorator(
    withTests({
      results: testResults,
    }),
  );
} catch (e) {
  console.log(`Couldn't find ../.jest-test-results.json, Jest tests might not work properly.`);
}
