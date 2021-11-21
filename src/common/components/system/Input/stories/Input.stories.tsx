import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { RiEyeCloseLine, RiEyeLine, RiUserLine } from 'react-icons/ri';

import { Input, InputProps } from '../Input';
import { Divider } from '../../Divider';
import * as Text from '../../Text';
import { InputAdornment } from '../InputAdornment';
import { IconButton } from '../../IconButton';

export default {
  title: 'Design System/Atoms/Input',
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
  prefix: (
    <InputAdornment position="start" disablePointerEvents>
      <RiUserLine />
    </InputAdornment>
  ),
};

export const WithPrefixNumber = Template.bind({});

WithPrefixNumber.args = {
  label: 'Number',
  prefix: (
    <InputAdornment disablePointerEvents>
      <Text.Paragraph variant="body2" color="text.secondary">+61</Text.Paragraph>

      <Divider orientation="vertical" flexItem />
    </InputAdornment>
  ),
};

const TemplateWithPasswordAdornment: Story<InputProps> = (args) => {
  const {
    disabled,
  } = args;

  const [show, setShow] = React.useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Input
      label="Password"
      type={show ? 'text' : 'password'}
      {...args}
      suffix={(
        <InputAdornment position="end">
          <IconButton disabled={disabled} onClick={() => setShow((prevShow) => !prevShow)} onMouseDown={handleMouseDownPassword}>
            {show ? <RiEyeLine /> : <RiEyeCloseLine />}
          </IconButton>
        </InputAdornment>
      )}
    />
  );
};

export const WithPassword = TemplateWithPasswordAdornment.bind({});
