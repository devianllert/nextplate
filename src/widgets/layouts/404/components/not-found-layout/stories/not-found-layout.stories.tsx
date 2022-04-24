import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { NotFoundLayout } from '../not-found-layout';

export default {
  title: 'Layouts/404/NotFound404Layout',
  component: NotFoundLayout,
} as Meta;

const Template: Story = (args) => <NotFoundLayout {...args} />;

export const Basic = Template.bind({});
