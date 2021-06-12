import * as React from 'react';

import { AuthHeader } from '../AuthHeader';
import { AuthContent } from '../AuthContent';

import * as S from './styled';

export interface AuthLayoutProps {
  /**
   * The content
   */
  children?: React.ReactNode;
}

export const AuthLayout = (props: AuthLayoutProps): JSX.Element => {
  const { children } = props;

  return (
    <S.Container>
      <AuthHeader />

      <AuthContent>
        {children}

      </AuthContent>
    </S.Container>
  );
};
