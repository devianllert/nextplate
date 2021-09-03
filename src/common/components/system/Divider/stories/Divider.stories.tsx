import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Divider, DividerProps } from '../Divider';

export default {
  title: 'Design System/Atoms/Divider',
  component: Divider,
} as Meta;

const Template: Story<DividerProps> = (args) => <Divider {...args} />;

export const Basic = Template.bind({});
