import * as React from 'react';
import Link from 'next/link';

import { APP_TITLE } from '@/modules/core/meta/meta';

import { Typography } from '@/common/components/system/Typography';
import { Container } from '@/common/components/system/Container';

import * as S from './styled';

export type AuthHeaderProps = unknown;

export const AuthHeader = (): JSX.Element => {
  return (
    <S.AuthHeaderRoot>
      <Container>
        <Link href="/" passHref>
          <Typography variant="h6" component="a">{APP_TITLE}</Typography>
        </Link>
      </Container>
    </S.AuthHeaderRoot>
  );
};
