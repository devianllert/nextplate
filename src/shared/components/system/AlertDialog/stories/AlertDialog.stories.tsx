import * as React from 'react';
import { Meta } from '@storybook/react';

import * as AlertDialog from '../AlertDialog';
import { Button } from '../../Button';
import { Box } from '../../../layout/Box';
import { Stack } from '../../../layout/Stack';

export default {
  title: 'Design System/Atoms/AlertDialog',
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
