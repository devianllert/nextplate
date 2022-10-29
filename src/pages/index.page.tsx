import { useTranslation, Trans } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import {
  RiAppsLine, RiFlashlightFill, RiGithubFill, RiGroupLine, RiSettings4Line,
} from 'react-icons/ri';

import { createLogger } from '@/shared/lib/logging/logger';
import { Button } from '@/shared/components/system/button';
import { Box } from '@/shared/components/system/box';
import { Container } from '@/shared/components/system/container';
import * as Text from '@/shared/components/system/text';
import { Stack } from '@/shared/components/system/stack';
import { Code } from '@/shared/components/system/code';
import { AspectRatio } from '@/shared/components/system/aspect-ratio';
import { useTheme } from '@/shared/design/hooks/use-theme';
import { PageSEO } from '@/shared/lib/meta';
import { getTranslationsStaticProps } from '@/shared/lib/ssr';
import { MainLayout } from '@/layouts/main';
import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { SSRPageProps } from '@/shared/types/ssr-page-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import { OnlyBrowserPageProps } from '@/shared/types/only-browser-page-props';
import { pagesPath, staticPath } from '@/shared/lib/$path';

const logger = createLogger('Index');

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props.
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps = getTranslationsStaticProps(['common', 'index']);

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
  const { t, i18n } = useTranslation('index');
  const { theme } = useTheme();

  return (
    <>
      <PageSEO title={t('SEO_TITLE')} description={t('SEO_DESCRIPTION')} />

      <Box
        pt={64}
        backgroundImage={`
          radial-gradient(circle 500px at 40% 300px, ${theme.colors.radix.primary3}, #16161800),
          radial-gradient(circle 500px at 60% 400px, ${theme.colors.radix.secondary4}, #16161800),
          radial-gradient(circle 700px at 20% calc(40% - 100px), ${theme.colors.radix.secondary2}, ${theme.colors.radix.secondary1}, #16161800),
          radial-gradient(circle 700px at 80% calc(40% - 100px), ${theme.colors.radix.primary2}, ${theme.colors.radix.primary1}, #16161800)
        `}
      >
        <Box>
          <Container>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              flex="1"
              minHeight={['75vh', null, '720px']}
              maxHeight="calc(1024px - 64px)"
              py={8}
              maxWidth={620}
            >
              <Text.Heading variant="h3" textAlign="left">
                {t('HERO_TITLE')}
              </Text.Heading>
              <Text.Heading variant="h6" color="text.secondary" textAlign="left" sx={{ mt: 4 }}>
                {t('HERO_SUBTITLE')}
              </Text.Heading>

              <Box mt={4}>
                <Stack direction="row" space={3}>
                  <Button variant="contained" component="a" href="#features">
                    {t('HERO_DOCUMENTATION')}
                  </Button>

                  <Button
                    variant="text"
                    color="gray"
                    component="a"
                    target="_blank"
                    href="https://github.com/devianllert/"
                    endIcon={<RiGithubFill size={16} />}
                  >
                    Github
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Box>

        <Box py={8} id="features">
          <Container>
            <Text.Heading variant="h4" textAlign="center" sx={{ mb: 8 }}>
              {t('FEATURES_TITLE')}
            </Text.Heading>

            <Box
              display="grid"
              gridTemplateColumns={[
                'repeat(1, minmax(0, 1fr))',
                'repeat(2, minmax(0, 1fr))',
                'repeat(4, minmax(0, 1fr))',
              ]}
              gridGap={4}
            >
              <Box>
                <Box
                  width={32}
                  height={32}
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="radix.primaryA5"
                  color="radix.primaryA11"
                >
                  <RiFlashlightFill />
                </Box>

                <Text.Heading variant="h6" component="h3" sx={{ my: 2 }}>
                  {t('FEATURES_PERFORMANT_TITLE')}
                </Text.Heading>

                <Text.Paragraph variant="body2" component="span" color="text.secondary">
                  {t('FEATURES_PERFORMANT_DESCRIPTION')}
                </Text.Paragraph>
              </Box>

              <Box>
                <Box
                  width={32}
                  height={32}
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="radix.primaryA5"
                  color="radix.primaryA11"
                >
                  <RiSettings4Line />
                </Box>

                <Text.Heading variant="h6" component="h3" sx={{ my: 2 }}>
                  {t('FEATURES_RICH_TITLE')}
                </Text.Heading>

                <Text.Paragraph variant="body2" component="span" color="text.secondary">
                  <Trans t={t} i18nKey="FEATURES_RICH_DESCRIPTION" components={[<Code />]} />
                </Text.Paragraph>
              </Box>

              <Box>
                <Box
                  width={32}
                  height={32}
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="radix.primaryA5"
                  color="radix.primaryA11"
                >
                  <RiGroupLine />
                </Box>

                <Text.Heading variant="h6" component="h3" sx={{ my: 2 }}>
                  {t('FEATURES_DX_TITLE')}
                </Text.Heading>

                <Text.Paragraph variant="body2" component="span" color="text.secondary">
                  {t('FEATURES_DX_DESCRIPTION')}
                </Text.Paragraph>
              </Box>

              <Box>
                <Box
                  width={32}
                  height={32}
                  borderRadius="50%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="radix.primaryA5"
                  color="radix.primaryA11"
                >
                  <RiAppsLine />
                </Box>
                <Text.Heading variant="h6" component="h3" sx={{ my: 2 }}>
                  {t('FEATURES_APPS_TITLE')}
                </Text.Heading>

                <Text.Paragraph variant="body2" component="span" color="text.secondary">
                  {t('FEATURES_APPS_DESCRIPTION')}
                </Text.Paragraph>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <Box py={8}>
        <Container>
          <Text.Heading variant="h4" textAlign="center" sx={{ mb: 8 }}>
            {t('FEATURES_APPS_TITLE')}
          </Text.Heading>

          <Box
            display="grid"
            gridTemplateColumns={[
              'repeat(1, minmax(0, 1fr))',
              'repeat(2, minmax(0, 1fr))',
              'repeat(2, minmax(0, 1fr))',
            ]}
            gridGap={4}
          >
            <Box display="block" component={Link} href={pagesPath.weather.$url()} boxShadow={4}>
              <Box borderRadius="4px" overflow="hidden" position="relative">
                <AspectRatio ratio={16 / 9}>
                  <Image fill alt="weather app" src={staticPath.static.images.apps.weather_png} />
                </AspectRatio>

                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  background="linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
                  px={2}
                  pb={2}
                  pt={4}
                >
                  <Text.Heading variant="h6" color="white">
                    Weather app
                  </Text.Heading>
                </Box>
              </Box>
            </Box>

            <Box display="block" component={Link} href="/auth/login" boxShadow={4}>
              <Box borderRadius="4px" overflow="hidden" position="relative">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    fill
                    alt="auth app"
                    src={staticPath.static.images.apps[i18n.language === 'cimode' ? 'en' : i18n.language].auth_png}
                  />
                </AspectRatio>

                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  background="linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
                  px={2}
                  pb={2}
                  pt={4}
                >
                  <Text.Heading variant="h6" color="white">
                    Auth app
                  </Text.Heading>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
