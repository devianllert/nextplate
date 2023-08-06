import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { Section, SectionProps } from '../section';

export default {
  title: 'Section',
  component: Section,
} as Meta;

const Template: Story<SectionProps> = (args) => <Section {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Section',
};
