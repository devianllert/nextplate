import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import styled from '@emotion/styled';

import { RiDirectionLine, RiMenuLine, RiSearchLine } from 'react-icons/ri';
import { InputBase, InputBaseProps } from '../InputBase';
import { Box } from '../../Box';
import { IconButton } from '../../IconButton';
import { Divider } from '../../Divider';

export default {
  title: 'Design System/Atoms/InputBase',
  component: InputBase,
} as Meta;

const Template: Story<InputBaseProps> = (args) => <InputBase {...args} />;

export const Basic = Template.bind({});

Basic.args = {
};

export const SearchBox = (): JSX.Element => (
  <Box
    display="flex"
    alignItems="center"
    border="1px solid"
    borderColor="radix.gray6"
    borderRadius={4}
    py="2px"
    px="4px"
    boxShadow={1}
  >
    <IconButton>
      <RiMenuLine />
    </IconButton>

    <Box ml={2}>
      <InputBase placeholder="Search Google Maps" />
    </Box>

    <IconButton>
      <RiSearchLine />
    </IconButton>

    <Divider orientation="vertical" flexItem />

    <IconButton>
      <RiDirectionLine />
    </IconButton>
  </Box>
);

const InputContainer = styled.div((props) => ({
  display: 'flex',
  border: '1px solid',
  borderRadius: 4,
  borderColor: props.theme.colors.radix.gray6,
  '&:focus-within': {
    borderColor: props.theme.colors.radix.gray8,
  },
}));

export const ComposedInputs = (): JSX.Element => (
  <InputContainer>
    <InputBase placeholder="example" />

    <Divider orientation="vertical" space={0} flexItem />

    <Box maxWidth="6ch">
      <InputBase placeholder=".com" />
    </Box>
  </InputContainer>
);
