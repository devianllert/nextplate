import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { LocaleToggler } from '../change-locale';

export default {
  title: 'Features/NewMainPage/LocaleToggler',
  component: LocaleToggler,
} as Meta;

const Template: Story = (args) => <LocaleToggler {...args} />;

export const Basic = Template.bind({});
