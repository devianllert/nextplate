import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import styled from '@emotion/styled';
import { blackA, mauve, violet } from '@radix-ui/colors';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowDownSLine } from 'react-icons/ri';

import * as Accordion from '..';

export default {
  title: 'Design System/Atoms/Accordion',
  component: Accordion.Root,
} as Meta;

const Template: Story<Accordion.AccordionProps> = (args) => (
  <Accordion.Root {...args}>
    <Accordion.Item value="0">
      {({ open }) => (
        <>
          <Accordion.Header>
            <Accordion.Trigger>
              123123
            </Accordion.Trigger>
          </Accordion.Header>
          {open && (
            <Accordion.Content>123</Accordion.Content>
          )}
        </>
      )}
    </Accordion.Item>
    <Accordion.Item value="1">
      {({ open }) => (
        <>
          <Accordion.Header>
            <Accordion.Trigger>
              123123
            </Accordion.Trigger>
          </Accordion.Header>
          {open && (
            <Accordion.Content>123</Accordion.Content>
          )}
        </>
      )}
    </Accordion.Item>
    <Accordion.Item value="2">
      {({ open }) => (
        <>
          <Accordion.Header>
            <Accordion.Trigger>
              123123
            </Accordion.Trigger>
          </Accordion.Header>
          {open && (
            <Accordion.Content>123</Accordion.Content>
          )}
        </>
      )}
    </Accordion.Item>
  </Accordion.Root>
);

export const Basic = Template.bind({});

Basic.args = {
  type: 'single',
};

const StyledAccordion = styled(Accordion.Root)({
  borderRadius: 6,
  width: 300,
  backgroundColor: mauve.mauve6,
  boxShadow: `0 2px 10px ${blackA.blackA4}`,
});

const StyledItem = styled(Accordion.Item)({
  overflow: 'hidden',
  marginTop: 1,

  '&:first-of-type': {
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },

  '&:last-of-type': {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },

  '&:focus-within': {
    position: 'relative',
    zIndex: 1,
    boxShadow: `0 0 0 2px ${mauve.mauve12}`,
  },
});

const StyledHeader = styled(Accordion.Header)({
  all: 'unset',
  display: 'flex',
});

const StyledTrigger = styled(Accordion.Trigger)({
  all: 'unset',
  fontFamily: 'inherit',
  backgroundColor: 'white',
  padding: '0 24px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 16,
  lineHeight: 1,
  color: violet.violet11,
  boxShadow: `0 1px 0 ${mauve.mauve6}`,
  cursor: 'pointer',
  '&:hover': { backgroundColor: mauve.mauve2 },
});

const StyledContent = styled(motion.div)({
  overflow: 'hidden',
  fontSize: 14,
  color: mauve.mauve11,
  backgroundColor: mauve.mauve2,
});

const StyledContentText = styled.div({
  padding: '16px 24px',
});

const StyledChevron = styled(RiArrowDownSLine)({
  fontSize: 24,
  color: violet.violet10,
  transition: 'transform 300ms cubic-bezier(0.04, 0.62, 0.23, 0.98)',
  '[data-state="opened"] &': { transform: 'rotate(180deg)' },
});

const StyledTemplate: Story<Accordion.AccordionProps> = (args) => (
  <StyledAccordion {...args}>
    <StyledItem value="0">
      {({ open }) => (
        <>
          <StyledHeader>
            <StyledTrigger>
              Accessible

              <StyledChevron aria-hidden />
            </StyledTrigger>
          </StyledHeader>
          <AnimatePresence>
            {open && (
              <Accordion.Content
                component={StyledContent}
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { height: 'auto' },
                  collapsed: { height: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <StyledContentText>It adheres to the WAI-ARAI design pattern.</StyledContentText>
              </Accordion.Content>
            )}
          </AnimatePresence>
        </>
      )}
    </StyledItem>
    <StyledItem value="1">
      {({ open }) => (
        <>
          <StyledHeader>
            <StyledTrigger>
              Unstyled

              <StyledChevron aria-hidden />
            </StyledTrigger>
          </StyledHeader>
          <AnimatePresence>
            {open && (
              <Accordion.Content
                component={StyledContent}
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { height: 'auto' },
                  collapsed: { height: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <StyledContentText>It&apos;s unstyled by default, giving you freedom over the look and feel.</StyledContentText>
              </Accordion.Content>
            )}
          </AnimatePresence>
        </>
      )}
    </StyledItem>
    <StyledItem value="2">
      {({ open }) => (
        <>
          <StyledHeader>
            <StyledTrigger>
              Can be animated

              <StyledChevron aria-hidden />
            </StyledTrigger>
          </StyledHeader>
          <AnimatePresence>
            {open && (
              <Accordion.Content
                component={StyledContent}
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { height: 'auto' },
                  collapsed: { height: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <StyledContentText>You can animate the Accordion with JavaScript.</StyledContentText>
              </Accordion.Content>
            )}
          </AnimatePresence>
        </>
      )}
    </StyledItem>
  </StyledAccordion>
);

export const Styled = StyledTemplate.bind({});

Styled.args = {
  type: 'single',
};
