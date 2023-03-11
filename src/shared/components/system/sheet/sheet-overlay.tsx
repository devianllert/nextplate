import styled from '@emotion/styled';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { fadeIn, fadeOut } from '@/shared/lib/css-in-js/animations';

export const StyledOverlay = styled(DialogPrimitive.Overlay)({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, .35)',

  '&[data-state="open"]': {
    animation: `${fadeIn} 250ms ease forwards`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} 250ms ease forwards`,
  },
});

export { StyledOverlay as Overlay };
