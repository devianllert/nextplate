/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';

import { theme } from '@/common/design/themes';

export const renderWithProviders = (ui: React.ReactNode): RenderResult => render(
  <ThemeProvider theme={theme}>
    {ui}
  </ThemeProvider>,
);
