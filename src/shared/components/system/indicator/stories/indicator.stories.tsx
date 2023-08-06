import * as React from 'react';
import { AspectRatio, Badge, Box } from '@effable/react';
import { Meta, Story } from '@storybook/react';

import { Indicator, IndicatorProps } from '../indicator';

export default {
  title: 'Design System/Components/Indicator',
  component: Indicator,
} as Meta;

const Template: Story<IndicatorProps> = (args) => <Indicator {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: (
    <Box width="300px" borderRadius="4px" overflow="hidden" boxShadow="1x">
      <AspectRatio ratio={16 / 9}>
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
          alt="Lanspace"
        />
      </AspectRatio>
    </Box>
  ),
};

export const WithCustomElement = Template.bind({});

WithCustomElement.args = {
  label: <Badge color="info">New</Badge>,
  color: null,
  border: true,
  shape: 'circle',
  children: (
    <Box width="300px" borderRadius="4px" overflow="hidden" boxShadow="1x">
      <AspectRatio ratio={16 / 9}>
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
          alt="Lanspace"
        />
      </AspectRatio>
    </Box>
  ),
};
