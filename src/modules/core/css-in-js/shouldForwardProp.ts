import memoize, { Fn } from '@emotion/memoize';
import isPropValid from '@emotion/is-prop-valid';

import { background } from './background';
import { border } from './border';
import { boxShadow } from './boxShadow';
import { color } from './colors';
import { flexbox } from './flexbox';
import { layout } from './layout';
import { position } from './position';
import { space } from './space';
import { compose } from './system';

const all = compose(
  space,
  color,
  layout,
  flexbox,
  border,
  background,
  position,
  boxShadow,
);

export const propsNames = all.propNames;

export const createShouldForwardProp = (props: string[]): Fn<boolean> => {
  const regex = new RegExp(`^(${props.join('|')})$`);
  return memoize((prop) => isPropValid(prop) && !regex.test(prop));
};

export const shouldForwardProp = createShouldForwardProp(propsNames);
