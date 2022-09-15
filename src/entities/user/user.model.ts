import {
  attach, createEvent, createStore, sample,
} from 'effector';

import { User } from '@/shared/api/api.generated';
import { requestWithAuthFx } from '../auth/refresh';

export const $user = createStore<User | null>(null);
export const userUpdated = createEvent();

export const fetchUserFx = attach({
  mapParams: () => ({
    url: '/api/v1/users/1',
  }),
  effect: requestWithAuthFx,
});

sample({
  clock: userUpdated,
  target: fetchUserFx,
});

$user.on(fetchUserFx.doneData, (_, userResponse) => userResponse.data);

fetchUserFx.fail.watch(console.log);
