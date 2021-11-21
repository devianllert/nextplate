import styled from '@emotion/styled';

import { variants } from '@/common/design/tokens/typography';

import { InputBase } from '../InputBase';

export interface InputRootProps {
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
}

export const InputRoot = styled.div<InputRootProps>((props) => ({
  ...variants.body2,
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  maxWidth: '100%',
  color: props.theme.colors.text.secondary,

  ...(props.error && {
    color: props.theme.colors.radix.red11,
  }),

  ...(props.disabled && {
    color: props.theme.colors.text.disabled,
  }),

  ...(props.fullWidth && {
    width: '100%',
  }),
}));

export const InputComponent = styled(InputBase)((props) => ({
  borderRadius: 4,
  padding: '6px 8px',
  color: props.theme.colors.text.primary,
  background: props.theme.colors.radix.gray3,
  border: `2px solid ${props.theme.colors.radix.gray6}`,

  '&:focus-within': {
    borderColor: props.theme.colors.radix.gray7,
  },

  '&:hover': {
    borderColor: props.theme.colors.radix.gray8,
  },

  ...(props.error && {
    borderColor: props.theme.colors.radix.red6,

    '&:hover': {
      borderColor: props.theme.colors.radix.red6,
    },
  }),

  ...(props.disabled && {
    color: props.theme.colors.text.disabled,
    borderColor: props.theme.colors.radix.gray6,

    '&:hover': {
      borderColor: props.theme.colors.radix.gray6,
    },
  }),
}));
