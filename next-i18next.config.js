/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const i18nConfig = require('./src/modules/core/i18n/i18n.config');

module.exports = {
  i18n: {
    defaultLocale: i18nConfig.defaultLocale,
    locales: i18nConfig.supportedLanguages,
  },
  localePath: path.resolve('./public/locales'),
};
