import * as React from 'react';
import Link from 'next/link';

import { APP_TITLE } from '@/lib/meta/meta';

import { SettingsButton } from '@/modules/settings-button';

import * as Text from '@/common/components/system/Text';
import { Stack } from '@/common/components/layout/Stack';
import { Container } from '@/common/components/layout/Container';
import { DisplayOnBrowserMount } from '@/common/components/rehydration/DisplayOnBrowserMount';
import { LocaleToggler } from '@/common/components/LocaleToggler';

import * as S from './styled';

export type MainHeaderProps = unknown;

export const MainHeader = (): JSX.Element => {
  return (
    <S.MainHeaderContainer>
      <Container>
        <S.MainHeaderRoot>
          <Link href="/" passHref>
            <Text.Heading variant="h6" component="a">{APP_TITLE}</Text.Heading>
          </Link>
          <DisplayOnBrowserMount>
            <Stack direction="row" alignItems="center" space={3}>
              <LocaleToggler />

              <SettingsButton />
            </Stack>
          </DisplayOnBrowserMount>
        </S.MainHeaderRoot>
      </Container>
    </S.MainHeaderContainer>
  );
};
