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
import { createDefer, Defer } from '@/shared/lib/defer';

const $pendingRequests = createStore<Defer<string | null>[]>([]);

const refreshDone = sample({
  clock: refreshFx.doneData,
  source: $pendingRequests,
  fn: (requests, token): [string, Defer<string | null>[]] => [token.data.access, requests],
});

const refreshFail = sample({
  clock: refreshFx.failData,
  source: $pendingRequests,
  fn: (requests): [null, Defer<string | null>[]] => [null, requests],
});

const checkTokenValidity = createEvent<Defer<string | null>>();
export const authenticateFx = createEffect(() => checkTokenValidity(createDefer()).promise);

const tokenValid = sample({
  clock: checkTokenValidity,
  source: $token,
  filter(token) {
    if (!token) return false;

    const decodedToken = decode<TokenPayload>(token);

    const isExpired = new Date(decodedToken.exp * 1000) < new Date();

    return !isExpired;
  },
  fn: (token, request): [string | null, Defer<string | null>] => [token, request],
});

const tokenInvalid = sample({
  clock: checkTokenValidity,
  source: $token,
  filter(token) {
    if (!token) return true;

    const decodedToken = decode<TokenPayload>(token);

    const isExpired = new Date(decodedToken.exp * 1000) < new Date();

    return isExpired;
  },
  fn: (token, request): [string | null, Defer<string | null>] => [token, request],
});

$pendingRequests.on(tokenInvalid, (queue, [_, request]) => queue.concat(request));

sample({
  source: tokenInvalid,
  filter: refreshFx.pending.map((is) => !is),
  target: refreshFx,
});

tokenValid.watch(([token, request]) => request.resolve(token));
refreshDone.watch(([token, requests]) => requests?.forEach((request) => request.resolve(token)));
refreshFail.watch(([token, requests]) => requests?.forEach((request) => request.reject(token)));
