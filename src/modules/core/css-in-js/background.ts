import { CSSProperties } from 'react';

import { createSystem, ResponsiveValue } from './system';

export interface BackgroundProps {
  background?: ResponsiveValue<CSSProperties['background']>;
  backgroundImage?: ResponsiveValue<CSSProperties['backgroundImage']>;
  backgroundSize?: ResponsiveValue<CSSProperties['backgroundSize']>;
  backgroundPosition?: ResponsiveValue<CSSProperties['backgroundPosition']>;
  backgroundRepeat?: ResponsiveValue<CSSProperties['backgroundRepeat']>;
}

const config = {
  background: true,
  backgroundImage: true,
  backgroundSize: true,
  backgroundPosition: true,
  backgroundRepeat: true,
};

export const background = createSystem(config);
