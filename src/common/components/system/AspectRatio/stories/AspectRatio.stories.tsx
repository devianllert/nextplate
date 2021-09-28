import * as React from 'react';

import { Story, Meta } from '@storybook/react';

import { AspectRatio, AspectRatioProps } from '../AspectRatio';
import { Box } from '../../Box';

export default {
  title: 'Design System/Atoms/AspectRatio',
  component: AspectRatio,
} as Meta;

const Template: Story<AspectRatioProps> = (args) => (
  <Box width="300px" borderRadius="4px" overflow="hidden" boxShadow={1}>
    <AspectRatio {...args} />
  </Box>
);

export const Basic = Template.bind({});

Basic.args = {
  ratio: 16 / 9,
  children: (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
      src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
      alt="Lanspace"
    />
  ),
};
