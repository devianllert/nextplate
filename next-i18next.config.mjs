import path from 'path';

import { defaultLocale, supportedLanguages } from './src/shared/lib/i18n/i18n.config.mjs';

/**
 * @type {import('next-i18next').UserConfig}
 */
const config = {
  i18n: {
    defaultLocale,
    locales: supportedLanguages,
  },
  localePath: path.resolve('./public/locales'),
};

export default config;
