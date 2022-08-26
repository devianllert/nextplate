import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { SettingsButton } from '../settings-button';

export default {
  title: 'Features/SettingsButton',
  component: SettingsButton,
} as Meta;

const Template: Story = (args) => <SettingsButton {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'SettingsButton',
};
