import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { ChangeTheme } from '../change-theme';

export default {
  title: 'Features/NewMainPage/Change-theme',
  component: ChangeTheme,
} as Meta;

const Template: Story = (args) => <ChangeTheme {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'ChangeTheme',
};
