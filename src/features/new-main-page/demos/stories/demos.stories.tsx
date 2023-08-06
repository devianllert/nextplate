import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { Demos } from '../demos';

export default {
  title: 'Demos',
  component: Demos,
} as Meta;

const Template: Story = (args) => <Demos {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
