import '@emotion/react';
import { Theme as ThemeUI, ColorModesScale } from 'theme-ui';
import {
  PaletteAction, PaletteBackground, PaletteBrand, PaletteStatus, PaletteText,
} from './palette.interface';

interface ColorOverrides {
  colors?: ColorModesScale & {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
    muted: string;

    textColors: PaletteText;
    brand: PaletteBrand;
    status: PaletteStatus;
    backgroundColors: PaletteBackground;
    action: PaletteAction;
  };

  rawColors?: ColorModesScale & {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
    muted: string;

    textColors: PaletteText;
    brand: PaletteBrand;
    status: PaletteStatus;
    backgroundColors: PaletteBackground;
    action: PaletteAction;
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type ThemeOverrides = ThemeUI & ColorOverrides;

declare module 'theme-ui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ThemeOverrides {}
}

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ThemeOverrides {}
}
