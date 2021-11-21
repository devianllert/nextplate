import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Overline, OverlineProps } from '../Overline';
import { Stack } from '../../Stack';

export default {
  title: 'Design System/Atoms/Text/Overline',
  component: Overline,
} as Meta;

const Template: Story<OverlineProps> = (args) => <Overline {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Overline',
};

export const Variants = () => (
  <Stack direction="column" space={3}>
    <Overline variant="overline1">
      medium overline
    </Overline>
    <Overline variant="overline2">
      small overline
    </Overline>
  </Stack>
);

export const Colors = () => (
  <Stack direction="column" space={3}>
    <Overline variant="overline1" color="text.secondary">medium overline</Overline>
    <Overline variant="overline2" color="text.disabled">small overline</Overline>
  </Stack>
);
