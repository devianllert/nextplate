import * as React from 'react';
import { capitalize } from '@effable/misc';
import { Button, useEffableTheme } from '@effable/react';
import { RiComputerLine, RiMoonLine, RiSunLine } from 'react-icons/ri';

import * as DropdownMenu from '@/shared/components/system/dropdown-menu';

const iconMap = {
  light: RiSunLine,
  dark: RiMoonLine,
  system: RiComputerLine,
};

export const ChangeTheme = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { mode, setMode } = useEffableTheme('ChangeTheme');

  const Icon = iconMap[mode];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="text" startIcon={<Icon />}>
          {capitalize(mode)}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.RadioGroup value={mode} onValueChange={(value) => setMode(value as typeof mode)}>
            <DropdownMenu.RadioItem value="light">
              <DropdownMenu.LeftAdornment>
                <iconMap.light />
              </DropdownMenu.LeftAdornment>
              Light
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="dark">
              <DropdownMenu.LeftAdornment>
                <iconMap.dark />
              </DropdownMenu.LeftAdornment>
              Dark
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="system">
              <DropdownMenu.LeftAdornment>
                <iconMap.system />
              </DropdownMenu.LeftAdornment>
              System
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
