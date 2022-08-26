import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { HelpButton } from '../help-button';

export default {
  title: 'Features/HelpButton',
  component: HelpButton,
} as Meta;

const Template: Story = (args) => <HelpButton {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
