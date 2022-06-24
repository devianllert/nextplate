const switchWidths = {
  small: 22,
  medium: 28,
  large: 40,
};

const switchHeights = {
  small: 12,
  medium: 16,
  large: 24,
};

export const getSwitchWidths = (size = 'medium'): number => {
  return switchWidths[size];
};

export const getSwitchHeights = (size = 'medium'): number => {
  return switchHeights[size];
};
