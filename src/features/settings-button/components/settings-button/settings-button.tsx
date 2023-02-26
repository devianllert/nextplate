import * as React from 'react';

import { ActionButton, useEffableTheme } from '@effable/react';
import { RiSettings2Line } from 'react-icons/ri';

import * as DropdownMenu from '@/shared/components/system/dropdown-menu';

export const SettingsButton = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { mode, setMode } = useEffableTheme('SettingsButton');

  const toggleColorMode = (event: Event) => {
    event.preventDefault();
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <ActionButton label="Open menu">
          <RiSettings2Line />
        </ActionButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content side="bottom" align="end" loop>
          <DropdownMenu.Group>
            <DropdownMenu.CheckboxItem onSelect={toggleColorMode} checked={mode === 'dark'}>
              Dark mode
            </DropdownMenu.CheckboxItem>

            <DropdownMenu.Item>Settings</DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
