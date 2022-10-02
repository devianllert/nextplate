import {
  attach,
  createEvent,
  createStore,
  Effect,
} from 'effector';
import { createQuery } from '@farfetched/core';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { User } from '@/shared/api/api.generated';
import { requestWithAuthFx } from '../auth/model/refresh';

export const $user = createStore<User | null>(null);
export const userUpdated = createEvent();

export const fetchUserFx = attach<void, Effect<AxiosRequestConfig<any>, AxiosResponse<User>>>({
  mapParams: () => ({
    url: '/api/v1/users/1',
  }),
  effect: requestWithAuthFx,
});

export const userQuery = createQuery({
  effect: fetchUserFx,
  mapData: (response: AxiosResponse<User>) => response.data,
  name: 'user',
});

$user.on(fetchUserFx.doneData, (_, userResponse) => userResponse.data);
