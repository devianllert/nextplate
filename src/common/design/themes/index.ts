import { Theme } from 'theme-ui';

import darkColors from './dark/colors';
import lightColors from './light/colors';

export const makeTheme = <T extends Theme>(t: T): T => t;

export const theme = makeTheme({
  colors: {
    ...lightColors,
    modes: {
      dark: darkColors,
    },
  },
});
