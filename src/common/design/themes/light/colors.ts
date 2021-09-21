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
    success: transformColorScale(green),
    info: transformColorScale(blue),
    warning: transformColorScale(yellow),
    error: transformColorScale(red),
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
  },
};

export default lightColors;
