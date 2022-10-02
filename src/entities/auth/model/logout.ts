import { createEvent, sample } from 'effector';

import { logoutFx } from './auth';

export const forceLogout = createEvent();

sample({
  clock: forceLogout,
  target: logoutFx,
});
