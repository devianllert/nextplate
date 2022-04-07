import * as React from 'react';
import Link from 'next/link';

import { APP_TITLE } from '@/shared/lib/meta';

import * as Text from '@/shared/components/system/text';
import { Stack } from '@/shared/components/layout/stack';
import { Container } from '@/shared/components/layout/container';
import { DisplayOnBrowserMount } from '@/shared/components/rehydration/display-on-browser-mount';
import { LocaleToggler } from '@/modules/locale-toggler';
import { SettingsButton } from '@/modules/settings-button';

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
