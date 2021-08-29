/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import flattenChildren from 'react-keyed-flatten-children';

import { OverridableComponent } from '@/modules/core/react/types/OverridableComponent';
import { ResponsiveValue } from '@/modules/core/css-in-js/system';

import * as S from './styled';

export interface InlineProps {
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
  alignY?: ResponsiveValue<React.CSSProperties['alignItems']>;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export interface InlineTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & InlineProps;
  defaultComponent: D;
}

/**
 * The Inline component render a set of components in a row with equal spacing around them,
 * wrapping onto multiple lines when necessary.
 */
export const Inline: OverridableComponent<InlineTypeMap> = React.forwardRef(function Inline(props, ref) {
  const {
    component = 'div',
    children,
    space = 8,
    alignY = 'inherit',
  } = props;

  const isList = component === 'ol' || component === 'ul';
  const inlineItemComponent = isList ? 'li' : 'div';

  return (
    <S.InlineRootAligner space={space} ref={ref}>
      <S.InlineRoot as={component} marginTop={space} marginLeft={space} alignY={alignY}>
        {React.Children.map(flattenChildren(children), (child) => (child ? (
          <S.InlineBox space={space} as={inlineItemComponent}>{child}</S.InlineBox>
        ) : null))}
      </S.InlineRoot>
    </S.InlineRootAligner>
  );
});

export default Inline;
