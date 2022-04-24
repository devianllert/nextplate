import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { MainFooter } from '../main-footer';

export default {
  title: 'Layouts/Main/MainFooter',
  component: MainFooter,
} as Meta;

const Template: Story = (args) => <MainFooter {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'MainFooter',
};
