import * as React from 'react';

import { Box, Container, Text } from '@effable/react';

import { LocaleToggler } from '@/features/new-main-page/change-locale';
import { ChangeTheme } from '@/features/new-main-page/change-theme';

export const MainHeader = (): JSX.Element => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={72}
      borderBottom="1px solid"
      borderColor="accent.accent5"
      backgroundColor="accent.accent3"
    >
      <Container>
        <Box display="flex" paddingY="26px" justifyContent="space-between" alignItems="center">
          <Text variant="l" color="text.primary">
            Nextplate
          </Text>

          <Box display="flex">
            <LocaleToggler />

            <Box marginLeft="8x">
              <ChangeTheme />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
