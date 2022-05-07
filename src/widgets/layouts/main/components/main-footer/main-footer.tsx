import * as React from 'react';
import { Container } from '@/shared/components/system/container';

import * as S from './main-footer.styled';
import * as Text from '@/shared/components/system/text';

export const MainFooter = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <S.MainFooterRoot>
      <Container>
        <Text.Paragraph variant="body3" color="text.secondary">Copyright © {currentYear} devianllert</Text.Paragraph>
      </Container>
    </S.MainFooterRoot>
  );
};
