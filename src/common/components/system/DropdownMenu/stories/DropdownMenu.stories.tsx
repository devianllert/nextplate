import * as React from 'react';
import { Meta } from '@storybook/react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import styled from '@emotion/styled';

import * as DropdownMenu from '..';

import { Button } from '../../Button';
import { Box } from '../../../layout/Box';
import { Flex } from '../../../layout/Flex';

export default {
  title: 'Design System/Atoms/DropdownMenu',
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

        <DropdownMenu.Root>
          <DropdownMenu.TriggerItem>
            Tools
          </DropdownMenu.TriggerItem>

          <DropdownMenu.Content>
            <DropdownMenu.Item>
              Developer tools
              <DropdownMenu.RightAdornment>⌘+B</DropdownMenu.RightAdornment>

            </DropdownMenu.Item>
            <DropdownMenu.Item>
              Create Shortcut
              <DropdownMenu.RightAdornment>⌘+B</DropdownMenu.RightAdornment>

            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

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

  '&:focus': {
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
