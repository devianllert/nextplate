import { createQuery } from '@farfetched/core';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { attach, createEvent, Effect } from 'effector';

import { User } from '@/shared/api/api.generated';
import { requestWithAuthFx } from '@/shared/api/request';

export const userUpdated = createEvent();

export const fetchUserFx = attach<number, Effect<AxiosRequestConfig<any>, AxiosResponse<User>>>({
  mapParams: (userId: number) => ({
    url: `/api/v1/users/${userId}`,
  }),
  effect: requestWithAuthFx,
});

export const userQuery = createQuery({
  effect: fetchUserFx,
  mapData: ({ result }) => result.data,
  name: 'user',
});
