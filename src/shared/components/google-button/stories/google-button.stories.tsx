import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { GoogleButton, GoogleButtonProps } from '../google-button';

export default {
  title: 'GoogleButton',
  component: GoogleButton,
} as Meta;

const Template: Story<GoogleButtonProps> = (args) => <GoogleButton {...args} />;

export const Basic = Template.bind({});
