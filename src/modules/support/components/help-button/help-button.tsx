import * as React from 'react';
import Timeago from 'timeago-react';
import { useTranslation } from 'react-i18next';
import { RiBook2Line, RiMessage2Line, RiQuestionMark } from 'react-icons/ri';

import * as DropdownMenu from '@/shared/components/system/DropdownMenu';
import * as Text from '@/shared/components/system/Text';
import { Box } from '@/shared/components/layout/Box';
import { APP_TITLE } from '@/shared/lib/meta/meta';

import * as S from './styled';

export const HelpButton = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        {/* <Box
          position="fixed"
          bottom={3}
          right={3}
          zIndex={1}
        >
          <IconButton variant="solid" size="large" color="contrast">
            <RiQuestionMark fontSize={16} />
          </IconButton>
        </Box> */}
        <S.HelpButtonRoot>
          <RiQuestionMark />
        </S.HelpButtonRoot>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        side="top"
        align="start"
        sideOffset={16}
        allowPinchZoom
        loop
      >
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <DropdownMenu.LeftAdornment>
              <RiBook2Line color="inherit" />
            </DropdownMenu.LeftAdornment>

            Help & support guide
          </DropdownMenu.Item>
          <DropdownMenu.Item disabled>
            <DropdownMenu.LeftAdornment>
              <RiMessage2Line />
            </DropdownMenu.LeftAdornment>

            Send us a message
          </DropdownMenu.Item>
        </DropdownMenu.Group>

        <DropdownMenu.Separator />

        <DropdownMenu.Group>
          <DropdownMenu.Item disabled>
            <Text.Caption>
              Keyboard shortcuts
            </Text.Caption>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Box
              component="a"
              href="https://github.com/devianllert/next-boilerplate"
              target="_blank"
            >
              <Text.Caption color="text.secondary">
                Source code
              </Text.Caption>
            </Box>
          </DropdownMenu.Item>
        </DropdownMenu.Group>

        <DropdownMenu.Separator />

        <DropdownMenu.Group asChild>
          <Box px={1} pt={2} display="flex" flexDirection="column">
            <Text.Caption lineHeight="120%" color="text.secondary" sx={{ mb: 1 }}>
              {APP_TITLE} {process.env.NEXT_PUBLIC_APP_VERSION_RELEASE ?? '0.0.1'}
            </Text.Caption>

            <Text.Caption lineHeight="120%" color="text.secondary">
              {t('lastUpdate')}
              {' '}
              <Timeago
                datetime={process.env.NEXT_PUBLIC_APP_BUILD_TIME}
                locale={i18n.language}
              />
            </Text.Caption>
          </Box>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
