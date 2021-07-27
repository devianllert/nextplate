import * as React from 'react';

import * as S from './styled';

export interface DividerProps {
  /**
   * The divider space.
   */
  space?: number;
}

export const Divider = (props: DividerProps): JSX.Element => {
  const {
    space = 8,
  } = props;

  return (
    <S.DividerRoot space={space} />
  );
};
