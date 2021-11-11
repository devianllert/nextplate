import styled from '@emotion/styled';

import { shouldForwardProp } from '@/modules/core/css-in-js/shouldForwardProp';
import { SxProp, sx } from '@/modules/core/css-in-js/sx';

export const ButtonBaseRoot = styled('button', { shouldForwardProp })<SxProp>(
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none', // Reset
    WebkitAppearance: 'none', // Reset
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none', // Remove Firefox dotted outline.
    },
    '@media print': {
      colorAdjust: 'exact',
    },

    '&:disabled': {
      cursor: 'default',
      pointerEvents: 'none',
    },
  },
  sx,
);
