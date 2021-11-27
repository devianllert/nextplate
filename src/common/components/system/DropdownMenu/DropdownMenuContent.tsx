import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import shadows from '@/common/design/tokens/shadows';
import { duration } from '@/common/design/tokens/transitions';

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
  maxWidth: 'calc(100vw- 24px)',
  maxHeight: '70vh',
  overflowY: 'auto',
  padding: 4,
  backgroundColor: props.theme.colors.background.secondary,
  borderRadius: 4,
  boxShadow: shadows[3],

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

export {
  DropdownMenuContent as Content,
};
