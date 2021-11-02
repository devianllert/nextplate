import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { AlertDialog, AlertDialogProps } from '../AlertDialog';

export default {
  title: 'Components/AlertDialog',
  component: AlertDialog,
} as Meta;

const Template: Story<AlertDialogProps> = (args) => <AlertDialog {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'AlertDialog',
};
