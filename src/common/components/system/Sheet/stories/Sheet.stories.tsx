import * as React from 'react';
import { Meta } from '@storybook/react';
import styled from '@emotion/styled';

import shadows from '@/common/design/tokens/shadows';

import { Sheet } from '../Sheet';
import { SheetContent, SheetTrigger } from '..';
import { Button } from '../../Button';

export default {
  title: 'Design System/Atoms/Sheet',
  component: Sheet,
} as Meta;

const StyledContent = styled(SheetContent)({
  background: 'white',
  boxShadow: shadows[6],

  '&[data-direction=top], &[data-direction=bottom]': {
    height: 300,
  },

  '&[data-direction=left], &[data-direction=right]': {
    width: 300,
  },
});

export const Top = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>open</Button>
      </SheetTrigger>

      <StyledContent direction="top">
        123
      </StyledContent>
    </Sheet>
  );
};

export const Left = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>open</Button>
      </SheetTrigger>

      <StyledContent direction="left">
        123
      </StyledContent>
    </Sheet>
  );
};

export const Right = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>open</Button>
      </SheetTrigger>

      <StyledContent direction="right">
        123
      </StyledContent>
    </Sheet>
  );
};

export const Bottom = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>open</Button>
      </SheetTrigger>

      <StyledContent direction="bottom">
        123
      </StyledContent>
    </Sheet>
  );
};
