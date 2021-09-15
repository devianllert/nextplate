import * as React from 'react';
import Link from 'next/link';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';
import { useColorMode } from 'theme-ui';
import Timeago from 'timeago-react';
import { useTranslation } from 'next-i18next';
import * as timeago from 'timeago.js';
import ru from 'timeago.js/lib/lang/ru';

import { APP_TITLE } from '@/modules/core/meta/meta';
import { Typography } from '@/common/components/system/Typography';
import { Inline } from '@/common/components/system/Inline';
import { Container } from '@/common/components/system/Container';
import { IconButton } from '@/common/components/system/IconButton';
import { DisplayOnBrowserMount } from '@/common/components/rehydration/DisplayOnBrowserMount';

import * as S from './styled';

timeago.register('ru', ru);

export type MainHeaderProps = unknown;

export const MainHeader = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const [colorMode, setColorMode] = useColorMode();

  return (
    <Container>
      <S.MainHeaderRoot>
        <Link href="/" passHref>
          <Typography variant="h6" component="a">{APP_TITLE}-app</Typography>
        </Link>

        <DisplayOnBrowserMount>
          <Inline alignY="center" space={3}>
            <Typography variant="subtitle2" component="span">
              {t('lastUpdate')}:
              {' '}
              <Timeago
                datetime={process.env.NEXT_PUBLIC_APP_BUILD_TIME}
                locale={i18n.language}
              />
            </Typography>

            <IconButton
              color="gray"
              type="button"
              onClick={() => setColorMode(colorMode === 'dark' ? 'default' : 'dark')}
            >
              {colorMode === 'default' ? <RiSunLine /> : <RiMoonLine />}
            </IconButton>
          </Inline>
        </DisplayOnBrowserMount>
      </S.MainHeaderRoot>
    </Container>
  );
};
