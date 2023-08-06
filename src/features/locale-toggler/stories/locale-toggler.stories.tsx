import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { LocaleToggler } from '../locale-toggler';

export default {
  title: 'Features/LocaleToggler',
  component: LocaleToggler,
} as Meta;

const Template: Story = (args) => <LocaleToggler {...args} />;

export const Basic = Template.bind({});
