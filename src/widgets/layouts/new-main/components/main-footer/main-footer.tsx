import * as React from 'react';

import {
  Box,
  Text,
} from '@effable/react';

import { LocaleToggler } from '@/features/new-main-page/change-locale';
import { ChangeTheme } from '@/features/new-main-page/change-theme';

export const MainFooter = (): JSX.Element => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      borderTop="1px solid"
      borderColor="rgba(87, 70, 175, 0.15)"
      marginTop="auto"
    >
      <Box
        display="flex"
        padding={['32px 102px']}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        maxWidth="1366px"
      >
        <Text variant="m" color="#20134B" fontSize="16px">
          Copyright © 2022 devianllert
        </Text>

        <Box
          display="flex"
        >
          <LocaleToggler />

          <Box
            marginLeft={['8x']}
          >
            <ChangeTheme />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
