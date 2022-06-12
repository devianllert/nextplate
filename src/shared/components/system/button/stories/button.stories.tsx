import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from '../button';
import { Stack } from '../../stack';

export default {
  title: 'Design System/Components/Button',
  component: Button,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Examples = () => (
  <Stack>
    <Stack direction="row">
      <Button variant="text" size="small">Text</Button>
      <Button variant="outlined" size="small">Outlined</Button>
      <Button variant="contained" size="small">Contained</Button>
    </Stack>

    <Stack direction="row">
      <Button variant="text" size="medium">Text</Button>
      <Button variant="outlined" size="medium">Outlined</Button>
      <Button variant="contained" size="medium">Contained</Button>
    </Stack>

    <Stack direction="row">
      <Button variant="text" size="large">Text</Button>
      <Button variant="outlined" size="large">Outlined</Button>
      <Button variant="contained" size="large">Contained</Button>
    </Stack>

  </Stack>
);

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
