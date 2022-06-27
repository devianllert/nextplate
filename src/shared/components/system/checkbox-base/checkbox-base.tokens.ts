const checkboxBaseSizes = {
  small: 12,
  medium: 16,
  large: 20,
};

export const getCheckboxSize = (size = 'medium') => checkboxBaseSizes[size];
