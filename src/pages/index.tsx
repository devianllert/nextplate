import { useTranslation, Trans } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import {
  RiAppsLine,
  RiFlashlightFill,
  RiGithubFill,
  RiGroupLine,
  RiSettings4Line,
} from 'react-icons/ri';

import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { MainLayout } from '@/layouts/main/components/MainLayout';
import { Button } from '@/common/components/system/Button';
import { Box } from '@/common/components/layout/Box';
import { Container } from '@/common/components/layout/Container';
import { getTranslationsStaticProps } from '@/layouts/core/SSG';
import * as Text from '@/common/components/system/Text';
import { Stack } from '@/common/components/layout/Stack';
import { Code } from '@/common/components/system/Code';
import { AspectRatio } from '@/common/components/system/AspectRatio';
import { useTheme } from '@/common/design/hooks/useTheme';
import { PageSEO } from '@/modules/core/meta/page-seo';

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
      <PageSEO
        title={t('seo.title')}
        description={t('seo.description')}
      />

      <Box
        position="relative"
        backgroundColor="background.secondary"
        backgroundImage={`
          radial-gradient(circle at 15% 50%, ${theme.colors.radix.primaryA4}, rgba(255, 255, 255, 0) 25%),
          radial-gradient(circle at 85% 30%, ${theme.colors.radix.secondaryA6}, rgba(255, 255, 255, 0) 25%),
          radial-gradient(circle at 65% 55%, ${theme.colors.radix.secondaryA4}, rgba(255, 255, 255, 0) 25%)
        `}
        backgroundRepeat="no-repeat"
        backgroundSize="100% 100%"
      >
        <Container>
          <Box
            display="flex"
            flexDirection={['column-reverse', null, 'row']}
            justifyContent={['center', null, 'space-between']}
            alignItems="center"
            flex="1"
            minHeight="calc(640px - 64px)"
            maxHeight="calc(1024px - 64px)"
            height="100vh"
            mx="auto"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems={['center', null, 'flex-start']}
              maxWidth="480px"
            >
              <Text.Heading variant="h2" textAlign={['center', null, 'left']}>{t('hero.title')}</Text.Heading>
              <Text.Heading variant="h6" textAlign={['center', null, 'left']}>{t('hero.subtitle')}</Text.Heading>

              <Box mt={4}>
                <Stack direction="row" space={3}>
                  <Button variant="contained" component="a" href="#features">
                    {t('hero.documentation')}
                  </Button>

                  <Button
                    variant="text"
                    color="gray"
                    component="a"
                    target="_blank"
                    href="https://github.com/devianllert/next-boilerplate"
                    endIcon={<RiGithubFill size={16} />}
                  >
                    Github
                  </Button>
                </Stack>
              </Box>
            </Box>

            <Box maxWidth={[240, null, 480]}>
              <img src="/static/images/hero-banner.png" alt="" />
            </Box>
          </Box>
        </Container>

        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="100%"
          overflow="hidden"
          transform="rotate(180deg)"
        >
          <Box
            component="svg"
            position="relative"
            display="block"
            width="100%"
            height={['48px', null, '150px']}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <Box
              component="path"
              color="background.primary"
              fill="currentColor"
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            />
          </Box>
        </Box>
      </Box>

      <Box py={8} id="features">
        <Container>
          <Text.Heading variant="h4" textAlign="center" sx={{ mb: 8 }}>
            {t('features.title')}
          </Text.Heading>

          <Box display="grid" gridTemplateColumns={['repeat(1, minmax(0, 1fr))', 'repeat(2, minmax(0, 1fr))', 'repeat(4, minmax(0, 1fr))']} gridGap={4}>
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

              <Text.Heading variant="h6" component="h3" sx={{ my: 2 }}>{t('features.performant.title')}</Text.Heading>

              <Text.Paragraph variant="body2" component="span" color="text.secondary">
                {t('features.performant.description')}
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

              <Text.Heading variant="h6" component="h3" sx={{ my: 2 }}>{t('features.rich.title')}</Text.Heading>

              <Text.Paragraph variant="body2" component="span" color="text.secondary">
                <Trans t={t} i18nKey="features.rich.description" components={[<Code />]} />
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

              <Text.Heading variant="h6" component="h3" sx={{ my: 2 }}>{t('features.dx.title')}</Text.Heading>

              <Text.Paragraph variant="body2" component="span" color="text.secondary">
                {t('features.dx.description')}
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
              <Text.Heading variant="h6" component="h3" sx={{ my: 2 }}>{t('features.apps.title')}</Text.Heading>

              <Text.Paragraph variant="body2" component="span" color="text.secondary">
                {t('features.apps.description')}
              </Text.Paragraph>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box py={8}>
        <Container>
          <Text.Heading variant="h4" textAlign="center" sx={{ mb: 8 }}>
            {t('features.apps.title')}
          </Text.Heading>

          <Box display="grid" gridTemplateColumns={['repeat(1, minmax(0, 1fr))', 'repeat(2, minmax(0, 1fr))', 'repeat(2, minmax(0, 1fr))']} gridGap={4}>
            <Link href="/weather" passHref>
              <Box display="block" component="a" boxShadow={4}>
                <Box borderRadius="4px" overflow="hidden" position="relative">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      objectFit="cover"
                      objectPosition="top"
                      layout="fill"
                      src="/static/images/apps/weather.png"
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
                      Weather app
                    </Text.Heading>
                  </Box>
                </Box>
              </Box>
            </Link>

            <Link href="/auth/login" passHref>
              <Box display="block" component="a" boxShadow={4}>
                <Box borderRadius="4px" overflow="hidden" position="relative">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      objectFit="cover"
                      objectPosition="center"
                      layout="fill"
                      src={`/static/images/apps/${i18n.language}/auth.png`}
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
            </Link>
          </Box>

        </Container>
      </Box>
    </>
  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
