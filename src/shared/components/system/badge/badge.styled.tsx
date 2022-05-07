import styled from '@emotion/styled';
import { typography, TypographyProps } from 'styled-system';

import { createTransition, duration } from '@/shared/design/tokens/transitions';
import shape from '@/shared/design/tokens/shape';

export interface BadgeStyleProps extends TypographyProps {
  size?: string;
  interactive?: boolean;
  shape: string;
}

export const BadgeRoot = styled.span<BadgeStyleProps>((props) => ({
  // Reset
  alignItems: 'center',
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: 'inherit',
  justifyContent: 'center',
  lineHeight: '1',
  verticalAlign: 'middle',
  outline: 'none',
  padding: '0',
  textDecoration: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  backgroundColor: props.theme.colors.radix[`${props.color}3`],
  borderRadius: shape[props.shape],
  color: props.theme.colors.radix[`${props.color}11`],
  whiteSpace: 'nowrap',
  fontVariantNumeric: 'tabular-nums',
  transition: createTransition(['background-color', 'box-shadow', 'color'], { duration: duration.short }),

  '&:focus-visible': {
    boxShadow: `inset 0 0 0 1px ${props.theme.colors.radix[`${props.color}8`]}, 0 0 0 1px ${props.theme.colors.radix[`${props.color}8`]}`,
  },

  height: 24,
  paddingLeft: 8,
  paddingRight: 8,
  fontSize: '1.4rem',

  ...(props.size === 'small' && {
    height: 20,
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: '1.2rem',
  }),

  '&[aria-disabled=true]': {
    backgroundColor: props.theme.colors.radix.gray3,
    pointerEvents: 'none',
    color: props.theme.colors.radix.gray8,
  },

  ...(props.interactive && {
    cursor: 'pointer',
    '@hover': {
      '&:hover': {
        backgroundColor: props.theme.colors.radix[`${props.color}4`],
      },
    },
    '&:active': {
      backgroundColor: props.theme.colors.radix[`${props.color}5`],
    },
    '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]': {
      backgroundColor: props.theme.colors.radix[`${props.color}5`],
    },
  }),
}), typography);
