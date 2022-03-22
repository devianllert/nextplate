import * as React from 'react';
import Link from 'next/link';

import { APP_TITLE } from '@/shared/lib/meta/meta';

import * as Text from '@/shared/components/system/Text';
import { Stack } from '@/shared/components/layout/Stack';
import { Container } from '@/shared/components/layout/Container';
import { DisplayOnBrowserMount } from '@/shared/components/rehydration/DisplayOnBrowserMount';
import { LocaleToggler } from '@/shared/components/LocaleToggler';
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
