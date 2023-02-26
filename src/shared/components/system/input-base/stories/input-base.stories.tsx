import * as React from 'react';

import { ActionButton, Box, Divider } from '@effable/react';
import styled from '@emotion/styled';
import { Meta, Story } from '@storybook/react';
import { RiDirectionLine, RiMenuLine, RiSearchLine } from 'react-icons/ri';

import { InputBase, InputBaseProps } from '../input-base';

export default {
  title: 'Design System/Components/InputBase',
  component: InputBase,
} as Meta;

const Template: Story<InputBaseProps> = (args) => <InputBase {...args} />;

export const Basic = Template.bind({});

Basic.args = {};

export const SearchBox = (): JSX.Element => (
  <Box
    display="flex"
    alignItems="center"
    border="1px solid"
    borderColor="neutral.neutral6"
    borderRadius={4}
    py="2px"
    px="4px"
    boxShadow="1x"
  >
    <ActionButton label="menu">
      <RiMenuLine />
    </ActionButton>

    <Box ml={2}>
      <InputBase placeholder="Search Google Maps" />
    </Box>

    <ActionButton label="search">
      <RiSearchLine />
    </ActionButton>

    <Divider orientation="vertical" />

    <ActionButton label="direction">
      <RiDirectionLine />
    </ActionButton>
  </Box>
);

const InputContainer = styled.div((props) => ({
  display: 'flex',
  border: '1px solid',
  borderRadius: 4,
  borderColor: props.theme.colors.neutral.neutral6,
  '&:focus-within': {
    borderColor: props.theme.colors.neutral.neutral8,
  },
}));

export const ComposedInputs = (): JSX.Element => (
  <InputContainer>
    <InputBase placeholder="example" />

    <Divider orientation="vertical" />

    <Box maxWidth="6ch">
      <InputBase placeholder=".com" />
    </Box>
  </InputContainer>
);
