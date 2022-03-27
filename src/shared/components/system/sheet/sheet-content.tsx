import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from '@emotion/styled';

import { keyframes } from '@emotion/react';

const slideIn = keyframes({
  from: { transform: 'var(--sheet-transform-value)' },
  to: { transform: 'translate3d(0,0,0)' },
});

const slideOut = keyframes({
  from: { transform: 'translate3d(0,0,0)' },
  to: { transform: 'var(--sheet-transform-value)' },
});

const slideDirectionTransform = {
  top: {
    '--sheet-transform-value': 'translate3d(0,-100%,0)',
    width: '100%',
    bottom: 'auto',
  },
  right: {
    '--sheet-transform-value': 'translate3d(100%,0,0)',
    right: 0,
  },
  bottom: {
    '--sheet-transform-value': 'translate3d(0,100%,0)',
    width: '100%',
    bottom: 0,
    top: 'auto',
  },
  left: {
    '--sheet-transform-value': 'translate3d(-100%,0,0)',
    left: 0,
  },
};

type SheetDirection = 'left' | 'right' | 'top' | 'bottom';

const StyledSheetContent = styled(DialogPrimitive.Content)<{ direction: SheetDirection }>((props) => ({
  position: 'fixed',
  top: 0,
  bottom: 0,

  // Among other things, prevents text alignment inconsistencies when dialog can't be centered in the viewport evenly.
  // Affects animated and non-animated dialogs alike.
  willChange: 'transform',

  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },

  '&[data-state="closed"]': {
    animation: `${slideOut} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },

  ...slideDirectionTransform[props.direction],
}));

interface SheetContentProps extends DialogPrimitive.DialogContentProps {
  direction?: SheetDirection;
}

export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>((props, forwardedRef) => {
  const { children, direction = 'left', ...other } = props;

  return (
    <StyledSheetContent
      data-direction={direction}
      direction={direction}
      {...other}
      ref={forwardedRef}
    >
      {children}
    </StyledSheetContent>
  );
});

export {
  SheetContent as Content,
};
