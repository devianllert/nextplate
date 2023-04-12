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
