import { spacings } from '@/common/design/tokens/spacings';
import { CSSProperties } from 'react';

import { createSystem, ResponsiveValue } from './system';

export interface PositionProps {
  position?: ResponsiveValue<CSSProperties['position']>,
  transform?: ResponsiveValue<CSSProperties['transform']>,
  zIndex?: ResponsiveValue<CSSProperties['zIndex']>;
  top?: ResponsiveValue<CSSProperties['top']>;
  right?: ResponsiveValue<CSSProperties['right']>;
  bottom?: ResponsiveValue<CSSProperties['bottom']>;
  left?: ResponsiveValue<CSSProperties['left']>;
}

const config = {
  position: true,
  transform: true,
  zIndex: {
    properties: ['zIndex'],
    scale: 'zIndices',
  },
  top: {
    properties: ['top'],
    scale: 'space',
    defaultScale: spacings,
  },
  right: {
    properties: ['right'],
    scale: 'space',
    defaultScale: spacings,
  },
  bottom: {
    properties: ['bottom'],
    scale: 'space',
    defaultScale: spacings,
  },
  left: {
    properties: ['left'],
    scale: 'space',
    defaultScale: spacings,
  },
};

export const position = createSystem(config);
