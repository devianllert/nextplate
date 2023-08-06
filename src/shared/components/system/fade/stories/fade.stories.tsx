import * as React from 'react';
import { Box } from '@effable/react';
import { Meta, Story } from '@storybook/react';

import { Fade, FadeProps } from '../fade';

export default {
  title: 'Design System/Components/Fade',
  component: Fade,
} as Meta;

const Template: Story<FadeProps> = (args) => {
  return (
    <Fade {...args}>
      <Box width={300} height={400} backgroundColor="accent.accent9">
        some content
      </Box>
    </Fade>
  );
};

export const Basic = Template.bind({});
