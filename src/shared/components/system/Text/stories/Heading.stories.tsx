import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Heading, HeadingProps } from '../Heading';

export default {
  title: 'Design System/Atoms/Text/Heading',
  component: Heading,
} as Meta;

const Template: Story<HeadingProps> = (args) => <Heading {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Heading',
};

export const Variants = () => (
  <div>
    <Heading variant="h1">Heading 1</Heading>
    <Heading variant="h2">Heading 2</Heading>
    <Heading variant="h3">Heading 3</Heading>
    <Heading variant="h4">Heading 4</Heading>
    <Heading variant="h5">Heading 5</Heading>
    <Heading variant="h6">Heading 6</Heading>
    <Heading variant="subtitle1">Subtitle 1</Heading>
    <Heading variant="subtitle2">Subtitle 2</Heading>
  </div>
);

export const Colors = () => (
  <div>
    <Heading variant="h1" color="text.secondary">Heading 1</Heading>
    <Heading variant="h2" color="text.disabled">Heading 2</Heading>
    <Heading variant="h3" color="radix.green11">Heading 3</Heading>
    <Heading variant="h4" color="radix.red11">Heading 4</Heading>
    <Heading variant="h5" color="radix.primary11">Heading 5</Heading>
    <Heading variant="h6" color="radix.blue11">Heading 6</Heading>
    <Heading variant="subtitle1" color="radix.yellow11">Subtitle 1</Heading>
    <Heading variant="subtitle2" color="radix.gray11">Subtitle 2</Heading>
  </div>
);
