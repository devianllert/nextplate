import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Box } from '@/shared/components/system/box';

import { LoadingOverlay, LoadingOverlayProps } from '../loading-overlay';

export default {
  title: 'Design System/Components/LoadingOverlay',
  component: LoadingOverlay,
} as Meta;

const Template: Story<LoadingOverlayProps> = (args) => {
  return (
    <Box position="relative">
      <LoadingOverlay {...args} />

      <Box width={300} height={400} backgroundColor="radix.secondary9">
        some content
      </Box>
    </Box>
  );
};

export const Basic = Template.bind({});
