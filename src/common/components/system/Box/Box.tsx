import * as React from 'react';

import * as S from './styled';

export interface BoxProps extends S.BoxType {
  /**
   * The content
   */
  children: React.ReactNode;
}

export const Box = (props: BoxProps): JSX.Element => {
  const {
    children,
    ...other
  } = props;

  return (
    <S.BoxRoot {...other}>{children}</S.BoxRoot>
  );
};
