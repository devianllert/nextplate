import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { DemoItem, DemoItemProps } from '../demo-item';

export default {
  title: 'Features/NewMainPage/DemoItem',
  component: DemoItem,
} as Meta;

const Template: Story<DemoItemProps> = (args) => <DemoItem {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  title: 'DemoItem',
  description: 'DemoItem',
  preview: 'DemoItem',
};
