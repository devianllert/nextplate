import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { Todos } from '../todos';

export default {
  title: 'Components/Todos',
  component: Todos,
} as Meta;

const Template: Story = (args) => <Todos {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Todos',
};
