import * as React from 'react';

import { Box } from '@effable/react';

import { MainFooter } from '../main-footer';
import { MainHeader } from '../main-header';

export interface MainLayoutProps {
  /**
   * The content
   */
  children?: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps): JSX.Element => {
  const { children } = props;

  return (
    <Box display="flex" width="100%" minHeight="100vh" flexDirection="column">
      <MainHeader />

      {children}

      <MainFooter />
    </Box>
  );
};
