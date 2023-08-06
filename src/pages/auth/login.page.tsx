import * as React from 'react';
import { useTranslation } from 'next-i18next';

import { AuthLayout } from '@/layouts/auth';

import { LoginForm } from '@/features/auth/login/login-form';

import { createLogger } from '@/shared/lib/logging/logger';
import { PageSEO } from '@/shared/lib/meta';
import { getTranslationsStaticProps } from '@/shared/lib/ssr';
import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { SSGPageProps } from '@/shared/types/ssg-page-props';

const logger = createLogger('Login');

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps = getTranslationsStaticProps(['auth', 'common']);

type LoginPageProps = SSGPageProps;

const LoginPage: EnhancedNextPage<LoginPageProps> = () => {
  const { t } = useTranslation('auth');

  return (
    <>
      <PageSEO title={t('SEO_LOGIN_TITLE')} description={t('SEO_LOGIN_DESCRIPTION')} image={t('SEO_IMAGE_URL')} />

      <LoginForm />
    </>
  );
};

LoginPage.Layout = AuthLayout;

export default LoginPage;
