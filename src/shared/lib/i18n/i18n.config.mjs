/**
 * List of all supported locales by your app.
 *
 * If a user tries to load your site using non-supported locales, the default locale is used instead.
 *
 * @type {Record<string, string>}
 */
const supportedLocales = {
  ENGLISH: 'en',
  RUSSIAN: 'ru',
  ...(process.env.NEXT_PUBLIC_APP_STAGE === 'development' && {
    CIMODE: 'cimode',
  }),
};

/**
 * Select the "supportedLocales.name" you want to use by default in your app.
 * This value will be used as a fallback value, when the user locale cannot be resolved.
 *
 * @example en
 * @example en-US
 *
 * @type {string}
 */
const defaultLocale = supportedLocales.ENGLISH;

/**
 * Returns the list of all supported languages.
 * Basically extracts the "lang" parameter from the supported locales array.
 *
 * @type {string[]}
 */
const supportedLanguages = Object.values(supportedLocales);

export { defaultLocale, supportedLocales, supportedLanguages };
