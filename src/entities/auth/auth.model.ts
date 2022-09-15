import { createEffect, sample } from 'effector';
import { AxiosError, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import { api } from '@/shared/api';
import {
  $token, RequestError, requestFx, setToken,
} from '@/shared/api/request/request';
import {
  AuthEmailLoginDto,
  AuthRegisterLoginDto,
  LoginResult,
  RefreshResult,
  RegisterResult,
} from '@/shared/api/api.generated';
import { pushFx } from '@/shared/lib/effector/router';
import { isBrowser } from '@/shared/lib/is-browser';

export const loginFx = createEffect<AuthEmailLoginDto, LoginResult, AxiosError<RequestError>>(async (values) => {
  const tokens = await requestFx({
    method: 'POST',
    url: 'api/v1/auth/login',
    data: values,
  });

  return tokens;
});

export const registerFx = createEffect<AuthRegisterLoginDto, RegisterResult, AxiosError<RequestError>>(async (values) => {
  const tokens = await requestFx({
    method: 'POST',
    url: 'api/v1/auth/register',
    data: values,
  });

  return tokens;
});

export const refreshFx = createEffect<void, RefreshResult, AxiosError<RequestError>>(async () => {
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

const resetSessionFx = createEffect(async () => {
  const cookieManager = new Cookies();

  cookieManager.set('token', 'null', {
    path: '/',
    expires: new Date(0),
  });

  await pushFx({
    url: '/auth/login',
  });
});

sample({
  clock: logoutFx.done,
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
  target: [setToken, resetSessionFx],
});

sample({
  clock: refreshFx.failData,
  filter: isBrowser,
  target: resetSessionFx,
});

// getUserByCookieFx.use(async (req) => {
//   // const { data: user, token, error } = await supabase.auth.api.getUserByCookie(req);

//   // if (token) supabase.auth.setAuth(token);
//   // if (error) throwError(error.message);
//   return user;
// });

export const $isLoggedIn = $token.map((token) => !!token);
