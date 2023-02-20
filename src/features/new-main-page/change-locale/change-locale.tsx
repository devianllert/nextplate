import * as React from 'react';

import { useRouter } from 'next/router';

import { Box, Text } from '@effable/react';
import { useTranslation } from 'next-i18next';

import * as DropdownMenu from '@/shared/components/system/dropdown-menu';
import Global from '@/shared/icons/global';
import { SUPPORTED_LOCALES } from '@/shared/lib/i18n';

export const LocaleToggler = (): JSX.Element => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const changeLocale = (locale: string) => {
    const { pathname, query, asPath } = router;

    // change just the locale and maintain all other route information including href's query
    router.replace({ pathname, query }, asPath, { locale }) as unknown as void;
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Box
          component="button"
          display="flex"
          alignItems="flex-start"
          border="none"
          backgroundColor="transparent"
          color="accent.accent11"
        >
          <Global fontSize="20px" color="currentColor" />

          <Text variant="m" color="accent.accent11" sx={{ marginLeft: '10px' }}>
            {i18n.language.toUpperCase()}
          </Text>
        </Box>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.RadioGroup value={i18n.language} onValueChange={changeLocale}>
            {Object.values(SUPPORTED_LOCALES).map((key) => (
              <DropdownMenu.RadioItem key={key} value={key}>
                {key.toUpperCase()}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
