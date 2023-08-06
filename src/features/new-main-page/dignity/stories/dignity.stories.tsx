import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { Dignity, DignityProps } from '../dignity';

export default {
  title: 'Features/NewMainPage/Dignity',
  component: Dignity,
} as Meta;

const Template: Story<DignityProps> = (args) => <Dignity {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  title: 'Husky',
  text: 'for tracking code quality before commits',
};
