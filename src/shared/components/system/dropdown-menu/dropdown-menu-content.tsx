import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { duration } from '@/shared/design/tokens/transitions';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

export const DropdownMenuContent = styled(DropdownMenuPrimitive.Content)((props) => ({
  boxSizing: 'border-box',
  minWidth: 160,
  maxWidth: 'calc(100vw - 24px)',
  maxHeight: '70vh',
  overflowY: 'auto',
  padding: '8px 4px',
  backgroundColor: props.theme.colors.background.secondary,
  borderRadius: 4,
  boxShadow: props.theme.shadows['3x'],

  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: `${duration.short}ms`,
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade, animationFillMode: 'forwards' },
      '&[data-side="right"]': { animationName: slideLeftAndFade, animationFillMode: 'forwards' },
      '&[data-side="bottom"]': { animationName: slideUpAndFade, animationFillMode: 'forwards' },
      '&[data-side="left"]': { animationName: slideRightAndFade, animationFillMode: 'forwards' },
    },
  },
}));

export const DropdownMenuSubContent = styled(DropdownMenuPrimitive.SubContent)((props) => ({
  boxSizing: 'border-box',
  minWidth: 160,
  maxWidth: 'calc(100vw - 24px)',
  maxHeight: '70vh',
  overflowY: 'auto',
  padding: '8px 4px',
  backgroundColor: props.theme.colors.background.secondary,
  borderRadius: 4,
  boxShadow: props.theme.shadows['3x'],

  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: `${duration.short}ms`,
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
}));

export { DropdownMenuContent as Content, DropdownMenuSubContent as SubContent };
