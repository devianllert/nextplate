import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Stack } from '@/shared/components/system/stack';
import { Box } from '@/shared/components/system/box';
import { Status } from '@/shared/components/system/status';

import { Badge } from '../badge';

export default {
  title: 'Design System/Components/Badge',
  component: Badge,
} as Meta;

const Template: Story<React.ComponentProps<typeof Badge>> = (args) => <Badge {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Coming soon',
};

export const Colors = () => (
  <Stack direction="row">
    <Badge color="red">
      <Box mr={2}>
        <Status color="red" size="small" />
      </Box>
      Live
    </Badge>
    <Badge color="gray">Gray</Badge>
    <Badge color="gray" fontWeight="bold">Gray</Badge>
    <Badge color="primary">Primary</Badge>
    <Badge color="secondary">Secondary</Badge>
    <Badge color="blue">Blue</Badge>
    <Badge color="green">Green</Badge>
    <Badge color="red">Red</Badge>
    <Badge color="yellow">Yellow</Badge>
    <Badge color="yellow" disabled>Disabled</Badge>
  </Stack>
);

export const Interactive = () => (
  <Stack direction="row">
    <Badge color="red" interactive>
      <Box mr={2}>
        <Status color="red" size="small" />
      </Box>
      Live
    </Badge>
    <Badge interactive color="gray">Gray</Badge>
    <Badge interactive color="primary">Primary</Badge>
    <Badge interactive color="secondary">Secondary</Badge>
    <Badge interactive color="blue">Blue</Badge>
    <Badge interactive color="green">Green</Badge>
    <Badge interactive color="red">Red</Badge>
    <Badge interactive color="yellow">Yellow</Badge>
    <Badge color="yellow" disabled>Disabled</Badge>
  </Stack>
);
