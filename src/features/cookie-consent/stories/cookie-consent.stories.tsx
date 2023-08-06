import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { CookieConsent } from '../cookie-consent';

export default {
  title: 'Features/CookieConsent',
  component: CookieConsent,
} as Meta;

const Template: Story = (args) => <CookieConsent {...args} />;

export const Basic = Template.bind({});
