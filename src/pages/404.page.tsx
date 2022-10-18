import { GetStaticProps } from 'next';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { RiArrowRightLine } from 'react-icons/ri';

import React from 'react';
import { createLogger } from '@/shared/lib/logging/logger';
import * as Text from '@/shared/components/system/text';
import { Button } from '@/shared/components/system/button';
import { Stack } from '@/shared/components/system/stack';
import { PageSEO } from '@/shared/lib/meta';
import { getTranslationsStaticProps } from '@/shared/lib/ssr';
import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { SoftPageProps } from '@/shared/types/soft-page-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import { NotFoundLayout } from '@/layouts/404';
import { staticPath } from '@/shared/lib/$path';

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
      <PageSEO
        title={t('SEO_TITLE')}
        description={t('SEO_DESCRIPTION')}
        image={staticPath.static.images.$404_png}
      />

      <Stack direction="column" space={3}>
        <Text.Paragraph variant="body1" color="text.secondary">{t('SUBTITLE')}</Text.Paragraph>

        <Text.Heading component="h1" variant="h4">{t('TITLE')}</Text.Heading>

        <Text.Paragraph variant="body2" color="text.secondary">{t('DESCRIPTION')}</Text.Paragraph>

        <Link href="/" passHref>
          <Button
            variant="contained"
            endIcon={<RiArrowRightLine />}
          >
            {t('BUTTON')}
          </Button>
        </Link>
      </Stack>
    </>
  );
};

NotFound404Page.Layout = NotFoundLayout;

export default NotFound404Page;
