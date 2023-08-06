import * as React from 'react';
import { Box, SkipNavContent } from '@effable/react';

import { MainFooter } from '../main-footer';
import { MainHeader } from '../main-header';

interface MainLayoutProps {
  /**
   * The content
   */
  children?: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  return (
    <Box display="flex" width="100%" minHeight="100vh" flexDirection="column">
      <MainHeader />

      <SkipNavContent />
      {children}

      <MainFooter />
    </Box>
  );
};
