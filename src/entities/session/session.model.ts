import { createQuery } from '@farfetched/core';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { attach, Effect } from 'effector';

import { Session } from '@/shared/api/api.generated';
import { requestWithAuthFx } from '@/shared/api/request';

export const fetchUserSessionsFx = attach<void, Effect<AxiosRequestConfig<any>, AxiosResponse<Session[]>>>({
  mapParams: () => ({
    url: '/api/v1/sessions',
  }),
  effect: requestWithAuthFx,
});

export const sessionQuery = createQuery({
  effect: fetchUserSessionsFx,
  mapData: ({ result }) => result.data,
  name: 'sessions',
});
