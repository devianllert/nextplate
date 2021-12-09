import styled from '@emotion/styled';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { fadeIn, fadeOut } from '@/modules/core/css-in-js/animations';

export const StyledOverlay = styled(DialogPrimitive.Overlay)({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, .15)',

  '&[data-state="open"]': {
    animation: `${fadeIn} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
});

export {
  StyledOverlay as Overlay,
};
