import * as React from 'react';

import { Box } from '@effable/react';

import { MainLayout } from '@/layouts/main';

import { Demos } from '@/features/new-main-page/demos';
import { Hero } from '@/features/new-main-page/hero';
import { WhyNextplate } from '@/features/new-main-page/why-nextplate';

import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { OnlyBrowserPageProps } from '@/shared/types/only-browser-page-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import { SSRPageProps } from '@/shared/types/ssr-page-props';

type Props = SSRPageProps & SSGPageProps<OnlyBrowserPageProps>;

const IndexPage: EnhancedNextPage<Props> = (): JSX.Element => {
  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Hero />

      <WhyNextplate />

      <Demos />
    </Box>
  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
