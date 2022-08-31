import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 1000 * 10,
});

export const api = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const controller = new AbortController();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    signal: controller.signal,
  }).then((response) => response);

  // @ts-ignore
  promise.cancel = () => {
    controller.abort('Query was cancelled');
  };

  return promise;
};
