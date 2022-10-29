import * as React from 'react';
import Link from 'next/link';

import { APP_TITLE } from '@/shared/lib/meta';
import * as Text from '@/shared/components/system/text';
import { Container } from '@/shared/components/system/container';
import { Flex } from '@/shared/components/system/flex';
import { Stack } from '@/shared/components/system/stack';
import { LocaleToggler } from '@/features/locale-toggler';
import { SettingsButton } from '@/features/settings-button';

import * as S from './auth-header.styled';

export type AuthHeaderProps = unknown;

export const AuthHeader = (): JSX.Element => {
  return (
    <S.AuthHeaderRoot>
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Text.Heading color="text.primary" variant="h6" href="/" component={Link}>{APP_TITLE}</Text.Heading>

          <Stack direction="row" alignItems="center">
            <LocaleToggler />

            <SettingsButton />
          </Stack>
        </Flex>
      </Container>
    </S.AuthHeaderRoot>
  );
};
