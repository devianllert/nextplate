import {
  gray,
  grayA,
  blue,
  blueA,
  red,
  redA,
  green,
  greenA,
  violet,
  violetA,
  teal,
  tealA,
  yellow,
  yellowA,
  blackA,
  slate,
} from '@radix-ui/colors';
import { transformColorScale } from '../../utils/transformColorScale';

const lightColors = {
  text: {
    primary: blackA.blackA12,
    secondary: blackA.blackA11,
    disabled: blackA.blackA10,
  },
  background: {
    primary: 'white',
    secondary: gray.gray2,
  },
  status: {
    success: transformColorScale(green, 'success'),
    info: transformColorScale(blue, 'info'),
    warning: transformColorScale(yellow, 'warning'),
    error: transformColorScale(red, 'error'),
  },
  radix: {
    ...gray,
    ...grayA,
    ...blue,
    ...blueA,
    ...red,
    ...redA,
    ...green,
    ...greenA,
    ...yellow,
    ...yellowA,
    ...transformColorScale(violetA, 'primaryA'),
    ...transformColorScale(violet, 'primary'),
    ...transformColorScale(tealA, 'secondaryA'),
    ...transformColorScale(teal, 'secondary'),
    ...transformColorScale(blackA, 'contrast'),
    ...transformColorScale(blackA, 'contrastA'),

    highContrast: slate.slate12,
    lowContrast: slate.slate1,
  },
};

export default lightColors;
