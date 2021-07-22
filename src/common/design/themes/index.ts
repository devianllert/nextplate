import { Theme } from 'theme-ui';

import darkColors from './dark/colors';
import lightColors from './light/colors';

const makeTheme = <T extends Theme>(t: T) => t;

const theme = makeTheme({
  colors: {
    ...lightColors,
    modes: {
      dark: darkColors,
    },
  },
});

export default theme;
