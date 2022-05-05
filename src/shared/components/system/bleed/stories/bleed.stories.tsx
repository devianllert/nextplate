import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Inset } from '@/shared/components/system/inset';
import { Box } from '@/shared/components/system/box';
import { Stack } from '@/shared/components/system/stack';

import { Bleed, BleedProps } from '../bleed';

export default {
  title: 'Design System/Layout/Bleed',
  component: Bleed,
} as Meta;

const Template: Story<BleedProps> = (args) => (
  <Box
    width={320}
    height={480}
    backgroundColor="radix.primaryA4"
  >

    <Inset space={3}>
      <Stack space={3} direction="column" alignItems="stretch">
        <Box
          backgroundColor="radix.primary9"
          height={100}
        />

        <Bleed {...args}>
          <Box
            backgroundColor="radix.primary9"
            height={100}
          />
        </Bleed>
      </Stack>
    </Inset>
  </Box>
);

export const FullBleedLayout = () => (
  <Box
    width={640}
    height="100vh"
    backgroundColor="radix.primaryA4"
  >

    <Inset space={3}>
      <Box
        backgroundColor="radix.primary9"
        height={100}
      />

      <Bleed
        left="50vw"
        width="100vw"
        position="relative"
        leftOffset="50%"
      >
        <Box
          backgroundColor="radix.primary9"
          height={100}
        />
      </Bleed>
    </Inset>
  </Box>
);

export const Basic = Template.bind({});

Basic.args = {
  children: 'Bleed',
  horizontal: 3,
};
