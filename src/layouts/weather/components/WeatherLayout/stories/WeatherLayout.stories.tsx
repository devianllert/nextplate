import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { WeatherLayout, WeatherLayoutProps } from '../WeatherLayout';

export default {
  title: 'Layouts/Weather/WeatherLayout',
  component: WeatherLayout,
} as Meta;

const Template: Story<WeatherLayoutProps> = (args) => <WeatherLayout {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'WeatherLayout',
};
