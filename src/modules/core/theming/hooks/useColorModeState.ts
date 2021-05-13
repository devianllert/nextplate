import * as React from 'react';

import { THEME_UI_MODE_STORAGE_KEY } from '../constants';
import { ThemeUI } from '../types/theme.interface';
import { getModeFromClass } from '../utils/getModeFromClass';
import { getPreferredColorScheme } from '../utils/getPreferredColorScheme';

export const useColorModeState = (theme: ThemeUI): readonly [string, React.Dispatch<React.SetStateAction<string>>] => {
  const { initialColorModeName, useColorSchemeMediaQuery, useLocalStorage } = theme.config ?? {};

  const [mode, setMode] = React.useState(() => {
    const modeFromClass = getModeFromClass();

    if (modeFromClass) return modeFromClass;

    const preferredMode = useColorSchemeMediaQuery !== false && getPreferredColorScheme();

    return preferredMode || initialColorModeName;
  });

  // on first render, we read the color mode from localStorage and
  // clear the class on document element body
  React.useEffect(() => {
    const stored = useLocalStorage !== false && window.localStorage.getItem(THEME_UI_MODE_STORAGE_KEY);

    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove(`theme-ui-${stored}`);
      document.body.classList.remove(`theme-ui-${stored}`);
    }

    if (stored && stored !== mode) {
      setMode(stored);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when mode changes, we save it to localStorage
  React.useEffect(() => {
    if (mode && useLocalStorage !== false) {
      window.localStorage.setItem(THEME_UI_MODE_STORAGE_KEY, mode);
    }
  }, [mode, useLocalStorage]);

  if (process.env.NODE_ENV !== 'production') {
    if (
      theme.palette?.modes
      && initialColorModeName
      && Object.keys(theme.palette.modes).indexOf(initialColorModeName) > -1
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        '[theme-ui] The `initialColorModeName` value should be a unique name'
          + ' and cannot reference a key in `theme.colors.modes`.',
      );
    }
  }

  return [mode, setMode] as const;
};
