import * as React from 'react';
import { RiCloseFill, RiMenu3Line } from 'react-icons/ri';
import {
  Box, Button, Divider, ActionButton, Heading, Text,
} from '@effable/react';

import * as Modal from '@/shared/components/system/modal';

const initialTodos = [
  {
    date: '16:30h',
    title: 'Stay at Bohem Art Hotel',
  },
  {
    date: '17:30h',
    title: 'Stay at Bohem Art Hotel',
  },
  {
    date: '18:30h',
    title: 'Stay at Bohem Art Hotel',
  },
  {
    date: '19:30h',
    title: 'Stay at Bohem Art Hotel',
  },
];

export const Todos = (): JSX.Element => {
  const [todos] = React.useState(initialTodos);

  return (
    <Box width={['100%', null, 'auto']}>
      <Modal.Root>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button
            size="small"
            color="neutral"
          >
            Next
          </Button>

          <Modal.Trigger asChild>
            <ActionButton
              size="small"
            >
              <RiMenu3Line />
            </ActionButton>
          </Modal.Trigger>

          <Modal.Portal>
            <Modal.StyledOverlay />

            <Modal.StyledContent asChild>
              <Box
                borderRadius="4px"
                backgroundColor="background.primary"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  padding={4}
                >
                  <Modal.Title asChild>
                    <Heading variant="h4" component="span">Edit todos</Heading>
                  </Modal.Title>

                  <Modal.Close asChild>
                    <ActionButton color="neutral">
                      <RiCloseFill />
                    </ActionButton>
                  </Modal.Close>
                </Box>

                <Divider />

                <Box padding={4}>
                  {todos.map((item) => (
                    <Box mb={3} key={item.date}>
                      <Heading variant="h6" component="span" sx={{ mr: 2 }}>16:30h</Heading>

                      <Text variant="s" component="span" fontWeight="bold">Stay at Bohem Art Hotel</Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Modal.StyledContent>
          </Modal.Portal>
        </Box>

        <Divider />

        <Box>
          {todos.slice(0, 2).map((item) => (
            <Box mb={3} key={item.date}>
              <Heading variant="h6" component="span" sx={{ mr: 2 }}>16:30h</Heading>

              <Text variant="s" component="span" fontWeight="bold">Stay at Bohem Art Hotel</Text>
            </Box>
          ))}
        </Box>
      </Modal.Root>
    </Box>
  );
};
