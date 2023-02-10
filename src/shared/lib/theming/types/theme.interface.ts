import { Flatten } from '@effable/misc';
import '@emotion/react';
import {
  yellow,
  yellowA,
  green,
  greenA,
  blue,
  blueA,
  red,
  redA,
  violet,
  violetA,
  teal,
  tealA,
  gray,
  grayA,
} from '@radix-ui/colors';

import {
  PaletteBackground,
  PaletteStatus,
  PaletteText,
} from './palette.interface';

type ScaleNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type RadixColorScale<T extends string = ''> = Record<`${T}${ScaleNumber}`, string>;

export type Colors = {
  text: PaletteText;
  background: PaletteBackground;
  primary: string;
  secondary: string;
  accent: string;
  highlight: string;
  muted: string;

  radix: typeof yellow
  & typeof yellowA
  & typeof green
  & typeof greenA
  & typeof blue
  & typeof blueA
  & typeof red
  & typeof redA
  & typeof violet
  & typeof violetA
  & typeof teal
  & typeof tealA
  & typeof gray
  & typeof grayA
  & RadixColorScale<'primary'>
  & RadixColorScale<'primaryA'>
  & RadixColorScale<'secondary'>
  & RadixColorScale<'secondaryA'>
  & RadixColorScale<'contrast'>
  & RadixColorScale<'contrastA'>
  & {
    lowContrast: string;
    highContrast: string;
  };

  status: PaletteStatus;
};

export interface ColorOverrides {
  colors: Colors;

  rawColors: Colors;
}

export type FlattenedColorKeys = keyof Flatten<Colors>;

export type ColorKeys = keyof Colors['radix'];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type ThemeOverrides = ColorOverrides;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ThemeOverrides {}
}
