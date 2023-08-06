import * as React from 'react';
import { Button } from '@effable/react';
import styled from '@emotion/styled';
import { Meta } from '@storybook/react';

import { Sheet, SheetContent, SheetPortal, SheetTrigger } from '../index';

export default {
  title: 'Design System/Components/Sheet',
  component: Sheet,
} as Meta;

const StyledContent = styled(SheetContent)((props) => ({
  background: 'white',
  boxShadow: props.theme.shadows['6x'],

  '&[data-direction=top], &[data-direction=bottom]': {
    height: 300,
  },

  '&[data-direction=left], &[data-direction=right]': {
    width: 300,
  },
}));

export const Top = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>open</Button>
      </SheetTrigger>

      <SheetPortal>
        <StyledContent direction="top">123</StyledContent>
      </SheetPortal>
    </Sheet>
  );
};

export const Left = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>open</Button>
      </SheetTrigger>

      <SheetPortal>
        <StyledContent direction="left">123</StyledContent>
      </SheetPortal>
    </Sheet>
  );
};

export const Right = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>open</Button>
      </SheetTrigger>

      <SheetPortal>
        <StyledContent direction="right">123</StyledContent>
      </SheetPortal>
    </Sheet>
  );
};

export const Bottom = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>open</Button>
      </SheetTrigger>

      <SheetPortal>
        <StyledContent direction="bottom">123</StyledContent>
      </SheetPortal>
    </Sheet>
  );
};
