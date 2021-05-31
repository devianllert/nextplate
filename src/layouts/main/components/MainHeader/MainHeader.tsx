import * as React from 'react';
import Timeago from 'timeago-react';

import { Typography } from '@/common/components/system/Typography';
import { Inline } from '@/common/components/system/Inline';
import { Button } from '@/common/components/system/Button';
import { DisplayOnBrowserMount } from '@/common/components/rehydration/DisplayOnBrowserMount';

import useThemeContext from '@/modules/core/theming/hooks/useThemeContext';

import * as S from './styled';

export type MainHeaderProps = unknown;

export const MainHeader = (): JSX.Element => {
  const { mode, toggle } = useThemeContext();

  return (
    <S.MainHeaderRoot>
      <Typography variant="h6" component="span">dvnllrt-app</Typography>

      <DisplayOnBrowserMount>
        <Inline alignY="center" space={16}>
          <Typography variant="subtitle2" component="span">
            Last updated:
            {' '}
            <Timeago
              datetime={process.env.NEXT_PUBLIC_APP_BUILD_TIME}
              locale="en"
            />
          </Typography>

          <Button
            color="primary"
            type="button"
            onClick={() => toggle(mode === 'light' ? 'dark' : 'light')}
          >
            {mode === 'light' ? '🌞' : '🌙'}
          </Button>
        </Inline>
      </DisplayOnBrowserMount>
    </S.MainHeaderRoot>
  );
};
