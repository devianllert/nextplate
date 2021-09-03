import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Inline, InlineProps } from '../Inline';
import { Button } from '../../Button';

export default {
  title: 'Design System/Atoms/Inline',
  component: Inline,
} as Meta;

const Template: Story<InlineProps> = (args) => <Inline {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: (
    <>
      <Button variant="contained">1</Button>
      <Button variant="contained">2</Button>
      <Button variant="contained">3</Button>
    </>
  ),
  space: 8,
  alignY: 'inherit',
};

export const MoreItems = Template.bind({});

MoreItems.args = {
  children: (
    <>
      <Button variant="contained">One</Button>
      <Button variant="contained">Two</Button>
      <Button variant="contained">Three</Button>
      <Button variant="contained">Four</Button>
      <Button variant="contained">Five</Button>
      <Button variant="contained">Six</Button>
      <Button variant="contained">Seven</Button>
      <Button variant="contained">Eight</Button>
    </>
  ),
  space: 8,
  alignY: 'inherit',
};
