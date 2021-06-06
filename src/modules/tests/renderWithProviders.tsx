/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import dark from '@/common/design/tokens/palette.dark';
import light from '@/common/design/tokens/palette.light';

import { ThemeUI } from '../core/theming/types/theme.interface';
import { PaletteMode } from '../core/theming/types/palette.interface';

const createTheme = (mode: PaletteMode): ThemeUI => ({
  palette: {
    mode,
    ...(mode === 'dark' ? dark : light),
  },
});

export const renderWithProviders = (ui: React.ReactNode, theme: PaletteMode = 'light') => render(
  <ThemeProvider theme={createTheme(theme)}>
    {ui}
  </ThemeProvider>,
);
