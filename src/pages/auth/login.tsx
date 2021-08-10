import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import { Input } from 'theme-ui';

import { getAppTitle } from '@/modules/core/meta/meta';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { Button } from '@/common/components/system/Button';
import { getNoneStaticProps } from '@/layouts/core/SSG';
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import { Typography } from '@/common/components/system/Typography';
import { Box } from '@/common/components/system/Box';

const logger = createLogger('Login');

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

const LoginPage: EnhancedNextPage<Props> = (): JSX.Element => {
  const { t } = useTranslation('auth');

  return (
    <>
      <Head>
        <title>{getAppTitle(t('login'))}</title>
      </Head>

      <Box
        maxWidth="440px"
        width="100%"
        padding="32px"
        background="white"
        borderRadius="4px"
        boxShadow={2}
        zIndex={1}
      >
        <Typography variant="h4" component="h1">{t('login')}</Typography>

        <Input placeholder={t('form.email')} mb={2} mt={4} />
        <Input placeholder={t('form.password')} mb={2} />

        <Button variant="contained" fullWidth disableElevation>{t('login')}</Button>

        <Typography variant="body2">
          {t('needAccount')}
          {' '}
          <Link href="/auth/signup">{t('signup')}</Link>
        </Typography>
      </Box>
    </>
  );
};

export const getStaticProps = getNoneStaticProps;

LoginPage.Layout = AuthLayout;

export default LoginPage;
