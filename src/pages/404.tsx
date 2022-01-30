import { GetStaticProps } from 'next';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { RiArrowRightLine } from 'react-icons/ri';

import { createLogger } from '@/modules/core/logging/logger';
import { getTranslationsStaticProps } from '@/layouts/core/SSG';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { SoftPageProps } from '@/layouts/core/types/SoftPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { NotFound404Layout } from '@/layouts/404/components/NotFound404Layout';
import * as Text from '@/common/components/system/Text';
import { Button } from '@/common/components/system/Button';
import { Stack } from '@/common/components/system/Stack';
import { PageSEO } from '@/modules/core/meta/page-seo';

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

  // Avoids capturing false-positive 404 pages when building the 404 page
  if (!process.env.IS_SERVER_INITIAL_BUILD) {
    // Record an exception in Sentry for 404
    const err = new Error(`Page not found (404) for "${router?.asPath}"`);

    logger.warn(err);
    Sentry.captureException(err);
  }

  return (
    <>
      <PageSEO
        title={t('seo.title')}
        description={t('seo.description')}
        image="/static/images/404.png"
      />

      <Stack direction="column" space={3}>
        <Text.Paragraph variant="body1" color="text.secondary">{t('subtitle')}</Text.Paragraph>

        <Text.Heading component="h1" variant="h4">{t('title')}</Text.Heading>

        <Text.Paragraph variant="body2" color="text.secondary">{t('description')}</Text.Paragraph>

        <Link href="/" passHref>
          <Button
            variant="contained"
            endIcon={<RiArrowRightLine />}
          >
            {t('button')}
          </Button>
        </Link>
      </Stack>
    </>
  );
};

NotFound404Page.Layout = NotFound404Layout;

export const NotFound404PageName = NotFound404Page.name;

export default NotFound404Page;
