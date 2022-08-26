import * as React from 'react';
import Link from 'next/link';

import { APP_TITLE } from '@/shared/lib/meta';

import * as Text from '@/shared/components/system/text';
import { Stack } from '@/shared/components/system/stack';
import { Container } from '@/shared/components/system/container';
import { DisplayOnBrowserMount } from '@/shared/components/rehydration/display-on-browser-mount';
import { LocaleToggler } from '@/features/locale-toggler';
import { SettingsButton } from '@/features/settings-button';

import * as S from './main-header.styled';

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
