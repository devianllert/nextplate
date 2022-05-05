import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Flex } from '@/shared/components/system/flex';
import * as Text from '@/shared/components/system/text';
import { Stack } from '@/shared/components/system/stack';

import * as RadioGroup from '../index';

export default {
  title: 'Design System/Components/RadioGroup',
  component: RadioGroup.Root,
} as Meta;

export const Basic = () => (
  <RadioGroup.Root>
    <Stack space={2} direction="column">
      <Flex component="label" alignItems="center">
        <RadioGroup.Item value="1" />
        <Text.Paragraph variant="body2" sx={{ ml: 2 }}>Default</Text.Paragraph>
      </Flex>
      <Flex component="label" alignItems="center">
        <RadioGroup.Item value="2" />
        <Text.Paragraph variant="body2" sx={{ ml: 2 }}>Default</Text.Paragraph>
      </Flex>
      <Flex component="label" alignItems="center">
        <RadioGroup.Item value="3" />
        <Text.Paragraph variant="body2" sx={{ ml: 2 }}>Default</Text.Paragraph>
      </Flex>
    </Stack>
  </RadioGroup.Root>
);
