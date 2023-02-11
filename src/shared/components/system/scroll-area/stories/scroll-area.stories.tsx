import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  Box, Heading, Stack, Text,
} from '@effable/react';

import shadows from '@/shared/design/tokens/shadows';

import * as ScrollArea from '../scroll-area';

export default {
  title: 'Design System/Components/ScrollArea',
  component: ScrollArea.Root,
} as Meta;

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `item ${a.length - i}`,
);

export const Basic = () => (
  <ScrollArea.Root asChild>
    <Box
      width={200}
      height={225}
      borderRadius={4}
      overflow="hidden"
      backgroundColor="neutral.neutral4"
    >
      <ScrollArea.StyledViewport>
        <Box p={3}>
          <Heading variant="h6">Tags</Heading>

          <Stack>
            {TAGS.map((tag) => (
              <Box px={2} py={1} boxShadow={shadows[3]} backgroundColor="neutral.neutral6">
                <Text variant="s" key={tag}>{tag}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
      </ScrollArea.StyledViewport>

      <ScrollArea.StyledScrollbar orientation="vertical">
        <ScrollArea.StyledThumb />
      </ScrollArea.StyledScrollbar>
    </Box>
  </ScrollArea.Root>
);
