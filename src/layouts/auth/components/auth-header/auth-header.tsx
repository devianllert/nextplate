import * as React from 'react';
import Link from 'next/link';

import { APP_TITLE } from '@/shared/lib/meta';
import * as Text from '@/shared/components/system/text';
import { Container } from '@/shared/components/system/container';
import { Flex } from '@/shared/components/system/flex';
import { Stack } from '@/shared/components/system/stack';
import { LocaleToggler } from '@/modules/locale-toggler';
import { SettingsButton } from '@/modules/settings-button';

import * as S from './styled';

export type AuthHeaderProps = unknown;

export const AuthHeader = (): JSX.Element => {
  return (
    <S.AuthHeaderRoot>
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Link href="/" passHref>
            <Text.Heading color="text.primary" variant="h6" component="a">{APP_TITLE}</Text.Heading>
          </Link>

          <Stack direction="row" alignItems="center">
            <LocaleToggler />

            <SettingsButton />
          </Stack>
        </Flex>
      </Container>
    </S.AuthHeaderRoot>
  );
};
