import {
  GetServerSidePropsContext, GetStaticPropsContext,
} from 'next';
import { SSRConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { DEFAULT_LOCALE } from '@/modules/core/i18n/i18n';

type MultiversalContext = GetServerSidePropsContext | GetStaticPropsContext;

export const getTranslationsConfig = async (context: MultiversalContext, namespaces: string[] = []): Promise<SSRConfig> => {
  const {
    locale = DEFAULT_LOCALE,
  } = context;

  const i18n = await serverSideTranslations(locale, namespaces);

  return i18n;
};
