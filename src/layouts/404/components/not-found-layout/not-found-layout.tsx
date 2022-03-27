import * as React from 'react';

import { Container } from '@/shared/components/layout/container';

import * as S from './styled';

export interface NotFound404LayoutProps {
  /**
   * The content
   */
  children?: React.ReactNode;
}

export const NotFoundLayout = (props: NotFound404LayoutProps): JSX.Element => {
  const {
    children,
  } = props;

  return (
    <Container>
      <S.LayoutRoot>{children}</S.LayoutRoot>
    </Container>
  );
};
