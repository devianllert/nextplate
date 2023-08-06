import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { WhyNextplate } from '../why-nextplate';

export default {
  title: 'WhyNextplate',
  component: WhyNextplate,
} as Meta;

const Template: Story = (args) => <WhyNextplate {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
