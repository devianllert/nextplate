import { AxiosRequestConfig } from 'axios';
import { createEffect } from 'effector';

// FIXME: violates FSD boundaries
import { authenticateFx } from '@/entities/auth';

import { requestFx } from './request';

export const requestWithAuthFx = createEffect(async (params: AxiosRequestConfig) => {
  const token = await authenticateFx();

  const data = await requestFx({
    ...params,
    headers: {
      ...(params.headers ?? {}),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return data;
});
