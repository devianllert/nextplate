export const EFFECTOR_STATE_KEY = '__EFFECTOR_STATE__';

export interface EffectorState {
  [EFFECTOR_STATE_KEY]?: Values;
}

interface Values {
  [sid: string]: any;
}
