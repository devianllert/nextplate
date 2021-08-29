import { CSSProperties } from 'react';

import { createSystem, ResponsiveValue } from './system';

export interface ColorProps {
  color?: CSSProperties['color'];
  backgroundColor?: ResponsiveValue<CSSProperties['backgroundColor']>;
  opacity?: ResponsiveValue<CSSProperties['opacity']>;
}

const config = {
  color: {
    properties: ['color'],
    scale: 'colors',
  },
  backgroundColor: {
    properties: ['backgroundColor'],
    scale: 'colors',
  },
  opacity: true,
};

export const color = createSystem(config);
