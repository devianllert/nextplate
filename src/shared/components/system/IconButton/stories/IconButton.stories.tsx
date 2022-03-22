import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { RiMenu3Line } from 'react-icons/ri';

import { IconButton, IconButtonProps } from '../IconButton';

export default {
  title: 'Design System/Atoms/IconButton',
  component: IconButton,
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: <RiMenu3Line />,
};
