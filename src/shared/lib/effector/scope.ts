import * as React from 'react';
import { fork, serialize, Scope } from 'effector';

import { isBrowser } from '@/shared/lib/is-browser';

export const EFFECTOR_STATE_KEY = '__EFFECTOR_STATE__';

export interface EffectorState {
  [EFFECTOR_STATE_KEY]?: Record<string, unknown>;
}

interface Values {
  [sid: string]: any;
}

interface State {
  clientScope: Scope | null
}

export const state: State = {
  clientScope: null,
};

export function useScope(values: Values = {}) {
  const valuesRef = React.useRef<Values | null>(null);

  if (!isBrowser()) {
    return fork({ values });
  }

  /*
   * Client first render
   * Create the new Scope and save it globally
   * We need it to be accessable inside getInitialProps
   */
  if (!state.clientScope) {
    const nextScope = fork({ values });

    state.clientScope = nextScope;
    valuesRef.current = values;
  }

  /*
   * Values have changed, most likely it's happened on the user navigation
   * Create the new Scope from the old one and save it as before
   */
  if (values !== valuesRef.current) {
    const currentValues = serialize(state.clientScope);
    const nextValues = { ...currentValues, ...values };
    const nextScope = fork({ values: nextValues });

    state.clientScope = nextScope;
    valuesRef.current = values;
  }

  return state.clientScope;
}
// export const useScope = (initialData: Record<string, unknown> = {}) => React.useMemo(() => initializeScope(initialData), [initialData]);

export const getClientScope = (): Scope | null => state.clientScope;
