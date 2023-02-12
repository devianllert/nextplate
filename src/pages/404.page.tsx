import React from 'react';

import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Button, Heading, Stack, Text,
} from '@effable/react';
import * as Sentry from '@sentry/nextjs';
import { useTranslation } from 'next-i18next';
import { RiArrowRightLine } from 'react-icons/ri';

import { NotFoundLayout } from '@/layouts/404';

import { staticPath } from '@/shared/lib/$path';
import { createLogger } from '@/shared/lib/logging/logger';
import { PageSEO } from '@/shared/lib/meta';
import { getTranslationsStaticProps } from '@/shared/lib/ssr';
import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { SoftPageProps } from '@/shared/types/soft-page-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';

const fileLabel = 'pages/404';
const logger = createLogger(fileLabel);

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps> = getTranslationsStaticProps(['404']);

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = SoftPageProps;

const NotFound404Page: EnhancedNextPage<Props> = (): JSX.Element => {
  const router = useRouter();

  const { t } = useTranslation('404');

  React.useEffect(() => {
    const err = new Error(`Page not found (404) for "${router?.asPath}"`);

    logger.warn(err);
    Sentry.captureException(err);
  }, []);

  return (
    <>
      <PageSEO title={t('SEO_TITLE')} description={t('SEO_DESCRIPTION')} image={staticPath.static.images.$404_png} />

      <Stack direction="column" space={3}>
        <Text variant="l" color="secondary">
          {t('SUBTITLE')}
        </Text>

        <Heading component="h1" variant="h1">
          {t('TITLE')}
        </Heading>

        <Text variant="s" color="secondary">
          {t('DESCRIPTION')}
        </Text>

        <Link href="/" passHref>
          <Button endIcon={<RiArrowRightLine />}>{t('BUTTON')}</Button>
        </Link>
      </Stack>
    </>
  );
};

NotFound404Page.Layout = NotFoundLayout;

export default NotFound404Page;
