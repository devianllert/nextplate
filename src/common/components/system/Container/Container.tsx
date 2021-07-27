import * as React from 'react';

import * as S from './styled';

export interface ContainerProps {
  /**
   * The content
   */
  children: React.ReactNode;
}

export const Container = (props: ContainerProps): JSX.Element => {
  const {
    children,
  } = props;

  return (
    <S.ContainerRoot>{children}</S.ContainerRoot>
  );
};
