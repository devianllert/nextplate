import * as React from 'react';

import {
  Box,
  Text,
  Heading,
  Stack,
  EffableProvider,
} from '@effable/react';

import { MainLayout } from '@/layouts/new-main';

import { Advantage } from '@/features/new-main-page/advantage';
import { DemoItem } from '@/features/new-main-page/demo-item';
import { Header } from '@/features/new-main-page/header';
import { DignityGrid } from '@/features/new-main-page/dignity-grid';

import Performance from '@/shared/icons/performance';
import Best from '@/shared/icons/best-class';
import Built from '@/shared/icons/built-In-demo';
import Feature from '@/shared/icons/feature';

import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { SSRPageProps } from '@/shared/types/ssr-page-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import { OnlyBrowserPageProps } from '@/shared/types/only-browser-page-props';

type Props = SSRPageProps & SSGPageProps<OnlyBrowserPageProps>;

const IndexPage: EnhancedNextPage<Props> = (): JSX.Element => {
  return (
    <EffableProvider>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
      >
        <DignityGrid />
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          alignItems="center"
          marginTop="192px"
        >
          <Heading>
            Why Nextplate?
          </Heading>

          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            marginTop="11x"
          >
            <Advantage
              title="Performant"
              description="Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more"
              icon={<Performance />}
            />

            <Advantage
              title="Feature-rich"
              description="Packed full of useful features like Theming (Theme-ui), CSS-in-JS (Emotion), i18n (next-i18next), Testing (Jest), Logging, Monitoring (Sentry), Storybook and a fully-typed API and much more"
              icon={<Feature />}
            />

            <Advantage
              title="Best-in-class DX"
              description="This boilerplate is meant for developers with basic skills in React, who are looking for a way of building production-grade web applications"
              icon={<Best />}
            />

            <Advantage
              title="Built-in demo apps"
              description="This boilerplate has several built-in demo apps that show an example of using the features of this template"
              icon={<Built />}
            />

          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          marginTop="128px"
        >
          <Heading>
            Some features demo
          </Heading>

          <Box>
            <DemoItem
              title="Authorization"
              preview="123"
              description="A full-fledged authorization flow with registration and login, as well as a password recovery function. It is also possible to register / login through third-party services (Google, Twitter, Apple, Github).
  After Login, you can view your profile, change information about it, change your password, etc.
  Also, when changing the page from login to registration and back, there is a clear example of transition animations. Field validation, error handling from the server."
            />
          </Box>
        </Box>
      </Box>
    </EffableProvider>

  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
