import styled, { CSSObject } from '@emotion/styled';

import { spacings } from '@/shared/design/tokens/spacings';
import shape from '@/shared/design/tokens/shape';

import { IndicatorPosition } from './indicator.types';

interface IndicatorStyledProps {
  size: number;
  color: string | null;
  position: IndicatorPosition;
  offset: number;
  inline: boolean;
  withBorder: boolean;
  borderColor: string;
  shape: string;
  withLabel: boolean;
  zIndex: number;
}

function getPositionStyles(_position: IndicatorPosition, offset = 0) {
  const styles: CSSObject = {};
  const [position, placement] = _position.split('-');
  let translateX = '';
  let translateY = '';

  if (position === 'top') {
    styles.top = offset;
    translateY = '-50%';
  }

  if (position === 'middle') {
    styles.top = '50%';
    translateY = '-50%';
  }

  if (position === 'bottom') {
    styles.bottom = offset;
    translateY = '50%';
  }

  if (placement === 'start') {
    styles.left = offset;
    translateX = '-50%';
  }

  if (placement === 'center') {
    styles.left = '50%';
    translateX = '-50%';
  }

  if (placement === 'end') {
    styles.right = offset;
    translateX = '50%';
  }

  styles.transform = `translate(${translateX}, ${translateY})`;

  return styles;
}

export const IndicatorRoot = styled.div<{ inline?: boolean }>((props) => ({
  position: 'relative',
  display: props.inline ? 'inline-block' : 'block',
}));

export const Indicator = styled.div<IndicatorStyledProps>((props) => ({
  ...getPositionStyles(props.position, props.offset),
  boxSizing: props.withBorder ? 'content-box' : 'border-box',
  minWidth: props.size,
  minHeight: props.size,
  fontSize: '1.2rem',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: props.withLabel ? spacings[2] / 2 : 0,
  paddingRight: props.withLabel ? spacings[2] / 2 : 0,
  borderRadius: props.shape ? shape[props.shape] : 'none',
  color: 'white',
  whiteSpace: 'nowrap',
  zIndex: props.zIndex,
  backgroundColor: props.color ? props.theme.colors.radix[`${props.color}9`] : 'none',
  border: props.withBorder
    ? `2px solid ${props.theme.colors.radix[props.borderColor] ?? props.borderColor}`
    : undefined,
}));
