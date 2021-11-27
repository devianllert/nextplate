import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { LocaleToggler, LocaleTogglerProps } from '../LocaleToggler';

export default {
  title: 'Components/LocaleToggler',
  component: LocaleToggler,
} as Meta;

const Template: Story<LocaleTogglerProps> = (args) => <LocaleToggler {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'LocaleToggler',
};