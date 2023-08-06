import { createEffect, sample } from 'effector';

import {
  AuthEmailLoginDto,
  AuthRegisterLoginDto,
  LoginResult,
  RefreshResult,
  RegisterResult,
} from '@/shared/api/api.generated';
import { $token, RequestError, requestFx, setToken } from '@/shared/api/request/request';
import { pushFx } from '@/shared/lib/effector/router';

export const loginFx = createEffect<AuthEmailLoginDto, LoginResult, RequestError>(async (values) => {
  const tokens = await requestFx({
    method: 'POST',
    url: 'api/v1/auth/login',
    data: values,
  });

  return tokens;
});

export const registerFx = createEffect<AuthRegisterLoginDto, RegisterResult, RequestError>(async (values) => {
  const tokens = await requestFx({
    method: 'POST',
    url: 'api/v1/auth/register',
    data: values,
  });

  return tokens;
});

export const refreshFx = createEffect<void, RefreshResult, RequestError>(async () => {
  const tokens = await requestFx({
    url: 'api/v1/auth/refresh',
    method: 'POST',
    withCredentials: true,
  });

  return tokens;
});

export const logoutFx = createEffect(() => {
  return requestFx({
    method: 'POST',
    url: 'api/v1/auth/logout',
    withCredentials: true,
  });
});

sample({
  clock: [logoutFx.done, refreshFx.failData],
  fn: () => ({
    url: '/auth/login',
  }),
  target: pushFx,
});

sample({
  clock: [loginFx.doneData, refreshFx.doneData],
  fn: ({ data }) => data.access,
  target: setToken,
});

sample({
  clock: refreshFx.failData,
  fn: () => null,
  target: setToken,
});

export const $isLoggedIn = $token.map((token) => !!token);
