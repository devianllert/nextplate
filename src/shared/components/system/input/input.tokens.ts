import React from 'react';

import { variants } from '@/shared/design/tokens/typography';

const inputHeights = {
  small: 32,
  medium: 40,
  large: 48,
};

const inputPaddings = {
  small: 8,
  medium: 16,
  large: 24,
};

const inputTypography = {
  small: variants.button1,
  medium: variants.button2,
  large: variants.button3,
};

export const getInputPaddings = (size = 'medium'): number => {
  return inputPaddings[size];
};

export const getInputHeights = (size = 'medium'): number => {
  return inputHeights[size];
};

export const getInputTypography = (size = 'medium'): React.CSSProperties => {
  return inputTypography[size];
};
