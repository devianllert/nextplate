import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { Advantage, AdvantageProps } from '../advantage';

export default {
  title: 'Features/NewMainPage/Advantage',
  component: Advantage,
} as Meta;

const Template: Story<AdvantageProps> = (args) => <Advantage {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  title: 'DemoItem',
  description: 'DemoItem',
  icon: '',
};
