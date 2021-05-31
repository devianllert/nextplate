/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const i18nConfig = require('./src/modules/core/i18n/i18n.config');

const supportedLocales = i18nConfig.supportedLocales.map((supportedLocale) => {
  return supportedLocale.name;
});

module.exports = {
  i18n: {
    defaultLocale: i18nConfig.defaultLocale,
    locales: supportedLocales,
  },
  localePath: path.resolve('./public/locales'),
};
