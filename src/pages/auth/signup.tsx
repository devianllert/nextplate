import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Input } from 'theme-ui';

import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { Button } from '@/common/components/system/Button';
import { getNoneStaticProps } from '@/layouts/core/SSG';
import { AuthLayout } from '@/layouts/auth/AuthLayout';
import shape from '@/common/design/tokens/shape';
import { Typography } from '@/common/components/system/Typography';
import shadows from '@/common/design/tokens/shadows';

const logger = createLogger('SignUp');

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

const Form = styled.form({
  zIndex: 1,
  maxWidth: 440,
  width: '100%',
  padding: 32,
  background: 'white',
  borderRadius: shape.round,
  boxShadow: shadows[2],
});

const SignUpPage: EnhancedNextPage<Props> = (): JSX.Element => {
  const { t } = useTranslation('auth');

  return (
    <>
      <Head>
        <title>{t('signup')} | dvnllrt</title>
      </Head>

      <Form>
        <Typography variant="h4" component="h1">{t('signup')}</Typography>

        <Input placeholder={t('form.email')} mb={2} mt={4} />
        <Input placeholder={t('form.name')} mb={2} />
        <Input placeholder={t('form.password')} mb={2} />
        <Input placeholder={t('form.confirmPassword')} mb={2} />

        <Button variant="contained" fullWidth disableElevation>{t('login')}</Button>

        <Typography variant="body2">
          <Link href="/auth/login">{t('haveAccount')}</Link>
        </Typography>
      </Form>
    </>
  );
};

export const getStaticProps = getNoneStaticProps;

SignUpPage.Layout = AuthLayout;

export default SignUpPage;
