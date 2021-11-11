import { useTranslation, Trans } from 'next-i18next';
import Image from 'next/image';
import Head from 'next/head';
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
import { getAppTitle } from '@/modules/core/meta/meta';
import { Box } from '@/common/components/system/Box';
import { Container } from '@/common/components/system/Container';
import { getTranslationsStaticProps } from '@/layouts/core/SSG';
import { Typography } from '@/common/components/system/Typography';
import { Stack } from '@/common/components/system/Stack';
import { Code } from '@/common/components/system/Code';
import { AspectRatio } from '@/common/components/system/AspectRatio';

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
  const { t, i18n } = useTranslation('index');

  return (
    <>
      <Head>
        <title>{getAppTitle('Home')}</title>
      </Head>

      <Box
        position="relative"
        backgroundColor="background.secondary"
        backgroundImage="url(/static/images/circle-scatter.svg)"
        backgroundRepeat="no-repeat"
        backgroundSize="100% 100%"
      >
        <Container>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            flex="1"
            minHeight="calc(640px - 64px)"
            maxHeight="calc(1024px - 64px)"
            height="calc(100vh - 64px)"
            maxWidth="840px"
            mx="auto"
          >
            <Typography variant="h2" align="center" sx={{ px: [0, 64] }}>{t('hero.title')}</Typography>
            <Typography variant="h6" component="span" align="center" sx={{ px: [0, 128] }}>{t('hero.subtitle')}</Typography>

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
          <Typography variant="h4" align="center" sx={{ mb: 8 }} display="block">
            {t('features.title')}
          </Typography>

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

              <Typography variant="h6" component="span" display="block" sx={{ my: 2 }}>{t('features.performant.title')}</Typography>

              <Typography variant="body1" component="span" display="block" color="text.secondary">
                {t('features.performant.description')}
              </Typography>
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

              <Typography variant="h6" component="span" display="block" sx={{ my: 2 }}>{t('features.rich.title')}</Typography>

              <Typography variant="body1" component="span" display="block" color="text.secondary">
                <Trans t={t} i18nKey="features.rich.description" components={[<Code />]} />
              </Typography>
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

              <Typography variant="h6" component="span" display="block" sx={{ my: 2 }}>{t('features.dx.title')}</Typography>

              <Typography variant="body1" component="span" display="block" color="text.secondary">
                {t('features.dx.description')}
              </Typography>
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
              <Typography variant="h6" component="span" display="block" sx={{ my: 2 }}>{t('features.apps.title')}</Typography>

              <Typography variant="body1" component="span" display="block" color="text.secondary">
                {t('features.apps.description')}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box py={8}>
        <Container>
          <Typography variant="h4" align="center" sx={{ mb: 8 }} display="block">
            {t('features.apps.title')}
          </Typography>

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
                    <Typography variant="h6" display="block" color="white">
                      Weather app
                    </Typography>
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
                    <Typography variant="h6" display="block" color="white">
                      Auth app
                    </Typography>
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

export const getStaticProps = getTranslationsStaticProps(['common', 'index']);

IndexPage.Layout = MainLayout;

export default IndexPage;
