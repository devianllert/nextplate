import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Header } from '../header';

export default {
  title: 'Features/NewMainPage/Header',
  component: Header,
} as Meta;

const Template: Story = (args) => <Header {...args} />;

export const Basic = Template.bind({});

Basic.args = {};