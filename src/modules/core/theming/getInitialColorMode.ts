export const getInitialColorMode = (): string => {
  const persistedColorPreference = window.localStorage.getItem('theme');
  const hasPersistedPreference = typeof persistedColorPreference === 'string';

  /**
   * If the user has explicitly chosen light or dark,
   * use it. Otherwise, this value will be null.
   */
  if (hasPersistedPreference) {
    return persistedColorPreference;
  }

  // If there is no saved preference, use a media query
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';

  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light';
  }

  // default to 'light'.
  return 'light';
};

export default getInitialColorMode;
