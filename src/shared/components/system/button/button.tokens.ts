import React from 'react';

import { variants } from '@/shared/design/tokens/typography';

const buttonHeights = {
  small: 32,
  medium: 40,
  large: 48,
};

const buttonPaddings = {
  small: 8,
  medium: 16,
  large: 24,
};

const buttonTypography = {
  small: variants.button1,
  medium: variants.button2,
  large: variants.button3,
};

export const getButtonPaddings = (size = 'medium'): number => {
  return buttonPaddings[size];
};

export const getButtonHeights = (size = 'medium'): number => {
  return buttonHeights[size];
};

export const getButtonTypography = (size = 'medium'): React.CSSProperties => {
  return buttonTypography[size];
};
