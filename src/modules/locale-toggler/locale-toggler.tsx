import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { RiTranslate2 } from 'react-icons/ri';

import { SUPPORTED_LOCALES } from '@/shared/lib/i18n';

import * as DropdownMenu from '@/shared/components/system/dropdown-menu';
import { IconButton } from '@/shared/components/system/icon-button';

export const LocaleToggler = (): JSX.Element => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const changeLocale = (locale: string) => {
    router.replace(router.pathname, undefined, { locale }) as unknown as void;
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton>
          <RiTranslate2 />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.RadioGroup value={i18n.language} onValueChange={changeLocale}>
          {Object.values(SUPPORTED_LOCALES).map((key) => (
            <DropdownMenu.RadioItem key={key} value={key}>
              {key.toUpperCase()}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
