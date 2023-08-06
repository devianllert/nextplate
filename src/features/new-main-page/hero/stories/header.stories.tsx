import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { Hero } from '../hero';

export default {
  title: 'Features/NewMainPage/Header',
  component: Hero,
} as Meta;

const Template: Story = (args) => <Hero {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
