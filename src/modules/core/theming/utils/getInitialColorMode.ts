import { PaletteMode } from '../types/palette.interface';
import { getPreferredColorScheme } from './getPreferredColorScheme';

export const getInitialColorMode = (): PaletteMode => {
  const persistedColorPreference = window.localStorage.getItem('theme') as PaletteMode;
  const hasPersistedPreference = typeof persistedColorPreference === 'string';

  /**
   * If the user has explicitly chosen light or dark,
   * use it. Otherwise, this value will be null.
   */
  if (hasPersistedPreference) {
    return persistedColorPreference;
  }

  // If there is no saved preference, use a media query
  const mediaQueryPreference = getPreferredColorScheme();

  // default to 'light'.
  return mediaQueryPreference ?? 'light';
};

export default getInitialColorMode;
