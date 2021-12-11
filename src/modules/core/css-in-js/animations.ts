import { keyframes } from '@emotion/react';

export const fadeIn = keyframes({
  from: { opacity: '0' },
  to: { opacity: '1' },
});

export const fadeOut = keyframes({
  from: { opacity: '1' },
  to: { opacity: '0' },
});

export const scaleIn = keyframes({
  from: { transform: 'scale(0)' },
  to: { transform: 'scale(1)' },
});

export const scaleOut = keyframes({
  from: { transform: 'scale(1)' },
  to: { transform: 'scale(0)' },
});
