import * as React from 'react';
import { RiCloseFill, RiMenu3Line } from 'react-icons/ri';

import { Box } from '@/common/components/system/Box';
import { Button } from '@/common/components/system/Button';
import { Divider } from '@/common/components/system/Divider';
import { IconButton } from '@/common/components/system/IconButton';
import { Modal, ModalContent, ModalOverlay } from '@/common/components/system/Modal';
import { Typography } from '@/common/components/system/Typography';

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
  const [todos, setTodos] = React.useState(initialTodos);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Box width={['100%', null, 'auto']}>
      <Box display="flex" alignItems="center">
        <Button color="primary" ml="-12px">Next</Button>

        <IconButton
          ml="auto"
          edge="end"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          label="Open Popup"
          onClick={() => setIsOpen(true)}
        >
          <RiMenu3Line />
        </IconButton>

        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onEsc={() => console.log('esc pressed')}
        >
          <ModalOverlay />

          <Box
            component={ModalContent}
            margin="auto"
            width="100%"
            maxWidth="640px"
            borderRadius="4px"
            backgroundColor="background.primary"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              padding={4}
            >
              <Typography variant="h4" component="span">Edit todos</Typography>

              <IconButton color="gray" onClick={() => setIsOpen(false)} label="Close">
                <RiCloseFill />
              </IconButton>
            </Box>

            <Divider space={0} />

            <Box padding={4}>
              {todos.map((item) => (
                <Box mb={3} key={item.date}>
                  <Typography variant="subtitle1" component="span" mr={2}>16:30h</Typography>

                  <Typography variant="body1" component="span" fontWeight="bold">Stay at Bohem Art Hotel</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Modal>
      </Box>

      <Divider decorative />

      <Box>
        {todos.slice(0, 2).map((item) => (
          <Box mb={3} key={item.date}>
            <Typography variant="subtitle1" component="span" mr={2}>16:30h</Typography>

            <Typography variant="body1" component="span" fontWeight="bold">Stay at Bohem Art Hotel</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
