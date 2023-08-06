import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Heading, Stack, Text } from '@effable/react';
import * as Sentry from '@sentry/nextjs';
import { useTranslation } from 'next-i18next';
import { RiArrowRightLine } from 'react-icons/ri';

import { NotFoundLayout } from '@/layouts/404';

import { staticPath } from '@/shared/lib/$path';
import { createLogger } from '@/shared/lib/logging/logger';
import { PageSEO } from '@/shared/lib/meta';
import { getTranslationsStaticProps } from '@/shared/lib/ssr';
import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
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

type NotFound404PageProps = SSGPageProps;

const NotFound404Page: EnhancedNextPage<NotFound404PageProps> = () => {
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

      <Stack direction="column" space="4x" alignItems="flex-start">
        <Text variant="xl" color="text.secondary">
          {t('SUBTITLE')}
        </Text>

        <Heading component="h1" variant="h0">
          {t('TITLE')}
        </Heading>

        <Text variant="m" color="text.secondary">
          {t('DESCRIPTION')}
        </Text>

        <Button endIcon={<RiArrowRightLine />} variant="secondary" component={Link} href="/">
          {t('BUTTON')}
        </Button>
      </Stack>
    </>
  );
};

NotFound404Page.Layout = NotFoundLayout;

export default NotFound404Page;
