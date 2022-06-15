import styled from '@emotion/styled';

import { ButtonBase } from '@/shared/components/system/button-base';

import shape from '@/shared/design/tokens/shape';
import { createTransition, duration } from '@/shared/design/tokens/transitions';
import shadows from '@/shared/design/tokens/shadows';
import { getContrastText } from '@/shared/design/lib/color-manipulator';
import { getButtonHeights, getButtonPaddings, getButtonTypography } from './button.tokens';

interface ButtonRootProps {
  /**
   * The variant to use.
   *
   * @default 'text'
   */
  variant?: 'text' | 'outlined' | 'contained';

  /**
   * The color to use.
   *
   * @default 'primary'
   */
  color: string;

  /**
   * If `true`, the button will take up the full width of its container.
   *
   * @default false
   */
  fullWidth?: boolean;

  /**
   * If `true`, the button will show uppercase text
   *
   * @default true
   */
  uppercase?: boolean;

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * If `true`, no elevation is used.
   *
   * @default false
   */
  disableElevation?: boolean;
}

export const ButtonRoot = styled(ButtonBase)<ButtonRootProps>(
  ({ theme, ...props }) => ({
    ...getButtonTypography(props.size),
    textTransform: props.uppercase ? 'uppercase' : 'none',
    minWidth: 64,
    minHeight: getButtonHeights(props.size),
    padding: `6px ${getButtonPaddings(props.size)}px`,
    borderRadius: shape.round,
    outline: 0,
    transition: createTransition(['background-color', 'box-shadow', 'border-color', 'color'], { duration: duration.short }),

    ...(props.variant === 'text' && {
      color: theme.colors.radix[`${props.color}11`],

      '&:hover': {
        backgroundColor: theme.colors.radix[`${props.color}A4`],
        textDecoration: 'none',
      },

      '&:focus-visible': {
        backgroundColor: theme.colors.radix[`${props.color}A4`],
        textDecoration: 'none',
        boxShadow: `inset 0 0 0 1px ${theme.colors.radix[`${props.color}8`]}, 0 0 0 1px ${theme.colors.radix[`${props.color}8`]}`,
      },

      '&:active': {
        backgroundColor: theme.colors.radix[`${props.color}A6`],
      },

      '&[disabled]': {
        color: theme.colors.radix.gray11,
        backgroundColor: 'transparent',
      },
    }),

    ...(props.variant === 'outlined' && {
      color: theme.colors.radix[`${props.color}11`],
      border: '1px solid',
      borderColor: theme.colors.radix[`${props.color}7`],

      '&:hover': {
        backgroundColor: theme.colors.radix[`${props.color}A4`],
        borderColor: theme.colors.radix[`${props.color}8`],
        textDecoration: 'none',
      },

      '&:focus-visible': {
        backgroundColor: theme.colors.radix[`${props.color}A4`],
        borderColor: theme.colors.radix[`${props.color}8`],
        boxShadow: `inset 0 0 0 1px ${theme.colors.radix[`${props.color}8`]}`,
        textDecoration: 'none',
      },

      '&:active': {
        backgroundColor: theme.colors.radix[`${props.color}A6`],
      },

      '&[disabled]': {
        color: theme.colors.radix.gray11,
        borderColor: theme.colors.radix.gray6,
        backgroundColor: 'transparent',
      },
    }),

    ...(props.variant === 'contained' && {
      color: getContrastText(theme.rawColors.radix[`${props.color}9`] as string),
      backgroundColor: theme.colors.radix[`${props.color}9`],
      boxShadow: shadows[2],

      '&:hover, &:focus-visible': {
        backgroundColor: theme.colors.radix[`${props.color}10`],
        textDecoration: 'none',
      },

      '&:active': {
        backgroundColor: theme.colors.radix[`${props.color}11`],
      },

      '&[disabled]': {
        color: theme.colors.radix.gray11,
        backgroundColor: theme.colors.radix.gray6,
      },
    }),

    ...(props.fullWidth && {
      width: '100%',
    }),

    ...(props.disableElevation && {
      boxShadow: 'none',
    }),
  }),
);

export const ButtonStartIcon = styled.span({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4,
});

export const ButtonEndIcon = styled.span({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8,
});
