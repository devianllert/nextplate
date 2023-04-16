import * as React from 'react';

import { Button, EffableProvider, useEffableTheme } from '@effable/react';
import { type Preview, Decorator } from '@storybook/react';
import { fork } from 'effector';
import { Provider as EffectorProvider } from 'effector-react';
import { I18nextProvider } from 'react-i18next';

import '@/shared/design/external-styles';

import i18n from './i18n';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};


export const decorators: Decorator[] = [
  (Story, context) => {
    const scope = fork({});

    return (
      <EffectorProvider value={scope}>
        <I18nextProvider i18n={i18n}>
          <EffableProvider>
            <Toggler />

            <div
              style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
              }}
            >
              <Story />
            </div>
          </EffableProvider>
        </I18nextProvider>
      </EffectorProvider>
    );
  },
];

const Toggler = () => {
  const { mode, setMode } = useEffableTheme('Toggler');

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
    >
      <Button variant="secondary" disabled={mode === 'system'} onClick={() => setMode('system')}>
        system
      </Button>
      <Button variant="secondary" disabled={mode === 'light'} onClick={() => setMode('light')}>
        light
      </Button>
      <Button variant="secondary" disabled={mode === 'dark'} onClick={() => setMode('dark')}>
        dark
      </Button>
    </div>
  );
};

export default preview;
