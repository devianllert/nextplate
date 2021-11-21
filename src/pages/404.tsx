import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import * as Sentry from '@sentry/nextjs';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { createLogger } from '@/modules/core/logging/logger';
import { getAppTitle } from '@/modules/core/meta/meta';
import { getTranslationsStaticProps } from '@/layouts/core/SSG';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { SoftPageProps } from '@/layouts/core/types/SoftPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { NotFound404Layout } from '@/layouts/404/components/NotFound404Layout';
import * as Text from '@/common/components/system/Text';
import { Button } from '@/common/components/system/Button';

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
// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {} & SoftPageProps;

/**
 * Doesn't use "getStaticPaths" because it's not supported by Next.js "getStaticPaths can only be used with dynamic pages, not '/404'."
 *
 * XXX The "locale" cannot be resolved properly using SSG on 404 pages, because this file doesn't belong to the "/[locale]" folder and thus doesn't benefit from url rewriting
 *  Therefore, the page will be displayed based on the DEFAULT_LOCALE value and not on the actual end-user locale
 *
 * @param props
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#404-page
 */
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
      <Head>
        <title>{getAppTitle('404')}</title>
      </Head>

      <Text.Heading variant="h1">{t('title')}</Text.Heading>
      <Text.Paragraph variant="body1">{t('description')}</Text.Paragraph>
      <Link href="/" passHref>
        <Button>{t('button')}</Button>
      </Link>
    </>
  );
};

NotFound404Page.Layout = NotFound404Layout;

export const NotFound404PageName = NotFound404Page.name;

export default NotFound404Page;
