import memoize, { Fn } from '@emotion/memoize';
import isPropValid from '@emotion/is-prop-valid';
import { isValidMotionProp } from 'framer-motion';
import {
  compose,
  space,
  color,
  layout,
  flexbox,
  border,
  background,
  position,
  boxShadow,
  grid,
} from 'styled-system';

const all = compose(
  space,
  color,
  layout,
  flexbox,
  border,
  background,
  position,
  boxShadow,
  grid,
);

export const propsNames = all.propNames;

export const createShouldForwardProp = (props: string[] = []): Fn<boolean> => {
  const regex = new RegExp(`^(${props.join('|')})$`);

  return memoize((prop) => (isPropValid(prop) || isValidMotionProp(prop)) && !regex.test(prop));
};

export const shouldForwardProp = createShouldForwardProp(propsNames);
