import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Avatar, AvatarProps } from '../avatar';

export default {
  title: 'Design System/Components/Avatar',
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  src: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
  alt: 'Pedro Duarte',
  fallback: 'PD',
};
