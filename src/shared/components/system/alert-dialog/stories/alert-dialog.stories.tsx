import * as React from 'react';
import { Box, Button, Stack } from '@effable/react';
import { Meta } from '@storybook/react';

import * as AlertDialog from '../alert-dialog';

export default {
  title: 'Design System/Components/AlertDialog',
  component: AlertDialog.Root,
} as Meta;

export const Basic = () => (
  <AlertDialog.Root>
    <AlertDialog.StyledOverlay />

    <AlertDialog.Trigger asChild>
      <Button>Open</Button>
    </AlertDialog.Trigger>
    <AlertDialog.StyledContent asChild>
      <Box backgroundColor="background.secondary" p={3}>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </AlertDialog.Description>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Stack direction="row">
            <AlertDialog.Cancel asChild>
              <Button>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button color="error">Yes, delete the account</Button>
            </AlertDialog.Action>
          </Stack>
        </Box>
      </Box>
    </AlertDialog.StyledContent>
  </AlertDialog.Root>
);
