import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';

import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { MainLayout } from '@/layouts/main/components/MainLayout';
import { Button } from '@/common/components/system/Button';
import { getAppTitle } from '@/modules/core/meta/meta';
import { Box } from '@/common/components/system/Box';
import { Container } from '@/common/components/system/Container';
import { getTranslationsStaticProps } from '@/layouts/core/SSG';
import { Typography } from '@/common/components/system/Typography';

const logger = createLogger('Index');

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = SSRPageProps & SSGPageProps<OnlyBrowserPageProps>;

const IndexPage: EnhancedNextPage<Props> = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Head>
        <title>{getAppTitle('Home')}</title>
      </Head>

      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h1">Next Boilerplate</Typography>
          <Typography variant="h6" component="span">Next Boilerplate description</Typography>

          <Button variant="contained" mt={4}>
            Explore More
          </Button>
        </Box>
      </Container>
    </>
  );
};

export const getStaticProps = getTranslationsStaticProps(['common']);

IndexPage.Layout = MainLayout;

export default IndexPage;
