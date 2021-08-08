import { CSSProperties } from 'react';

import { get } from '@/common/utils/get';

import { createSystem, ResponsiveValue } from './system';

export interface LayoutProps {
  width?: ResponsiveValue<CSSProperties['width']>;
  height?: ResponsiveValue<CSSProperties['height']>;
  minWidth?: ResponsiveValue<CSSProperties['minWidth']>;
  minHeight?: ResponsiveValue<CSSProperties['minHeight']>;
  maxWidth?: ResponsiveValue<CSSProperties['maxWidth']>;
  maxHeight?: ResponsiveValue<CSSProperties['maxHeight']>;
  size?: ResponsiveValue<CSSProperties['width']>;
  overflow?: ResponsiveValue<CSSProperties['overflow']>;
  overflowX?: ResponsiveValue<CSSProperties['overflowX']>;
  overflowY?: ResponsiveValue<CSSProperties['overflowY']>;
  display?: ResponsiveValue<CSSProperties['display']>;
  verticalAlign?: ResponsiveValue<CSSProperties['verticalAlign']>;
}

const isNumber = (n: unknown): n is number => typeof n === 'number' && !Number.isNaN(n);

const getWidth = (scale: (string | number)[], n: string | number) => (get(scale, n) ?? (!isNumber(n) || n > 1 ? n : `${(n) * 100}%`));

const config = {
  width: {
    properties: ['width'],
    scale: 'sizes',
    transform: getWidth,
  },
  height: {
    properties: ['height'],
    scale: 'sizes',
  },
  minWidth: {
    properties: ['minWidth'],
    scale: 'sizes',
  },
  minHeight: {
    properties: ['minHeight'],
    scale: 'sizes',
  },
  maxWidth: {
    properties: ['maxWidth'],
    scale: 'sizes',
  },
  maxHeight: {
    properties: ['maxHeight'],
    scale: 'sizes',
  },
  size: {
    properties: ['width', 'height'],
    scale: 'sizes',
  },
  overflow: true,
  overflowX: true,
  overflowY: true,
  display: true,
  verticalAlign: true,
};

export const layout = createSystem(config);
