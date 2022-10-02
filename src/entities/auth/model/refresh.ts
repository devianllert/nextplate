import {
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import decode from 'jwt-decode';

import { AxiosRequestConfig } from 'axios';
import { refreshFx } from './auth';
import { $token, requestFx } from '@/shared/api/request/request';
import { TokenPayload } from '../types';

interface Deferred<T> {
  request: Promise<T>;
  resolve: (value?: T | Promise<T> | void) => void;
  reject: (error?: unknown) => void;
}

function createDefer<T>(): Deferred<T> {
  const defer: any = {};
  defer.request = new Promise((resolve, reject) => { Object.assign(defer, { resolve, reject }); });
  return defer;
}

const pendingRequests = createStore<Deferred<string | null>[]>([]);

const refreshDone = sample({
  source: pendingRequests,
  clock: refreshFx.doneData,
  fn: (requests, token): [string, Deferred<string | null>[]] => [token.data.access, requests],
});

const refreshFail = sample({
  source: pendingRequests,
  clock: refreshFx.failData,
  fn: (requests): [null, Deferred<string | null>[]] => [null, requests],
});

const checkTokenValidity = createEvent<Deferred<string | null>>();
const authenticate = createEffect(() => checkTokenValidity(createDefer()).request);

const tokenValid = sample({
  source: $token,
  clock: checkTokenValidity,
  filter(token) {
    if (!token) return false;

    const decodedToken = decode<TokenPayload>(token);

    const isExpired = new Date(decodedToken.exp * 1000) < new Date();

    return !isExpired;
  },
  fn: (token, request): [string | null, Deferred<string | null>] => [token, request],
});

const tokenInvalid = sample({
  source: $token,
  clock: checkTokenValidity,
  filter(token) {
    if (!token) return true;

    const decodedToken = decode<TokenPayload>(token);

    const isExpired = new Date(decodedToken.exp * 1000) < new Date();

    return isExpired;
  },
  fn: (token, request): [string | null, Deferred<string | null>] => [token, request],
});

pendingRequests.on(tokenInvalid, (queue, [_, request]) => queue.concat(request));

sample({
  source: tokenInvalid,
  filter: refreshFx.pending.map((is) => !is),
  target: refreshFx,
});

tokenValid.watch(([token, request]) => request.resolve(token));
refreshDone.watch(([token, requests]) => requests?.forEach((request) => request.resolve(token)));
refreshFail.watch(([token, requests]) => requests?.forEach((request) => request.reject(token)));

export const requestWithAuthFx = createEffect(async (params: AxiosRequestConfig) => {
  const token = await authenticate();

  const data = await requestFx({
    ...params,
    headers: {
      ...(params.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
});
