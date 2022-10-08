/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import { fork, Scope } from 'effector';
import { Provider as EffectorProvider } from 'effector-react/scope';

import { theme } from '@/shared/design/themes';

export const renderWithProviders = (ui: React.ReactNode, scope?: Scope): RenderResult => render(
  <ThemeProvider theme={theme}>
    <EffectorProvider value={scope ?? fork({})}>
      {ui}
    </EffectorProvider>
  </ThemeProvider>,
);
