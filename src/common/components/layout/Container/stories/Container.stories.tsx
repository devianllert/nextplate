import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Container, ContainerProps } from '../Container';

export default {
  title: 'Design System/Atoms/Container',
  component: Container,
} as Meta;

const Template: Story<ContainerProps> = (args) => <Container {...args} />;

export const Basic = Template.bind({});
