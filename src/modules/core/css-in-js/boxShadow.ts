import { CSSProperties } from 'react';

import shadows from '@/common/design/tokens/shadows';

import { createSystem, ResponsiveValue } from './system';

export interface BoxShadowProps {
  boxShadow?: ResponsiveValue<CSSProperties['boxShadow']>;
  textShadow?: ResponsiveValue<CSSProperties['textShadow']>;
}

export const boxShadow = createSystem({
  boxShadow: {
    properties: ['boxShadow'],
    scale: 'shadows',
    defaultScale: shadows,
  },
  textShadow: {
    properties: ['textShadow'],
    scale: 'shadows',
  },
});
