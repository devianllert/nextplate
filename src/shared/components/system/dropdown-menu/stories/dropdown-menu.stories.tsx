import * as React from 'react';
import { Meta } from '@storybook/react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import styled from '@emotion/styled';

import { Button } from '@/shared/components/system/button';

import * as DropdownMenu from '..';

export default {
  title: 'Design System/Components/DropdownMenu',
  component: DropdownMenu.Root,
} as Meta;

export const Basic = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="contained">Dropdown</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>
          New Tab
          <DropdownMenu.RightAdornment>⌘+B</DropdownMenu.RightAdornment>

        </DropdownMenu.Item>
        <DropdownMenu.Item>
          New Window
          <DropdownMenu.RightAdornment>⌘+B</DropdownMenu.RightAdornment>

        </DropdownMenu.Item>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTriggerItem>
            Tools
          </DropdownMenu.SubTriggerItem>

          <DropdownMenu.Portal>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>
                Developer tools
                <DropdownMenu.RightAdornment>⌘+B</DropdownMenu.RightAdornment>

              </DropdownMenu.Item>
              <DropdownMenu.Item>
                Create Shortcut
                <DropdownMenu.RightAdornment>⌘+B</DropdownMenu.RightAdornment>

              </DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />

        <DropdownMenu.Group>
          <DropdownMenu.Label>Options</DropdownMenu.Label>
          <DropdownMenu.CheckboxItem checked>Show Bookmarks</DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem disabled>Show Private Bookmarks</DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem>Show Full URLs</DropdownMenu.CheckboxItem>
        </DropdownMenu.Group>

        <DropdownMenu.Separator />

        <DropdownMenu.Label>Type</DropdownMenu.Label>
        <DropdownMenu.RadioGroup value="1">
          <DropdownMenu.RadioItem value="1">None</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="2">Single</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="3" disabled>Multiple</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const DeleteItem = styled(DropdownMenu.Item)((props) => ({
  color: props.theme.colors.radix.red11,
  // @ts-expect-error component selectors types
  [DropdownMenu.LeftAdornment]: {
    color: props.theme.colors.radix.red11,
  },

  '&:focus': {
    // @ts-expect-error component selectors types
    [DropdownMenu.LeftAdornment]: {
      color: props.theme.colors.radix.red1,
    },
    // @ts-expect-error component selectors types
    [DropdownMenu.RightAdornment]: {
      color: props.theme.colors.radix.red1,
    },

    color: props.theme.colors.radix.red1,
    backgroundColor: props.theme.colors.radix.red9,
  },
}));

export const Custom = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="contained">Dropdown</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>
          New Tab
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          New Window
          <DropdownMenu.RightAdornment>⌘+B</DropdownMenu.RightAdornment>
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DeleteItem>
          <DropdownMenu.LeftAdornment>
            <RiDeleteBin2Line />
          </DropdownMenu.LeftAdornment>
          Delete item
          <DropdownMenu.RightAdornment>Del</DropdownMenu.RightAdornment>
        </DeleteItem>

      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
