import * as React from 'react';

import {
  Box,
} from '@effable/react';

export interface MainLayoutProps {
  /**
   * The content
   */
  children?: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps): JSX.Element => {
  const {
    children,
  } = props;

  return (
    <Box
      display="flex"
      width="100%"
      minHeight="100vh"
      flexDirection="column"
    >
      <Box
        display="flex"
        paddingX={['13x']}
        paddingY={['8x']}
      >
        123
      </Box>
    </Box>
  );
};
