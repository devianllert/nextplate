const checkboxTypography = {
  small: 14,
  medium: 16,
  large: 18,
};

export const getCheckboxTypography = (size = 'medium') => checkboxTypography[size];
