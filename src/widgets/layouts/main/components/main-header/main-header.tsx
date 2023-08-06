import * as React from 'react';
import { capitalize } from '@effable/misc';
import { Box, Container, DisplayOnBrowserMount, SkipNavLink, Stack, Text } from '@effable/react';

import { LocaleToggler } from '@/features/locale-toggler';
import { ChangeTheme } from '@/features/new-main-page/change-theme';

import { APP_TITLE } from '@/shared/lib/meta';

export const MainHeader = () => {
  return (
    <>
      <SkipNavLink />
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
              {capitalize(APP_TITLE)}
            </Text>

            <DisplayOnBrowserMount>
              <Stack direction="row" space="4x">
                <ChangeTheme />

                <LocaleToggler />
              </Stack>
            </DisplayOnBrowserMount>
          </Box>
        </Container>
      </Box>
    </>
  );
};
