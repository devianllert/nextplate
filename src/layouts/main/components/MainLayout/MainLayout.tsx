import * as React from 'react';

import { MainHeader } from '../MainHeader';

import * as S from './styled';

export interface MainLayoutProps {
  /**
   * The content
   */
  children?: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps): JSX.Element => {
  const {
    children,
  } = props;

  return (
    <S.MainLayoutContainer>
      <MainHeader />

      {children}
    </S.MainLayoutContainer>
  );
};
