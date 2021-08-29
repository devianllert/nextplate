import { CSSProperties } from 'theme-ui';
import { spacings } from '@/common/design/tokens/spacings';

import { createSystem, ResponsiveValue } from './system';

export interface GridProps {
  gridGap?: ResponsiveValue<number | string>;
  gridColumnGap?: ResponsiveValue<number | string>;
  gridRowGap?: ResponsiveValue<number | string>;
  gridColumn?: ResponsiveValue<CSSProperties['gridColumn']>;
  gridRow?: ResponsiveValue<CSSProperties['gridRow']>;
  gridAutoFlow?: ResponsiveValue<CSSProperties['gridAutoFlow']>;
  gridAutoColumns?: ResponsiveValue<CSSProperties['gridAutoColumns']>;
  gridAutoRows?: ResponsiveValue<CSSProperties['gridAutoRows']>;
  gridTemplateColumns?: ResponsiveValue<CSSProperties['gridTemplateColumns']>;
  gridTemplateRows?: ResponsiveValue<CSSProperties['gridTemplateRows']>;
  gridTemplateAreas?: ResponsiveValue<CSSProperties['gridTemplateAreas']>;
  gridArea?: ResponsiveValue<CSSProperties['gridArea']>;
}

const config = {
  gridGap: {
    properties: ['gridGap'],
    scale: 'space',
    defaultScale: spacings,
  },
  gridColumnGap: {
    properties: ['gridColumnGap'],
    scale: 'space',
    defaultScale: spacings,
  },
  gridRowGap: {
    properties: ['gridRowGap'],
    scale: 'space',
    defaultScale: spacings,
  },
  gridColumn: true,
  gridRow: true,
  gridAutoFlow: true,
  gridAutoColumns: true,
  gridAutoRows: true,
  gridTemplateColumns: true,
  gridTemplateRows: true,
  gridTemplateAreas: true,
  gridArea: true,
};

export const grid = createSystem(config);
