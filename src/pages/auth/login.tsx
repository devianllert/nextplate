import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import styled from '@emotion/styled';

import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { Button } from '@/common/components/system/Button';
import { getNoneStaticProps } from '@/layouts/core/SSG';
import { AuthLayout } from '@/layouts/auth/AuthLayout';

const logger = createLogger('Login');

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

/**
 * Props that are only available for this page
 */
type CustomPageProps = {
  [key: string]: any;
};

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = CustomPageProps & (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

const LoginPage: EnhancedNextPage<Props> = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Head>
        <title>Login | dvnllrt</title>
      </Head>

      <Container>
        <Link href="/" passHref locale={i18n.language === 'en' ? 'ru' : 'en'}>
          <Button>
            {`${t('button')} ${i18n.language}`}
          </Button>
        </Link>
      </Container>
    </>
  );
};

export const getStaticProps = getNoneStaticProps;

LoginPage.Layout = AuthLayout;

export default LoginPage;
