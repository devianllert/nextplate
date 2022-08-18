import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  Effect,
  guard,
  merge,
  restore,
} from 'effector';
import { api } from '../api';

export interface RequestError {
  status: number;
  errors: {
    [key: string]: string;
  }
}

export const requestInternalFx = createEffect<AxiosRequestConfig, AxiosResponse, AxiosResponse>();

export const $token = createStore<string | null>(null);

requestInternalFx.use(api);

// const pendingApiRequests = createStore([]);

// const authorizedRequestFx = attach({
//   effect: requestInternalFx,
//   source: $token,
//   mapParams: (params, token) => ({ ...params, token }),
// });
