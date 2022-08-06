import { Theme } from 'theme-ui';

import { breakpointsArray } from '../media';
import { shadows } from '../tokens/shadows';
import { spacings } from '../tokens/spacings';

import darkColors from './dark/colors';
import lightColors from './light/colors';

export const makeTheme = <T extends Theme>(t: T): T => t;

export const theme = makeTheme({
  breakpoints: breakpointsArray.map((breakpoint) => `${breakpoint}px`),
  space: spacings,
  shadows,
  colors: {
    ...lightColors,
    modes: {
      dark: darkColors,
    },
  },
});
