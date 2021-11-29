import styled from '@emotion/styled';

import { SxProp, sx } from '@/modules/core/css-in-js/sx';
import { variants } from '@/common/design/tokens/typography';
import { createTransition, duration } from '@/common/design/tokens/transitions';

export const InputBaseRoot = styled.div<{ disabled?: boolean; fullWidth?: boolean } & SxProp>(
  (props) => ({
    ...variants.body2,
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    color: props.theme.colors.text.primary,
    cursor: 'text',
    transition: createTransition(['box-shadow', 'color', 'background'], { duration: duration.short }),

    ...(props.disabled && {
      opacity: 1, // Reset iOS opacity
      cursor: 'default',
      color: props.theme.colors.text.disabled,
      WebkitTextFillColor: props.theme.colors.text.disabled, // Fix opacity Safari bug
    }),

    ...(props.fullWidth && {
      width: '100%',
    }),
  }),
  sx,
);

export const InputBaseComponent = styled.input((props) => ({
  font: 'inherit',
  appearance: 'none',
  letterSpacing: 'inherit',
  color: 'currentColor',
  border: 0,
  boxSizing: 'border-box',
  background: 'none',
  margin: 0,
  minWidth: 0,
  outline: 0,
  display: 'block',
  width: '100%',

  // Reset Firefox invalid required input style
  '&:invalid': {
    boxShadow: 'none',
  },
  '&::-webkit-search-decoration': {
    // Remove the padding when type=search.
    WebkitAppearance: 'none',
  },

  '&:disabled': {
    opacity: 1, // Reset iOS opacity
    cursor: 'default',
    color: props.theme.colors.text.disabled,
    WebkitTextFillColor: props.theme.colors.text.disabled, // Fix opacity Safari bug
  },

  ...(props.type === 'search' && {
    // Improve type search style.
    MozAppearance: 'textfield',
    WebkitAppearance: 'textfield',
  }),
}));
