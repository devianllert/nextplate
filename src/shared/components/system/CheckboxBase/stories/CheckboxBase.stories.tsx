import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { CheckboxBase, CheckboxBaseProps } from '../CheckboxBase';

export default {
  title: 'Design System/Atoms/CheckboxBase',
  component: CheckboxBase,
} as Meta;

const Template: Story<CheckboxBaseProps> = (args) => <CheckboxBase {...args} />;

export const Basic = Template.bind({});
