import React, { ReactElement } from 'react';
import { Meta, Story } from '@storybook/react';

import { Typography, TypographyProps } from '../Typography';

export default {
  title: 'Design System/Atoms/Typography',
  component: Typography,
} as Meta;

const Template: Story<TypographyProps> = (args) => <Typography {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  variant: 'h1',
  children: 'Typography',
  color: 'primary',
};

export const Headings = (): ReactElement => (
  <>
    <Typography variant="h1" display="block">h1. Heading</Typography>
    <Typography variant="h2" display="block">h2. Heading</Typography>
    <Typography variant="h3" display="block">h3. Heading</Typography>
    <Typography variant="h4" display="block">h4. Heading</Typography>
    <Typography variant="h5" display="block">h5. Heading</Typography>
    <Typography variant="h6" display="block">h6. Heading</Typography>
  </>
);

export const Subtitles = (): ReactElement => (
  <>
    <Typography variant="subtitle1" display="block">Subtitle. 1</Typography>
    <Typography variant="subtitle2" display="block">Subtitle. 2</Typography>
  </>
);

export const Body = (): ReactElement => (
  <>
    <Typography variant="body1" display="block">Body. 1</Typography>
    <Typography variant="body2" display="block">Body. 2</Typography>
  </>
);

export const Caption = (): ReactElement => (
  <>
    <Typography variant="caption" display="block" color="error">Caption. 1</Typography>
  </>
);

export const Colors = (): ReactElement => (
  <>
    <Typography variant="body1" display="block" color="text.primary">Primary. 1</Typography>
    <Typography variant="body1" display="block" color="text.secondary">Secondary. 1</Typography>
    <Typography variant="body1" display="block" color="status.success.11">Success. 1</Typography>
    <Typography variant="body1" display="block" color="status.warning.11">Warning. 1</Typography>
    <Typography variant="body1" display="block" color="status.info.11">Info. 1</Typography>
    <Typography variant="body1" display="block" color="status.error.11">Error. 1</Typography>
  </>
);
