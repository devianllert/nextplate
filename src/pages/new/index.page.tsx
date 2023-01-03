import * as React from 'react';

import {
  Box,
  Text,
  Heading,
  Stack,
} from '@effable/react';

import { MainLayout } from '@/layouts/new-main';

import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { SSRPageProps } from '@/shared/types/ssr-page-props';
import { SSGPageProps } from '@/shared/types/ssg-page-props';
import { OnlyBrowserPageProps } from '@/shared/types/only-browser-page-props';

type Props = SSRPageProps & SSGPageProps<OnlyBrowserPageProps>;

const IndexPage: EnhancedNextPage<Props> = (): JSX.Element => {
  return (
    <Box>
      12
    </Box>
  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
