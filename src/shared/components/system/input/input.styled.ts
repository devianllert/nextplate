import styled from '@emotion/styled';

import { variants } from '@/shared/design/tokens/typography';

import { InputBase } from '../input-base';
import { InputBaseComponent } from '../input-base/input-base.styled';
import { getInputHeights, getInputTypography } from './input.tokens';

interface InputRootProps {
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: string;
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
    color: props.theme.colors.error.error11,
  }),

  ...(props.disabled && {
    color: props.theme.colors.text.disabled,
  }),

  ...(props.fullWidth && {
    width: '100%',
  }),
}));

export const InputComponent = styled(InputBase)<{ size?: string }>((props) => ({
  ...getInputTypography(props.size),
  lineHeight: 1.5,
  height: getInputHeights(props.size),
  borderRadius: props.theme.radii['1x'],
  color: props.theme.colors.text.primary,
  background: props.theme.colors.neutral.neutral3,
  boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.neutral.neutral7}`,

  [`& > ${InputBaseComponent}`]: {
    padding: '6px 4px',
  },

  '&:hover': {
    boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.neutral.neutral8}`,
  },

  '&:focus-within': {
    boxShadow: `inset 0px 0px 0px 1px ${props.theme.colors.accent.accent8}, 0px 0px 0px 1px ${props.theme.colors.accent.accent8}`,
  },

  ...(props.error && {
    boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.error.error7}`,

    '&:hover': {
      boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.error.error8}`,
    },
  }),

  ...(props.disabled && {
    color: props.theme.colors.text.disabled,
    boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.neutral.neutral6}`,

    '&:hover': {
      boxShadow: `inset 0px 0px 0px 2px ${props.theme.colors.neutral.neutral6}`,
    },
  }),
}));
