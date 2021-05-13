import 'styled-components';
import { Palette } from './palette.interface';
import { ThemeUIConfig } from './themeConfig.interface';

export interface ThemeUI {
  palette: Palette;
  config?: ThemeUIConfig;
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeUI {}
}
