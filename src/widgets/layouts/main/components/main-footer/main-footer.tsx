import * as React from 'react';

import { Box, Text } from '@effable/react';

export const MainFooter = (): JSX.Element => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      borderTop="1px solid"
      borderColor="accent.accent5"
      marginTop="auto"
    >
      <Box display="flex" padding="32px" justifyContent="flex-start" alignItems="center" width="100%" maxWidth="1366px">
        <Text variant="s" color="text.secondary">
          Copyright © {new Date().getFullYear()} devianllert
        </Text>
      </Box>
    </Box>
  );
};
