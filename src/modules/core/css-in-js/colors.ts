import { CSSProperties } from 'react';

import { createSystem, ResponsiveValue } from './system';

export interface ColorProps {
  opacity?: ResponsiveValue<CSSProperties['opacity']>;
}

const config = {
  opacity: true,
};

export const color = createSystem(config);
