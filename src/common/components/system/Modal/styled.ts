import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { blackA } from '@radix-ui/colors';
import { zIndex } from '@/common/design/tokens/zIndex';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const overlayHide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -50%) scale(.75)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const contentHide = keyframes({
  '0%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  '100%': { opacity: 0, transform: 'translate(-50%, -50%) scale(.75)' },
});

export const StyledOverlay = styled(DialogPrimitive.Overlay)({
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  zIndex: zIndex.modal - 1,
  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-state=open]': {
      animation: `${overlayShow} 250ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state=closed]': {
      animation: `${overlayHide} 250ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
  },
});

export const StyledContent = styled(DialogPrimitive.Content)({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  zIndex: zIndex.modal,

  '&:focus': {
    outline: 'none',
  },

  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-state=open]': {
      animation: `${contentShow} 250ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state=closed]': {
      animation: `${contentHide} 250ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
  },
});
