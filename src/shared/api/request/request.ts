import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  restore,
} from 'effector';

import { isBrowser } from '@/shared/lib/is-browser';

import { httpClient } from '../http-client';

export interface RequestError {
  statusCode: number;
  code?: string;
  message?: string;
  errors: {
    [key: string]: string;
  }
}

export const setCookiesForRequest = createEvent<string>();
// WARNING: cookies should be sent only to an OUR backend
// Any other can steal the access token
export const $cookiesForRequest = restore(setCookiesForRequest, '');

export const requestInternalFx = createEffect<AxiosRequestConfig, AxiosResponse, AxiosError<RequestError>>();

requestInternalFx.use(httpClient);

export const requestFx = attach({
  effect: requestInternalFx,
  source: $cookiesForRequest,
  mapParams: (params: AxiosRequestConfig, cookies) => ({
    ...params,
    headers: {
      ...params.headers,
      ...(!isBrowser() && {
        cookie: cookies,
      }),
    },
  }),
});

export const setToken = createEvent<string | null>();
export const $token = createStore<string | null>(null);

$token.on(setToken, (_, newToken) => newToken);

export const requestWithAuthFx = attach({
  effect: requestFx,
  source: $token,
  mapParams: (params: AxiosRequestConfig, token) => ({
    ...params,
    headers: {
      ...params.headers,
      Authorization: `Bearer ${token}`,
    },
  }),
});

if (process.env.NEXT_PUBLIC_APP_STAGE === 'development') {
  requestInternalFx.watch(({ url, method }) => {
    console.log(`[requestInternal] ${method} ${url}`);
  });

  requestInternalFx.done.watch(({ params: { url, method }, result: { status } }) => {
    console.log(`[requestInternal.done] ${method} ${url} : ${status}`);
  });

  requestInternalFx.fail.watch(({ params: { url, method }, error: { status } }) => {
    console.log(`[requestInternal.fail] ${method} ${url} : ${status}`);
  });
}
