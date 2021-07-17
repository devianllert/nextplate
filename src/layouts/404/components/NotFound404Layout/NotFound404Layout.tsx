import * as React from 'react';

import * as S from './styled';

export interface NotFound404LayoutProps {
  /**
   * The content
   */
  children?: React.ReactNode;
}

export const NotFound404Layout = (props: NotFound404LayoutProps): JSX.Element => {
  const {
    children,
  } = props;

  return (
    <S.LayoutRoot>{children}</S.LayoutRoot>
  );
};
