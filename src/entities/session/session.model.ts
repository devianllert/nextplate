import { createQuery } from '@farfetched/core';
import { attach, Effect } from 'effector';

import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Session } from '@/shared/api/api.generated';
import { requestWithAuthFx } from '../auth/model/refresh';

export const fetchUserSessionsFx = attach<void, Effect<AxiosRequestConfig<any>, AxiosResponse<Session[]>>>({
  mapParams: () => ({
    url: '/api/v1/sessions',
  }),
  effect: requestWithAuthFx,
});

export const sessionQuery = createQuery({
  effect: fetchUserSessionsFx,
  mapData: (response: AxiosResponse<Session[]>) => response.data,
  name: 'sessions',
});
