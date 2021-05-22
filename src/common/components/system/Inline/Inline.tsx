import React, { ReactNode, ReactElement } from 'react';
import { CSSProperties } from 'styled-components';

import * as S from './styled';

export interface InlineProps {
  /**
   * The content
   */
  children: ReactNode;
  /**
   * The space between children
   */
  space?: number;
  /**
  * The align of the children
  */
  alignY?: CSSProperties['alignItems'];
}

export const Inline = (props: InlineProps): ReactElement => {
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
