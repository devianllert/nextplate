import * as React from 'react';

import { ActionButton, Divider, Text } from '@effable/react';
import { Meta, Story } from '@storybook/react';
import { RiEyeCloseLine, RiEyeLine, RiUserLine } from 'react-icons/ri';

import { Input, InputProps } from '../input';

export default {
  title: 'Design System/Components/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  label: 'Name',
};

export const WithError = Template.bind({});

WithError.args = {
  label: 'Name',
  error: true,
};

export const WithHelperText = Template.bind({});

WithHelperText.args = {
  label: 'Name',
  helperText: 'Some helper text',
};

export const WithPrefixIcon = Template.bind({});

WithPrefixIcon.args = {
  label: 'Name',
  prefix: <RiUserLine color="inherit" />,
};

export const WithPrefixNumber = Template.bind({});

WithPrefixNumber.args = {
  label: 'Number',
  prefix: (
    <>
      <Text variant="s" color="text.secondary">
        +61
      </Text>

      <Divider orientation="vertical" />
    </>
  ),
};

const TemplateWithPasswordAdornment: Story<InputProps> = (args) => {
  const { disabled } = args;

  const [show, setShow] = React.useState(false);

  return (
    <Input
      label="Password"
      type={show ? 'text' : 'password'}
      {...args}
      suffix={
        <ActionButton
          size="small"
          disabled={disabled}
          onClick={() => setShow((prevShow) => !prevShow)}
          label={`${show ? 'hide' : 'show'} password`}
        >
          {show ? <RiEyeLine /> : <RiEyeCloseLine />}
        </ActionButton>
      }
    />
  );
};

export const WithPassword = TemplateWithPasswordAdornment.bind({});
