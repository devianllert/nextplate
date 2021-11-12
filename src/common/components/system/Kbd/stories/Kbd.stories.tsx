import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Kbd, KbdProps } from '../Kbd';
import { Box } from '../../Box';
import { Stack } from '../../Stack';

export default {
  title: 'Design System/Atoms/Kbd',
  component: Kbd,
} as Meta;

const Template: Story<KbdProps> = (args) => <Kbd {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Space',
  size: 'medium',
};

export const Small = Template.bind({});

Small.args = {
  children: 'Alt + Tab',
  size: 'small',
};

export const Variants = () => (
  <Box display="flex">
    <Stack direction="column" space={4}>
      <Kbd>Space</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Shift + Tab</Kbd>
      <Kbd>Esc</Kbd>
    </Stack>

    <Stack direction="column" space={4}>
      <Box>
        <Kbd>I</Kbd>
        <Kbd>A</Kbd>
        <Kbd>W</Kbd>
      </Box>

      <Box>
        <Kbd>⇧</Kbd>
        <Kbd>⌘</Kbd>
        <Kbd>A</Kbd>
      </Box>

      <Box>
        <Kbd>⌘ + Tab</Kbd>
      </Box>

      <Box>
        <Kbd>⇧</Kbd>
        <Kbd>Tab</Kbd>
      </Box>
    </Stack>

    <Stack direction="column" space={4}>
      <Box>
        <Kbd size="small">I</Kbd>
        <Kbd size="small">A</Kbd>
        <Kbd size="small">W</Kbd>
      </Box>

      <Box>
        <Kbd size="small">⇧</Kbd>
        <Kbd size="small">⌘</Kbd>
        <Kbd size="small">A</Kbd>
      </Box>

      <Box>
        <Kbd size="small">⌘ + Tab</Kbd>
      </Box>

      <Box>
        <Kbd size="small">⇧</Kbd>
        <Kbd size="small">Tab</Kbd>
      </Box>
    </Stack>
  </Box>
);
