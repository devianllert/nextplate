import * as React from 'react';
import { Meta } from '@storybook/react';

import * as Modal from '../Modal';
import { Button } from '../../Button';
import { Box } from '../../Box';

export default {
  title: 'Design System/Atoms/Modal',
  component: Modal.Root,
} as Meta;

export const Styled = () => (
  <Modal.Root>
    <Modal.Overlay />

    <Modal.Trigger asChild>
      <Button variant="contained">Open</Button>
    </Modal.Trigger>
    <Modal.Content asChild>
      <Box backgroundColor="background.secondary" p={4}>
        <Modal.Title>Booking info</Modal.Title>
        <Modal.Description>Please enter the info for your booking below.</Modal.Description>

        <Modal.Close asChild>
          <Button variant="contained">Close</Button>
        </Modal.Close>
      </Box>
    </Modal.Content>
  </Modal.Root>
);

export const NonModal = () => (
  <>
    <Modal.Root modal={false}>
      <Modal.Overlay />

      <Modal.Trigger asChild>
        <Button variant="contained">Open</Button>
      </Modal.Trigger>
      <Modal.Content asChild>
        <Box backgroundColor="background.secondary" p={4}>
          <Modal.Title>Booking info</Modal.Title>
          <Modal.Description>Please enter the info for your booking below.</Modal.Description>

          <Modal.Close asChild>
            <Button variant="contained">Close</Button>
          </Modal.Close>
        </Box>
      </Modal.Content>
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
      <Modal.Overlay />

      <Modal.Trigger asChild>
        <Button variant="contained">{open ? 'Close' : 'Open'}</Button>
      </Modal.Trigger>
      <Modal.Content asChild>
        <Box backgroundColor="background.secondary" p={4}>
          <Modal.Title>Booking info</Modal.Title>
          <Modal.Description>Please enter the info for your booking below.</Modal.Description>

          <Modal.Close asChild>
            <Button variant="contained">Close</Button>
          </Modal.Close>
        </Box>
      </Modal.Content>
    </Modal.Root>
  );
};
