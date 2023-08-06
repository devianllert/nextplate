import * as React from 'react';
import { Box, Button } from '@effable/react';
import { Meta } from '@storybook/react';

import * as Modal from '../modal';

export default {
  title: 'Design System/Components/Modal',
  component: Modal.Root,
} as Meta;

export const Styled = () => (
  <Modal.Root>
    <Modal.Trigger asChild>
      <Button>Open</Button>
    </Modal.Trigger>

    <Modal.Portal>
      <Modal.StyledOverlay />

      <Modal.StyledContent asChild>
        <Box backgroundColor="background.secondary" p={4}>
          <Modal.Title>Booking info</Modal.Title>
          <Modal.Description>Please enter the info for your booking below.</Modal.Description>

          <Modal.Close asChild>
            <Button>Close</Button>
          </Modal.Close>
        </Box>
      </Modal.StyledContent>
    </Modal.Portal>
  </Modal.Root>
);

export const NonModal = () => (
  <>
    <Modal.Root modal={false}>
      <Modal.Trigger asChild>
        <Button>Open</Button>
      </Modal.Trigger>

      <Modal.Portal>
        <Modal.StyledOverlay />

        <Modal.StyledContent asChild>
          <Box backgroundColor="background.secondary" p={4}>
            <Modal.Title>Booking info</Modal.Title>
            <Modal.Description>Please enter the info for your booking below.</Modal.Description>

            <Modal.Close asChild>
              <Button>Close</Button>
            </Modal.Close>
          </Box>
        </Modal.StyledContent>
      </Modal.Portal>
    </Modal.Root>

    {Array.from({ length: 5 }, (_, i) => (
      <div key={i} style={{ marginTop: 20 }}>
        <textarea
          style={{ width: 800, height: 300 }}
          defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis at ipsa, nihil tempora debitis maxime dignissimos non amet, minima expedita alias et fugit voluptate laborum placeat odio dolore ab!"
        />
      </div>
    ))}
  </>
);

export const Controlled = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild>
        <Button>{open ? 'Close' : 'Open'}</Button>
      </Modal.Trigger>

      <Modal.Portal>
        <Modal.StyledOverlay />

        <Modal.StyledContent asChild>
          <Box backgroundColor="background.secondary" p={4}>
            <Modal.Title>Booking info</Modal.Title>
            <Modal.Description>Please enter the info for your booking below.</Modal.Description>

            <Modal.Close asChild>
              <Button>Close</Button>
            </Modal.Close>
          </Box>
        </Modal.StyledContent>
      </Modal.Portal>
    </Modal.Root>
  );
};
