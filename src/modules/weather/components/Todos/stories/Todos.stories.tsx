import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Todos } from '../Todos';

export default {
  title: 'Components/Todos',
  component: Todos,
} as Meta;

const Template: Story = (args) => <Todos {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Todos',
};
