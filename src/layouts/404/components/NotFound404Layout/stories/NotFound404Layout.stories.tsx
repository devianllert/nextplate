import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { NotFound404Layout } from '../NotFound404Layout';

export default {
  title: 'Layouts/404/NotFound404Layout',
  component: NotFound404Layout,
} as Meta;

const Template: Story = (args) => <NotFound404Layout {...args} />;

export const Basic = Template.bind({});
