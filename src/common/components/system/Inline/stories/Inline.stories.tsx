import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import styled from 'styled-components';
import { Inline, InlineProps } from '../Inline';
import { Button } from '../../Button';

export default {
  title: 'Components/Inline',
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

const Box = styled.div<{ width?: number; height?: number; }>((props) => ({
  backgroundColor: 'grey',
  border: '1px solid gray',

  width: props.width ?? 80,
  height: props.height ?? 40,
}));

export const MoreItems = Template.bind({});

MoreItems.args = {
  children: (
    <>
      <Box width={24} height={48} />
      <Box width={48} height={24} />
      <Box width={24} height={48} />
      <Box width={72} height={24} />
      <Box width={12} height={48} />
      <Box width={24} height={48} />
      <Box width={24} height={48} />
    </>
  ),
  space: 8,
  alignY: 'inherit',
};
