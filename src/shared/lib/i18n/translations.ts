import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { SSRConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18nConfig from '../../../../next-i18next.config.mjs';
import { DEFAULT_LOCALE } from './i18n';

type MultiversalContext = GetServerSidePropsContext | GetStaticPropsContext;

export const getTranslationsConfig = async (
  context: MultiversalContext,
  namespaces: string[] = [],
): Promise<SSRConfig> => {
  const { locale = DEFAULT_LOCALE } = context;

  const i18n = await serverSideTranslations(locale, namespaces, nextI18nConfig);

  return i18n;
};
