import * as React from 'react';

import { Meta, Story } from '@storybook/react';

import { Status, StatusProps } from '../status';

export default {
  title: 'Design System/Components/Status',
  component: Status,
} as Meta;

const Template: Story<StatusProps> = (args) => <Status {...args} />;

export const Basic = Template.bind({});
