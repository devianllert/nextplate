import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { Button } from '@/common/components/system/Button';
import { getTranslationsStaticProps } from '@/layouts/core/SSG';
import { AuthLayout } from '@/layouts/auth/components/AuthLayout';
import * as Text from '@/common/components/system/Text';
import { Box } from '@/common/components/system/Box';
import { Input, InputAdornment } from '@/common/components/system/Input';
import { Stack } from '@/common/components/system/Stack';
import { useBoolean } from '@/common/hooks/useBoolean';
import { IconButton } from '@/common/components/system/IconButton';
import { PageSEO } from '@/modules/core/meta/page-seo';

const logger = createLogger('SignUp');

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps = getTranslationsStaticProps(['auth']);

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

const SignUpPage: EnhancedNextPage<Props> = (): JSX.Element => {
  const { t, i18n } = useTranslation('auth');

  const [show, toggleShow] = useBoolean(false);

  return (
    <>
      <PageSEO
        title={t('seo.signup.title')}
        description={t('seo.signup.description')}
        image={t('seo.image')}
      />

      <Box
        component="form"
        maxWidth="440px"
        width="100%"
      >
        <Text.Heading variant="h3" component="h1" sx={{ mb: 4 }}>{t('signup')}</Text.Heading>

        <Stack direction="column">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t('form.email.placeholder')}
            label={t('form.email.label')}
            fullWidth
          />
          <Input
            id="name"
            name="name"
            placeholder={t('form.name.placeholder')}
            autoComplete="username"
            label={t('form.name.label')}
            fullWidth
          />
          <Input
            id="password"
            name="password"
            type={show ? 'text' : 'password'}
            suffix={(
              <InputAdornment>
                <IconButton onClick={() => toggleShow()} size="small">
                  {show ? <RiEyeLine /> : <RiEyeOffLine />}
                </IconButton>
              </InputAdornment>
            )}
            placeholder={t('form.password.placeholder')}
            autoComplete="new-password"
            label={t('form.password.label')}
            fullWidth
          />
          <Input
            id="confirmPassword"
            type={show ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder={t('form.confirmPassword.placeholder')}
            suffix={(
              <InputAdornment>
                <IconButton onClick={() => toggleShow()} size="small">
                  {show ? <RiEyeLine /> : <RiEyeOffLine />}
                </IconButton>
              </InputAdornment>
            )}
            name="confirmPassword"
            label={t('form.confirmPassword.label')}
            fullWidth
          />

          <Button variant="contained" fullWidth disableElevation>{t('signup')}</Button>
        </Stack>

        <Text.Paragraph variant="body2">
          <Link href="/auth/login">{t('haveAccount')}</Link>
        </Text.Paragraph>
      </Box>
    </>
  );
};

SignUpPage.Layout = AuthLayout;

export default SignUpPage;
