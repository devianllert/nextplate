import * as React from 'react';
import styled from '@emotion/styled';
import { Story, Meta } from '@storybook/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalProps,
} from '..';
import { Button } from '../../Button';
import { Typography } from '../../Typography';
import { Box } from '../../Box';

export default {
  title: 'Design System/Atoms/Modal',
  component: Modal,
} as Meta;

const StyledModalContent = styled(ModalContent)(
  {
    margin: 'auto',
    background: 'white',
    borderRadius: 4,
    width: '80%',
    height: '80%',
    padding: 24,
  },
  (props) => ({
    background: props.theme.colors.background.secondary,
  }),
);

const StyledModalContent1 = styled(ModalContent)(
  {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    background: 'white',
    borderRadius: 4,
    maxWidth: 480,
    width: '100%',
    padding: 24,
  },
  (props) => ({
    background: props.theme.colors.background.secondary,
  }),
);

const Template: Story<ModalProps> = ({ children, ...args }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal {...args} open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />

        <StyledModalContent1>
          <Typography variant="h4" mb={2}>Edit profile</Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dolore vitae quis neque porro laudantium, quisquam omnis nisi excepturi odio magnam
            totam aspernatur adipisci non quas suscipit quae blanditiis veniam minus?
          </Typography>
          {children}

          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button onClick={() => setIsOpen(false)} mr={2}>Cancel</Button>
            <Button variant="contained">Save</Button>
          </Box>
        </StyledModalContent1>
      </Modal>
    </>
  );
};

const TemplateWithNestedModals: Story<Omit<ModalProps, 'children'>> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen1, setIsOpen1] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal 1</Button>

      <Modal {...args} open={isOpen} onClose={() => setIsOpen(false)} onOutsideClick={() => console.log('click outside of modal1')}>
        <ModalOverlay />

        <StyledModalContent>
          <Button onClick={() => setIsOpen(false)}>Close modal 1</Button>
          <Button onClick={() => setIsOpen1(true)}>Open modal 2</Button>
        </StyledModalContent>

        <Modal {...args} open={isOpen1} onClose={() => setIsOpen1(false)} onOutsideClick={() => console.log('click outside of modal2')}>
          <ModalOverlay />

          <StyledModalContent1>
            <Button onClick={() => setIsOpen1(false)}>Close modal 2</Button>
            <Button onClick={() => setIsOpen2(true)}>Open modal 3</Button>
          </StyledModalContent1>

          <Modal {...args} open={isOpen2} onClose={() => setIsOpen2(false)} onOutsideClick={() => console.log('click outside of modal3')}>
            <ModalOverlay />

            <StyledModalContent1>
              <Button onClick={() => setIsOpen2(false)}>Close modal 3</Button>
            </StyledModalContent1>
          </Modal>
        </Modal>
      </Modal>
    </>
  );
};

export const Basic = Template.bind({});

export const NestedModals = TemplateWithNestedModals.bind({});
