import * as React from 'react';
import { Box, Container } from '@effable/react';

import * as S from './not-fount-layout.styled';

export interface NotFound404LayoutProps {
  /**
   * The content
   */
  children?: React.ReactNode;
}

export const NotFoundLayout = (props: NotFound404LayoutProps) => {
  const { children } = props;

  return (
    <S.LayoutRoot>
      <Container>
        <Box display="flex" alignItems="center" justifyContent="center">
          {children}
        </Box>
      </Container>
    </S.LayoutRoot>
  );
};
