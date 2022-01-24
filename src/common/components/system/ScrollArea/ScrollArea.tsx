import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import styled from '@emotion/styled';
import { fadeIn, fadeOut } from '@/modules/core/css-in-js/animations';

const SCROLLBAR_SIZE = 12;

export const StyledViewport = styled(ScrollAreaPrimitive.Viewport)({
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

export const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar)((props) => ({
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 4,
  transition: 'background 160ms ease-out',
  '&:hover': { background: props.theme.colors.radix.grayA6 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
  '&[data-state="visible"]': {
    animation: `${fadeIn} 125ms ease`,
  },
  '&[data-state="hidden"]': {
    animation: `${fadeOut} 125ms ease`,
  },
}));

export const StyledThumb = styled(ScrollAreaPrimitive.Thumb)((props) => ({
  flex: 1,
  background: props.theme.colors.radix.gray10,
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
}));

export * from '@radix-ui/react-scroll-area';
