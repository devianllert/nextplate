import * as React from 'react';
import { fork, serialize, Scope } from 'effector';

import { isBrowser } from '@/shared/lib/is-browser';

export const EFFECTOR_STATE_KEY = '__EFFECTOR_STATE__';

export interface EffectorState {
  [EFFECTOR_STATE_KEY]?: Record<string, unknown>;
}

let clientScope: Scope;

const initializeScope = (initialData: Record<string, unknown>) => {
  const scope = fork({
    values: {
      ...(clientScope ? serialize(clientScope) : {}),
      ...initialData,
    },
  });

  if (isBrowser()) {
    clientScope = scope;
  }

  return scope;
};

export const useScope = (initialData: Record<string, unknown> = {}) => React.useMemo(() => initializeScope(initialData), [initialData]);

export const getClientScope = (): Scope | undefined => clientScope;
