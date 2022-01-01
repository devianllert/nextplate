import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Box } from '../../Box';
import { Inset, InsetProps } from '../Inset';

export default {
  title: 'Design System/Atoms/Inset',
  component: Inset,
} as Meta;

const Template: Story<InsetProps> = (args) => (
  <Box
    width={320}
    height={480}
    backgroundColor="radix.primaryA4"
  >
    <Inset {...args}>
      <Box
        backgroundColor="radix.primary9"
        height={100}
      />
    </Inset>
  </Box>
);

export const Basic = Template.bind({});

Basic.args = {
  children: 'Inset',
  space: 2,
};
