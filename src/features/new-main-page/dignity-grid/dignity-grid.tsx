import * as React from 'react';

import { Box, Stack } from '@effable/react';
import { useTranslation } from 'react-i18next';

import { Dignity } from '../dignity';
import { AnimatedBubble } from './dignity-grid.styled';

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
      <Stack direction="column" space="4x">
        <Box display="flex" justifyContent="center">
          <Stack space="4x" alignItems="flex-end">
            <AnimatedBubble delay="1s" duration="13s">
              <Dignity title="Next.js" main />
            </AnimatedBubble>
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center">
          <Stack space="4x">
            <AnimatedBubble duration="10s">
              <Dignity title="Jest" text="testing" />
            </AnimatedBubble>
            <AnimatedBubble duration="11s">
              <Dignity title="Sentry" text="app bug tracking" />
            </AnimatedBubble>
            <AnimatedBubble duration="12s">
              <Dignity title="Eslint/Prettier" text="code quality" />
            </AnimatedBubble>
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center">
          <Stack space="4x">
            <AnimatedBubble duration="15s">
              <Dignity title="Feature-Sliced" text="building a project structure" />
            </AnimatedBubble>
            <AnimatedBubble duration="12s">
              <Dignity title="Storybook" text="app localization" />
            </AnimatedBubble>
            <AnimatedBubble duration="20s">
              <Dignity title="i18n" text="app localization" />
            </AnimatedBubble>
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center">
          <Stack space="4x">
            <AnimatedBubble duration="14s">
              <Dignity title="Effector" text="writing business logic and state management" />
            </AnimatedBubble>
            <AnimatedBubble duration="13s">
              <Dignity title="Husky" text="for tracking code quality before commits" />
            </AnimatedBubble>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
