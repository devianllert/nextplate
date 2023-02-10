/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider as EffectorProvider } from 'effector-react/scope';
import { EffableProvider } from '@effable/react';

export const renderWithProviders = (ui: React.ReactNode, scope?: Scope): RenderResult => render(
  <EffableProvider>
    <EffectorProvider value={scope ?? fork({})}>
      {ui}
    </EffectorProvider>
  </EffableProvider>,
);
