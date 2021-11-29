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
  boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.radix.gray7}`,

  '&:hover': {
    boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.radix.gray8}`,
  },

  '&:focus-within': {
    boxShadow: `inset 0px 0px 0px 1px ${props.theme.colors.radix.primary8}, 0px 0px 0px 1px ${props.theme.colors.radix.primary8}`,
  },

  ...(props.error && {
    boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.radix.red7}`,

    '&:hover': {
      boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.radix.red8}`,
    },
  }),

  ...(props.disabled && {
    color: props.theme.colors.text.disabled,
    boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.radix.gray6}`,

    '&:hover': {
      boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.radix.gray6}`,
    },
  }),
}));
