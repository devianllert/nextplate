import * as React from 'react';
import { ResponsiveValue, WidthProps, PositionProps } from 'styled-system';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';

import * as S from './styled';

export interface BleedProps extends WidthProps, PositionProps {
  /**
   * The content
   */
  children: React.ReactNode;

  /**
   * The space for both axis.
   */
  space?: ResponsiveValue<number | string>;

  /**
   * The space for top side.
   */
  topOffset?: ResponsiveValue<number | string>;

  /**
   * The space for bottom side.
   */
  bottomOffset?: ResponsiveValue<number | string>;

  /**
   * The space for left side.
   */
  leftOffset?: ResponsiveValue<number | string>;

  /**
   * The space for right side.
   */
  rightOffset?: ResponsiveValue<number | string>;

  /**
   * The space for top side.
   */
  top?: ResponsiveValue<number | string>;

  /**
   * The space for bottom side.
   */
  bottom?: ResponsiveValue<number | string>;

  /**
   * The space for left side.
   */
  left?: ResponsiveValue<number | string>;

  /**
   * The space for right side.
   */
  right?: ResponsiveValue<number | string>;

  /**
   * The space for vertical axis.
   */
  vertical?: ResponsiveValue<number | string>;

  /**
   * The space for horizontal axis.
   */
  horizontal?: ResponsiveValue<number | string>;
}

/**
 * The `Bleed` component is used to render a container with negative margins, allowing content
 * to "bleed" (see https://en.wikipedia.org/wiki/Bleed_(printing)) into the
 * surrounding layout. This effectively works as the opposite of `Inset` and
 * is designed to make it easy to visually break out of a parent container
 * without having to refactor the entire component tree.
 */
export const Bleed: PolymorphicComponent<BleedProps, 'div'> = React.forwardRef((props, ref) => {
  const {
    children,
    ...other
  } = props;

  return (
    <S.BleedRoot {...other} ref={ref}>{children}</S.BleedRoot>
  );
});
