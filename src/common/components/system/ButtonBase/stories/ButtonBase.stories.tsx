import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { ButtonBase, ButtonBaseProps } from '../ButtonBase';

export default {
  title: 'Components/BaseButton',
  component: ButtonBase,
} as Meta;

const Template: Story<ButtonBaseProps> = (args) => <ButtonBase {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'ButtonBase',
};
