import * as SwitchPrimitive from '@radix-ui/react-switch';
import styled from '@emotion/styled';
import { createTransition, duration } from '@/common/design/tokens/transitions';

export const SwitchRoot = styled(SwitchPrimitive.Root)<{ size?: 'small' | 'large' }>((props) => ({
  all: 'unset',
  boxSizing: 'content-box',
  width: props.size === 'small' ? 26 : 40,
  height: props.size === 'small' ? 14 : 24,
  backgroundColor: props.theme.colors.radix.grayA9,
  padding: 2,
  borderRadius: '9999px',
  position: 'relative',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  boxShadow: `0 0 0 0 ${props.theme.colors.radix.gray8}`,
  transition: createTransition(['box-shadow', 'background-color'], { duration: duration.shortest }),
  cursor: 'pointer',
  '&:focus': { boxShadow: `0 0 0 2px ${props.theme.colors.radix.gray8}` },
  '&[data-state="checked"]': { backgroundColor: props.theme.colors.radix.primaryA9 },
}));

export const SwitchThumb = styled(SwitchPrimitive.Thumb)<{ size?: 'small' | 'large' }>((props) => ({
  display: 'flex',
  width: props.size === 'small' ? 14 : 20,
  height: props.size === 'small' ? 14 : 20,
  backgroundColor: 'white',
  borderRadius: '50%',
  boxShadow: `0 2px 2px ${props.theme.colors.radix.grayA7}`,
  transition: 'transform 100ms',
  transform: 'translateX(0px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: props.size === 'small' ? 'translateX(12px)' : 'translateX(20px)' },
}));
