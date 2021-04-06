import {
  useEffect,
  ReactNode,
  ReactElement,
  useState,
} from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import dark from '@/common/design/tokens/palette.dark';
import light from '@/common/design/tokens/palette.light';
import isBrowser from '@/common/utils/isBrowser';

import { themeContext } from './themeContext';
import { getInitialColorMode } from '../getInitialColorMode';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): ReactElement => {
  const [mode, setMode] = useState(isBrowser() ? getInitialColorMode : 'light');

  const toggle = (): void => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

    window.localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');
  };

  useEffect(() => setMode(getInitialColorMode()), []);

  return (
    <themeContext.Provider value={{ mode, toggle }}>
      <StyledThemeProvider theme={mode === 'dark' ? dark : light}>{children}</StyledThemeProvider>
    </themeContext.Provider>
  );
};

export default ThemeProvider;
