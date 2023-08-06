import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import nextI18nConfig from '../../../next-i18next.config.mjs';

export const withI18n = (Component: AppProps['Component']) => appWithTranslation(Component, nextI18nConfig);
