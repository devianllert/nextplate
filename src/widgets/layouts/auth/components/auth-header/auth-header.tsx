import * as React from 'react';
import Link from 'next/link';
import { Box, Container, Heading, Stack } from '@effable/react';

import { LocaleToggler } from '@/features/locale-toggler';

import { APP_TITLE } from '@/shared/lib/meta';

import * as S from './auth-header.styled';

export const AuthHeader = () => {
  return (
    <S.AuthHeaderRoot>
      <Container>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Heading color="text.primary" variant="h3" href="/" component={Link}>
            {APP_TITLE}
          </Heading>

          <Stack direction="row" alignItems="center">
            <LocaleToggler />
          </Stack>
        </Box>
      </Container>
    </S.AuthHeaderRoot>
  );
};
