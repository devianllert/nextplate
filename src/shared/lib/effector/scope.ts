import * as React from 'react';

import { isBrowser } from '@effable/misc';
import { fork, Scope, serialize } from 'effector';

export const EFFECTOR_STATE_KEY = '__EFFECTOR_STATE__';

export interface EffectorState {
  [EFFECTOR_STATE_KEY]?: Values;
}

interface Values {
  [sid: string]: any;
}

let scope: Scope | undefined;

function initScope(initialData?: Values) {
  return fork({ values: initialData });
}

function initializeScope(preloadedData?: Values) {
  let newScope = scope ?? initScope(preloadedData);

  // After navigating to a page with an initial scope state, merge that state
  // with the current state in the scope, and create a new scope
  if (preloadedData && scope) {
    newScope = initScope({
      ...serialize(scope, { onlyChanges: true }),
      ...preloadedData,
    });
    // Reset the current scope
    scope = undefined;
  }

  // For SSG and SSR always create a new scope
  if (!isBrowser()) return newScope;
  // Create the scope once in the client
  if (!scope) scope = newScope;

  return newScope;
}

export function useScope(initialState?: Values) {
  return React.useMemo(() => initializeScope(initialState), [initialState]);
}

export const getClientScope = (): Scope | undefined => scope;
