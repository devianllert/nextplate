import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Box } from '@effable/react';

import { Fade, FadeProps } from '../fade';

export default {
  title: 'Design System/Components/Fade',
  component: Fade,
} as Meta;

const Template: Story<FadeProps> = (args) => {
  return (
    <Fade {...args}>
      <Box width={300} height={400} backgroundColor="radix.secondary9">
        some content
      </Box>
    </Fade>
  );
};

export const Basic = Template.bind({});
