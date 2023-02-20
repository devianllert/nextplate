import * as React from 'react';

import {
  Box, Container, DisplayOnBrowserMount, Text,
} from '@effable/react';

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

          <DisplayOnBrowserMount>
            <Box display="flex" alignItems="center">
              <LocaleToggler />

              <Box marginLeft="4x">
                <ChangeTheme />
              </Box>
            </Box>
          </DisplayOnBrowserMount>
        </Box>
      </Container>
    </Box>
  );
};
