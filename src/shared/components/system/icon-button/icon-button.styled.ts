import styled from '@emotion/styled';

import { ButtonBase, ButtonBaseProps } from '@/shared/components/system/button-base';
import { createTransition, duration } from '@/shared/design/tokens/transitions';
import shape from '@/shared/design/tokens/shape';
import { getContrastText } from '@/shared/design/lib/color-manipulator';
import { getIconButtonSize, getIconButtonTypography } from './icon-button.tokens';
import { Sizes } from '@/shared/design/tokens/size';

interface IconButtonRootProps extends ButtonBaseProps {
  edge?: 'end' | 'start' | false;
  size?: Sizes;
  color?: string;
  shape?: 'round' | 'circle';
  variant?: 'ghost' | 'solid';
}

export const IconButtonRoot = styled(ButtonBase)<IconButtonRootProps>((props) => ({
  fontSize: getIconButtonTypography(props.size),
  width: getIconButtonSize(props.size),
  height: getIconButtonSize(props.size),
  flex: '0 0 auto',
  textAlign: 'center',
  borderRadius: props.shape === 'circle' ? '50%' : shape.round,
  overflow: 'visible',
  outline: 0,
  transition: createTransition(['background-color', 'box-shadow'], {
    duration: duration.short,
  }),

  ...(props.variant === 'ghost' && {
    color: props.theme.colors.radix[`${props.color}11`],

    '&:hover': {
      backgroundColor: props.theme.colors.radix[`${props.color}A4`],
      textDecoration: 'none',

      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },

    '&:focus-visible': {
      backgroundColor: props.theme.colors.radix[`${props.color}A4`],
      textDecoration: 'none',
      boxShadow: `inset 0 0 0 1px ${props.theme.colors.radix[`${props.color}8`]}, 0 0 0 1px ${props.theme.colors.radix[`${props.color}8`]}`,
    },

    '&:active': {
      backgroundColor: props.theme.colors.radix[`${props.color}A6`],
    },

    '&:disabled': {
      backgroundColor: 'transparent',
      color: props.theme.colors.text.disabled,
    },
  }),

  ...(props.variant === 'solid' && {
    color: getContrastText(props.theme.colors.radix[`${props.color}12`] as string),
    backgroundColor: props.theme.colors.radix[`${props.color}9`],

    '&:hover': {
      backgroundColor: props.theme.colors.radix[`${props.color}10`],
      textDecoration: 'none',

      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },

    '&:focus-visible': {
      boxShadow: `0 0 0 3px ${props.theme.colors.radix.grayA7}, inset 0 0 0 1px ${props.theme.colors.radix.grayA7}`,
    },

    '&:active': {
      backgroundColor: props.theme.colors.radix[`${props.color}11`],
    },

    '&:disabled': {
      backgroundColor: props.theme.colors.radix.gray6,
      color: props.theme.colors.text.disabled,
    },
  }),

  ...(props.edge === 'start' && {
    marginLeft: props.size === 'small' ? -3 : -12,
  }),

  ...(props.edge === 'end' && {
    marginRight: props.size === 'small' ? -3 : -12,
  }),
}));
