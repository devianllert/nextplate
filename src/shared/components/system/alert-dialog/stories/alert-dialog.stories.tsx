import * as React from 'react';
import { Meta } from '@storybook/react';

import { Button } from '@/shared/components/system/button';
import { Box } from '@/shared/components/system/box';
import { Stack } from '@/shared/components/system/stack';

import * as AlertDialog from '../alert-dialog';

export default {
  title: 'Design System/Components/AlertDialog',
  component: AlertDialog.Root,
} as Meta;

export const Basic = () => (
  <AlertDialog.Root>
    <AlertDialog.StyledOverlay />

    <AlertDialog.Trigger asChild>
      <Button variant="contained">Open</Button>
    </AlertDialog.Trigger>
    <AlertDialog.StyledContent asChild>
      <Box backgroundColor="background.secondary" p={3}>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialog.Description>

        <Box
          display="flex"
          justifyContent="flex-end"
          mt={3}
        >
          <Stack>
            <AlertDialog.Cancel asChild>
              <Button>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button variant="contained" color="red">Yes, delete the account</Button>
            </AlertDialog.Action>
          </Stack>
        </Box>
      </Box>
    </AlertDialog.StyledContent>
  </AlertDialog.Root>
);
