import { useTranslation } from 'next-i18next';

import { AuthLayout } from '@/layouts/auth';

import { RegisterForm } from '@/features/auth/register/register-form';

import { createLogger } from '@/shared/lib/logging/logger';
import { PageSEO } from '@/shared/lib/meta';
import { getTranslationsStaticProps } from '@/shared/lib/ssr';
import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { SSGPageProps } from '@/shared/types/ssg-page-props';

const logger = createLogger('SignUp');

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps = getTranslationsStaticProps(['auth', 'common']);

type SignUpPageProps = SSGPageProps;

const SignUpPage: EnhancedNextPage<SignUpPageProps> = () => {
  const { t } = useTranslation('auth');

  return (
    <>
      <PageSEO title={t('SEO_SIGNUP_TITLE')} description={t('SEO_SIGNUP_DESCRIPTION')} image={t('SEO_IMAGE_URL')} />

      <RegisterForm />
    </>
  );
};

SignUpPage.Layout = AuthLayout;

export default SignUpPage;
