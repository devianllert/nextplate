import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Box, BoxProps } from '../Box';

export default {
  title: 'Design System/Atoms/Box',
  component: Box,
} as Meta;

const Template: Story<BoxProps> = (args) => <Box {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Box',
};
