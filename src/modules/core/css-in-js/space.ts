import { get } from '@/common/utils/get';
import { CSSProperties } from 'react';
import { GenericObject } from '../data/types/GenericObject';

import {
  CSSSystem,
  ResponsiveValue,
  createSystem,
  // compose,
} from './system';

/**
 * Converts shorthand or longhand margin and padding props to margin and padding CSS declarations
 *
 * - Numbers from 0-4 (or the length of theme.space) are converted to values on the spacing scale.
 * - Negative values can be used for negative margins.
 * - Numbers greater than the length of the theme.space array are converted to raw pixel values.
 * - String values are passed as raw CSS values.
 * - Array values are converted into responsive values.
 */
export interface SpaceProps {
  /** Margin on top, left, bottom and right */
  m?: ResponsiveValue<CSSProperties['margin']>;
  /** Margin on top, left, bottom and right */
  margin?: ResponsiveValue<CSSProperties['margin']>;
  /** Margin for the top */
  mt?: ResponsiveValue<CSSProperties['marginTop']>;
  /** Margin for the top */
  marginTop?: ResponsiveValue<CSSProperties['marginTop']>;
  /** Margin for the right */
  mr?: ResponsiveValue<CSSProperties['marginRight']>;
  /** Margin for the right */
  marginRight?: ResponsiveValue<CSSProperties['marginRight']>;
  /** Margin for the bottom */
  mb?: ResponsiveValue<CSSProperties['margin']>;
  /** Margin for the bottom */
  marginBottom?: ResponsiveValue<CSSProperties['margin']>;
  /** Margin for the left */
  ml?: ResponsiveValue<CSSProperties['marginLeft']>;
  /** Margin for the left */
  marginLeft?: ResponsiveValue<CSSProperties['marginLeft']>;
  /** Margin for the left and right */
  mx?: ResponsiveValue<CSSProperties['margin']>;
  /** Margin for the top and bottom */
  my?: ResponsiveValue<CSSProperties['margin']>;
  /** Padding on top, left, bottom and right */
  p?: ResponsiveValue<CSSProperties['padding']>;
  /** Padding on top, left, bottom and right */
  padding?: ResponsiveValue<CSSProperties['padding']>;
  /** Padding for the top */
  pt?: ResponsiveValue<CSSProperties['paddingTop']>;
  /** Padding for the top */
  paddingTop?: ResponsiveValue<CSSProperties['paddingTop']>;
  /** Padding for the right */
  pr?: ResponsiveValue<CSSProperties['paddingRight']>;
  /** Padding for the right */
  paddingRight?: ResponsiveValue<CSSProperties['paddingRight']>;
  /** Padding for the bottom */
  pb?: ResponsiveValue<CSSProperties['paddingBottom']>;
  /** Padding for the bottom */
  paddingBottom?: ResponsiveValue<CSSProperties['paddingBottom']>;
  /** Padding for the left */
  pl?: ResponsiveValue<CSSProperties['paddingLeft']>;
  /** Padding for the left */
  paddingLeft?: ResponsiveValue<CSSProperties['paddingLeft']>;
  /** Padding for the left and right */
  px?: ResponsiveValue<CSSProperties['padding']>;
  /** Padding for the top and bottom */
  py?: ResponsiveValue<CSSProperties['padding']>;

}

const defaults = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

const isNumber = (n: unknown) => typeof n === 'number' && !Number.isNaN(n);

const getMargin = (scale: number[], n: number): number | string => {
  if (!isNumber(n)) {
    return (get(scale, n) as number) ?? n;
  }

  const isNegative = n < 0;
  const absolute = Math.abs(n);
  const value = (get(scale, absolute) ?? absolute) as number;

  if (!isNumber(value)) {
    return isNegative ? `-${value}` : value;
  }

  return value * (isNegative ? -1 : 1);
};

const configs: GenericObject<CSSSystem> = {};
configs.margin = {
  margin: {
    properties: ['margin'],
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space,
  },
  marginTop: {
    properties: ['marginTop'],
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space,
  },
  marginRight: {
    properties: ['marginRight'],
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space,
  },
  marginBottom: {
    properties: ['marginBottom'],
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space,
  },
  marginLeft: {
    properties: ['marginLeft'],
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space,
  },
  marginX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space,
  },
  marginY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    transform: getMargin,
    defaultScale: defaults.space,
  },
};
configs.margin.m = configs.margin.margin;
configs.margin.mt = configs.margin.marginTop;
configs.margin.mr = configs.margin.marginRight;
configs.margin.mb = configs.margin.marginBottom;
configs.margin.ml = configs.margin.marginLeft;
configs.margin.mx = configs.margin.marginX;
configs.margin.my = configs.margin.marginY;

configs.padding = {
  padding: {
    properties: ['padding'],
    scale: 'space',
    defaultScale: defaults.space,
  },
  paddingTop: {
    properties: ['paddingTop'],
    scale: 'space',
    defaultScale: defaults.space,
  },
  paddingRight: {
    properties: ['paddingRight'],
    scale: 'space',
    defaultScale: defaults.space,
  },
  paddingBottom: {
    properties: ['paddingBottom'],
    scale: 'space',
    defaultScale: defaults.space,
  },
  paddingLeft: {
    properties: ['paddingLeft'],
    scale: 'space',
    defaultScale: defaults.space,
  },
  paddingX: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
    defaultScale: defaults.space,
  },
  paddingY: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
    defaultScale: defaults.space,
  },
};
configs.padding.p = configs.padding.padding;
configs.padding.pt = configs.padding.paddingTop;
configs.padding.pr = configs.padding.paddingRight;
configs.padding.pb = configs.padding.paddingBottom;
configs.padding.pl = configs.padding.paddingLeft;
configs.padding.px = configs.padding.paddingX;
configs.padding.py = configs.padding.paddingY;

export const margin = createSystem(configs.margin);
export const padding = createSystem(configs.padding);
// export const space = compose(margin, padding);
