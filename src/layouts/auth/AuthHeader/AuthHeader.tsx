import * as React from 'react';
import { useColorMode } from 'theme-ui';
import Timeago from 'timeago-react';
import { useTranslation } from 'next-i18next';
import * as timeago from 'timeago.js';
import ru from 'timeago.js/lib/lang/ru';

import { Typography } from '@/common/components/system/Typography';
import { Inline } from '@/common/components/system/Inline';
import { Button } from '@/common/components/system/Button';
import { DisplayOnBrowserMount } from '@/common/components/rehydration/DisplayOnBrowserMount';

import * as S from './styled';

timeago.register('ru', ru);

export type AuthHeaderProps = unknown;

export const AuthHeader = (): JSX.Element => {
  return (
    <S.AuthHeaderRoot>
      <Typography variant="h6" component="span">dvnllrt-app</Typography>
    </S.AuthHeaderRoot>
  );
};
