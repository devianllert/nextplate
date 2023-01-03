import * as React from 'react';

import {
  Box,
} from '@effable/react';

import { LocaleToggler } from '@/features/new-main-page/change-locale';
import { ChangeTheme } from '@/features/new-main-page/change-theme';

export const MainHeader = (): JSX.Element => {
  return (
    <Box
      display="flex"
      padding={['26px 32px']}
      justifyContent="flex-end"
      alignItems="center"
      width="100%"
      borderBottom="1px solid"
      borderColor="rgba(87, 70, 175, 0.15)"
    >
      <LocaleToggler />

      <Box
        marginLeft={['8x']}
      >
        <ChangeTheme />
      </Box>
    </Box>
  );
};
