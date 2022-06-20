import { Sizes } from '@/shared/design/tokens/size';

const iconButtonHeights = {
  xsmall: 24,
  small: 32,
  medium: 40,
  large: 48,
};

const iconButtonTypography = {
  xsmall: 16,
  small: 20,
  medium: 24,
  large: 28,
};

export const getIconButtonSize = (size: Sizes = 'medium'): number => {
  return iconButtonHeights[size];
};

export const getIconButtonTypography = (size: Sizes = 'medium'): number => {
  return iconButtonTypography[size];
};
