/* eslint-disable effector/no-watch */
import { isBrowser } from '@effable/misc';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { attach, createEffect, createEvent, createStore, restore } from 'effector';
import decode from 'jwt-decode';

import { TokenPayload } from '../api.generated';
import { httpClient } from '../http-client';

export interface RequestError {
  statusCode: number;
  code?: string;
  message: string;
  errors: {
    [key: string]: string | string[];
  };
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
    method: 'GET',
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
export const $tokenPayload = createStore<TokenPayload | null>(null);

$token.on(setToken, (_, newToken) => newToken);
$tokenPayload.on(setToken, (_, newToken) => (newToken ? decode<TokenPayload>(newToken) : null));

if (process.env.NEXT_PUBLIC_APP_STAGE === 'development') {
  requestInternalFx.watch((request) => {
    console.log(`[request]: ${request.method} • ${request.url}`);
  });

  requestInternalFx.done.watch((response) => {
    console.log(`[request.done]: ${response.params.method} • ${response.params.url} • ${response.result.status}`);
  });

  requestInternalFx.fail.watch((response) => {
    console.log(`[request.fail]: ${response.params.method} • ${response.params.url} • ${response.error.status}`);
  });
}
