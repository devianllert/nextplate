import * as React from 'react';

import { Typography } from '@/common/components/system/Typography';

import * as S from './styled';

export type AuthHeaderProps = unknown;

export const AuthHeader = (): JSX.Element => {
  return (
    <S.AuthHeaderRoot>
      <Typography variant="h6" component="span">dvnllrt-app</Typography>
    </S.AuthHeaderRoot>
  );
};
