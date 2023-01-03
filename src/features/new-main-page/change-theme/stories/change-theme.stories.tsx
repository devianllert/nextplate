import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { SettingsButton } from '../change-theme';

export default {
  title: 'Features/NewMainPage/Change-theme',
  component: SettingsButton,
} as Meta;

const Template: Story = (args) => <SettingsButton {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'SettingsButton',
};
