import styled from '@emotion/styled';
import {
  ResponsiveValue,
  Scale,
  system,
  width,
  WidthProps,
} from 'styled-system';

import { isNumber } from '@/modules/core/js/assertion';
import { get } from '@/common/utils/get';
import { getSpace } from '@/modules/core/css-in-js/getters';

export interface BleedRootProps extends WidthProps {
  space?: ResponsiveValue<number | string>;
  top?: ResponsiveValue<number | string>;
  bottom?: ResponsiveValue<number | string>;
  left?: ResponsiveValue<number | string>;
  right?: ResponsiveValue<number | string>;
  vertical?: ResponsiveValue<number | string>;
  horizontal?: ResponsiveValue<number | string>;
  topOffset?: ResponsiveValue<number | string>;
  bottomOffset?: ResponsiveValue<number | string>;
  leftOffset?: ResponsiveValue<number | string>;
  rightOffset?: ResponsiveValue<number | string>;
}

export const getNegativeSpace = (scale: Scale, n: number | string): number | string => {
  if (!isNumber(n)) {
    return (get(scale, n) as number) ?? `-${n}`;
  }

  const absolute = Math.abs(n);
  const value = (get(scale, absolute) ?? absolute) as number;

  if (!isNumber(value)) {
    return `-${value as string}`;
  }

  return -value;
};

const bleedSystem = system({
  position: true,
  topOffset: {
    property: 'top',
    scale: 'space',
    transform: (n: number | string, scale) => getSpace(scale as Scale, n),
  },
  bottomOffset: {
    property: 'bottom',
    scale: 'space',
    transform: (n: number | string, scale) => getSpace(scale as Scale, n),
  },
  leftOffset: {
    property: 'left',
    scale: 'space',
    transform: (n: number | string, scale) => getSpace(scale as Scale, n),
  },
  rightOffset: {
    property: 'right',
    scale: 'space',
    transform: (n: number | string, scale) => getSpace(scale as Scale, n),
  },
  horizontalOffset: {
    properties: ['left', 'right'],
    scale: 'space',
    transform: (n: number | string, scale) => getSpace(scale as Scale, n),
  },
  verticalOffset: {
    properties: ['top', 'bottom'],
    scale: 'space',
    transform: (n: number | string, scale) => getSpace(scale as Scale, n),
  },
  top: {
    property: 'marginTop',
    scale: 'space',
    transform: (n: number | string, scale) => getNegativeSpace(scale as Scale, n),
  },
  bottom: {
    property: 'marginBottom',
    scale: 'space',
    transform: (n: number | string, scale) => getNegativeSpace(scale as Scale, n),
  },
  left: {
    property: 'marginLeft',
    scale: 'space',
    transform: (n: number | string, scale) => getNegativeSpace(scale as Scale, n),
  },
  right: {
    property: 'marginRight',
    scale: 'space',
    transform: (n: number | string, scale) => getNegativeSpace(scale as Scale, n),
  },
  horizontal: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    transform: (n: number | string, scale) => getNegativeSpace(scale as Scale, n),
  },
  vertical: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    transform: (n: number | string, scale) => getNegativeSpace(scale as Scale, n),
  },
  space: {
    property: 'margin',
    scale: 'space',
    transform: (n: number | string, scale) => getNegativeSpace(scale as Scale, n),
  },
});

export const BleedRoot = styled.div<BleedRootProps>(
  bleedSystem,
  width,
);
