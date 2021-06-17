import React, { ReactElement } from 'react';
import { Meta, Story } from '@storybook/react';

import { Typography, TypographyProps } from '../Typography';

export default {
  title: 'Components/Typography',
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
    <Typography variant="body1" display="block" color="primary">Primary. 1</Typography>
    <Typography variant="body1" display="block" color="secondary">Secondary. 1</Typography>
    <Typography variant="body1" display="block" color="success">Success. 1</Typography>
    <Typography variant="body1" display="block" color="warning">Warning. 1</Typography>
    <Typography variant="body1" display="block" color="info">Info. 1</Typography>
    <Typography variant="body1" display="block" color="error">Error. 1</Typography>
  </>
);
