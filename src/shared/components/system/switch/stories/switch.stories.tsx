import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Switch, SwitchProps } from '../switch';

export default {
  title: 'Design System/Components/Switch',
  component: Switch,
} as Meta;

const Template: Story<SwitchProps> = (args) => <Switch {...args} />;

export const Basic = Template.bind({});
