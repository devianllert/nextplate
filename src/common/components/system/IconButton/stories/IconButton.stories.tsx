import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { IconButton } from '../IconButton';

export default {
  title: 'Design System/Atoms/IconButton',
  component: IconButton,
} as Meta;

const Template: Story = (args) => <IconButton {...args} />;

export const Basic = Template.bind({});
