/**
 * The prefers-color-scheme media feature is used to detect if the user has requested a light or dark color theme.
 *
 * The user might indicate this preference through an operating system setting (e.g. light or dark mode) or a user agent setting.
 */
export const getPreferredColorScheme = (): 'dark' | 'light' | null => {
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';

  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light';
  }

  return null;
};
