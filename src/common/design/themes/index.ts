import { Theme } from 'theme-ui';

import darkColors from './dark/colors';
import lightColors from './light/colors';

const theme: Theme = {
  colors: {
    ...lightColors,
    modes: {
      dark: darkColors,
    },
  },
};

export default theme;
