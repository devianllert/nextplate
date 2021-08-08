import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Container, ContainerProps } from '../Container';

export default {
  title: 'Components/Container',
  component: Container,
} as Meta;

const Template: Story<ContainerProps> = (args) => <Container {...args} />;
