/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import flattenChildren from 'react-keyed-flatten-children';

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';
import { ResponsiveValue } from '@/modules/core/css-in-js/system';

import * as S from './styled';

export interface StackProps {
  /**
   * The content
   */
  children: React.ReactNode;

  /**
   * The spacing between children can be adjusted using the `space` prop.
   */
  space?: ResponsiveValue<number>;

  /**
  * Items of varying height can be vertically aligned using the `alignY` prop.
  */
  alignItems?: ResponsiveValue<React.CSSProperties['alignItems']>;

  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   *
   * @default 'column'
   */
  direction?: ResponsiveValue<React.CSSProperties['flexDirection']>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface StackTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & StackProps;
  defaultComponent: D;
}

/**
 * The Stack component manages layout of immediate children along the vertical or horizontal
 * axis with optional spacing and/or dividers between each child.
 */
export const Stack: OverridableComponent<StackTypeMap> = React.forwardRef(function Stack(props, ref) {
  const {
    component = 'div',
    children,
    space = 2,
    alignItems = 'inherit',
    direction = 'row',
  } = props;

  const isList = component === 'ol' || component === 'ul';
  const stackItemComponent = isList ? 'li' : 'div';

  return (
    <S.StackRootAligner space={space} ref={ref}>
      <S.StackRoot as={component} marginTop={space} marginLeft={space} alignY={alignItems} flexDirection={direction}>
        {React.Children.map(flattenChildren(children), (child) => (child ? (
          <S.StackBox space={space} as={stackItemComponent}>{child}</S.StackBox>
        ) : null))}
      </S.StackRoot>
    </S.StackRootAligner>
  );
});
