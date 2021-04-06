import React from 'react';
import { themeContext, ThemeContext } from '../contexts/themeContext';

/**
 * Hook to access the user consent data
 *
 * Uses themeContext internally (provides an identical API)
 *
 * This hook should be used by components in favor of themeContext directly,
 * because it grants higher flexibility if you ever need to change the implementation (e.g: use something else than React.Context, like Redux/MobX/Recoil)
 *
 * @see https://slides.com/djanoskova/react-context-api-create-a-reusable-snackbar#/11
 */
const useThemeContext = (): ThemeContext => {
  return React.useContext(themeContext);
};

export default useThemeContext;
