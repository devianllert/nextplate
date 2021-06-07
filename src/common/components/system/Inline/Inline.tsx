import * as React from 'react';
import flattenChildren from 'react-keyed-flatten-children';

import * as S from './styled';

export interface InlineProps {
  /**
   * The content
   */
  children: React.ReactNode;
  /**
   * The spacing between children can be adjusted using the `space` prop.
   */
  space?: number;
  /**
  * Items of varying height can be vertically aligned using the `alignY` prop.
  */
  alignY?: React.CSSProperties['alignItems'];
}

/**
 * If you’d like to render a set of components in a row with equal spacing around them,
 * wrapping onto multiple lines when necessary, Braid provides an Inline component:
 */
export const Inline = (props: InlineProps): JSX.Element => {
  const {
    children,
    space = 8,
    alignY = 'inherit',
  } = props;

  return (
    <S.InlineRootAligner space={space}>
      <S.InlineRoot marginTop={space} marginLeft={space} alignY={alignY}>
        {React.Children.map(flattenChildren(children), (child) => (child ? (
          <S.InlineBox space={space}>{child}</S.InlineBox>
        ) : null))}
      </S.InlineRoot>
    </S.InlineRootAligner>
  );
};

export default Inline;
