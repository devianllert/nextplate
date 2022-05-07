import * as React from 'react';

import { HelpButton } from '@/modules/support';

import { MainHeader } from '../main-header';
import { MainFooter } from '../main-footer';

import * as S from './main-layout.styled';

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

      <HelpButton />

      {children}

      <MainFooter />
    </S.MainLayoutContainer>
  );
};
