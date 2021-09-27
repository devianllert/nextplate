import styled from '@emotion/styled';

import { ButtonBase, ButtonBaseProps } from '@/components/system/ButtonBase';
import { createTransition, duration } from '@/common/design/tokens/transitions';
import shape from '@/common/design/tokens/shape';

interface IconButtonRootProps extends ButtonBaseProps {
  edge?: 'end' | 'start' | false;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  variant?: 'round' | 'circle';
}

export const IconButtonRoot = styled(ButtonBase)<IconButtonRootProps>((props) => ({
  flex: '0 0 auto',
  padding: 8,
  fontSize: '2.4rem',
  textAlign: 'center',
  borderRadius: props.variant === 'circle' ? '50%' : shape.round,
  overflow: 'visible',
  color: props.theme.colors.radix[`${props.color}11`],
  transition: createTransition(['background-color', 'box-shadow'], {
    duration: duration.short,
  }),

  '&:hover': {
    backgroundColor: props.theme.colors.radix[`${props.color}A5`],
    textDecoration: 'none',

    '@media (hover: none)': {
      backgroundColor: 'transparent',
    },
  },

  '&:focus-visible': {
    boxShadow: `0 0 0 1px ${props.theme.colors.radix[`${props.color}A7`]}, inset 0 0 0 1px ${props.theme.colors.radix[`${props.color}A7`]}`,
  },

  '&:active': {
    backgroundColor: props.theme.colors.radix[`${props.color}A6`],
  },

  ...(props.edge === 'start' && {
    marginLeft: props.size === 'small' ? -3 : -12,
  }),

  ...(props.edge === 'end' && {
    marginRight: props.size === 'small' ? -3 : -12,
  }),

  ...(props.size === 'small' && {
    padding: 5,
    fontSize: '1.8rem',
  }),

  ...(props.size === 'large' && {
    padding: 12,
    fontSize: '2.8rem',
  }),

  '&:disabled': {
    backgroundColor: 'transparent',
    color: props.theme.colors.text.disabled,
  },
}));
