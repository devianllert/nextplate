import * as React from 'react';

import * as S from './styled';

export interface InlineProps {
  /**
   * The content
   */
  children: React.ReactNode;
  /**
   * The space between children
   */
  space?: number;
  /**
  * The align of the children
  */
  alignY?: React.CSSProperties['alignItems'];
}

export const Inline = (props: InlineProps): JSX.Element => {
  const {
    children,
    space = 8,
    alignY = 'inherit',
  } = props;

  return (
    <S.InlineRootAligner space={space}>
      <S.InlineRoot marginTop={space} marginLeft={space} alignY={alignY}>
        {children}
      </S.InlineRoot>
    </S.InlineRootAligner>
  );
};

export default Inline;
