import * as React from 'react';

import {
  Box,
  Text,
  Heading,
  Stack,
  EffableProvider,
} from '@effable/react';

import { MainLayout } from '@/layouts/new-main';

import { DemoItem } from '@/features/new-main-page/demo-item';
import { Header } from '@/features/new-main-page/header';
import { DignityGrid } from '@/features/new-main-page/dignity-grid';

import { WhyNextplate } from '@/features/new-main-page/why-nextplate';

import { Section } from '@/features/new-main-page/section';

import { Demos } from '@/features/new-main-page/demos';

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
        <Header />

        <WhyNextplate />

        <Demos />

        {/* <Section>
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
        </Section> */}
      </Box>
    </EffableProvider>

  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
