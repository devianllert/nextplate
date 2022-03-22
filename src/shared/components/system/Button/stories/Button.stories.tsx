import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from '../Button';

export default {
  title: 'Design System/Atoms/Button',
  component: Button,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Button',
  color: 'primary',
  variant: 'text',
};

export const Outlined = Template.bind({});

Outlined.args = {
  children: 'Button',
  color: 'primary',
  variant: 'outlined',
};

export const Contained = Template.bind({});

Contained.args = {
  children: 'Button',
  color: 'primary',
  variant: 'contained',
};

export const Link = Template.bind({});

Link.args = {
  children: 'Button',
  color: 'primary',
  variant: 'contained',
  href: 'https://google.com',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  target: '_blank',
};
