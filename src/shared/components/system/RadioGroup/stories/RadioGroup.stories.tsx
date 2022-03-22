import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Flex } from '../../../layout/Flex';

import * as RadioGroup from '..';
import * as Text from '../../Text';
import { Stack } from '../../../layout/Stack';

export default {
  title: 'Design System/Atoms/RadioGroup',
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
