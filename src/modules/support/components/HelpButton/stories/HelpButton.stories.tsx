import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { HelpButton } from '../HelpButton';

export default {
  title: 'Components/HelpButton',
  component: HelpButton,
} as Meta;

const Template: Story = (args) => <HelpButton {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
