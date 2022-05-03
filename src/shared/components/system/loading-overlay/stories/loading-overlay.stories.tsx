import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { LoadingOverlay, LoadingOverlayProps } from '../loading-overlay';

export default {
  title: 'Design System/Components/LoadingOverlay',
  component: LoadingOverlay,
} as Meta;

const Template: Story<LoadingOverlayProps> = (args) => <LoadingOverlay {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  loader: 'loading...',
};
