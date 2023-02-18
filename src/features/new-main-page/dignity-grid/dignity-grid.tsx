import * as React from 'react';

import { Box, Stack } from '@effable/react';

import { Dignity } from '../dignity';

export const DignityGrid = (): JSX.Element => {
  return (
    <Box
      display={{
        base: 'none',
        laptop: 'flex',
        desktop: 'flex',
      }}
      maxWidth="500px"
    >
      <Stack direction="column" space="2x">
        <Box display="flex" justifyContent="center">
          <Stack space="2x" alignItems="flex-end">
            <Dignity title="Next.js" main />
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center">
          <Stack space="2x">
            <Dignity title="Jest" text="testing" />

            <Dignity title="Sentry" text="app bug tracking" />

            <Dignity title="Eslint/Prettier" text="code quality" />
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center">
          <Stack space="2x">
            <Dignity title="Feature-Sliced" text="building a project structure" />

            <Dignity title="Storybook" text="app localization" />

            <Dignity title="i18n" text="app localization" />
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center">
          <Stack space="2x">
            <Dignity title="Effector" text="writing business logic and state management" />

            <Dignity title="Husky" text="for tracking code quality before commits" />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
