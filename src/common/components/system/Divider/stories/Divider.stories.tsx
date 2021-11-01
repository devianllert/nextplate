import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Divider, DividerProps } from '../Divider';
import { Typography } from '../../Typography';
import { Box } from '../../Box';

export default {
  title: 'Design System/Atoms/Divider',
  component: Divider,
} as Meta;

const Template: Story<DividerProps> = (args) => (
  // eslint-disable-next-line react/destructuring-assignment
  <Box display="flex" flexDirection={args.orientation === 'horizontal' ? 'column' : 'row'}>
    <Typography>Divider component</Typography>
    <Divider {...args} />
    <Typography>Docs</Typography>
  </Box>
);

export const Basic = Template.bind({});

Basic.args = {
  orientation: 'horizontal',
};
