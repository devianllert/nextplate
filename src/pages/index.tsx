import { useTranslation } from 'next-i18next';
import Head from 'next/head';
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
            <Typography variant="h2" align="center" px={[0, 64]}>Start your app with confidence</Typography>
            <Typography variant="h6" component="span" align="center" px={[0, 128]}>Meant to help you build production-grade projects using the Next.js framework</Typography>

            <Box>
              <Button variant="contained" mt={4} mx={2} component="a" href="#features">
                Documentation
              </Button>

              <Button
                variant="text"
                color="gray"
                mt={4}
                mx={2}
                component="a"
                target="_blank"
                href="https://github.com/devianllert/next-boilerplate"
                endIcon={<RiGithubFill size={16} />}
              >
                Github
              </Button>
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
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
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
          <Typography variant="h4" align="center" mb={8} display="block">
            Built-in features
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

              <Typography variant="h6" component="span" display="block" my={2}>Performant</Typography>

              <Typography variant="body1" component="span" display="block" color="text.secondary">
                Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more
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

              <Typography variant="h6" component="span" display="block" my={2}>Feature-rich</Typography>

              <Typography variant="body1" component="span" display="block" color="text.secondary">
                Packed full of useful features like Theming (Theme-ui), CSS-in-JS (Emotion), i18n (next-i18next), Testing (Jest), Logging, Monitoring (Sentry), Storybook and a fully-typed API and much more!
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

              <Typography variant="h6" component="span" display="block" my={2}>Best-in-class DX</Typography>

              <Typography variant="body1" component="span" display="block" color="text.secondary">
                This boilerplate is meant for developers with basic skills in React,
                who are looking for a way of building production-grade web applications.
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
              <Typography variant="h6" component="span" display="block" my={2}>Built-in demo apps</Typography>

              <Typography variant="body1" component="span" display="block" color="text.secondary">
                This boilerplate has several built-in demo apps that show an example of using the features of this template.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps = getTranslationsStaticProps(['common']);

IndexPage.Layout = MainLayout;

export default IndexPage;
