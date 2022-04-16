import * as React from 'react';

import { Container } from '@/shared/components/layout/container';
import { Box } from '@/shared/components/layout/box';

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
    <S.LayoutRoot>
      <Container>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {children}
        </Box>
      </Container>
    </S.LayoutRoot>
  );
};
