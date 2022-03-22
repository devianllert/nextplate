import {
  grayDark,
  grayDarkA,
  blueDark,
  blueDarkA,
  redDark,
  redDarkA,
  greenDark,
  greenDarkA,
  tealDark,
  tealDarkA,
  violetDark,
  violetDarkA,
  yellowDark,
  yellowDarkA,
  slateDark,
  whiteA,
} from '@radix-ui/colors';
import { transformColorScale } from '../../utils/transformColorScale';

const darkColors = {
  text: {
    primary: whiteA.whiteA12,
    secondary: whiteA.whiteA10,
    disabled: whiteA.whiteA8,
  },
  background: {
    primary: grayDark.gray1,
    secondary: grayDark.gray2,
  },
  status: {
    success: transformColorScale(greenDark),
    info: transformColorScale(blueDark),
    warning: transformColorScale(yellowDark),
    error: transformColorScale(redDark),
  },
  radix: {
    ...grayDark,
    ...grayDarkA,
    ...blueDark,
    ...blueDarkA,
    ...redDark,
    ...redDarkA,
    ...greenDark,
    ...greenDarkA,
    ...yellowDark,
    ...yellowDarkA,
    ...transformColorScale(violetDarkA, 'primaryA'),
    ...transformColorScale(violetDark, 'primary'),
    ...transformColorScale(tealDarkA, 'secondaryA'),
    ...transformColorScale(tealDark, 'secondary'),
    ...transformColorScale(whiteA, 'contrast'),
    ...transformColorScale(whiteA, 'contrastA'),

    highContrast: slateDark.slate12,
    lowContrast: slateDark.slate1,
  },
};

export default darkColors;
