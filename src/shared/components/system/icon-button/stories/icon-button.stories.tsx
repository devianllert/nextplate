import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { RiCloseLine } from 'react-icons/ri';
import { MdClose, MdMenu } from 'react-icons/md';

import { IconButton, IconButtonProps } from '../icon-button';
import { Stack } from '../../stack';

export default {
  title: 'Design System/Components/IconButton',
  component: IconButton,
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Example = () => (
  <Stack>
    <Stack direction="row" alignItems="center">
      <IconButton size="small">
        <RiCloseLine />
      </IconButton>

      <IconButton size="medium">
        <RiCloseLine />
      </IconButton>

      <IconButton size="large">
        <RiCloseLine />
      </IconButton>
    </Stack>

    <Stack direction="row" alignItems="center">
      <IconButton size="small">
        <MdClose />
      </IconButton>

      <IconButton size="medium">
        <MdClose />
      </IconButton>

      <IconButton size="large">
        <MdClose />
      </IconButton>
    </Stack>

  </Stack>
);

export const Basic = Template.bind({});

Basic.args = {
  children: <MdMenu />,
};
