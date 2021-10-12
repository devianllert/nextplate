import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Checkbox, CheckboxProps } from '../Checkbox';
import { Box } from '../../Box';
import { Typography } from '../../Typography';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  label: 'Checkbox',
};

export const NestedContent : Story<CheckboxProps> = (args) => {
  const {
    checked,
    ...other
  } = args;

  return (
    <Box>
      <Checkbox checked={checked} label="Nested Content" {...other} />

      {checked && (
        <Box ml={28} height={120} backgroundColor="grey" />
      )}
    </Box>
  );
};
