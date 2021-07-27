import * as React from 'react';
import Link from 'next/link';
import { useColorMode } from 'theme-ui';
import Timeago from 'timeago-react';
import { useTranslation } from 'next-i18next';
import * as timeago from 'timeago.js';
import ru from 'timeago.js/lib/lang/ru';

import { APP_TITLE } from '@/modules/core/meta/meta';
import { Typography } from '@/common/components/system/Typography';
import { Inline } from '@/common/components/system/Inline';
import { Button } from '@/common/components/system/Button';
import { DisplayOnBrowserMount } from '@/common/components/rehydration/DisplayOnBrowserMount';

import * as S from './styled';

timeago.register('ru', ru);

export type MainHeaderProps = unknown;

export const MainHeader = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const [colorMode, setColorMode] = useColorMode();

  return (
    <S.MainHeaderRoot>
      <Link href="/" passHref>
        <Typography variant="h6" component="a">{APP_TITLE}-app</Typography>
      </Link>

      <DisplayOnBrowserMount>
        <Inline alignY="center" space={16}>
          <Typography variant="subtitle2" component="span">
            {t('lastUpdate')}:
            {' '}
            <Timeago
              datetime={process.env.NEXT_PUBLIC_APP_BUILD_TIME}
              locale={i18n.language}
            />
          </Typography>

          <Button
            color="primary"
            type="button"
            onClick={() => setColorMode(colorMode === 'dark' ? 'default' : 'dark')}
          >
            {colorMode === 'default' ? '🌞' : '🌙'}
          </Button>
        </Inline>
      </DisplayOnBrowserMount>
    </S.MainHeaderRoot>
  );
};