import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Code, CodeProps } from '../Code';

export default {
  title: 'Design System/Atoms/Code',
  component: Code,
} as Meta;

const Template: Story<CodeProps> = (args) => <Code {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'React.createElement()',
};
