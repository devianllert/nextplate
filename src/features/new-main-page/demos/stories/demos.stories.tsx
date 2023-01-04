import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Demos, DemosProps } from '../demos';

export default {
  title: 'Demos',
  component: Demos,
} as Meta;

const Template: Story<DemosProps> = (args) => <Demos {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Demos',
};
