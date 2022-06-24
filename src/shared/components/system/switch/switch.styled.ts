import * as SwitchPrimitive from '@radix-ui/react-switch';
import styled from '@emotion/styled';
import { createTransition, duration } from '@/shared/design/tokens/transitions';
import { shape } from '@/shared/design/tokens/shape';
import { Sizes } from '@/shared/design/tokens/size';
import { getSwitchHeights, getSwitchWidths } from './switch.tokens';

export const SwitchRoot = styled(SwitchPrimitive.Root)<{ size?: Exclude<Sizes, 'xsmall'> }>((props) => ({
  all: 'unset',
  boxSizing: 'content-box',
  width: getSwitchWidths(props.size),
  height: getSwitchHeights(props.size),
  backgroundColor: props.theme.colors.radix.grayA9,
  padding: 2,
  borderRadius: shape.circle,
  position: 'relative',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  boxShadow: `0 0 0 0 ${props.theme.colors.radix.gray8}`,
  transition: createTransition(['box-shadow', 'background-color'], { duration: duration.shortest }),
  cursor: 'pointer',

  '&:focus-visible': {
    boxShadow: `0 0 0 2px ${props.theme.colors.radix.gray8}`,
  },

  '&[data-state="checked"]': {
    backgroundColor: props.theme.colors.radix.primaryA9,
  },

  '&[data-disabled]': {
    backgroundColor: props.theme.colors.radix.grayA8,
    cursor: 'default',
  },
}));

export const SwitchThumb = styled(SwitchPrimitive.Thumb)<{ size?: Exclude<Sizes, 'xsmall'> }>((props) => ({
  display: 'flex',
  width: getSwitchHeights(props.size),
  height: getSwitchHeights(props.size),
  backgroundColor: 'white',
  borderRadius: 'inherit',
  boxShadow: `0 2px 2px ${props.theme.colors.radix.grayA7}`,
  transition: createTransition('transform', { duration: duration.short }),
  transform: 'translateX(0px)',
  willChange: 'transform',

  '&[data-state="checked"]': {
    transform: `translateX(${getSwitchWidths(props.size) - getSwitchHeights(props.size)}px)`,
  },

  '&[data-disabled]': {
    opacity: 0.75,
    boxShadow: 'none',
  },
}));
