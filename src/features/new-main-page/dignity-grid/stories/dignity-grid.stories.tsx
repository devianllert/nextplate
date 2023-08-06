import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { DignityGrid } from '../dignity-grid';

export default {
  title: 'DignityGrid',
  component: DignityGrid,
} as Meta;

const Template: Story = (args) => <DignityGrid {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'DignityGrid',
};
