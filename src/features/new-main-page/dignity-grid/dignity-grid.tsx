import * as React from 'react';
import { Box, Stack } from '@effable/react';

import { Dignity } from '../dignity';
import { AnimatedBubble } from './dignity-grid.styled';

export const DignityGrid = () => {
  return (
    <Box
      display={{
        base: 'none',
        laptop: 'flex',
        desktop: 'flex',
      }}
    >
      <Stack direction="column" space="3x">
        <Box display="flex" justifyContent="center">
          <Stack space="3x" alignItems="flex-end">
            <AnimatedBubble duration="10s">
              <Dignity icon="/static/images/tools/next.png" title="Next.js" />
            </AnimatedBubble>
            <AnimatedBubble duration="11s">
              <Dignity
                icon="/static/images/tools/typescript.png"
                title="TypeScript"
                text="Strongly typed programming&nbsp;language"
              />
            </AnimatedBubble>
            <AnimatedBubble duration="12s">
              <Dignity icon="/static/images/tools/jest.png" title="Jest" text="Testing" />
            </AnimatedBubble>
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center">
          <Stack space="3x">
            <AnimatedBubble duration="13s">
              <Dignity icon="/static/images/tools/fsd.png" title="Feature-Sliced" text="Building a project structure" />
            </AnimatedBubble>
            <AnimatedBubble duration="14s">
              <Dignity icon="/static/images/tools/i18n.png" title="i18n" text="Localization" />
            </AnimatedBubble>
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center">
          <Stack space="3x">
            <AnimatedBubble duration="15s">
              <Dignity icon="/static/images/tools/storybook.png" title="Storybook" text="Building UI in isolation" />
            </AnimatedBubble>
            <AnimatedBubble duration="16s">
              <Dignity icon="/static/images/tools/eslint.png" title="Eslint" text="Code quality" />
            </AnimatedBubble>
            <AnimatedBubble duration="17s">
              <Dignity icon="/static/images/tools/sentry.png" title="Sentry" text="Bug tracking" />
            </AnimatedBubble>
          </Stack>
        </Box>

        <Box display="flex" justifyContent="center">
          <Stack space="3x">
            <AnimatedBubble duration="18s">
              <Dignity
                icon="/static/images/tools/effector.png"
                title="Effector"
                text="Writing business logic and&nbsp;state management"
              />
            </AnimatedBubble>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
