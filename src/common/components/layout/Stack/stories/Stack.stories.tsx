import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Stack, StackProps } from '../Stack';
import { Button } from '../../../system/Button';
import { Box } from '../../Box';
import { shadows } from '@/common/design/tokens/shadows';

export default {
  title: 'Design System/Layout/Stack',
  component: Stack,
} as Meta;

const Template: Story<StackProps> = (args) => <Stack {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: (
    <>
      <Box width={120} height={64} backgroundColor="radix.gray4" boxShadow={shadows[1]} />
      <Box width={120} height={64} backgroundColor="radix.gray4" boxShadow={shadows[1]} />
      <Box width={120} height={64} backgroundColor="radix.gray4" boxShadow={shadows[1]} />
    </>
  ),
  space: 3,
  alignItems: 'inherit',
};
