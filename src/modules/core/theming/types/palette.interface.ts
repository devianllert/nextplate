export interface Palette {
  mode: PaletteMode;

  /**
   * The colors used to style the text.
   */
  text: PaletteText;

  /**
   * The background colors used to style the surfaces.
   * Consistency between these values is important.
   */
  background: PaletteBackground;

  /**
   * The brand colors used to style the surfaces.
   */
  brand: PaletteBrand;

  /**
   * The colors used to style the statuses
   */
  status: PaletteStatus;

  /**
   * Nested palette modes can provide overrides when used in conjunction with
   * `Theme.initialColorModeName` and `useColorMode()`
   */
  modes?: {
    [k: string]: Palette;
  };
}

export type PaletteMode = 'dark' | 'light';

export interface PaletteText {
  primary: string;
  secondary: string;
  disabled: string;
}

export interface PaletteBackground {
  primary: string;
  secondary: string;
}

export interface PaletteBrand {
  primary: string;
  secondary: string;
}

export interface PaletteStatus {
  success: string;
  warning: string;
  info: string;
  error: string;
}
