import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { LocaleToggler } from '../LocaleToggler';

export default {
  title: 'Design System/Atoms/LocaleToggler',
  component: LocaleToggler,
} as Meta;

const Template: Story = (args) => <LocaleToggler {...args} />;

export const Basic = Template.bind({});
